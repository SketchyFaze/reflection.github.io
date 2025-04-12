import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { gameItems, GameItem, Rarity } from '@/utils/gameData';
import { useAuth } from '@/contexts/AuthContext';
import { loadGameSettings, saveGameSettings } from '@/utils/localStorage';

interface GameContextType {
  rollItem: () => GameItem | null;
  rollingAnimation: boolean;
  lastRolledItem: GameItem | null;
  allItems: GameItem[];
  leaderboard: LeaderboardEntry[];
  communityRolls: number;
  dailyFreeRolls: number;
  remainingFreeRolls: number;
  resetFreeDailyRolls: () => void;
  updateLeaderboard: () => void;
  settings: GameSettings;
  updateSettings: (newSettings: Partial<GameSettings>) => void;
  featuredItem: GameItem;
  dailyResetTime: Date;
}

interface LeaderboardEntry {
  username: string;
  rollCount: number;
  bestItem: string;
}

interface GameSettings {
  rollSpeed: number;
  luckMultiplier: number;
  dailyFreeRolls: number;
  featuredItemId: string;
}

const defaultSettings: GameSettings = {
  rollSpeed: 1,
  luckMultiplier: 1,
  dailyFreeRolls: 3,
  featuredItemId: gameItems.find(item => item.rarity === Rarity.Legendary)?.id || gameItems[0].id
};

const GameContext = createContext<GameContextType>({
  rollItem: () => null,
  rollingAnimation: false,
  lastRolledItem: null,
  allItems: [],
  leaderboard: [],
  communityRolls: 0,
  dailyFreeRolls: 3,
  remainingFreeRolls: 3,
  resetFreeDailyRolls: () => {},
  updateLeaderboard: () => {},
  settings: defaultSettings,
  updateSettings: () => {},
  featuredItem: gameItems[0],
  dailyResetTime: new Date()
});

export const useGame = () => useContext(GameContext);

