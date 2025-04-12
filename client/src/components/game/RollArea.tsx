import { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useGame } from '@/contexts/GameContext';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Switch } from '@/components/ui/switch';
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

  // Combined handler for both normal and lucky rolls
  const handleRoll = () => {
    if (!user) {
      toast({
        title: "Login Required",
        description: "Please login to collect Blue Lock characters",
        variant: "destructive"
      });
      return;
    }
    
    // If lucky spin is selected, check for coins
    if (luckySpinMode) {
      // Check if user has enough coins
      if (coins < 200) {
        toast({
          title: "Not Enough Coins",
          description: "Lucky Spins require 200 coins. Switch to normal roll or earn more coins!",
          variant: "destructive"
        });
        return;
      }
      
      // Execute a lucky roll
      rollItem(true);
    } else {
      // Normal roll
      rollItem(false);
    }
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
      
      {/* Roll Type Toggle */}
      <div className="flex justify-center items-center mb-4 gap-3">
        <span className="text-gray-300 text-sm">Normal Roll</span>
        <Switch 
          checked={luckySpinMode}
          onCheckedChange={setLuckySpinMode}
          className="data-[state=checked]:bg-amber-500"
        />
        <Badge variant="outline" className="px-3 py-2 bg-gradient-to-r from-amber-500/20 to-yellow-500/20 text-yellow-300 border-yellow-400/30 font-medium text-sm">
          <i className="fas fa-coins mr-2 text-yellow-400"></i>Lucky Spin: 200 coins
        </Badge>
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
          onClick={handleRoll}
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
          <DialogTitle className="text-xl font-montserrat font-medium text-center">
            New Character Collected!
          </DialogTitle>
          <DialogDescription className="text-center text-gray-400">
            You've successfully added a new character to your collection.
          </DialogDescription>
          <div className="text-center">
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
