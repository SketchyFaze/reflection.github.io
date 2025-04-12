import { useState } from 'react';
import { useGame } from '@/contexts/GameContext';
import { Button } from '@/components/ui/button';

type LeaderboardType = 'rolls' | 'rareItems' | 'completion';

export default function Leaderboard() {
  const { leaderboard } = useGame();
  const [activeTab, setActiveTab] = useState<LeaderboardType>('rolls');
  
  // Sort leaderboard based on active tab
  const sortedLeaderboard = [...leaderboard];
  
  if (activeTab === 'rolls') {
    sortedLeaderboard.sort((a, b) => b.rollCount - a.rollCount);
  }
  // For other tab types, we would need more data to implement proper sorting
  
  return (
    <div className="bg-darkbg rounded-lg p-6 border border-mediumbg shadow-lg">
      <div className="flex justify-between items-center mb-4 flex-wrap gap-2">
        <h2 className="font-montserrat font-bold text-xl text-white">Leaderboard</h2>
        <div className="flex gap-2">
          <Button
            onClick={() => setActiveTab('rolls')}
            variant={activeTab === 'rolls' ? 'default' : 'outline'}
            className={activeTab === 'rolls' ? 'bg-primary text-white' : 'bg-mediumbg text-gray-300'}
            size="sm"
          >
            Most Rolls
          </Button>
          <Button
            onClick={() => setActiveTab('rareItems')}
            variant={activeTab === 'rareItems' ? 'default' : 'outline'}
            className={activeTab === 'rareItems' ? 'bg-primary text-white' : 'bg-mediumbg text-gray-300'}
            size="sm"
          >
            Rarest Items
          </Button>
          <Button
            onClick={() => setActiveTab('completion')}
            variant={activeTab === 'completion' ? 'default' : 'outline'}
            className={activeTab === 'completion' ? 'bg-primary text-white' : 'bg-mediumbg text-gray-300'}
            size="sm"
          >
            Collection %
          </Button>
        </div>
      </div>
      
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-mediumbg">
              <th className="py-2 px-4 text-left text-gray-400 font-medium">Rank</th>
              <th className="py-2 px-4 text-left text-gray-400 font-medium">Player</th>
              <th className="py-2 px-4 text-right text-gray-400 font-medium">Rolls</th>
              <th className="py-2 px-4 text-right text-gray-400 font-medium">Best Item</th>
            </tr>
          </thead>
          <tbody>
            {sortedLeaderboard.length === 0 ? (
              <tr>
                <td colSpan={4} className="py-8 text-center text-gray-400">
                  No data available yet. Start rolling to appear on the leaderboard!
                </td>
              </tr>
            ) : (
              sortedLeaderboard.slice(0, 5).map((entry, index) => (
                <tr key={entry.username} className="border-b border-mediumbg/50">
                  <td className={`py-3 px-4 font-bold ${index === 0 ? 'text-amber-400' : 'text-gray-400'}`}>
                    {index + 1}
                  </td>
                  <td className="py-3 px-4">
                    <div className="flex items-center gap-2">
                      <div className={`w-8 h-8 rounded-full ${getPlayerBg(index)} flex items-center justify-center`}>
                        <span className={`font-bold ${getPlayerTextColor(index)}`}>
                          {entry.username.charAt(0).toUpperCase()}
                        </span>
                      </div>
                      <span>{entry.username}</span>
                    </div>
                  </td>
                  <td className="py-3 px-4 text-right font-medium">
                    {entry.rollCount.toLocaleString()}
                  </td>
                  <td className="py-3 px-4 text-right">
                    <span className={`inline-flex items-center gap-1 ${getBestItemColor(entry.bestItem)}`}>
                      {getBestItemIcon(entry.bestItem)}
                      {entry.bestItem === 'None' ? 'No items yet' : entry.bestItem}
                    </span>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

// Helper functions to determine styling
function getPlayerBg(index: number): string {
  switch (index) {
    case 0: return 'bg-amber-400/20';
    case 1: return 'bg-secondary/20';
    case 2: return 'bg-primary/20';
    default: return 'bg-gray-600';
  }
}

function getPlayerTextColor(index: number): string {
  switch (index) {
    case 0: return 'text-amber-400';
    case 1: return 'text-secondary';
    case 2: return 'text-primary';
    default: return 'text-gray-300';
  }
}

function getBestItemColor(itemName: string): string {
  if (itemName.includes('Dragon') || itemName.includes('Lucky')) {
    return 'text-amber-400';
  } else if (itemName.includes('Magic') || itemName.includes('Phoenix') || itemName.includes('Enchanted')) {
    return 'text-purple-400';
  } else if (itemName.includes('Steel') || itemName.includes('Guardian') || itemName.includes('Ancient')) {
    return 'text-blue-400';
  } else if (itemName.includes('Bronze') || itemName.includes('Iron')) {
    return 'text-green-400';
  } else {
    return 'text-gray-400';
  }
}

function getBestItemIcon(itemName: string): JSX.Element {
  if (itemName.includes('Dragon')) {
    return <i className="fas fa-dragon"></i>;
  } else if (itemName.includes('Star') || itemName.includes('Lucky')) {
    return <i className="fas fa-star"></i>;
  } else if (itemName.includes('Sword') || itemName.includes('Dagger')) {
    return <i className="fas fa-khanda"></i>;
  } else if (itemName.includes('Shield')) {
    return <i className="fas fa-shield-alt"></i>;
  } else if (itemName.includes('Orb') || itemName.includes('Gem')) {
    return <i className="fas fa-gem"></i>;
  } else if (itemName.includes('Scroll')) {
    return <i className="fas fa-scroll"></i>;
  } else if (itemName.includes('Hat') || itemName.includes('Helmet')) {
    return <i className="fas fa-hat-wizard"></i>;
  } else if (itemName.includes('Potion') || itemName.includes('Flask')) {
    return <i className="fas fa-flask"></i>;
  } else {
    return <i className="fas fa-question-circle"></i>;
  }
}
