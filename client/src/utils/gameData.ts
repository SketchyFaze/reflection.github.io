// Game data types and constants for Blue Lock summer theme

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

// Map rarity levels to CSS classes and indices - summer theme colors
export const rarityConfig = {
  [Rarity.Common]: {
    className: 'rarity-common', 
    gradient: 'from-teal-300 to-teal-500',
    color: 'text-teal-300',
    bgColor: 'bg-teal-300/20',
    textColor: 'text-teal-300',
    level: 1,
    count: 10
  },
  [Rarity.Uncommon]: {
    className: 'rarity-uncommon', 
    gradient: 'from-cyan-400 to-cyan-600',
    color: 'text-cyan-400',
    bgColor: 'bg-cyan-400/20',
    textColor: 'text-cyan-400',
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
    gradient: 'from-indigo-400 to-violet-600',
    color: 'text-indigo-400',
    bgColor: 'bg-indigo-400/20',
    textColor: 'text-indigo-400',
    level: 4,
    count: 4
  },
  [Rarity.Legendary]: {
    className: 'rarity-legendary', 
    gradient: 'from-orange-400 to-amber-500',
    color: 'text-amber-400',
    bgColor: 'bg-amber-400/20',
    textColor: 'text-amber-400',
    level: 5,
    count: 2
  }
};

