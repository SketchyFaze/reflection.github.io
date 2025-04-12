import { useState } from 'react';
import { Link } from 'wouter';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import LoginForm from '@/components/auth/LoginForm';
import RegisterForm from '@/components/auth/RegisterForm';
import UserMenu from '@/components/auth/UserMenu';

export default function Header() {
  const { user, isAuthenticated } = useAuth();
  const [loginModalOpen, setLoginModalOpen] = useState(false);
  const [registerModalOpen, setRegisterModalOpen] = useState(false);

  const openLoginModal = () => {
    setLoginModalOpen(true);
    setRegisterModalOpen(false);
  };

  const openRegisterModal = () => {
    setRegisterModalOpen(true);
    setLoginModalOpen(false);
  };

  const closeModals = () => {
    setLoginModalOpen(false);
    setRegisterModalOpen(false);
  };

  return (
    <header className="bg-darkbg shadow-lg border-b border-mediumbg">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        <div className="flex items-center">
          <Link to="/">
            <h1 className="font-montserrat font-bold text-2xl mr-2">
              <span className="text-primary">Reflect</span><span className="text-amber-500">ion</span>
            </h1>
          </Link>
          <span className="text-xs bg-teal-500/20 text-teal-500 px-2 py-1 rounded font-montserrat">
            SUMMER
          </span>
        </div>
        
        {/* User area */}
        <div className="flex items-center">
          {isAuthenticated ? (
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2">
                <i className="fas fa-dice text-amber-500"></i>
                <span className="font-montserrat font-medium">{user?.rollCount || 0}</span>
              </div>
              <UserMenu />
            </div>
          ) : (
            <div className="flex gap-2">
              <Button 
                onClick={openLoginModal} 
                className="bg-primary hover:bg-primary/80 text-white font-montserrat font-medium px-4 py-2 rounded text-sm transition"
              >
                Login
              </Button>
              <Button 
                onClick={openRegisterModal} 
                className="bg-secondary hover:bg-secondary/80 text-white font-montserrat font-medium px-4 py-2 rounded text-sm transition"
              >
                Register
              </Button>
            </div>
          )}
        </div>
      </div>

      {/* Login Modal */}
      <Dialog open={loginModalOpen} onOpenChange={setLoginModalOpen}>
        <DialogContent className="bg-darkbg border border-mediumbg">
          <div className="bg-gradient-to-r from-primary to-secondary py-4 px-6">
            <h2 className="font-montserrat font-bold text-white text-xl">Login to Your Account</h2>
          </div>
          <div className="p-6">
            <LoginForm 
              onSuccess={closeModals} 
              onSwitchToRegister={openRegisterModal} 
            />
          </div>
        </DialogContent>
      </Dialog>

      {/* Register Modal */}
      <Dialog open={registerModalOpen} onOpenChange={setRegisterModalOpen}>
        <DialogContent className="bg-darkbg border border-mediumbg">
          <div className="bg-gradient-to-r from-secondary to-primary py-4 px-6">
            <h2 className="font-montserrat font-bold text-white text-xl">Create an Account</h2>
          </div>
          <div className="p-6">
            <RegisterForm 
              onSuccess={closeModals} 
              onSwitchToLogin={openLoginModal} 
            />
          </div>
        </DialogContent>
      </Dialog>
    </header>
  );
}
