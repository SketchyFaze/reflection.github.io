// Game data types and constants

export enum Rarity {
  Common = 'Common',
  Uncommon = 'Uncommon',
  Rare = 'Rare',
  Epic = 'Epic',
  Legendary = 'Legendary'
}

export interface GameItem {
  id: string;
  name: string;
  icon: string;
  rarity: Rarity;
  rarityLevel: number; // 1 = Common, 5 = Legendary
  indexInRarity: number; // Item X/Y format
  totalInRarity: number;
  description?: string;
}

// Map rarity levels to CSS classes and indices
export const rarityConfig = {
  [Rarity.Common]: {
    className: 'rarity-common', 
    gradient: 'from-gray-300 to-gray-500',
    color: 'text-gray-300',
    bgColor: 'bg-gray-300/20',
    textColor: 'text-gray-300',
    level: 1,
    count: 10
  },
  [Rarity.Uncommon]: {
    className: 'rarity-uncommon', 
    gradient: 'from-green-400 to-green-600',
    color: 'text-green-400',
    bgColor: 'bg-green-400/20',
    textColor: 'text-green-400',
    level: 2,
    count: 8
  },
  [Rarity.Rare]: {
    className: 'rarity-rare', 
    gradient: 'from-blue-400 to-blue-600',
    color: 'text-blue-400',
    bgColor: 'bg-blue-400/20',
    textColor: 'text-blue-400',
    level: 3,
    count: 6
  },
  [Rarity.Epic]: {
    className: 'rarity-epic', 
    gradient: 'from-purple-400 to-purple-600',
    color: 'text-purple-400',
    bgColor: 'bg-purple-400/20',
    textColor: 'text-purple-400',
    level: 4,
    count: 4
  },
  [Rarity.Legendary]: {
    className: 'rarity-legendary', 
    gradient: 'from-yellow-400 to-amber-500',
    color: 'text-amber-400',
    bgColor: 'bg-amber-400/20',
    textColor: 'text-amber-400',
    level: 5,
    count: 2
  }
};

