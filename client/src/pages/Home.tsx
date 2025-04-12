import { useEffect, useState } from 'react';
import { useGame } from '@/contexts/GameContext';
import Sidebar from '@/components/layout/Sidebar';
import RollArea from '@/components/game/RollArea';
import Inventory from '@/components/game/Inventory';
import Leaderboard from '@/components/game/Leaderboard';
import { formatTimeAgo, loadRecentRolls, RecentRoll } from '@/utils/localStorage';
import { gameItems } from '@/utils/gameData';
import AdminPanel from '@/components/admin/AdminPanel';

export default function Home() {
  const { communityRolls, featuredItem, dailyResetTime } = useGame();
  const [remainingTime, setRemainingTime] = useState('00:00:00');
  const [recentRolls, setRecentRolls] = useState<RecentRoll[]>([]);

  // Update the daily reset timer
  useEffect(() => {
    const updateTimer = () => {
      const now = new Date();
      const diff = dailyResetTime.getTime() - now.getTime();
      
      if (diff <= 0) {
        setRemainingTime('00:00:00');
        return;
      }
      
      const hours = Math.floor(diff / (1000 * 60 * 60));
      const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((diff % (1000 * 60)) / 1000);
      
      setRemainingTime(
        `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`
      );
    };
    
    updateTimer();
    const interval = setInterval(updateTimer, 1000);
    
    return () => clearInterval(interval);
  }, [dailyResetTime]);

  // Load recent community rolls
  useEffect(() => {
    const rolls = loadRecentRolls();
    setRecentRolls(rolls);
  }, []);

  return (
    <>
      <main className="container mx-auto px-4 py-6 lg:flex gap-6">
        {/* Left sidebar - Navigation (desktop only) */}
        <div className="hidden lg:block">
          <Sidebar />
        </div>
        
        {/* Main content area */}
        <div className="flex-grow space-y-6">
          {/* Welcome banner */}
          <div className="bg-gradient-to-r from-primary to-secondary rounded-lg p-6 shadow-lg text-white">
            <h2 className="font-montserrat font-bold text-2xl mb-2">Welcome to Online Go!</h2>
            <p className="mb-4">Roll the dice, collect rare items, and climb the leaderboard. Can you complete the full collection?</p>
            <div className="flex items-center gap-2">
              <i className="fas fa-dice-d20 text-xl"></i>
              <span>Total Community Rolls: <span className="font-bold">{communityRolls.toLocaleString()}</span></span>
            </div>
          </div>
          
          {/* Roll section */}
          <RollArea />
          
          {/* Latest Collection */}
          <Inventory limit={6} />
          
          {/* Leaderboard Section */}
          <Leaderboard />
        </div>
        
        {/* Right sidebar - Item showcase & Information */}
        <div className="hidden lg:block w-80 space-y-6">
          {/* Daily Special */}
          <div className="bg-darkbg rounded-lg border border-mediumbg shadow-lg overflow-hidden">
            <div className="bg-gradient-to-r from-secondary/80 to-primary/80 py-3 px-4">
              <h3 className="font-montserrat font-bold text-white">Daily Special</h3>
            </div>
            <div className="p-4">
              <div className="bg-mediumbg rounded-lg p-4 mb-4 border-2 border-amber-400 shiny-border">
                <div className="flex justify-center mb-3">
                  <div className="w-16 h-16 flex items-center justify-center">
                    <i className={`fas ${featuredItem.icon} text-5xl text-amber-400`}></i>
                  </div>
                </div>
                <div className="text-center">
                  <h3 className="font-montserrat font-bold text-amber-400">{featuredItem.name}</h3>
                  <div className="text-sm text-gray-400">
                    Item {featuredItem.indexInRarity}/{featuredItem.totalInRarity}
                  </div>
                  <div className="mt-2 inline-block px-2 py-1 bg-amber-400/20 text-amber-400 text-xs rounded-full">
                    {featuredItem.rarity}
                  </div>
                </div>
              </div>
              <div className="text-sm text-center">
                <p className="mb-2 text-gray-300">Today's featured item has 2x drop chance!</p>
                <div className="flex justify-center">
                  <div className="bg-mediumbg rounded-full px-3 py-1 text-xs">
                    <span className="text-amber-400 font-medium">Resets in: </span>
                    <span id="daily-timer">{remainingTime}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Recent Rolls */}
          <div className="bg-darkbg rounded-lg border border-mediumbg shadow-lg overflow-hidden">
            <div className="bg-mediumbg py-3 px-4">
              <h3 className="font-montserrat font-bold text-white">Recent Community Rolls</h3>
            </div>
            <div className="p-4">
              {recentRolls.length === 0 ? (
                <div className="text-center py-4 text-gray-400">
                  No recent rolls yet. Be the first to roll!
                </div>
              ) : (
                <ul className="space-y-3">
                  {recentRolls.map((roll, idx) => {
                    const item = gameItems.find(item => item.name === roll.itemName);
                    const initial = roll.username.charAt(0).toUpperCase();
                    
                    return (
                      <li key={idx} className="flex items-center gap-3 py-2 border-b border-mediumbg/50 last:border-0">
                        <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center">
                          <span className="font-bold text-primary">{initial}</span>
                        </div>
                        <div className="flex-grow">
                          <div className="text-sm font-medium">{roll.username}</div>
                          <div className="text-xs text-gray-400">{formatTimeAgo(roll.timestamp)}</div>
                        </div>
                        <div className={`bg-${item?.rarity === 'Legendary' ? 'amber' : 'blue'}-500/10 text-${item?.rarity === 'Legendary' ? 'amber' : 'blue'}-500 px-2 py-1 rounded text-xs`}>
                          {roll.itemName}
                        </div>
                      </li>
                    );
                  })}
                </ul>
              )}
            </div>
          </div>
        </div>
      </main>
      
      {/* Admin Panel (hidden by default) */}
      <AdminPanel />
    </>
  );
}
