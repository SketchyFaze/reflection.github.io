import { useState } from 'react';
import { Link } from 'wouter';
import { useAuth } from '@/contexts/AuthContext';

export default function UserMenu() {
  const { user, logout } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  
  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const closeMenu = () => setIsMenuOpen(false);
  
  if (!user) return null;
  
  const initial = user.username.charAt(0);
  
  return (
    <div className="relative group" onMouseLeave={closeMenu}>
      <button 
        onClick={toggleMenu}
        className="flex items-center gap-2 bg-mediumbg hover:bg-mediumbg/80 px-3 py-2 rounded transition"
      >
        <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center">
          <span className="font-bold text-white">{initial}</span>
        </div>
        <span className="font-montserrat">{user.username}</span>
        <i className="fas fa-caret-down text-xs"></i>
      </button>
      
      {isMenuOpen && (
        <div className="absolute right-0 mt-2 w-48 bg-darkbg border border-mediumbg rounded shadow-lg py-1 z-10">
          <Link 
            to="/profile" 
            className="block px-4 py-2 text-sm hover:bg-mediumbg"
            onClick={closeMenu}
          >
            <i className="fas fa-user mr-2"></i> Profile
          </Link>
          
          {user.isAdmin && (
            <button 
              onClick={(e) => {
                e.preventDefault();
                closeMenu();
                document.getElementById('admin-panel-modal')?.classList.remove('hidden');
              }}
              className="w-full text-left block px-4 py-2 text-sm hover:bg-mediumbg"
            >
              <i className="fas fa-shield-alt mr-2 text-amber-400"></i> Admin Panel
            </button>
          )}
          
          <div className="border-t border-mediumbg my-1"></div>
          
          <button 
            onClick={() => {
              logout();
              closeMenu();
            }}
            className="w-full text-left block px-4 py-2 text-sm hover:bg-mediumbg text-red-400"
          >
            <i className="fas fa-sign-out-alt mr-2"></i> Logout
          </button>
        </div>
      )}
    </div>
  );
}