// Generate the complete list of 30 game items
export const gameItems: GameItem[] = [
  // Common Items (10)
  {
    id: 'wooden-sword',
    name: 'Wooden Sword',
    icon: 'fa-sword',
    rarity: Rarity.Common,
    rarityLevel: rarityConfig[Rarity.Common].level,
    indexInRarity: 1,
    totalInRarity: rarityConfig[Rarity.Common].count,
    description: 'A basic training sword made of wood.'
  },
  {
    id: 'leather-cap',
    name: 'Leather Cap',
    icon: 'fa-hat-wizard',
    rarity: Rarity.Common,
    rarityLevel: rarityConfig[Rarity.Common].level,
    indexInRarity: 2,
    totalInRarity: rarityConfig[Rarity.Common].count,
    description: 'A simple cap made of leather.'
  },
  {
    id: 'wooden-shield',
    name: 'Wooden Shield',
    icon: 'fa-shield-alt',
    rarity: Rarity.Common,
    rarityLevel: rarityConfig[Rarity.Common].level,
    indexInRarity: 3,
    totalInRarity: rarityConfig[Rarity.Common].count,
    description: 'A round shield made from oak wood.'
  },
  {
    id: 'cloth-tunic',
    name: 'Cloth Tunic',
    icon: 'fa-tshirt',
    rarity: Rarity.Common,
    rarityLevel: rarityConfig[Rarity.Common].level,
    indexInRarity: 4,
    totalInRarity: rarityConfig[Rarity.Common].count,
    description: 'A basic tunic made of cloth.'
  },
  {
    id: 'leather-boots',
    name: 'Leather Boots',
    icon: 'fa-boot',
    rarity: Rarity.Common,
    rarityLevel: rarityConfig[Rarity.Common].level,
    indexInRarity: 5,
    totalInRarity: rarityConfig[Rarity.Common].count,
    description: 'Simple boots made of leather.'
  },
  {
    id: 'healing-herb',
    name: 'Healing Herb',
    icon: 'fa-seedling',
    rarity: Rarity.Common,
    rarityLevel: rarityConfig[Rarity.Common].level,
    indexInRarity: 6,
    totalInRarity: rarityConfig[Rarity.Common].count,
    description: 'A common herb with minor healing properties.'
  },
  {
    id: 'wooden-bow',
    name: 'Wooden Bow',
    icon: 'fa-bow-arrow',
    rarity: Rarity.Common,
    rarityLevel: rarityConfig[Rarity.Common].level,
    indexInRarity: 7,
    totalInRarity: rarityConfig[Rarity.Common].count,
    description: 'A simple bow carved from flexible wood.'
  },
  {
    id: 'iron-dagger',
    name: 'Iron Dagger',
    icon: 'fa-knife-kitchen',
    rarity: Rarity.Common,
    rarityLevel: rarityConfig[Rarity.Common].level,
    indexInRarity: 8,
    totalInRarity: rarityConfig[Rarity.Common].count,
    description: 'A small dagger made of iron.'
  },
  {
    id: 'copper-coin',
    name: 'Copper Coin',
    icon: 'fa-coins',
    rarity: Rarity.Common,
    rarityLevel: rarityConfig[Rarity.Common].level,
    indexInRarity: 9,
    totalInRarity: rarityConfig[Rarity.Common].count,
    description: 'A basic unit of currency.'
  },
  {
    id: 'water-flask',
    name: 'Water Flask',
    icon: 'fa-flask',
    rarity: Rarity.Common,
    rarityLevel: rarityConfig[Rarity.Common].level,
    indexInRarity: 10,
    totalInRarity: rarityConfig[Rarity.Common].count,
    description: 'A leather flask filled with fresh water.'
  },
  
  // Uncommon Items (8)
  {
    id: 'bronze-dagger',
    name: 'Bronze Dagger',
    icon: 'fa-khanda',
    rarity: Rarity.Uncommon,
    rarityLevel: rarityConfig[Rarity.Uncommon].level,
    indexInRarity: 1,
    totalInRarity: rarityConfig[Rarity.Uncommon].count,
    description: 'A well-crafted dagger made of bronze.'
  },
  {
    id: 'iron-sword',
    name: 'Iron Sword',
    icon: 'fa-sword',
    rarity: Rarity.Uncommon,
    rarityLevel: rarityConfig[Rarity.Uncommon].level,
    indexInRarity: 2,
    totalInRarity: rarityConfig[Rarity.Uncommon].count,
    description: 'A standard sword made of iron.'
  },
  {
    id: 'chain-mail',
    name: 'Chain Mail',
    icon: 'fa-link',
    rarity: Rarity.Uncommon,
    rarityLevel: rarityConfig[Rarity.Uncommon].level,
    indexInRarity: 3,
    totalInRarity: rarityConfig[Rarity.Uncommon].count,
    description: 'Armor made of interlocking metal rings.'
  },
  {
    id: 'silver-ring',
    name: 'Silver Ring',
    icon: 'fa-ring',
    rarity: Rarity.Uncommon,
    rarityLevel: rarityConfig[Rarity.Uncommon].level,
    indexInRarity: 4,
    totalInRarity: rarityConfig[Rarity.Uncommon].count,
    description: 'A simple ring made of silver.'
  },
  {
    id: 'healing-potion',
    name: 'Healing Potion',
    icon: 'fa-flask',
    rarity: Rarity.Uncommon,
    rarityLevel: rarityConfig[Rarity.Uncommon].level,
    indexInRarity: 5,
    totalInRarity: rarityConfig[Rarity.Uncommon].count,
    description: 'A potion that restores health.'
  },
  {
    id: 'iron-helmet',
    name: 'Iron Helmet',
    icon: 'fa-helmet-safety',
    rarity: Rarity.Uncommon,
    rarityLevel: rarityConfig[Rarity.Uncommon].level,
    indexInRarity: 6,
    totalInRarity: rarityConfig[Rarity.Uncommon].count,
    description: 'A protective helmet made of iron.'
  },
  {
    id: 'iron-boots',
    name: 'Iron Boots',
    icon: 'fa-boot',
    rarity: Rarity.Uncommon,
    rarityLevel: rarityConfig[Rarity.Uncommon].level,
    indexInRarity: 7,
    totalInRarity: rarityConfig[Rarity.Uncommon].count,
    description: 'Protective boots made of iron.'
  },
  {
    id: 'fire-scroll',
    name: 'Fire Scroll',
    icon: 'fa-scroll',
    rarity: Rarity.Uncommon,
    rarityLevel: rarityConfig[Rarity.Uncommon].level,
    indexInRarity: 8,
    totalInRarity: rarityConfig[Rarity.Uncommon].count,
    description: 'A scroll containing a basic fire spell.'
  },
  
  // Rare Items (6)
  {
    id: 'steel-sword',
    name: 'Steel Sword',
    icon: 'fa-sword',
    rarity: Rarity.Rare,
    rarityLevel: rarityConfig[Rarity.Rare].level,
    indexInRarity: 1,
    totalInRarity: rarityConfig[Rarity.Rare].count,
    description: 'A high-quality sword made of steel.'
  },
  {
    id: 'guardian-shield',
    name: 'Guardian Shield',
    icon: 'fa-shield-alt',
    rarity: Rarity.Rare,
    rarityLevel: rarityConfig[Rarity.Rare].level,
    indexInRarity: 2,
    totalInRarity: rarityConfig[Rarity.Rare].count,
    description: 'A sturdy shield embossed with the guardian emblem.'
  },
  {
    id: 'wizard-hat',
    name: 'Wizard Hat',
    icon: 'fa-hat-wizard',
    rarity: Rarity.Rare,
    rarityLevel: rarityConfig[Rarity.Rare].level,
    indexInRarity: 3,
    totalInRarity: rarityConfig[Rarity.Rare].count,
    description: 'A conical hat imbued with magical properties.'
  },
  {
    id: 'gold-amulet',
    name: 'Gold Amulet',
    icon: 'fa-gem',
    rarity: Rarity.Rare,
    rarityLevel: rarityConfig[Rarity.Rare].level,
    indexInRarity: 4,
    totalInRarity: rarityConfig[Rarity.Rare].count,
    description: 'An amulet made of gold with protective enchantments.'
  },
  {
    id: 'ancient-scroll',
    name: 'Ancient Scroll',
    icon: 'fa-scroll',
    rarity: Rarity.Rare,
    rarityLevel: rarityConfig[Rarity.Rare].level,
    indexInRarity: 5,
    totalInRarity: rarityConfig[Rarity.Rare].count,
    description: 'A scroll containing ancient and powerful knowledge.'
  },
  {
    id: 'mystic-potion',
    name: 'Mystic Potion',
    icon: 'fa-vial',
    rarity: Rarity.Rare,
    rarityLevel: rarityConfig[Rarity.Rare].level,
    indexInRarity: 6,
    totalInRarity: rarityConfig[Rarity.Rare].count,
    description: 'A rare potion with mysterious effects.'
  },
  
  // Epic Items (4)
  {
    id: 'enchanted-sword',
    name: 'Enchanted Sword',
    icon: 'fa-khanda',
    rarity: Rarity.Epic,
    rarityLevel: rarityConfig[Rarity.Epic].level,
    indexInRarity: 1,
    totalInRarity: rarityConfig[Rarity.Epic].count,
    description: 'A sword imbued with powerful magical enchantments.'
  },
  {
    id: 'magic-orb',
    name: 'Magic Orb',
    icon: 'fa-gem',
    rarity: Rarity.Epic,
    rarityLevel: rarityConfig[Rarity.Epic].level,
    indexInRarity: 2,
    totalInRarity: rarityConfig[Rarity.Epic].count,
    description: 'A crystal orb that pulses with magical energy.'
  },
  {
    id: 'phoenix-feather',
    name: 'Phoenix Feather',
    icon: 'fa-feather',
    rarity: Rarity.Epic,
    rarityLevel: rarityConfig[Rarity.Epic].level,
    indexInRarity: 3,
    totalInRarity: rarityConfig[Rarity.Epic].count,
    description: 'A feather from the mythical phoenix bird.'
  },
  {
    id: 'dragonhide-armor',
    name: 'Dragonhide Armor',
    icon: 'fa-vest',
    rarity: Rarity.Epic,
    rarityLevel: rarityConfig[Rarity.Epic].level,
    indexInRarity: 4,
    totalInRarity: rarityConfig[Rarity.Epic].count,
    description: 'Armor crafted from the scales of a dragon.'
  },
  
  // Legendary Items (2)
  {
    id: 'dragon-scale',
    name: 'Dragon Scale',
    icon: 'fa-dragon',
    rarity: Rarity.Legendary,
    rarityLevel: rarityConfig[Rarity.Legendary].level,
    indexInRarity: 1,
    totalInRarity: rarityConfig[Rarity.Legendary].count,
    description: 'A scale from an ancient dragon, pulsing with power.'
  },
  {
    id: 'lucky-star',
    name: 'Lucky Star',
    icon: 'fa-star',
    rarity: Rarity.Legendary,
    rarityLevel: rarityConfig[Rarity.Legendary].level,
    indexInRarity: 2,
    totalInRarity: rarityConfig[Rarity.Legendary].count,
    description: 'A mystical star that grants immense luck to its owner.'
  }
];

// Get total count of items per rarity
export const getCountByRarity = (rarity: Rarity): number => {
  return gameItems.filter(item => item.rarity === rarity).length;
};

// Get collection progress
export const getCollectionProgress = (inventory: string[]) => {
  const progress = Object.values(Rarity).map(rarity => {
    const total = gameItems.filter(item => item.rarity === rarity).length;
    const collected = gameItems.filter(item => item.rarity === rarity && inventory.includes(item.id)).length;
    return {
      rarity,
      collected,
      total,
      percent: total > 0 ? (collected / total) * 100 : 0
    };
  });
  
  // Add total progress
  const totalCollected = inventory.length;
  const totalItems = gameItems.length;
  progress.push({
    rarity: 'Total' as Rarity,
    collected: totalCollected,
    total: totalItems,
    percent: totalItems > 0 ? (totalCollected / totalItems) * 100 : 0
  });
  
  return progress;
};
