import Sidebar from '@/components/layout/Sidebar';
import Inventory from '@/components/game/Inventory';
import CollectionProgress from '@/components/game/CollectionProgress';
import { useAuth } from '@/contexts/AuthContext';

export default function Collection() {
  const { isAuthenticated } = useAuth();

  return (
    <main className="container mx-auto px-4 py-6 lg:flex gap-6">
      {/* Left sidebar - Navigation (desktop only) */}
      <div className="hidden lg:block">
        <Sidebar />
      </div>
      
      {/* Main content area */}
      <div className="flex-grow space-y-6">
        {/* Header */}
        <div className="bg-gradient-to-r from-primary to-secondary rounded-lg p-6 shadow-lg text-white">
          <h2 className="font-montserrat font-bold text-2xl mb-2">My Collection</h2>
          <p>View all the items you've collected so far and track your progress.</p>
        </div>
        
        {/* Mobile collection progress (shown only on mobile) */}
        <div className="lg:hidden">
          <CollectionProgress />
        </div>
        
        {/* Full collection */}
        <Inventory showViewAll={false} />
        
        {/* Not logged in message */}
        {!isAuthenticated && (
          <div className="bg-darkbg rounded-lg p-6 border border-mediumbg shadow-lg text-center">
            <h3 className="text-xl font-montserrat font-bold mb-2">Log in to view your collection</h3>
            <p className="text-gray-400">
              Create an account or log in to start collecting items and tracking your progress.
            </p>
          </div>
        )}
      </div>
      
      {/* Right sidebar - only on large screens */}
      <div className="hidden lg:block w-80 space-y-6">
        <div className="bg-darkbg rounded-lg p-6 border border-mediumbg shadow-lg">
          <h3 className="font-montserrat font-bold text-xl mb-4">Collection Info</h3>
          <div className="space-y-4">
            <div>
              <h4 className="font-medium mb-2">Rarity Levels</h4>
              <ul className="space-y-2">
                <li className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-amber-400"></div>
                  <span>Legendary - Very rare (2% chance)</span>
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-purple-400"></div>
                  <span>Epic - Rare (5% chance)</span>
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-blue-400"></div>
                  <span>Rare - Uncommon (13% chance)</span>
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-green-400"></div>
                  <span>Uncommon - Common (30% chance)</span>
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-gray-400"></div>
                  <span>Common - Very common (50% chance)</span>
                </li>
              </ul>
            </div>
            <div className="border-t border-mediumbg pt-4">
              <h4 className="font-medium mb-2">Tips</h4>
              <ul className="list-disc pl-5 space-y-1 text-gray-300 text-sm">
                <li>Daily featured items have 2x drop chance</li>
                <li>You get free rolls every day</li>
                <li>Complete sets to unlock special rewards</li>
                <li>Check back often for special events</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
