import { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useGame } from '@/contexts/GameContext';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import ItemCard from './ItemCard';
import { useToast } from '@/hooks/use-toast';
import { addRecentRoll } from '@/utils/localStorage';

export default function RollArea() {
  const { user } = useAuth();
  const { 
    rollItem, 
    rollingAnimation, 
    lastRolledItem, 
    remainingFreeRolls 
  } = useGame();
  const [showResultDialog, setShowResultDialog] = useState(false);
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

  const handleRoll = () => {
    if (!user) {
      toast({
        title: "Login Required",
        description: "Please login to roll for items",
        variant: "destructive"
      });
      return;
    }

    if (remainingFreeRolls <= 0) {
      toast({
        title: "No Rolls Left",
        description: "You've used all your free rolls for today",
        variant: "destructive"
      });
      return;
    }

    rollItem();
  };

  return (
    <div className="bg-darkbg rounded-lg p-6 border border-mediumbg shadow-lg">
      <div className="text-center mb-8">
        <h2 className="font-montserrat font-bold text-2xl mb-2 text-white">Roll & Collect</h2>
        <p className="text-gray-400">Test your luck and expand your collection!</p>
      </div>
      
      <div className="flex flex-col items-center">
        {/* Dice animation area */}
        <div className="w-40 h-40 flex items-center justify-center mb-6">
          {rollingAnimation ? (
            <i className="fas fa-dice-d20 text-8xl text-primary animate-[rolling_0.5s_ease_infinite]"></i>
          ) : (
            <i className="fas fa-dice-d20 text-8xl text-primary animate-pulse"></i>
          )}
        </div>
        
        {/* Roll button */}
        <Button
          onClick={handleRoll}
          disabled={rollingAnimation || !user || remainingFreeRolls <= 0}
          className="roll-btn relative overflow-hidden bg-gradient-to-r from-primary to-secondary hover:from-primary/90 hover:to-secondary/90 text-white font-montserrat font-bold text-xl px-12 py-4 rounded-lg shadow-lg transition transform hover:scale-105 active:scale-95 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
        >
          {rollingAnimation ? 'ROLLING...' : 'ROLL NOW'}
        </Button>
        
        <div className="mt-4 text-gray-400 text-sm">
          {user ? (
            <span className="font-medium">
              You have {remainingFreeRolls} free rolls remaining today
            </span>
          ) : (
            <span className="font-medium">
              Login to start rolling for items
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
