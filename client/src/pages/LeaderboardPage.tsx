import Sidebar from '@/components/layout/Sidebar';
import Leaderboard from '@/components/game/Leaderboard';

export default function LeaderboardPage() {
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
          <h2 className="font-montserrat font-bold text-2xl mb-2">Leaderboard</h2>
          <p>See who's at the top of the Online Go community. Will you make it to the top?</p>
        </div>
        
        {/* Full Leaderboard */}
        <Leaderboard />
        
        {/* Leaderboard Info */}
        <div className="bg-darkbg rounded-lg p-6 border border-mediumbg shadow-lg">
          <h3 className="font-montserrat font-bold text-xl mb-4">How to Climb the Ranks</h3>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-mediumbg rounded-lg p-4">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center">
                  <i className="fas fa-dice-d20 text-primary text-xl"></i>
                </div>
                <h4 className="font-montserrat font-medium">Roll Often</h4>
              </div>
              <p className="text-sm text-gray-300">
                The more you roll, the higher your rank on the leaderboard. Use your daily free rolls and keep collecting!
              </p>
            </div>
            
            <div className="bg-mediumbg rounded-lg p-4">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-full bg-amber-500/20 flex items-center justify-center">
                  <i className="fas fa-star text-amber-500 text-xl"></i>
                </div>
                <h4 className="font-montserrat font-medium">Find Rare Items</h4>
              </div>
              <p className="text-sm text-gray-300">
                Legendary and Epic items boost your ranking. The rarer your collection, the higher you'll climb.
              </p>
            </div>
            
            <div className="bg-mediumbg rounded-lg p-4">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-full bg-green-500/20 flex items-center justify-center">
                  <i className="fas fa-trophy text-green-500 text-xl"></i>
                </div>
                <h4 className="font-montserrat font-medium">Complete Sets</h4>
              </div>
              <p className="text-sm text-gray-300">
                Collecting complete sets of items will earn you bonus points and special recognition on the leaderboard.
              </p>
            </div>
          </div>
        </div>
      </div>
      
      {/* Right sidebar - only on large screens */}
      <div className="hidden lg:block w-80 space-y-6">
        <div className="bg-darkbg rounded-lg p-6 border border-mediumbg shadow-lg">
          <h3 className="font-montserrat font-bold text-xl mb-4">Leaderboard Categories</h3>
          <div className="space-y-4">
            <div className="bg-mediumbg rounded-lg p-3">
              <h4 className="font-medium mb-1 flex items-center gap-2">
                <i className="fas fa-dice text-primary"></i> Most Rolls
              </h4>
              <p className="text-sm text-gray-300">
                Players ranked by total number of rolls performed.
              </p>
            </div>
            
            <div className="bg-mediumbg rounded-lg p-3">
              <h4 className="font-medium mb-1 flex items-center gap-2">
                <i className="fas fa-gem text-purple-400"></i> Rarest Items
              </h4>
              <p className="text-sm text-gray-300">
                Players ranked by the rarity of items in their collection.
              </p>
            </div>
            
            <div className="bg-mediumbg rounded-lg p-3">
              <h4 className="font-medium mb-1 flex items-center gap-2">
                <i className="fas fa-percentage text-green-400"></i> Collection Completion
              </h4>
              <p className="text-sm text-gray-300">
                Players ranked by the percentage of the total collection they've acquired.
              </p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
