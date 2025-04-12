import { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useGame } from '@/contexts/GameContext';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import ItemCard from './ItemCard';
import { useToast } from '@/hooks/use-toast';
import { addRecentRoll } from '@/utils/localStorage';
import { Badge } from '@/components/ui/badge';

export default function RollArea() {
  const { user } = useAuth();
  const { 
    rollItem, 
    rollingAnimation, 
    lastRolledItem,
    coins,
    settings
  } = useGame();
  const [showResultDialog, setShowResultDialog] = useState(false);
  const [luckySpinMode, setLuckySpinMode] = useState(false);
  const { toast } = useToast();

  // Handle showing result dialog when lastRolledItem changes
  useEffect(() => {
    if (lastRolledItem && !rollingAnimation) {
      setShowResultDialog(true);
      
      // Add to recent rolls
      if (user) {
        addRecentRoll({
          username: user.username,
          itemName: lastRolledItem.name,
          timestamp: Date.now()
        });
      }
    }
  }, [lastRolledItem, rollingAnimation, user]);

  const handleNormalRoll = () => {
    if (!user) {
      toast({
        title: "Login Required",
        description: "Please login to collect Blue Lock characters",
        variant: "destructive"
      });
      return;
    }

    rollItem(false);
  };
  
  const handleLuckyRoll = () => {
    if (!user) {
      toast({
        title: "Login Required",
        description: "Please login to collect Blue Lock characters",
        variant: "destructive"
      });
      return;
    }
    
    // Check if user has enough coins
    if (coins < 200) {
      toast({
        title: "Not Enough Coins",
        description: "Lucky Spins require 200 coins. Continue rolling normally to earn more coins!",
        variant: "destructive"
      });
      return;
    }
    
    // Execute a lucky roll
    rollItem(true);
  };

  return (
    <div className="bg-darkbg rounded-lg p-6 border border-mediumbg shadow-lg relative">
      {/* Global boost notification */}
      {settings.globalBoostActive && (
        <div className="absolute top-0 left-0 right-0 bg-gradient-to-r from-blue-500 to-teal-400 text-white p-2 text-center font-medium rounded-t-lg">
          {settings.globalBoostMessage || "Global boost active!"}
        </div>
      )}
    
      <div className={`text-center ${settings.globalBoostActive ? 'mt-8' : ''} mb-8`}>
        <h2 className="font-montserrat font-bold text-2xl mb-2 text-white">Roll & Collect</h2>
        <p className="text-gray-400">Test your luck and expand your collection!</p>
        
        {/* Coin display */}
        <div className="mt-2 flex justify-center items-center">
          <div className="bg-yellow-600/30 text-yellow-300 px-3 py-1 rounded-full flex items-center space-x-1">
            <span className="text-yellow-400">💰</span>
            <span className="font-medium">{coins} coins</span>
          </div>
        </div>
      </div>
      
      {/* Roll type selector */}
      <div className="flex justify-center space-x-4 mb-4">
        <Button 
          variant={luckySpinMode ? "outline" : "default"}
          onClick={() => setLuckySpinMode(false)}
          className={`${!luckySpinMode ? 'bg-primary hover:bg-primary/90' : ''}`}
        >
          Normal Roll
          <Badge variant="secondary" className="ml-2 bg-blue-400/20 text-blue-200">+2 coins</Badge>
        </Button>
        <Button 
          variant={luckySpinMode ? "default" : "outline"}
          onClick={() => setLuckySpinMode(true)}
          className={`${luckySpinMode ? 'bg-gradient-to-r from-orange-500 to-rose-500 hover:from-orange-600 hover:to-rose-600' : ''}`}
        >
          Lucky Spin
          <Badge variant="secondary" className="ml-2 bg-yellow-400/20 text-yellow-200">200 coins</Badge>
        </Button>
      </div>
      
      <div className="flex flex-col items-center">
        {/* Animation area */}
        <div className="w-40 h-40 flex items-center justify-center mb-6">
          {rollingAnimation ? (
            luckySpinMode ? (
              <div className="lucky-animation">
                <i className="fas fa-star text-7xl text-yellow-400 animate-spin"></i>
                <i className="fas fa-futbol text-6xl text-primary roll-animation absolute"></i>
              </div>
            ) : (
              <i className="fas fa-futbol text-8xl text-primary roll-animation"></i>
            )
          ) : (
            <i className={`fas fa-${luckySpinMode ? 'star text-yellow-400' : 'futbol text-primary'} text-8xl animate-pulse`}></i>
          )}
        </div>
        
        {/* Roll button */}
        <Button
          onClick={luckySpinMode ? handleLuckyRoll : handleNormalRoll}
          disabled={rollingAnimation || !user}
          className={`roll-btn relative overflow-hidden ${
            luckySpinMode 
              ? 'bg-gradient-to-r from-orange-500 to-rose-500 hover:from-orange-600 hover:to-rose-600' 
              : 'summer-wave'
          } text-white font-montserrat font-bold text-xl px-12 py-4 rounded-lg shadow-lg transition transform hover:scale-105 active:scale-95 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary`}
        >
          {rollingAnimation 
            ? 'COLLECTING...' 
            : luckySpinMode 
              ? 'LUCKY SPIN!' 
              : 'COLLECT NOW'
          }
        </Button>
        
        <div className="mt-4 text-gray-400 text-sm">
          {user ? (
            <span className="font-medium">
              {luckySpinMode 
                ? "Lucky Spins guarantee Epic or better characters! (200 coins)" 
                : "Collect characters and earn 2 coins per roll"
              }
            </span>
          ) : (
            <span className="font-medium">
              Login to start collecting Blue Lock characters
            </span>
          )}
        </div>
      </div>

      {/* Result Dialog */}
      <Dialog open={showResultDialog} onOpenChange={setShowResultDialog}>
        <DialogContent className="bg-darkbg border border-mediumbg text-white">
          <div className="text-center">
            <div className="text-xl font-montserrat font-medium mb-4">You rolled:</div>
            {lastRolledItem && (
              <div className="flex justify-center">
                <ItemCard item={lastRolledItem} size="large" highlight={true} />
              </div>
            )}
            <Button 
              onClick={() => setShowResultDialog(false)}
              className="mt-6 bg-primary hover:bg-primary/90"
            >
              Continue
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
