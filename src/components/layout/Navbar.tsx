import { Dumbbell } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "../ui/Button";
import { useAuth } from "../../context/useAuth";
import { authClient } from "../../lib/auth";
import ThemeToggle from "./ThemeToggle";

export default function Navbar() {
  const { user } = useAuth();
  const navigate = useNavigate();

  async function handleSignOut() {
    await authClient.signOut();
    navigate("/");
  }

  return (
    <header className="fixed top-0 left-0 right-0 z-50 border-b border-border bg-background/80 backdrop-blur-md">
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        <Link
          to="/"
          className="flex items-center gap-2 text-foreground group"
        >
          <span className="w-9 h-9 rounded-xl bg-accent/10 flex items-center justify-center group-hover:bg-accent/20 group-hover:scale-110 transition-all duration-300">
            <Dumbbell className="w-5 h-5 text-accent" />
          </span>
          <span className="font-semibold text-lg tracking-tight">GymAI</span>
        </Link>

        <nav className="flex items-center gap-2">
          <ThemeToggle />
          {user ? (
            <>
              <Link to="/settings">
                <Button variant="ghost" size="sm">
                  Settings
                </Button>
              </Link>
              <Button variant="secondary" size="sm" onClick={handleSignOut}>
                Sign Out
              </Button>
            </>
          ) : (
            <>
              <Link to="/auth/sign-in">
                <Button variant="ghost" size="sm">
                  Sign In
                </Button>
              </Link>
              <Link to="/auth/sign-up">
                <Button size="sm">Sign Up</Button>
              </Link>
            </>
          )}
        </nav>
      </div>
    </header>
  );
}
