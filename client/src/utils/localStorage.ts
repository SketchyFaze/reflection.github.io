// LocalStorage utilities for data persistence

// User data
export const saveUserData = (userData: any) => {
  localStorage.setItem('reflectionCurrentUser', JSON.stringify(userData));
};

export const loadUserData = () => {
  const data = localStorage.getItem('reflectionCurrentUser') || localStorage.getItem('onlineGoCurrentUser');
  return data ? JSON.parse(data) : null;
};

export const clearUserData = () => {
  localStorage.removeItem('reflectionCurrentUser');
  // Also clear old keys for compatibility
  localStorage.removeItem('onlineGoCurrentUser');
};

// Game settings (admin controlled)
export const saveGameSettings = (settings: any) => {
  localStorage.setItem('reflectionGameSettings', JSON.stringify(settings));
};

export const loadGameSettings = () => {
  const data = localStorage.getItem('reflectionGameSettings') || localStorage.getItem('onlineGoGameSettings');
  return data ? JSON.parse(data) : null;
};

// Community data
export const saveCommunityRolls = (count: number) => {
  localStorage.setItem('reflectionCommunityRolls', count.toString());
};

export const loadCommunityRolls = (): number => {
  return parseInt(localStorage.getItem('reflectionCommunityRolls') || localStorage.getItem('onlineGoCommunityRolls') || '0');
};

// Recent rolls for community feed
export interface RecentRoll {
  username: string;
  itemName: string;
  timestamp: number;
}

export const addRecentRoll = (roll: RecentRoll) => {
  const recentRolls = loadRecentRolls();
  recentRolls.unshift(roll);
  
  // Keep only 5 most recent rolls
  const updatedRolls = recentRolls.slice(0, 5);
  localStorage.setItem('reflectionRecentRolls', JSON.stringify(updatedRolls));
};

export const loadRecentRolls = (): RecentRoll[] => {
  const data = localStorage.getItem('reflectionRecentRolls') || localStorage.getItem('onlineGoRecentRolls');
  return data ? JSON.parse(data) : [];
};

// Format a timestamp for display
export const formatTimeAgo = (timestamp: number): string => {
  const seconds = Math.floor((Date.now() - timestamp) / 1000);
  
  if (seconds < 60) {
    return 'just now';
  } else if (seconds < 3600) {
    const minutes = Math.floor(seconds / 60);
    return `${minutes} minute${minutes > 1 ? 's' : ''} ago`;
  } else if (seconds < 86400) {
    const hours = Math.floor(seconds / 3600);
    return `${hours} hour${hours > 1 ? 's' : ''} ago`;
  } else {
    const days = Math.floor(seconds / 86400);
    return `${days} day${days > 1 ? 's' : ''} ago`;
  }
};
