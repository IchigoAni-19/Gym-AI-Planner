import { useEffect, useRef, useState } from "react";
import {
  Dumbbell,
  LogOut,
  Settings,
  ChevronDown,
} from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "../ui/Button";
import { useAuth } from "../../context/useAuth";
import ThemeToggle from "./ThemeToggle";

export default function Navbar() {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  async function handleSignOut() {
    setMenuOpen(false);
    await signOut();
    navigate("/");
  }

  useEffect(() => {
    function onClickOutside(e: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setMenuOpen(false);
      }
    }
    document.addEventListener("mousedown", onClickOutside);
    return () => document.removeEventListener("mousedown", onClickOutside);
  }, []);

  const displayText =
    user?.email || user?.name || (user?.id ? user.id.slice(0, 8) + "..." : "");
  const avatarLabel =
    user?.name
      ? user.name
          .split(" ")
          .map((n) => n[0])
          .slice(0, 2)
          .join("")
          .toUpperCase()
      : user?.email
        ? user.email[0].toUpperCase()
        : "U";

  return (
    <header className="fixed top-0 left-0 right-0 z-50 border-b border-border bg-background/90 backdrop-blur-md">
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        <a
          href="/"
          className="flex items-center gap-2 text-foreground group"
          title="Back to Home"
        >
          <span className="w-9 h-9 rounded-xl bg-accent/10 flex items-center justify-center group-hover:bg-accent/20 group-hover:scale-110 transition-all duration-300">
            <Dumbbell className="w-5 h-5 text-accent" />
          </span>
          <span className="font-semibold text-lg tracking-tight">GymAI</span>
        </a>

        <nav className="flex items-center gap-3">
          <ThemeToggle />
          {user ? (
            <>
              <Link to="/profile">
                <Button variant="ghost" size="sm" className="hidden sm:inline-flex text-sm">
                  My Plan
                </Button>
              </Link>
              <div className="relative" ref={menuRef}>
              <Button
                variant="secondary"
                size="sm"
                className="gap-2 pr-2 pl-2.5"
                onClick={() => setMenuOpen((v) => !v)}
                type="button"
                aria-expanded={menuOpen}
                aria-haspopup="menu"
              >
                <span className="w-7 h-7 rounded-full bg-accent text-accent-foreground flex items-center justify-center text-xs font-bold">
                  {avatarLabel}
                </span>
                <span className="hidden sm:inline max-w-[180px] truncate text-sm">
                  {displayText}
                </span>
                <ChevronDown
                  className={`w-4 h-4 transition-transform duration-300 ${
                    menuOpen ? "rotate-180" : ""
                  }`}
                />
              </Button>

              {menuOpen && (
                <div
                  className="absolute right-0 mt-2 w-64 rounded-2xl border border-border bg-card shadow-xl overflow-hidden animate-scale-in origin-top-right"
                  role="menu"
                >
                  <div className="px-4 py-3 border-b border-border bg-accent/5">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-full bg-accent text-accent-foreground flex items-center justify-center text-sm font-bold shrink-0">
                        {avatarLabel}
                      </div>
                      <div className="min-w-0">
                        {user?.name && (
                          <p className="text-sm font-medium text-foreground truncate">
                            {user.name}
                          </p>
                        )}
                        {user?.email && (
                          <p className="text-xs text-muted-foreground truncate">
                            {user.email}
                          </p>
                        )}
                        {!user?.name && !user?.email && (
                          <p className="text-xs text-muted-foreground truncate">
                            Signed in
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="py-1">
                    <Link
                      to="/settings"
                      onClick={() => setMenuOpen(false)}
                      className="flex items-center gap-3 px-4 py-2.5 text-sm text-foreground hover:bg-accent/10 hover:text-accent transition-colors duration-200"
                      role="menuitem"
                    >
                      <Settings className="w-4 h-4" />
                      Settings
                    </Link>
                    <button
                      type="button"
                      onClick={handleSignOut}
                      className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-foreground hover:bg-accent/10 hover:text-accent transition-colors duration-200 text-left"
                      role="menuitem"
                    >
                      <LogOut className="w-4 h-4" />
                      Sign Out
                    </button>
                  </div>
                </div>
              )}
            </div>
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
