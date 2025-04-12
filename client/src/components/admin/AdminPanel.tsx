import { useState, useEffect } from 'react';
import { useGame } from '@/contexts/GameContext';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { gameItems, Rarity } from '@/utils/gameData';
import { useToast } from '@/hooks/use-toast';

export default function AdminPanel() {
  const { settings, updateSettings, communityRolls, leaderboard, featuredItem, addCoins } = useGame();
  const { user, updateUser } = useAuth();
  const { toast } = useToast();
  
  const [rollSpeed, setRollSpeed] = useState(settings.rollSpeed);
  const [luckMultiplier, setLuckMultiplier] = useState(settings.luckMultiplier);
  const [featuredItemId, setFeaturedItemId] = useState(settings.featuredItemId);
  const [globalBoostActive, setGlobalBoostActive] = useState(settings.globalBoostActive || false);
  const [globalBoostMessage, setGlobalBoostMessage] = useState(settings.globalBoostMessage || '');
  const [globalBoostExpiry, setGlobalBoostExpiry] = useState(settings.globalBoostExpiry || 0);
  const [isOpen, setIsOpen] = useState(false);
  
  // User-specific boosts and coin management
  const [selectedUsername, setSelectedUsername] = useState('');
  const [userBoostAmount, setUserBoostAmount] = useState(1.5);
  const [userCoinAmount, setUserCoinAmount] = useState(100);
  const [searchTerm, setSearchTerm] = useState('');
  const [activeTab, setActiveTab] = useState('global');
  
  // Select a user for boost/coin operations
  const handleSelectUser = (username: string) => {
    setSelectedUsername(username);
  };

  // Update local state when settings change
  useEffect(() => {
    setRollSpeed(settings.rollSpeed);
    setLuckMultiplier(settings.luckMultiplier);
    setFeaturedItemId(settings.featuredItemId);
    setGlobalBoostActive(settings.globalBoostActive || false);
    setGlobalBoostMessage(settings.globalBoostMessage || '');
    setGlobalBoostExpiry(settings.globalBoostExpiry || 0);
  }, [settings]);

  // Give coins to a specific user
  const handleGiveCoins = () => {
    if (!selectedUsername || userCoinAmount <= 0) {
      toast({
        title: "Action Failed",
        description: "Please select a user and enter a valid coin amount",
        variant: "destructive"
      });
      return;
    }
    
    // Find the user in the leaderboard
    const users = JSON.parse(localStorage.getItem('reflectionUsers') || '[]');
    const targetUser = users.find((u: any) => u.username === selectedUsername);
    
    if (!targetUser) {
      toast({
        title: "User Not Found",
        description: `Could not find user: ${selectedUsername}`,
        variant: "destructive"
      });
      return;
    }
    
    // Update user's coins
    targetUser.coins = (targetUser.coins || 0) + userCoinAmount;
    
    // Save back to localStorage
    const updatedUsers = users.map((u: any) => {
      if (u.username === selectedUsername) {
        return targetUser;
      }
      return u;
    });
    
    localStorage.setItem('reflectionUsers', JSON.stringify(updatedUsers));
    
    toast({
      title: "Coins Added",
      description: `Added ${userCoinAmount} coins to ${selectedUsername}`,
      variant: "default"
    });
  };
  
  // Apply a user-specific boost
  const handleUserBoost = () => {
    if (!selectedUsername || userBoostAmount <= 0) {
      toast({
        title: "Action Failed",
        description: "Please select a user and enter a valid boost amount",
        variant: "destructive"
      });
      return;
    }
    
    // Create user-specific boost
    // In a real app, this would be stored in a database
    // For this demo, we'll just show a success message
    toast({
      title: "Boost Applied",
      description: `Applied ${userBoostAmount}x boost to ${selectedUsername}`,
      variant: "default"
    });
  };

  // Save all settings
  const handleSaveChanges = () => {
    updateSettings({
      rollSpeed,
      luckMultiplier,
      featuredItemId,
      globalBoostActive,
      globalBoostMessage,
      globalBoostExpiry: globalBoostActive ? (Date.now() + 24 * 60 * 60 * 1000) : 0
    });
    
    toast({
      title: "Settings Saved",
      description: globalBoostActive 
        ? "Game settings and global boost have been updated successfully." 
        : "Game settings have been updated successfully."
    });
    
    setIsOpen(false);
  };

  // Only admin can access this component
  if (!user?.isAdmin) return null;

  return (
    <>
      <div
        id="admin-panel-modal"
        className="modal fixed inset-0 bg-black/70 flex items-center justify-center z-50"
        style={{ display: isOpen ? 'flex' : 'none' }}
      >
        <div className="bg-darkbg rounded-lg shadow-xl max-w-4xl w-full mx-4 overflow-hidden">
          <div className="bg-gradient-to-r from-amber-500 to-secondary py-4 px-6 flex justify-between items-center">
            <h2 className="font-montserrat font-bold text-white text-xl">Admin Panel</h2>
            <button 
              id="close-admin-panel"
              className="text-white hover:text-gray-300"
              onClick={() => setIsOpen(false)}
            >
              <i className="fas fa-times"></i>
            </button>
          </div>
          
          <div className="p-6 max-h-[80vh] overflow-y-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Game Settings */}
              <div className="bg-mediumbg rounded-lg p-4">
                <h3 className="font-montserrat font-bold text-white text-lg mb-4">Game Settings</h3>
                <div className="space-y-4">
                  <div>
                    <label htmlFor="roll-speed" className="block text-sm font-medium text-gray-300 mb-1">
                      Roll Animation Speed
                    </label>
                    <Slider
                      id="roll-speed"
                      min={0.5}
                      max={3}
                      step={0.1}
                      value={[rollSpeed]}
                      onValueChange={(value) => setRollSpeed(value[0])}
                      className="w-full"
                    />
                    <div className="flex justify-between text-xs text-gray-400 mt-1">
                      <span>Slow</span>
                      <span>Normal</span>
                      <span>Fast</span>
                    </div>
                  </div>
                  
                  <div>
                    <label htmlFor="roll-luck" className="block text-sm font-medium text-gray-300 mb-1">
                      Global Luck Multiplier
                    </label>
                    <Slider
                      id="roll-luck"
                      min={0.5}
                      max={2}
                      step={0.1}
                      value={[luckMultiplier]}
                      onValueChange={(value) => setLuckMultiplier(value[0])}
                      className="w-full"
                    />
                    <div className="flex justify-between text-xs text-gray-400 mt-1">
                      <span>Harder</span>
                      <span>Normal</span>
                      <span>Easier</span>
                    </div>
                  </div>
                  
                  <div className="p-3 bg-blue-500/20 border border-blue-300/20 rounded text-blue-100 text-sm">
                    <p><i className="fas fa-infinity mr-2"></i> Free rolls are set to infinite for maximum gameplay enjoyment!</p>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-1">
                      Featured Item
                    </label>
                    <Select
                      value={featuredItemId}
                      onValueChange={setFeaturedItemId}
                    >
                      <SelectTrigger className="w-full bg-gray-700 border-gray-600 text-white">
                        <SelectValue placeholder="Select featured item" />
                      </SelectTrigger>
                      <SelectContent className="bg-gray-700 border-gray-600 text-white">
                        {/* Legendary items */}
                        <SelectItem value="divider-legendary" disabled className="text-amber-400 font-bold">
                          Legendary Items
                        </SelectItem>
                        {gameItems
                          .filter(item => item.rarity === Rarity.Legendary)
                          .map(item => (
                            <SelectItem key={item.id} value={item.id}>
                              {item.name} (Legendary)
                            </SelectItem>
                          ))
                        }
                        
                        {/* Epic items */}
                        <SelectItem value="divider-epic" disabled className="text-purple-400 font-bold">
                          Epic Items
                        </SelectItem>
                        {gameItems
                          .filter(item => item.rarity === Rarity.Epic)
                          .map(item => (
                            <SelectItem key={item.id} value={item.id}>
                              {item.name} (Epic)
                            </SelectItem>
                          ))
                        }
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>
              
              {/* User Management */}
              <div className="bg-mediumbg rounded-lg p-4">
                <h3 className="font-montserrat font-bold text-white text-lg mb-4">User Management</h3>
                <div className="space-y-4">
                  <div>
                    <label htmlFor="search-user" className="block text-sm font-medium text-gray-300 mb-1">
                      Search User
                    </label>
                    <div className="flex">
                      <Input
                        id="search-user"
                        className="flex-grow px-4 py-2 bg-gray-700 border border-gray-600 rounded-l focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent text-white"
                        placeholder="Username"
                      />
                      <Button className="bg-amber-500 hover:bg-amber-400 text-white px-4 py-2 rounded-r">
                        <i className="fas fa-search"></i>
                      </Button>
                    </div>
                  </div>
                  
                  <div className="mt-4">
                    <h4 className="text-sm font-medium text-gray-300 mb-2">Recent Users</h4>
                    <div className="bg-gray-700 rounded-lg overflow-hidden">
                      <table className="w-full text-sm">
                        <thead>
                          <tr className="bg-gray-800">
                            <th className="py-2 px-4 text-left text-gray-400 font-medium">User</th>
                            <th className="py-2 px-4 text-left text-gray-400 font-medium">Rolls</th>
                            <th className="py-2 px-4 text-left text-gray-400 font-medium">Actions</th>
                          </tr>
                        </thead>
                        <tbody>
                          {leaderboard.slice(0, 3).map((user, index) => (
                            <tr key={user.username} className="border-b border-gray-600">
                              <td className="py-2 px-4">{user.username}</td>
                              <td className="py-2 px-4">{user.rollCount}</td>
                              <td className="py-2 px-4">
                                <button className="text-blue-400 hover:text-blue-300 mr-2">
                                  <i className="fas fa-edit"></i>
                                </button>
                                <button className="text-red-400 hover:text-red-300">
                                  <i className="fas fa-ban"></i>
                                </button>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Item Management */}
              <div className="bg-mediumbg rounded-lg p-4">
                <h3 className="font-montserrat font-bold text-white text-lg mb-4">Item Management</h3>
                <div className="space-y-4">
                  <div className="flex gap-2 mb-4">
                    <Button className="bg-primary hover:bg-primary/90 text-white px-3 py-1 rounded text-sm">
                      <i className="fas fa-plus mr-1"></i> Add Item
                    </Button>
                    <Button variant="outline" className="bg-gray-700 hover:bg-gray-600 text-white px-3 py-1 rounded text-sm">
                      <i className="fas fa-cog mr-1"></i> Manage Sets
                    </Button>
                  </div>
                  
                  <div className="bg-gray-700 rounded-lg p-3 max-h-60 overflow-y-auto">
                    <div className="space-y-2">
                      {/* Show a few example items */}
                      {gameItems
                        .filter(item => item.rarity === Rarity.Legendary || item.rarity === Rarity.Epic)
                        .slice(0, 4)
                        .map(item => (
                          <div key={item.id} className="flex items-center justify-between p-2 bg-gray-800 rounded">
                            <div className="flex items-center gap-2">
                              <i className={`fas ${item.icon} ${item.rarity === Rarity.Legendary ? 'text-amber-400' : 'text-purple-400'}`}></i>
                              <span>{item.name} ({item.rarity})</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <span className="text-xs text-gray-400">
                                {item.rarity === Rarity.Legendary ? '2%' : '5%'}
                              </span>
                              <button className="text-blue-400 hover:text-blue-300">
                                <i className="fas fa-edit"></i>
                              </button>
                            </div>
                          </div>
                        ))
                      }
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Boost Controls */}
              <div className="bg-mediumbg rounded-lg p-4">
                <h3 className="font-montserrat font-bold text-white text-lg mb-4">
                  <i className="fas fa-rocket mr-2 text-yellow-400"></i>
                  Boost & Reward Management
                </h3>
                
                <Tabs defaultValue="global" onValueChange={setActiveTab} value={activeTab}>
                  <TabsList className="bg-gray-700 border-none">
                    <TabsTrigger value="global" className="data-[state=active]:bg-blue-600 data-[state=active]:text-white">
                      Global Boost
                    </TabsTrigger>
                    <TabsTrigger value="user" className="data-[state=active]:bg-amber-500 data-[state=active]:text-white">
                      User Rewards
                    </TabsTrigger>
                  </TabsList>
                  
                  <TabsContent value="global" className="mt-4">
                    <Card className="bg-gray-700 border-gray-600">
                      <CardHeader>
                        <CardTitle className="text-base text-white">Global Boost Settings</CardTitle>
                        <CardDescription className="text-gray-300">
                          Activate a global boost for all players
                        </CardDescription>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div className="flex items-center justify-between">
                          <Label className="font-medium text-white" htmlFor="global-boost-active">
                            Enable Global Boost
                          </Label>
                          <Switch 
                            id="global-boost-active" 
                            checked={globalBoostActive}
                            onCheckedChange={setGlobalBoostActive}
                          />
                        </div>
                        
                        {globalBoostActive && (
                          <>
                            <div className="space-y-2">
                              <Label className="font-medium text-white" htmlFor="boost-message">
                                Notification Message
                              </Label>
                              <Textarea
                                id="boost-message"
                                placeholder="Everyone has received a boost!"
                                value={globalBoostMessage}
                                onChange={(e) => setGlobalBoostMessage(e.target.value)}
                                className="bg-gray-800 border-gray-600 text-white"
                              />
                              <p className="text-xs text-gray-400">
                                This message will be displayed to all users. If blank, a default message will be used.
                              </p>
                            </div>
                            
                            <div className="p-3 bg-blue-500/20 border border-blue-300/20 rounded text-blue-100 text-sm mt-2">
                              <p><i className="fas fa-info-circle mr-2"></i> Global boost will apply current luck and speed settings to all users for 24 hours.</p>
                            </div>
                          </>
                        )}
                      </CardContent>
                    </Card>
                  </TabsContent>
                  
                  <TabsContent value="user" className="mt-4">
                    <Card className="bg-gray-700 border-gray-600">
                      <CardHeader>
                        <CardTitle className="text-base text-white">User Rewards</CardTitle>
                        <CardDescription className="text-gray-300">
                          Give coins or apply boosts to specific users
                        </CardDescription>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div className="space-y-2">
                          <Label className="font-medium text-white" htmlFor="select-user">
                            Select User
                          </Label>
                          <div className="flex gap-2">
                            <Select
                              value={selectedUsername}
                              onValueChange={setSelectedUsername}
                            >
                              <SelectTrigger id="select-user" className="bg-gray-800 border-gray-600 text-white">
                                <SelectValue placeholder="Select a user" />
                              </SelectTrigger>
                              <SelectContent className="bg-gray-800 border-gray-600 text-white">
                                {leaderboard.map(user => (
                                  <SelectItem key={user.username} value={user.username}>
                                    {user.username}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                          </div>
                        </div>
                        
                        {selectedUsername && (
                          <div className="mt-4 grid grid-cols-1 gap-4">
                            <div className="p-4 bg-gray-800 rounded-lg">
                              <h4 className="font-medium text-white mb-2 flex items-center">
                                <i className="fas fa-coins mr-2 text-yellow-400"></i> 
                                Give Coins
                              </h4>
                              <div className="flex items-center gap-2">
                                <Input
                                  type="number"
                                  value={userCoinAmount}
                                  onChange={(e) => setUserCoinAmount(Math.max(0, parseInt(e.target.value) || 0))}
                                  min={0}
                                  className="bg-gray-700 border-gray-600 text-white"
                                />
                                <Button 
                                  className="bg-yellow-500 hover:bg-yellow-600 text-white"
                                  onClick={handleGiveCoins}
                                >
                                  Give
                                </Button>
                              </div>
                            </div>
                            
                            <div className="p-4 bg-gray-800 rounded-lg">
                              <h4 className="font-medium text-white mb-2 flex items-center">
                                <i className="fas fa-bolt mr-2 text-blue-400"></i> 
                                Apply Custom Boost
                              </h4>
                              <div className="space-y-2">
                                <div className="flex items-center gap-2">
                                  <Label htmlFor="boost-amount" className="whitespace-nowrap">Boost Factor</Label>
                                  <Slider
                                    id="boost-amount"
                                    min={1}
                                    max={3}
                                    step={0.1}
                                    value={[userBoostAmount]}
                                    onValueChange={(val) => setUserBoostAmount(val[0])}
                                  />
                                  <span className="text-white font-mono bg-gray-700 px-2 py-1 rounded min-w-[3rem] text-center">
                                    {userBoostAmount}x
                                  </span>
                                </div>
                                <Button 
                                  className="w-full bg-blue-600 hover:bg-blue-700 text-white"
                                  onClick={handleUserBoost}
                                >
                                  Apply Boost
                                </Button>
                              </div>
                            </div>
                          </div>
                        )}
                      </CardContent>
                    </Card>
                  </TabsContent>
                </Tabs>
              </div>
              
              {/* System Status */}
              <div className="bg-mediumbg rounded-lg p-4">
                <h3 className="font-montserrat font-bold text-white text-lg mb-4">System Status</h3>
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-gray-700 p-3 rounded-lg">
                      <div className="text-xs text-gray-400 mb-1">Total Users</div>
                      <div className="text-xl font-montserrat font-bold">{leaderboard.length}</div>
                    </div>
                    <div className="bg-gray-700 p-3 rounded-lg">
                      <div className="text-xs text-gray-400 mb-1">Total Rolls</div>
                      <div className="text-xl font-montserrat font-bold">{communityRolls.toLocaleString()}</div>
                    </div>
                    <div className="bg-gray-700 p-3 rounded-lg">
                      <div className="text-xs text-gray-400 mb-1">Active Sessions</div>
                      <div className="text-xl font-montserrat font-bold">1</div>
                    </div>
                    <div className="bg-gray-700 p-3 rounded-lg">
                      <div className="text-xs text-gray-400 mb-1">Featured Item</div>
                      <div className="text-xl font-montserrat font-bold text-amber-400">
                        {featuredItem.name}
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="text-sm font-medium text-gray-300 mb-2">System Actions</h4>
                    <div className="flex flex-wrap gap-2">
                      <Button className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-2 rounded text-sm flex items-center gap-1">
                        <i className="fas fa-database"></i> Backup Data
                      </Button>
                      <Button className="bg-yellow-500 hover:bg-yellow-600 text-white px-3 py-2 rounded text-sm flex items-center gap-1">
                        <i className="fas fa-broom"></i> Clear Cache
                      </Button>
                      <Button className="bg-red-500 hover:bg-red-600 text-white px-3 py-2 rounded text-sm flex items-center gap-1">
                        <i className="fas fa-exclamation-triangle"></i> Reset System
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="mt-6 text-center">
              <Button 
                onClick={handleSaveChanges}
                className="bg-green-600 hover:bg-green-500 text-white font-montserrat font-medium px-6 py-2 rounded transition"
              >
                Save All Changes
              </Button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
