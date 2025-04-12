import { Link, useLocation } from 'wouter';
import CollectionProgress from '@/components/game/CollectionProgress';

export default function Sidebar() {
  const [location] = useLocation();

  const isActive = (path: string) => {
    return location === path;
  };

  const getLinkClasses = (path: string) => {
    return isActive(path)
      ? "flex items-center gap-3 px-4 py-2 bg-primary/10 text-primary rounded hover:bg-primary/20 transition"
      : "flex items-center gap-3 px-4 py-2 text-white rounded hover:bg-mediumbg/50 transition";
  };

  return (
    <div className="w-64 space-y-6">
      <nav className="bg-darkbg rounded-lg p-4 border border-mediumbg shadow-lg">
        <h3 className="font-montserrat font-semibold text-lg mb-4 text-white">Menu</h3>
        <ul className="space-y-1">
          <li>
            <Link to="/" className={getLinkClasses("/")}>
              <i className="fas fa-dice"></i>
              <span>Roll & Collect</span>
            </Link>
          </li>
          <li>
            <Link to="/leaderboard" className={getLinkClasses("/leaderboard")}>
              <i className="fas fa-trophy"></i>
              <span>Leaderboards</span>
            </Link>
          </li>
          <li>
            <Link to="/collection" className={getLinkClasses("/collection")}>
              <i className="fas fa-box-open"></i>
              <span>My Collection</span>
            </Link>
          </li>
          <li>
            <Link to="/profile" className={getLinkClasses("/profile")}>
              <i className="fas fa-user"></i>
              <span>Profile</span>
            </Link>
          </li>
          <li>
            <Link to="/help" className={getLinkClasses("/help")}>
              <i className="fas fa-question-circle"></i>
              <span>Help & Rules</span>
            </Link>
          </li>
        </ul>
      </nav>
      
      {/* Collection Progress Component */}
      <CollectionProgress />
    </div>
  );
}