// Blue Lock anime characters with summer theme elements
export const gameItems: GameItem[] = [
  // Common Items (10)
  {
    id: 'yoichi-isagi',
    name: 'Yoichi Isagi (Beach)',
    icon: 'fa-person-swimming',
    rarity: Rarity.Common,
    rarityLevel: rarityConfig[Rarity.Common].level,
    indexInRarity: 1,
    totalInRarity: rarityConfig[Rarity.Common].count,
    description: 'Isagi enjoying his day at the beach, focused on improving his spatial awareness.'
  },
  {
    id: 'meguru-bachira',
    name: 'Meguru Bachira',
    icon: 'fa-person-running',
    rarity: Rarity.Common,
    rarityLevel: rarityConfig[Rarity.Common].level,
    indexInRarity: 2,
    totalInRarity: rarityConfig[Rarity.Common].count,
    description: 'The unpredictable player with his "monster" running along the shoreline.'
  },
  {
    id: 'rensuke-kunigami',
    name: 'Rensuke Kunigami',
    icon: 'fa-futbol',
    rarity: Rarity.Common,
    rarityLevel: rarityConfig[Rarity.Common].level,
    indexInRarity: 3,
    totalInRarity: rarityConfig[Rarity.Common].count,
    description: 'The hero-type striker practicing his powerful left foot shots on the beach.'
  },
  {
    id: 'hyoma-chigiri',
    name: 'Hyoma Chigiri',
    icon: 'fa-bolt',
    rarity: Rarity.Common,
    rarityLevel: rarityConfig[Rarity.Common].level,
    indexInRarity: 4,
    totalInRarity: rarityConfig[Rarity.Common].count,
    description: 'The speedster racing through the beach with his remarkable pace.'
  },
  {
    id: 'wataru-kuon',
    name: 'Wataru Kuon',
    icon: 'fa-user',
    rarity: Rarity.Common,
    rarityLevel: rarityConfig[Rarity.Common].level,
    indexInRarity: 5,
    totalInRarity: rarityConfig[Rarity.Common].count,
    description: 'The manipulative player relaxing under a beach umbrella.'
  },
  {
    id: 'jyubei-aryu',
    name: 'Jyubei Aryu',
    icon: 'fa-crown',
    rarity: Rarity.Common,
    rarityLevel: rarityConfig[Rarity.Common].level,
    indexInRarity: 6,
    totalInRarity: rarityConfig[Rarity.Common].count,
    description: 'The king of high school soccer showing off his skills with a beach ball.'
  },
  {
    id: 'gin-gagamaru',
    name: 'Gin Gagamaru',
    icon: 'fa-hand-fist',
    rarity: Rarity.Common,
    rarityLevel: rarityConfig[Rarity.Common].level,
    indexInRarity: 7,
    totalInRarity: rarityConfig[Rarity.Common].count,
    description: 'The former goalkeeper with animal-like reflexes splashing in the water.'
  },
  {
    id: 'yo-hiori',
    name: 'Yo Hiori',
    icon: 'fa-angles-right',
    rarity: Rarity.Common,
    rarityLevel: rarityConfig[Rarity.Common].level,
    indexInRarity: 8,
    totalInRarity: rarityConfig[Rarity.Common].count,
    description: 'The straightforward player practicing his direct-style play in the sand.'
  },
  {
    id: 'okuhito-iemon',
    name: 'Okuhito Iemon',
    icon: 'fa-hands',
    rarity: Rarity.Common,
    rarityLevel: rarityConfig[Rarity.Common].level,
    indexInRarity: 9,
    totalInRarity: rarityConfig[Rarity.Common].count,
    description: 'The goalkeeper enjoying volleyball on the beach.'
  },
  {
    id: 'asahi-naruhaya',
    name: 'Asahi Naruhaya',
    icon: 'fa-person',
    rarity: Rarity.Common,
    rarityLevel: rarityConfig[Rarity.Common].level,
    indexInRarity: 10,
    totalInRarity: rarityConfig[Rarity.Common].count,
    description: 'The analytical player mapping out soccer strategies in the sand.'
  },
  
  // Uncommon Items (8)
  {
    id: 'seishiro-nagi-casual',
    name: 'Seishiro Nagi (Casual)',
    icon: 'fa-ice-cream',
    rarity: Rarity.Uncommon,
    rarityLevel: rarityConfig[Rarity.Uncommon].level,
    indexInRarity: 1,
    totalInRarity: rarityConfig[Rarity.Uncommon].count,
    description: 'Nagi enjoying ice cream, looking bored despite the summer fun.'
  },
  {
    id: 'reo-mikage',
    name: 'Reo Mikage',
    icon: 'fa-sun',
    rarity: Rarity.Uncommon,
    rarityLevel: rarityConfig[Rarity.Uncommon].level,
    indexInRarity: 2,
    totalInRarity: rarityConfig[Rarity.Uncommon].count,
    description: 'The rich boy adjusting to beach life with designer sunglasses.'
  },
  {
    id: 'zantetsu-tsurugi',
    name: 'Zantetsu Tsurugi',
    icon: 'fa-fire',
    rarity: Rarity.Uncommon,
    rarityLevel: rarityConfig[Rarity.Uncommon].level,
    indexInRarity: 3,
    totalInRarity: rarityConfig[Rarity.Uncommon].count,
    description: 'The passionate striker building a sandcastle with intense focus.'
  },
  {
    id: 'shouei-barou',
    name: 'Shouei Barou',
    icon: 'fa-volleyball',
    rarity: Rarity.Uncommon,
    rarityLevel: rarityConfig[Rarity.Uncommon].level,
    indexInRarity: 4,
    totalInRarity: rarityConfig[Rarity.Uncommon].count,
    description: 'The egocentric striker showing off his beach volleyball skills.'
  },
  {
    id: 'ryusei-shidou',
    name: 'Ryusei Shidou',
    icon: 'fa-face-smile',
    rarity: Rarity.Uncommon,
    rarityLevel: rarityConfig[Rarity.Uncommon].level,
    indexInRarity: 5,
    totalInRarity: rarityConfig[Rarity.Uncommon].count,
    description: 'The cheerful player enjoying a watermelon splitting game.'
  },
  {
    id: 'tabito-karasu',
    name: 'Tabito Karasu',
    icon: 'fa-crow',
    rarity: Rarity.Uncommon,
    rarityLevel: rarityConfig[Rarity.Uncommon].level,
    indexInRarity: 6,
    totalInRarity: rarityConfig[Rarity.Uncommon].count,
    description: 'The analytical player calmly observing others from under a parasol.'
  },
  {
    id: 'nijiro-nanase',
    name: 'Nijiro Nanase',
    icon: 'fa-umbrella-beach',
    rarity: Rarity.Uncommon,
    rarityLevel: rarityConfig[Rarity.Uncommon].level,
    indexInRarity: 7,
    totalInRarity: rarityConfig[Rarity.Uncommon].count,
    description: 'The flexible player practicing yoga on the beach.'
  },
  {
    id: 'oliver-aiku',
    name: 'Oliver Aiku',
    icon: 'fa-shield',
    rarity: Rarity.Uncommon,
    rarityLevel: rarityConfig[Rarity.Uncommon].level,
    indexInRarity: 8,
    totalInRarity: rarityConfig[Rarity.Uncommon].count,
    description: 'The master defender building an impenetrable sand fortress.'
  },
  
  // Rare Items (6)
  {
    id: 'rin-itoshi',
    name: 'Rin Itoshi',
    icon: 'fa-star-half',
    rarity: Rarity.Rare,
    rarityLevel: rarityConfig[Rarity.Rare].level,
    indexInRarity: 1,
    totalInRarity: rarityConfig[Rarity.Rare].count,
    description: 'The perfect striker practicing his precision shots with water balls.'
  },
  {
    id: 'seishiro-nagi-training',
    name: 'Seishiro Nagi (Training)',
    icon: 'fa-person-walking',
    rarity: Rarity.Rare,
    rarityLevel: rarityConfig[Rarity.Rare].level,
    indexInRarity: 2,
    totalInRarity: rarityConfig[Rarity.Rare].count,
    description: 'Nagi reluctantly participating in beach training exercises.'
  },
  {
    id: 'kenyu-yukimiya',
    name: 'Kenyu Yukimiya',
    icon: 'fa-user-ninja',
    rarity: Rarity.Rare,
    rarityLevel: rarityConfig[Rarity.Rare].level,
    indexInRarity: 3,
    totalInRarity: rarityConfig[Rarity.Rare].count,
    description: 'The dribbling specialist creating intricate patterns in the sand with his footwork.'
  },
  {
    id: 'eita-otoya',
    name: 'Eita Otoya',
    icon: 'fa-bullseye',
    rarity: Rarity.Rare,
    rarityLevel: rarityConfig[Rarity.Rare].level,
    indexInRarity: 4,
    totalInRarity: rarityConfig[Rarity.Rare].count,
    description: 'The sniper practicing his aim with a beach ball.'
  },
  {
    id: 'kokichi-togashi',
    name: 'Kokichi Togashi',
    icon: 'fa-chess',
    rarity: Rarity.Rare,
    rarityLevel: rarityConfig[Rarity.Rare].level,
    indexInRarity: 5,
    totalInRarity: rarityConfig[Rarity.Rare].count,
    description: 'The strategist analyzing the tide patterns to improve his game sense.'
  },
  {
    id: 'ikki-niko',
    name: 'Ikki Niko',
    icon: 'fa-compass',
    rarity: Rarity.Rare,
    rarityLevel: rarityConfig[Rarity.Rare].level,
    indexInRarity: 6,
    totalInRarity: rarityConfig[Rarity.Rare].count,
    description: 'The playmaker coordinating a beach soccer match with precise instructions.'
  },
  
  // Epic Items (4)
  {
    id: 'meguru-bachira-unleashed',
    name: 'Meguru Bachira (Unleashed)',
    icon: 'fa-dragon',
    rarity: Rarity.Epic,
    rarityLevel: rarityConfig[Rarity.Epic].level,
    indexInRarity: 1,
    totalInRarity: rarityConfig[Rarity.Epic].count,
    description: 'Bachira with his "monster" fully unleashed, dancing through beach obstacles.'
  },
  {
    id: 'yoichi-isagi-spatial',
    name: 'Yoichi Isagi (Spatial)',
    icon: 'fa-chess-board',
    rarity: Rarity.Epic,
    rarityLevel: rarityConfig[Rarity.Epic].level,
    indexInRarity: 2,
    totalInRarity: rarityConfig[Rarity.Epic].count,
    description: 'Isagi with heightened spatial awareness, visualizing the entire beach as a soccer field.'
  },
  {
    id: 'julian-loki',
    name: 'Julian Loki',
    icon: 'fa-wind',
    rarity: Rarity.Epic,
    rarityLevel: rarityConfig[Rarity.Epic].level,
    indexInRarity: 3,
    totalInRarity: rarityConfig[Rarity.Epic].count,
    description: 'The all-rounder showing his versatile skills in a beach soccer tournament.'
  },
  {
    id: 'seishiro-nagi-focused',
    name: 'Seishiro Nagi (Focused)',
    icon: 'fa-bolt-lightning',
    rarity: Rarity.Epic,
    rarityLevel: rarityConfig[Rarity.Epic].level,
    indexInRarity: 4,
    totalInRarity: rarityConfig[Rarity.Epic].count,
    description: 'Nagi finally showing interest, performing incredible trapping techniques with a beach ball.'
  },
  
  // Legendary Items (2)
  {
    id: 'seishiro-nagi-masterclass',
    name: 'Seishiro Nagi (Masterclass)',
    icon: 'fa-hat-wizard',
    rarity: Rarity.Legendary,
    rarityLevel: rarityConfig[Rarity.Legendary].level,
    indexInRarity: 1,
    totalInRarity: rarityConfig[Rarity.Legendary].count,
    description: 'The ultimate form of Nagi, displaying his genius-level trapping and scoring abilities on the beach.'
  },
  {
    id: 'itoshi-sae',
    name: 'Itoshi Sae',
    icon: 'fa-crown',
    rarity: Rarity.Legendary,
    rarityLevel: rarityConfig[Rarity.Legendary].level,
    indexInRarity: 2,
    totalInRarity: rarityConfig[Rarity.Legendary].count,
    description: 'The world-class playmaker casually demonstrating godlike beach soccer skills.'
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
