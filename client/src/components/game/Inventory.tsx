import { useAuth } from '@/contexts/AuthContext';
import { useGame } from '@/contexts/GameContext';
import ItemCard from './ItemCard';
import { gameItems } from '@/utils/gameData';

interface InventoryProps {
  limit?: number;
  showTitle?: boolean;
  showViewAll?: boolean;
}

export default function Inventory({ limit, showTitle = true, showViewAll = true }: InventoryProps) {
  const { user } = useAuth();
  const { allItems } = useGame();
  
  if (!user) {
    return (
      <div className="bg-darkbg rounded-lg p-6 border border-mediumbg shadow-lg">
        <div className="text-center py-8">
          <h3 className="text-xl font-montserrat font-medium mb-2">Collection Empty</h3>
          <p className="text-gray-400">Login to start collecting items</p>
        </div>
      </div>
    );
  }
  
  // Get owned items
  const ownedItems = allItems.filter(item => user.inventory.includes(item.id));
  
  // Sort by rarity (highest to lowest)
  ownedItems.sort((a, b) => b.rarityLevel - a.rarityLevel);
  
  // Apply limit if provided
  const displayItems = limit ? ownedItems.slice(0, limit) : ownedItems;
  
  // Calculate number of empty slots to show
  const emptySlots = limit && displayItems.length < limit ? limit - displayItems.length : 0;
  
  return (
    <div className="bg-darkbg rounded-lg p-6 border border-mediumbg shadow-lg">
      {showTitle && (
        <div className="flex justify-between items-center mb-4">
          <h2 className="font-montserrat font-bold text-xl text-white">My Collection</h2>
          {showViewAll && displayItems.length > 0 && (
            <a href="/collection" className="text-primary hover:text-primary/80 text-sm font-medium">
              View All
            </a>
          )}
        </div>
      )}
      
      {displayItems.length === 0 ? (
        <div className="text-center py-4">
          <p className="text-gray-400">You haven't collected any items yet</p>
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {/* Render owned items */}
          {displayItems.map(item => (
            <ItemCard key={item.id} item={item} />
          ))}
          
          {/* Render empty slots */}
          {Array.from({ length: emptySlots }).map((_, index) => (
            <div 
              key={`empty-${index}`}
              className="item-card bg-mediumbg/30 rounded-lg p-4 border border-mediumbg border-dashed flex items-center justify-center"
            >
              <span className="text-gray-500 text-sm">Empty Slot</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
