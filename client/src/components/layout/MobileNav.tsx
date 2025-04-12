import { Link, useLocation } from 'wouter';

export default function MobileNav() {
  const [location] = useLocation();

  const isActive = (path: string) => {
    return location === path;
  };

  const getLinkClasses = (path: string) => {
    return isActive(path)
      ? "flex flex-col items-center py-3 text-primary"
      : "flex flex-col items-center py-3 text-gray-400";
  };

  return (
    <nav className="lg:hidden fixed bottom-0 left-0 right-0 bg-darkbg border-t border-mediumbg shadow-lg z-40">
      <div className="flex justify-around">
        <Link to="/" className={getLinkClasses("/")}>
          <i className="fas fa-dice-d20 text-xl"></i>
          <span className="text-xs mt-1">Roll</span>
        </Link>
        <Link to="/collection" className={getLinkClasses("/collection")}>
          <i className="fas fa-box-open text-xl"></i>
          <span className="text-xs mt-1">Collection</span>
        </Link>
        <Link to="/leaderboard" className={getLinkClasses("/leaderboard")}>
          <i className="fas fa-trophy text-xl"></i>
          <span className="text-xs mt-1">Leaderboard</span>
        </Link>
        <Link to="/profile" className={getLinkClasses("/profile")}>
          <i className="fas fa-user text-xl"></i>
          <span className="text-xs mt-1">Profile</span>
        </Link>
      </div>
    </nav>
  );
}
