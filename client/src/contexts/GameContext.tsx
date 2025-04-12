import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { gameItems, GameItem, Rarity } from '@/utils/gameData';
import { useAuth } from '@/contexts/AuthContext';
import { loadGameSettings, saveGameSettings } from '@/utils/localStorage';

interface GameContextType {
  rollItem: (isLucky?: boolean) => GameItem | null;
  rollingAnimation: boolean;
  lastRolledItem: GameItem | null;
  allItems: GameItem[];
  leaderboard: LeaderboardEntry[];
  communityRolls: number;
  updateLeaderboard: () => void;
  settings: GameSettings;
  updateSettings: (newSettings: Partial<GameSettings>) => void;
  featuredItem: GameItem;
  dailyResetTime: Date;
  
  // Coin system
  coins: number;
  addCoins: (amount: number) => void;
  spendCoins: (amount: number) => boolean;
  
  // Character equipping
  equipCharacter: (itemId: string) => void;
  unequipCharacter: (itemId: string) => void;
  equippedCharacters: string[];
  
  // Marketplace
  listItemForSale: (itemId: string, price: number) => void;
  unlistItemFromSale: (itemId: string) => void;
  buyItem: (itemId: string, sellerId: string, price: number) => boolean;
  listedItems: Array<{itemId: string, sellerId: string, price: number}>;
}

interface LeaderboardEntry {
  username: string;
  rollCount: number;
  bestItem: string;
}

interface GameSettings {
  rollSpeed: number;
  luckMultiplier: number;
  featuredItemId: string;
  globalBoostActive: boolean;
  globalBoostMessage: string;
  globalBoostExpiry: number; // Unix timestamp
}

const defaultSettings: GameSettings = {
  rollSpeed: 1,
  luckMultiplier: 1,
  featuredItemId: gameItems.find(item => item.rarity === Rarity.Legendary)?.id || gameItems[0].id,
  globalBoostActive: false,
  globalBoostMessage: '',
  globalBoostExpiry: 0
};

const GameContext = createContext<GameContextType>({
  rollItem: () => null,
  rollingAnimation: false,
  lastRolledItem: null,
  allItems: [],
  leaderboard: [],
  communityRolls: 0,
  updateLeaderboard: () => {},
  settings: defaultSettings,
  updateSettings: () => {},
  featuredItem: gameItems[0],
  dailyResetTime: new Date(),
  
  // Coin system
  coins: 0,
  addCoins: () => {},
  spendCoins: () => false,
  
  // Character equipping
  equipCharacter: () => {},
  unequipCharacter: () => {},
  equippedCharacters: [],
  
  // Marketplace
  listItemForSale: () => {},
  unlistItemFromSale: () => {},
  buyItem: () => false,
  listedItems: []
});

export const useGame = () => useContext(GameContext);

