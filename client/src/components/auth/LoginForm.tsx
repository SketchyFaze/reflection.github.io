import { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

interface LoginFormProps {
  onSuccess: () => void;
  onSwitchToRegister: () => void;
}

export default function LoginForm({ onSuccess, onSwitchToRegister }: LoginFormProps) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { login } = useAuth();
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    if (!username || !password) {
      toast({
        title: "Error",
        description: "Please fill in all fields",
        variant: "destructive"
      });
      setIsSubmitting(false);
      return;
    }

    const success = login(username, password);
    setIsSubmitting(false);

    if (success) {
      toast({
        title: "Success",
        description: "You are now logged in",
      });
      onSuccess();
    } else {
      toast({
        title: "Login Failed",
        description: "Invalid username or password",
        variant: "destructive"
      });
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <Label htmlFor="login-username" className="block text-sm font-medium text-gray-300 mb-1">
          Username
        </Label>
        <Input 
          id="login-username"
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Enter your username"
          className="w-full px-4 py-2 bg-mediumbg border border-gray-600 rounded focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent text-white"
        />
      </div>

      <div>
        <Label htmlFor="login-password" className="block text-sm font-medium text-gray-300 mb-1">
          Password
        </Label>
        <Input
          id="login-password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Enter your password"
          className="w-full px-4 py-2 bg-mediumbg border border-gray-600 rounded focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent text-white"
        />
      </div>

      <div className="pt-2">
        <Button 
          type="submit" 
          disabled={isSubmitting}
          className="w-full bg-primary hover:bg-primary/90 text-white font-medium py-2 px-4 rounded transition"
        >
          {isSubmitting ? 'Logging in...' : 'Login'}
        </Button>
      </div>

      <div className="mt-4 text-center text-sm text-gray-400">
        <p>
          Don't have an account? {' '}
          <button 
            type="button"
            onClick={onSwitchToRegister} 
            className="text-primary hover:underline"
          >
            Register
          </button>
        </p>
      </div>
    </form>
  );
}
