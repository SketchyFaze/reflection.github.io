import { rarityConfig, type GameItem } from '@/utils/gameData';

interface ItemCardProps {
  item: GameItem;
  size?: 'small' | 'normal' | 'large';
  highlight?: boolean;
}

export default function ItemCard({ item, size = 'normal', highlight = false }: ItemCardProps) {
  const { name, icon, rarity, indexInRarity, totalInRarity } = item;
  const rarityInfo = rarityConfig[rarity];
  
  // Get appropriate sizes based on size prop
  const getIconSize = () => {
    switch (size) {
      case 'small': return 'w-10 h-10 text-2xl';
      case 'large': return 'w-20 h-20 text-6xl';
      default: return 'w-12 h-12 text-3xl';
    }
  };
  
  const getCardClasses = () => {
    const borderClasses = highlight 
      ? `border-2 border-${rarityInfo.color.replace('text-', '')}`
      : `border-l-4 ${rarityInfo.className}`;
    
    return `item-card bg-mediumbg rounded-lg p-4 ${borderClasses} transition-all duration-300 hover:shadow-lg`;
  };
  
  // Convert Font Awesome class to appropriate icon
  const getIconClass = () => {
    // Handle cases where the icon class doesn't start with 'fa-'
    if (icon.startsWith('fa-')) {
      return `fas ${icon}`;
    }
    return `fas fa-${icon}`;
  };
  
  return (
    <div className={getCardClasses()}>
      <div className="flex justify-center mb-2">
        <div className={`${getIconSize()} flex items-center justify-center`}>
          <i className={`${getIconClass()} ${rarityInfo.color}`}></i>
        </div>
      </div>
      <div className="text-center">
        <h3 className={`font-montserrat font-medium ${size === 'large' ? 'text-base' : 'text-sm'} ${highlight ? rarityInfo.color : 'text-white'}`}>
          {name}
        </h3>
        <div className="text-xs text-gray-400">
          Item {indexInRarity}/{totalInRarity}
        </div>
        {(highlight || size === 'large') && (
          <div className={`mt-2 inline-block px-2 py-1 ${rarityInfo.bgColor} ${rarityInfo.color} text-xs rounded-full`}>
            {rarity}
          </div>
        )}
      </div>
    </div>
  );
}
