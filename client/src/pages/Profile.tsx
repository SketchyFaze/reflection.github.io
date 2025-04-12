import { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useGame } from '@/contexts/GameContext';
import Sidebar from '@/components/layout/Sidebar';
import ItemCard from '@/components/game/ItemCard';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { getCollectionProgress, gameItems, Rarity } from '@/utils/gameData';
import { useToast } from '@/hooks/use-toast';

export default function Profile() {
  const { user, logout } = useAuth();
  const { allItems } = useGame();
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState('overview');

  if (!user) {
    return (
      <main className="container mx-auto px-4 py-6 lg:flex gap-6">
        <div className="hidden lg:block">
          <Sidebar />
        </div>
        
        <div className="flex-grow">
          <div className="bg-darkbg rounded-lg p-8 border border-mediumbg shadow-lg text-center">
            <h2 className="font-montserrat font-bold text-2xl mb-4 text-white">Profile Not Available</h2>
            <p className="text-gray-400 mb-6">Please log in to view your profile and collection statistics.</p>
            <Button 
              onClick={() => document.getElementById('login-btn')?.click()}
              className="bg-primary hover:bg-primary/90 text-white"
            >
              Login
            </Button>
          </div>
        </div>
      </main>
    );
  }

  // Calculate collection statistics
  const progress = getCollectionProgress(user.inventory || []);
  const totalProgress = progress.find(p => p.rarity === 'Total');
  
  // Get highest rarity item
  const getHighestRarityItem = () => {
    if (!user.inventory || user.inventory.length === 0) return null;
    
    const ownedItems = allItems.filter(item => user.inventory.includes(item.id));
    if (ownedItems.length === 0) return null;
    
    return ownedItems.sort((a, b) => b.rarityLevel - a.rarityLevel)[0];
  };
  
  const highestRarityItem = getHighestRarityItem();
  
  // Calculate rarity counts
  const getRarityCounts = () => {
    if (!user.inventory) return {};
    
    const counts: Record<string, number> = {};
    const ownedItems = allItems.filter(item => user.inventory.includes(item.id));
    
    ownedItems.forEach(item => {
      counts[item.rarity] = (counts[item.rarity] || 0) + 1;
    });
    
    return counts;
  };
  
  const rarityCounts = getRarityCounts();
  
  // Get items by rarity
  const getItemsByRarity = (rarity: Rarity) => {
    if (!user.inventory) return [];
    return allItems.filter(item => item.rarity === rarity && user.inventory.includes(item.id));
  };

  const handleLogout = () => {
    logout();
    toast({
      title: "Logged out",
      description: "You have been successfully logged out",
    });
  };

  return (
    <main className="container mx-auto px-4 py-6 lg:flex gap-6">
      {/* Left sidebar - Navigation (desktop only) */}
      <div className="hidden lg:block">
        <Sidebar />
      </div>
      
      {/* Main content area */}
      <div className="flex-grow space-y-6">
        {/* Profile header */}
        <div className="bg-gradient-to-r from-primary to-secondary rounded-lg shadow-lg overflow-hidden">
          <div className="p-6">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-full bg-white/20 flex items-center justify-center">
                <span className="font-bold text-white text-2xl">{user.username.charAt(0).toUpperCase()}</span>
              </div>
              <div>
                <h2 className="font-montserrat font-bold text-2xl text-white">{user.username}</h2>
                <div className="flex items-center gap-4 mt-1">
                  <div className="flex items-center gap-1">
                    <i className="fas fa-dice text-white/70"></i>
                    <span className="text-white/90">{user.rollCount} Rolls</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <i className="fas fa-box-open text-white/70"></i>
                    <span className="text-white/90">{user.inventory.length} Items</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="bg-darkbg/30 border-t border-white/10 px-6 py-2 flex justify-between items-center">
            <div className="text-white">
              {user.isAdmin && (
                <span className="bg-amber-500/20 text-amber-400 px-2 py-1 rounded text-xs">
                  <i className="fas fa-shield-alt mr-1"></i> Administrator
                </span>
              )}
            </div>
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={handleLogout}
              className="text-white/70 hover:text-white hover:bg-white/10"
            >
              <i className="fas fa-sign-out-alt mr-1"></i> Logout
            </Button>
          </div>
        </div>
        
        {/* Content tabs */}
        <Tabs defaultValue="overview" onValueChange={setActiveTab} className="w-full">
          <TabsList className="bg-darkbg border border-mediumbg mb-6">
            <TabsTrigger value="overview" className="data-[state=active]:bg-primary/10 data-[state=active]:text-primary">
              <i className="fas fa-user mr-2"></i> Overview
            </TabsTrigger>
            <TabsTrigger value="collection" className="data-[state=active]:bg-primary/10 data-[state=active]:text-primary">
              <i className="fas fa-box-open mr-2"></i> Collection
            </TabsTrigger>
            <TabsTrigger value="stats" className="data-[state=active]:bg-primary/10 data-[state=active]:text-primary">
              <i className="fas fa-chart-bar mr-2"></i> Statistics
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="overview" className="space-y-6">
            <div className="bg-darkbg rounded-lg p-6 border border-mediumbg shadow-lg">
              <h3 className="font-montserrat font-bold text-xl mb-4 text-white">Profile Overview</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                <div className="bg-mediumbg rounded-lg p-4">
                  <div className="text-gray-400 mb-1 text-sm">Total Rolls</div>
                  <div className="font-montserrat font-bold text-2xl">{user.rollCount}</div>
                </div>
                <div className="bg-mediumbg rounded-lg p-4">
                  <div className="text-gray-400 mb-1 text-sm">Items Collected</div>
                  <div className="font-montserrat font-bold text-2xl">
                    {user.inventory.length} <span className="text-sm text-gray-400">/ {allItems.length}</span>
                  </div>
                </div>
                <div className="bg-mediumbg rounded-lg p-4">
                  <div className="text-gray-400 mb-1 text-sm">Collection Progress</div>
                  <div className="font-montserrat font-bold text-2xl">
                    {totalProgress ? Math.round(totalProgress.percent) : 0}%
                  </div>
                </div>
              </div>
              
              {highestRarityItem && (
                <div className="mb-6">
                  <h4 className="font-montserrat font-medium text-white mb-3">Highest Rarity Item</h4>
                  <div className="flex justify-center md:justify-start">
                    <ItemCard item={highestRarityItem} size="large" highlight={true} />
                  </div>
                </div>
              )}
              
              <div>
                <h4 className="font-montserrat font-medium text-white mb-3">Recent Activity</h4>
                <div className="bg-mediumbg rounded-lg overflow-hidden">
                  {user.rollCount === 0 ? (
                    <div className="p-6 text-center text-gray-400">
                      No activity yet. Start rolling to collect items!
                    </div>
                  ) : (
                    <div className="p-4">
                      <div className="mb-3 flex items-center gap-2">
                        <i className="fas fa-dice text-primary"></i>
                        <span>You have rolled a total of {user.rollCount} times.</span>
                      </div>
                      <div className="mb-3 flex items-center gap-2">
                        <i className="fas fa-box-open text-green-400"></i>
                        <span>You have collected {user.inventory.length} unique items.</span>
                      </div>
                      {highestRarityItem && (
                        <div className="flex items-center gap-2">
                          <i className="fas fa-crown text-amber-400"></i>
                          <span>Your best item is {highestRarityItem.name} ({highestRarityItem.rarity}).</span>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="collection" className="space-y-6">
            <div className="bg-darkbg rounded-lg p-6 border border-mediumbg shadow-lg">
              <h3 className="font-montserrat font-bold text-xl mb-4 text-white">My Collection</h3>
              
              <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-3 mb-4">
                <div className="bg-mediumbg rounded-lg p-3 text-center">
                  <div className="text-amber-400 text-xl mb-1"><i className="fas fa-star"></i></div>
                  <div className="font-medium">{rarityCounts[Rarity.Legendary] || 0}/{Object.values(Rarity).filter(r => r === Rarity.Legendary).length * 2}</div>
                  <div className="text-sm text-gray-400">Legendary</div>
                </div>
                <div className="bg-mediumbg rounded-lg p-3 text-center">
                  <div className="text-purple-400 text-xl mb-1"><i className="fas fa-gem"></i></div>
                  <div className="font-medium">{rarityCounts[Rarity.Epic] || 0}/{Object.values(Rarity).filter(r => r === Rarity.Epic).length * 4}</div>
                  <div className="text-sm text-gray-400">Epic</div>
                </div>
                <div className="bg-mediumbg rounded-lg p-3 text-center">
                  <div className="text-blue-400 text-xl mb-1"><i className="fas fa-trophy"></i></div>
                  <div className="font-medium">{rarityCounts[Rarity.Rare] || 0}/{Object.values(Rarity).filter(r => r === Rarity.Rare).length * 6}</div>
                  <div className="text-sm text-gray-400">Rare</div>
                </div>
                <div className="bg-mediumbg rounded-lg p-3 text-center">
                  <div className="text-green-400 text-xl mb-1"><i className="fas fa-scroll"></i></div>
                  <div className="font-medium">{rarityCounts[Rarity.Uncommon] || 0}/{Object.values(Rarity).filter(r => r === Rarity.Uncommon).length * 8}</div>
                  <div className="text-sm text-gray-400">Uncommon</div>
                </div>
              </div>
              
              {/* Legendary Items */}
              <div className="mb-6">
                <h4 className="font-montserrat font-medium text-amber-400 mb-3 flex items-center gap-2">
                  <i className="fas fa-star"></i> Legendary Items
                </h4>
                {getItemsByRarity(Rarity.Legendary).length > 0 ? (
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                    {getItemsByRarity(Rarity.Legendary).map(item => (
                      <ItemCard key={item.id} item={item} highlight={true} />
                    ))}
                  </div>
                ) : (
                  <div className="bg-mediumbg/30 rounded-lg p-4 text-center text-gray-400">
                    No legendary items collected yet.
                  </div>
                )}
              </div>
              
              {/* Epic Items */}
              <div className="mb-6">
                <h4 className="font-montserrat font-medium text-purple-400 mb-3 flex items-center gap-2">
                  <i className="fas fa-gem"></i> Epic Items
                </h4>
                {getItemsByRarity(Rarity.Epic).length > 0 ? (
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                    {getItemsByRarity(Rarity.Epic).map(item => (
                      <ItemCard key={item.id} item={item} highlight={true} />
                    ))}
                  </div>
                ) : (
                  <div className="bg-mediumbg/30 rounded-lg p-4 text-center text-gray-400">
                    No epic items collected yet.
                  </div>
                )}
              </div>
              
              {/* Rare Items */}
              <div className="mb-6">
                <h4 className="font-montserrat font-medium text-blue-400 mb-3 flex items-center gap-2">
                  <i className="fas fa-trophy"></i> Rare Items
                </h4>
                {getItemsByRarity(Rarity.Rare).length > 0 ? (
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                    {getItemsByRarity(Rarity.Rare).map(item => (
                      <ItemCard key={item.id} item={item} />
                    ))}
                  </div>
                ) : (
                  <div className="bg-mediumbg/30 rounded-lg p-4 text-center text-gray-400">
                    No rare items collected yet.
                  </div>
                )}
              </div>
              
              {/* Other Items (Uncommon & Common) - Show toggle button if many */}
              <div>
                <h4 className="font-montserrat font-medium text-gray-300 mb-3 flex items-center gap-2">
                  <i className="fas fa-box"></i> Other Items
                </h4>
                {getItemsByRarity(Rarity.Uncommon).length > 0 || getItemsByRarity(Rarity.Common).length > 0 ? (
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
                    {[...getItemsByRarity(Rarity.Uncommon), ...getItemsByRarity(Rarity.Common)].map(item => (
                      <ItemCard key={item.id} item={item} size="small" />
                    ))}
                  </div>
                ) : (
                  <div className="bg-mediumbg/30 rounded-lg p-4 text-center text-gray-400">
                    No uncommon or common items collected yet.
                  </div>
                )}
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="stats" className="space-y-6">
            <div className="bg-darkbg rounded-lg p-6 border border-mediumbg shadow-lg">
              <h3 className="font-montserrat font-bold text-xl mb-4 text-white">Statistics</h3>
              
              <div className="space-y-6">
                {/* Collection Progress */}
                <div>
                  <h4 className="font-montserrat font-medium text-white mb-3">Collection Progress</h4>
                  <div className="space-y-4">
                    {progress.map((item) => {
                      // Skip total since we'll add it separately
                      if (item.rarity === 'Total') return null;
                      
                      return (
                        <div key={item.rarity}>
                          <div className="flex justify-between text-sm mb-1">
                            <span>{item.rarity} Items</span>
                            <span className="text-gray-400">{item.collected}/{item.total}</span>
                          </div>
                          <div className="relative h-2 bg-gray-700 rounded-full overflow-hidden">
                            <div 
                              className={`absolute top-0 left-0 h-full bg-${item.rarity === Rarity.Legendary ? 'amber' : item.rarity === Rarity.Epic ? 'purple' : item.rarity === Rarity.Rare ? 'blue' : item.rarity === Rarity.Uncommon ? 'green' : 'gray'}-400`}
                              style={{ width: `${item.percent}%` }}
                            ></div>
                          </div>
                        </div>
                      );
                    })}
                    
                    {/* Total Collection Progress */}
                    {totalProgress && (
                      <div className="pt-2 border-t border-mediumbg">
                        <div className="flex justify-between text-sm font-medium mb-1">
                          <span>Total Collection</span>
                          <span className="text-amber-400">
                            {totalProgress.collected}/{totalProgress.total}
                          </span>
                        </div>
                        <div className="relative h-2 bg-gray-700 rounded-full overflow-hidden">
                          <div 
                            className="absolute top-0 left-0 h-full bg-amber-400"
                            style={{ width: `${totalProgress.percent}%` }}
                          ></div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
                
                {/* Roll Statistics */}
                <div>
                  <h4 className="font-montserrat font-medium text-white mb-3">Roll Statistics</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="bg-mediumbg rounded-lg p-4">
                      <div className="text-center">
                        <div className="text-5xl font-bold mb-2 text-primary">{user.rollCount}</div>
                        <div className="text-gray-400">Total Rolls</div>
                      </div>
                    </div>
                    <div className="bg-mediumbg rounded-lg p-4">
                      <div className="text-center">
                        <div className="text-5xl font-bold mb-2 text-amber-400">
                          {user.rollCount > 0 ? Math.round((user.inventory.length / user.rollCount) * 100) : 0}%
                        </div>
                        <div className="text-gray-400">Unique Item Rate</div>
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Game Activity */}
                <div>
                  <h4 className="font-montserrat font-medium text-white mb-3">Game Activity</h4>
                  <div className="bg-mediumbg rounded-lg p-4">
                    <p className="text-center text-gray-300 mb-4">
                      Your activity and achievements in Online Go
                    </p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="bg-mediumbg/50 rounded-lg p-3 border border-mediumbg/80">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center">
                            <i className="fas fa-dice text-primary"></i>
                          </div>
                          <div>
                            <div className="font-medium">Roll Master</div>
                            <div className="text-xs text-gray-400">
                              {user.rollCount >= 100 ? 'Achieved! 100+ rolls' : `Progress: ${user.rollCount}/100 rolls`}
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="bg-mediumbg/50 rounded-lg p-3 border border-mediumbg/80">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-full bg-amber-500/20 flex items-center justify-center">
                            <i className="fas fa-crown text-amber-500"></i>
                          </div>
                          <div>
                            <div className="font-medium">Legendary Collector</div>
                            <div className="text-xs text-gray-400">
                              {(rarityCounts[Rarity.Legendary] || 0) >= 1 ? 'Achieved! Found a legendary item' : 'Find your first legendary item'}
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="bg-mediumbg/50 rounded-lg p-3 border border-mediumbg/80">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-full bg-purple-500/20 flex items-center justify-center">
                            <i className="fas fa-gem text-purple-500"></i>
                          </div>
                          <div>
                            <div className="font-medium">Epic Hunter</div>
                            <div className="text-xs text-gray-400">
                              {(rarityCounts[Rarity.Epic] || 0) >= 2 ? 'Achieved! Found 2+ epic items' : `Progress: ${rarityCounts[Rarity.Epic] || 0}/2 epic items`}
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="bg-mediumbg/50 rounded-lg p-3 border border-mediumbg/80">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-full bg-green-500/20 flex items-center justify-center">
                            <i className="fas fa-percentage text-green-500"></i>
                          </div>
                          <div>
                            <div className="font-medium">Completionist</div>
                            <div className="text-xs text-gray-400">
                              {totalProgress && totalProgress.percent >= 50 ? 'Achieved! 50%+ collection complete' : `Progress: ${Math.round(totalProgress?.percent || 0)}/50% complete`}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
      
      {/* Right sidebar - only on large screens */}
      <div className="hidden lg:block w-80 space-y-6">
        <div className="bg-darkbg rounded-lg p-4 border border-mediumbg shadow-lg sticky top-6">
          <h3 className="font-montserrat font-bold text-xl mb-4 text-white">Account Info</h3>
          
          <div className="space-y-4">
            <div className="flex items-center gap-3 p-3 bg-mediumbg rounded-lg">
              <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center">
                <i className="fas fa-user text-primary"></i>
              </div>
              <div>
                <div className="font-medium">{user.username}</div>
                <div className="text-xs text-gray-400">Member</div>
              </div>
            </div>
            
            <div className="flex items-center gap-3 p-3 bg-mediumbg rounded-lg">
              <div className="w-10 h-10 rounded-full bg-green-500/20 flex items-center justify-center">
                <i className="fas fa-dice-d20 text-green-500"></i>
              </div>
              <div>
                <div className="font-medium">{user.rollCount} Rolls</div>
                <div className="text-xs text-gray-400">Lifetime Total</div>
              </div>
            </div>
            
            <div className="flex items-center gap-3 p-3 bg-mediumbg rounded-lg">
              <div className="w-10 h-10 rounded-full bg-purple-500/20 flex items-center justify-center">
                <i className="fas fa-box-open text-purple-500"></i>
              </div>
              <div>
                <div className="font-medium">{user.inventory.length} Items</div>
                <div className="text-xs text-gray-400">
                  {totalProgress ? Math.round(totalProgress.percent) : 0}% Complete
                </div>
              </div>
            </div>
            
            {user.isAdmin && (
              <div className="flex items-center gap-3 p-3 bg-amber-500/10 rounded-lg border border-amber-500/30">
                <div className="w-10 h-10 rounded-full bg-amber-500/20 flex items-center justify-center">
                  <i className="fas fa-shield-alt text-amber-500"></i>
                </div>
                <div>
                  <div className="font-medium text-amber-400">Admin Account</div>
                  <div className="text-xs text-amber-400/70">Game Administrator</div>
                </div>
              </div>
            )}
            
            <div className="pt-2">
              <Button
                onClick={() => {
                  if (user.isAdmin) {
                    document.getElementById('admin-panel-modal')?.classList.remove('hidden');
                  }
                }}
                className={`w-full ${user.isAdmin ? 'bg-amber-500 hover:bg-amber-600' : 'bg-gray-600 cursor-not-allowed'} text-white`}
                disabled={!user.isAdmin}
              >
                <i className="fas fa-cog mr-2"></i> Admin Panel
              </Button>
            </div>
            
            <div>
              <Button
                onClick={handleLogout}
                variant="outline"
                className="w-full border-red-500/50 text-red-500 hover:bg-red-500/10"
              >
                <i className="fas fa-sign-out-alt mr-2"></i> Logout
              </Button>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