export const GameProvider = ({ children }: { children: ReactNode }) => {
  const { user, updateUser } = useAuth();
  const [rollingAnimation, setRollingAnimation] = useState(false);
  const [lastRolledItem, setLastRolledItem] = useState<GameItem | null>(null);
  const [communityRolls, setCommunityRolls] = useState(0);
  const [settings, setSettings] = useState<GameSettings>(defaultSettings);
  const [leaderboard, setLeaderboard] = useState<LeaderboardEntry[]>([]);
  const [dailyResetTime, setDailyResetTime] = useState(new Date());
  const [coins, setCoins] = useState(0);
  const [equippedCharacters, setEquippedCharacters] = useState<string[]>([]);
  const [listedItems, setListedItems] = useState<Array<{itemId: string, sellerId: string, price: number}>>([]);
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

    // Load user coins
    if (user) {
      setCoins(user.coins || 0);
    }

    // Load equipped characters
    const savedEquippedCharacters = JSON.parse(localStorage.getItem('reflectionEquippedCharacters') || '[]');
    setEquippedCharacters(savedEquippedCharacters);

    // Load marketplace items
    const savedListedItems = JSON.parse(localStorage.getItem('reflectionListedItems') || '[]');
    setListedItems(savedListedItems);

    // Check for expired global boost
    if (settings.globalBoostActive && settings.globalBoostExpiry < Date.now()) {
      // Reset global boost
      const updatedSettings = { 
        ...settings, 
        globalBoostActive: false,
        globalBoostMessage: ''
      };
      setSettings(updatedSettings);
      saveGameSettings(updatedSettings);
    }

    // Set next daily reset time
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    tomorrow.setHours(0, 0, 0, 0);
    setDailyResetTime(tomorrow);

    // Load leaderboard
    updateLeaderboard();
  }, [user]);

  // Roll for a random item with rarity-based probabilities
  const rollItem = (isLucky: boolean = false): GameItem | null => {
    if (!user) return null;
    
    // For lucky spins (cost 200 coins)
    if (isLucky) {
      // Check if user has enough coins
      if (coins < 200) {
        return null;
      }
      
      // Spend 200 coins
      spendCoins(200);
    } else {
      // Normal roll gives 2 coins
      addCoins(2);
    }

    // Start rolling animation
    setRollingAnimation(true);

    // Schedule end of animation based on roll speed setting
    setTimeout(() => {
      // Generate random roll based on rarity probabilities, applying luck multiplier
      const roll = Math.random() * 100;
      let selectedItem: GameItem | null = null;
      
      // Apply luck multiplier and featured item bonus
      const luckFactor = settings.luckMultiplier;
      
      // If this is a lucky spin, guarantee at least Epic rarity
      if (isLucky) {
        // Combined chance for Legendary (50%) and World-Class (5%)
        if (roll < 5) {
          // Give World-Class (5% chance in lucky spin)
          const worldClassItems = gameItems.filter(item => item.rarity === Rarity.WorldClass);
          selectedItem = worldClassItems[Math.floor(Math.random() * worldClassItems.length)];
        }
        else if (roll < 55) { // 50% chance for Legendary in lucky spin
          // Filter legendary items and pick one
          const legendaryItems = gameItems.filter(item => item.rarity === Rarity.Legendary);
          selectedItem = legendaryItems[Math.floor(Math.random() * legendaryItems.length)];
        }
        else { // 45% chance for Epic in lucky spin
          // Filter epic items and pick one
          const epicItems = gameItems.filter(item => item.rarity === Rarity.Epic);
          selectedItem = epicItems[Math.floor(Math.random() * epicItems.length)];
        }
      }
      // Normal roll with regular probabilities
      else {
        // World-Class: 0.5% base * luck
        // Legendary: 2% base * luck
        // Epic: 5% base * luck
        // Rare: 13% base * luck
        // Uncommon: 30% base * luck
        // Common: Remainder
        
        if (roll < 0.5 * luckFactor) {
          // Filter World-Class items and pick one
          const worldClassItems = gameItems.filter(item => item.rarity === Rarity.WorldClass);
          selectedItem = worldClassItems[Math.floor(Math.random() * worldClassItems.length)];
        }
        else if (roll < (0.5 + 2) * luckFactor) {
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
        else if (roll < (0.5 + 2 + 5) * luckFactor) {
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
        else if (roll < (0.5 + 2 + 5 + 13) * luckFactor) {
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
        else if (roll < (0.5 + 2 + 5 + 13 + 30) * luckFactor) {
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

  // Add coins to user wallet
  const addCoins = (amount: number) => {
    if (!user) return;
    const newCoins = coins + amount;
    setCoins(newCoins);
    
    // Update user data
    updateUser({
      coins: newCoins
    });
  };
  
  // Spend coins from user wallet
  const spendCoins = (amount: number): boolean => {
    if (!user || coins < amount) return false;
    
    const newCoins = coins - amount;
    setCoins(newCoins);
    
    // Update user data
    updateUser({
      coins: newCoins
    });
    
    return true;
  };
  
  // Equipment system
  const equipCharacter = (itemId: string) => {
    if (!user) return;
    
    // Add to equipped characters if not already equipped
    if (!equippedCharacters.includes(itemId)) {
      const newEquipped = [...equippedCharacters, itemId];
      setEquippedCharacters(newEquipped);
      localStorage.setItem('reflectionEquippedCharacters', JSON.stringify(newEquipped));
    }
  };
  
  const unequipCharacter = (itemId: string) => {
    if (!user) return;
    
    // Remove from equipped characters
    const newEquipped = equippedCharacters.filter(id => id !== itemId);
    setEquippedCharacters(newEquipped);
    localStorage.setItem('reflectionEquippedCharacters', JSON.stringify(newEquipped));
  };
  
  // Marketplace system
  const listItemForSale = (itemId: string, price: number) => {
    if (!user) return;
    
    // Create a new listing
    const newListing = {
      itemId,
      sellerId: user.username,
      price
    };
    
    // Add to listed items
    const newListedItems = [...listedItems, newListing];
    setListedItems(newListedItems);
    localStorage.setItem('reflectionListedItems', JSON.stringify(newListedItems));
  };
  
  const unlistItemFromSale = (itemId: string) => {
    if (!user) return;
    
    // Remove from listed items if user is the seller
    const newListedItems = listedItems.filter(
      item => !(item.itemId === itemId && item.sellerId === user.username)
    );
    
    setListedItems(newListedItems);
    localStorage.setItem('reflectionListedItems', JSON.stringify(newListedItems));
  };
  
  const buyItem = (itemId: string, sellerId: string, price: number): boolean => {
    if (!user || user.username === sellerId) return false;
    
    // Check if user has enough coins
    if (coins < price) return false;
    
    // Check if the item is still available
    const listing = listedItems.find(
      item => item.itemId === itemId && item.sellerId === sellerId
    );
    
    if (!listing) return false;
    
    // Get seller user
    const users = JSON.parse(localStorage.getItem('reflectionUsers') || '[]');
    const seller = users.find((u: any) => u.username === sellerId);
    
    if (!seller) return false;
    
    // Add item to buyer's inventory
    const newInventory = [...(user.inventory || [])];
    if (!newInventory.includes(itemId)) {
      newInventory.push(itemId);
    }
    
    // Remove item from seller's inventory
    const sellerInventory = [...(seller.inventory || [])];
    const sellerNewInventory = sellerInventory.filter(id => id !== itemId);
    
    // Update buyer
    updateUser({
      coins: coins - price,
      inventory: newInventory
    });
    
    // Update seller (add coins)
    seller.coins = (seller.coins || 0) + price;
    seller.inventory = sellerNewInventory;
    
    // Update users in localStorage
    const updatedUsers = users.map((u: any) => {
      if (u.username === sellerId) {
        return seller;
      }
      return u;
    });
    
    localStorage.setItem('reflectionUsers', JSON.stringify(updatedUsers));
    
    // Remove listing
    const newListedItems = listedItems.filter(
      item => !(item.itemId === itemId && item.sellerId === sellerId)
    );
    
    setListedItems(newListedItems);
    localStorage.setItem('reflectionListedItems', JSON.stringify(newListedItems));
    
    // Update local coin state
    setCoins(coins - price);
    
    return true;
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
    
    // If global boost settings changed, notify users
    if (newSettings.globalBoostActive !== undefined && 
        newSettings.globalBoostActive !== settings.globalBoostActive) {
      // Start a new global boost with expiry time (24 hours from now)
      if (newSettings.globalBoostActive) {
        const expiryTime = Date.now() + 24 * 60 * 60 * 1000; // 24 hours
        const message = newSettings.globalBoostMessage || 
          `Everyone has received a temporary boost! Luck: ${updatedSettings.luckMultiplier}x, Speed: ${updatedSettings.rollSpeed}x`;
        
        // Save these settings
        const boostSettings = {
          ...updatedSettings,
          globalBoostExpiry: expiryTime,
          globalBoostMessage: message
        };
        setSettings(boostSettings);
        saveGameSettings(boostSettings);
      }
    }
  };

  return (
    <GameContext.Provider value={{
      rollItem,
      rollingAnimation,
      lastRolledItem,
      allItems: gameItems,
      leaderboard,
      communityRolls,
      updateLeaderboard,
      settings,
      updateSettings,
      featuredItem,
      dailyResetTime,
      
      // Coin system
      coins,
      addCoins,
      spendCoins,
      
      // Character equipping
      equipCharacter,
      unequipCharacter,
      equippedCharacters,
      
      // Marketplace
      listItemForSale,
      unlistItemFromSale,
      buyItem,
      listedItems
    }}>
      {children}
    </GameContext.Provider>
  );
};
