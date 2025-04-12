import { Switch, Route } from "wouter";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "./lib/queryClient";
import { Toaster } from "@/components/ui/toaster";
import Home from "@/pages/Home";
import Collection from "@/pages/Collection";
import LeaderboardPage from "@/pages/LeaderboardPage";
import Profile from "@/pages/Profile";
import NotFound from "@/pages/not-found";
import { AuthProvider } from "@/contexts/AuthContext";
import { GameProvider } from "@/contexts/GameContext";
import Header from "@/components/layout/Header";
import MobileNav from "@/components/layout/MobileNav";
import AdminPanel from "@/components/admin/AdminPanel";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/collection" component={Collection} />
      <Route path="/leaderboard" component={LeaderboardPage} />
      <Route path="/profile" component={Profile} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <GameProvider>
          <div className="min-h-screen flex flex-col font-nunito text-white bg-darkbg bg-[radial-gradient(circle_at_25%_25%,rgba(59,130,246,0.1)_0%,transparent_10%),radial-gradient(circle_at_75%_75%,rgba(139,92,246,0.1)_0%,transparent_10%)] bg-[size:50px_50px]">
            <Header />
            <div className="flex-grow pb-16 lg:pb-0">
              <Router />
            </div>
            <MobileNav />
            <AdminPanel />
            <Toaster />
          </div>
        </GameProvider>
      </AuthProvider>
    </QueryClientProvider>
  );
}

export default App;