export const GameProvider = ({ children }: { children: ReactNode }) => {
  const { user, updateUser } = useAuth();
  const [rollingAnimation, setRollingAnimation] = useState(false);
  const [lastRolledItem, setLastRolledItem] = useState<GameItem | null>(null);
  const [communityRolls, setCommunityRolls] = useState(0);
  const [settings, setSettings] = useState<GameSettings>(defaultSettings);
  const [remainingFreeRolls, setRemainingFreeRolls] = useState(3);
  const [leaderboard, setLeaderboard] = useState<LeaderboardEntry[]>([]);
  const [dailyResetTime, setDailyResetTime] = useState(new Date());
  const featuredItem = gameItems.find(item => item.id === settings.featuredItemId) || gameItems[0];

  // Load initial game state
  useEffect(() => {
    // Load community rolls
    const savedCommunityRolls = parseInt(localStorage.getItem('reflectionCommunityRolls') || '0');
    setCommunityRolls(savedCommunityRolls);

    // Load game settings (admin controlled)
    const savedSettings = loadGameSettings();
    if (savedSettings) {
      setSettings(savedSettings);
    }

    // Infinite free rolls - always set to maximum
    setRemainingFreeRolls(9999);
    localStorage.setItem('reflectionRemainingFreeRolls', '9999');

    // Set next daily reset time
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    tomorrow.setHours(0, 0, 0, 0);
    setDailyResetTime(tomorrow);

    // Load leaderboard
    updateLeaderboard();
  }, []);

  // Roll for a random item with rarity-based probabilities
  const rollItem = (): GameItem | null => {
    if (!user) return null;

    // Start rolling animation
    setRollingAnimation(true);

    // Schedule end of animation based on roll speed setting
    setTimeout(() => {
      // Generate random roll based on rarity probabilities, applying luck multiplier
      const roll = Math.random() * 100;
      let selectedItem: GameItem | null = null;
      
      // Apply luck multiplier and featured item bonus
      const luckFactor = settings.luckMultiplier;
      
      // Custom probabilities with luck multiplier:
      // Legendary: 2% base * luck
      // Epic: 5% base * luck
      // Rare: 13% base * luck
      // Uncommon: 30% base * luck
      // Common: Remainder
      
      if (roll < 2 * luckFactor) {
        // Filter legendary items and pick one
        const legendaryItems = gameItems.filter(item => item.rarity === Rarity.Legendary);
        
        // Featured item has double chance within its rarity
        const featuredItemChance = featuredItem.rarity === Rarity.Legendary ? 0.5 : 0;
        if (Math.random() < featuredItemChance) {
          selectedItem = featuredItem;
        } else {
          selectedItem = legendaryItems[Math.floor(Math.random() * legendaryItems.length)];
        }
      } 
      else if (roll < (2 + 5) * luckFactor) {
        // Filter epic items and pick one
        const epicItems = gameItems.filter(item => item.rarity === Rarity.Epic);
        
        // Featured item has double chance within its rarity
        const featuredItemChance = featuredItem.rarity === Rarity.Epic ? 0.5 : 0;
        if (Math.random() < featuredItemChance) {
          selectedItem = featuredItem;
        } else {
          selectedItem = epicItems[Math.floor(Math.random() * epicItems.length)];
        }
      } 
      else if (roll < (2 + 5 + 13) * luckFactor) {
        // Filter rare items and pick one
        const rareItems = gameItems.filter(item => item.rarity === Rarity.Rare);
        
        // Featured item has double chance within its rarity
        const featuredItemChance = featuredItem.rarity === Rarity.Rare ? 0.5 : 0;
        if (Math.random() < featuredItemChance) {
          selectedItem = featuredItem;
        } else {
          selectedItem = rareItems[Math.floor(Math.random() * rareItems.length)];
        }
      } 
      else if (roll < (2 + 5 + 13 + 30) * luckFactor) {
        // Filter uncommon items and pick one
        const uncommonItems = gameItems.filter(item => item.rarity === Rarity.Uncommon);
        
        // Featured item has double chance within its rarity
        const featuredItemChance = featuredItem.rarity === Rarity.Uncommon ? 0.5 : 0;
        if (Math.random() < featuredItemChance) {
          selectedItem = featuredItem;
        } else {
          selectedItem = uncommonItems[Math.floor(Math.random() * uncommonItems.length)];
        }
      } 
      else {
        // Filter common items and pick one
        const commonItems = gameItems.filter(item => item.rarity === Rarity.Common);
        
        // Featured item has double chance within its rarity
        const featuredItemChance = featuredItem.rarity === Rarity.Common ? 0.5 : 0;
        if (Math.random() < featuredItemChance) {
          selectedItem = featuredItem;
        } else {
          selectedItem = commonItems[Math.floor(Math.random() * commonItems.length)];
        }
      }

      // Update inventory and roll count
      if (selectedItem) {
        // Add item to inventory if not already owned
        const newInventory = [...(user.inventory || [])];
        if (!newInventory.includes(selectedItem.id)) {
          newInventory.push(selectedItem.id);
        }
        
        // Update user data
        updateUser({
          rollCount: user.rollCount + 1,
          inventory: newInventory
        });
        
        // Update community roll count
        const newCommunityRolls = communityRolls + 1;
        setCommunityRolls(newCommunityRolls);
        localStorage.setItem('reflectionCommunityRolls', newCommunityRolls.toString());
        
        // No need to update remaining free rolls - infinite rolls!

        // Store result and end animation
        setLastRolledItem(selectedItem);
        setRollingAnimation(false);
        
        // Update leaderboard
        updateLeaderboard();
        
        return selectedItem;
      }
      
      setRollingAnimation(false);
      return null;
    }, 1500 / settings.rollSpeed); // Adjust animation time based on roll speed setting
    
    return null;
  };

  const resetFreeDailyRolls = () => {
    // Always keep at 9999 for infinite rolls
    setRemainingFreeRolls(9999);
    localStorage.setItem('reflectionRemainingFreeRolls', '9999');
  };

  const updateLeaderboard = () => {
    // Get users from storage
    const users = JSON.parse(localStorage.getItem('reflectionUsers') || '[]');
    
    // Create leaderboard data
    const leaderboardData: LeaderboardEntry[] = users.map((user: any) => {
      // Determine best item in inventory
      let bestItemName = 'None';
      let highestRarity = -1;
      
      if (user.inventory && user.inventory.length > 0) {
        user.inventory.forEach((itemId: string) => {
          const item = gameItems.find(i => i.id === itemId);
          if (item && item.rarityLevel > highestRarity) {
            highestRarity = item.rarityLevel;
            bestItemName = item.name;
          }
        });
      }
      
      return {
        username: user.username,
        rollCount: user.rollCount || 0,
        bestItem: bestItemName
      };
    });
    
    // Sort by roll count (descending)
    leaderboardData.sort((a, b) => b.rollCount - a.rollCount);
    
    setLeaderboard(leaderboardData);
  };

  const updateSettings = (newSettings: Partial<GameSettings>) => {
    const updatedSettings = { ...settings, ...newSettings };
    setSettings(updatedSettings);
    saveGameSettings(updatedSettings);
    
    // Always keep free rolls at maximum
    setRemainingFreeRolls(9999);
    localStorage.setItem('reflectionRemainingFreeRolls', '9999');
  };

  return (
    <GameContext.Provider value={{
      rollItem,
      rollingAnimation,
      lastRolledItem,
      allItems: gameItems,
      leaderboard,
      communityRolls,
      dailyFreeRolls: settings.dailyFreeRolls,
      remainingFreeRolls,
      resetFreeDailyRolls,
      updateLeaderboard,
      settings,
      updateSettings,
      featuredItem,
      dailyResetTime
    }}>
      {children}
    </GameContext.Provider>
  );
};
