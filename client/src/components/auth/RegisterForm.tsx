import { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

interface RegisterFormProps {
  onSuccess: () => void;
  onSwitchToLogin: () => void;
}

export default function RegisterForm({ onSuccess, onSwitchToLogin }: RegisterFormProps) {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { register } = useAuth();
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Validation
    if (!username || !email || !password || !confirmPassword) {
      toast({
        title: "Error",
        description: "Please fill in all fields",
        variant: "destructive"
      });
      setIsSubmitting(false);
      return;
    }

    if (password !== confirmPassword) {
      toast({
        title: "Error",
        description: "Passwords do not match",
        variant: "destructive"
      });
      setIsSubmitting(false);
      return;
    }

    // Simple email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      toast({
        title: "Error",
        description: "Please enter a valid email address",
        variant: "destructive"
      });
      setIsSubmitting(false);
      return;
    }

    // Register user
    const success = register(username, email, password);
    setIsSubmitting(false);

    if (success) {
      toast({
        title: "Success",
        description: "Your account has been created",
      });
      onSuccess();
    } else {
      toast({
        title: "Registration Failed",
        description: "Username already exists",
        variant: "destructive"
      });
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <Label htmlFor="register-username" className="block text-sm font-medium text-gray-300 mb-1">
          Username
        </Label>
        <Input 
          id="register-username"
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Choose a username"
          className="w-full px-4 py-2 bg-mediumbg border border-gray-600 rounded focus:outline-none focus:ring-2 focus:ring-secondary focus:border-transparent text-white"
        />
      </div>

      <div>
        <Label htmlFor="register-email" className="block text-sm font-medium text-gray-300 mb-1">
          Email
        </Label>
        <Input 
          id="register-email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter your email"
          className="w-full px-4 py-2 bg-mediumbg border border-gray-600 rounded focus:outline-none focus:ring-2 focus:ring-secondary focus:border-transparent text-white"
        />
      </div>

      <div>
        <Label htmlFor="register-password" className="block text-sm font-medium text-gray-300 mb-1">
          Password
        </Label>
        <Input 
          id="register-password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Create a password"
          className="w-full px-4 py-2 bg-mediumbg border border-gray-600 rounded focus:outline-none focus:ring-2 focus:ring-secondary focus:border-transparent text-white"
        />
      </div>

      <div>
        <Label htmlFor="register-confirm-password" className="block text-sm font-medium text-gray-300 mb-1">
          Confirm Password
        </Label>
        <Input 
          id="register-confirm-password"
          type="password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          placeholder="Confirm your password"
          className="w-full px-4 py-2 bg-mediumbg border border-gray-600 rounded focus:outline-none focus:ring-2 focus:ring-secondary focus:border-transparent text-white"
        />
      </div>

      <div className="pt-2">
        <Button 
          type="submit" 
          disabled={isSubmitting}
          className="w-full bg-secondary hover:bg-secondary/90 text-white font-medium py-2 px-4 rounded transition"
        >
          {isSubmitting ? 'Creating Account...' : 'Create Account'}
        </Button>
      </div>

      <div className="mt-4 text-center text-sm text-gray-400">
        <p>
          Already have an account? {' '}
          <button 
            type="button"
            onClick={onSwitchToLogin} 
            className="text-secondary hover:underline"
          >
            Login
          </button>
        </p>
      </div>
    </form>
  );
}
