import { useAuth } from '@/contexts/AuthContext';
import { getCollectionProgress, rarityConfig, Rarity } from '@/utils/gameData';

export default function CollectionProgress() {
  const { user } = useAuth();
  
  if (!user) {
    return (
      <div className="bg-darkbg rounded-lg p-4 border border-mediumbg shadow-lg">
        <h3 className="font-montserrat font-semibold text-lg mb-4 text-white">Collection Progress</h3>
        <div className="text-center py-4 text-gray-400">
          Login to track your collection progress
        </div>
      </div>
    );
  }
  
  const progress = getCollectionProgress(user.inventory || []);
  
  return (
    <div className="bg-darkbg rounded-lg p-4 border border-mediumbg shadow-lg">
      <h3 className="font-montserrat font-semibold text-lg mb-4 text-white">Collection Progress</h3>
      <div className="space-y-4">
        {progress.map((item, index) => {
          // Skip total for now, we'll add it separately
          if (item.rarity === 'Total') return null;
          
          const rarityInfo = rarityConfig[item.rarity as Rarity];
          
          return (
            <div key={item.rarity}>
              <div className="flex justify-between text-sm mb-1">
                <span>{item.rarity} Items</span>
                <span className="text-gray-400">{item.collected}/{item.total}</span>
              </div>
              <div className="collection-progress bg-gray-700 h-2 rounded-full overflow-hidden">
                <div 
                  className={`absolute top-0 left-0 h-full ${rarityInfo.className}`}
                  style={{ width: `${item.percent}%` }}
                ></div>
              </div>
            </div>
          );
        })}
        
        {/* Total collection progress */}
        <div className="pt-2 border-t border-mediumbg">
          <div className="flex justify-between text-sm font-medium mb-1">
            <span>Total Collection</span>
            <span className="text-amber-400">
              {progress.find(p => p.rarity === 'Total')?.collected || 0}/
              {progress.find(p => p.rarity === 'Total')?.total || 0}
            </span>
          </div>
          <div className="collection-progress relative bg-gray-700 h-2 rounded-full overflow-hidden">
            <div 
              className="absolute top-0 left-0 h-full bg-amber-400"
              style={{ width: `${progress.find(p => p.rarity === 'Total')?.percent || 0}%` }}
            ></div>
          </div>
        </div>
      </div>
    </div>
  );
}
