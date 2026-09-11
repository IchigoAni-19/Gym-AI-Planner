import {
  BrowserRouter,
  Link as RouterLink,
  Route,
  Routes,
  useLocation,
  useNavigate,
} from "react-router-dom";
import Home from "./pages/Home";
import Onboarding from "./pages/Onboarding";
import Profile from "./pages/Profile";
import Auth from "./pages/Auth";
import Account from "./pages/Account";
import Navbar from "./components/layout/Navbar";
import { NeonAuthUIProvider, useTheme as useNeonTheme } from "@neondatabase/neon-js/auth/react";
import { authClient } from "./lib/auth";
import AuthProvider from "./context/AuthProvider";
import ThemeProvider from "./context/ThemeProvider";
import { useThemeMode } from "./context/useThemeMode";
import { useEffect } from "react";

function ShellContent() {
  const location = useLocation();
  const isAuthPage = location.pathname.startsWith("/auth/");

  return (
    <div className="min-h-screen flex flex-col">
      {!isAuthPage && <Navbar />}
      <main className="flex-1">
        <Routes>
          <Route index element={<Home />} />
          <Route path="/onboarding" element={<Onboarding />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/auth/:pathname" element={<Auth />} />
          <Route path="/auth/callback" element={<Auth />} />
          <Route path="/settings" element={<Account />} />
          <Route path="/account/:pathname" element={<Account />} />
        </Routes>
      </main>
    </div>
  );
}

// Syncs our ThemeProvider state into the NeonAuth UI theme system.
// Must be rendered inside NeonAuthUIProvider.
function NeonThemeSync() {
  const { theme } = useThemeMode();
  const { setTheme } = useNeonTheme();
  useEffect(() => {
    setTheme(theme);
  }, [theme, setTheme]);
  return null;
}

function AppShell() {
  const { theme } = useThemeMode();
  const navigate = useNavigate();
  const appOrigin = window.location.origin;

  return (
    <NeonAuthUIProvider
      authClient={authClient}
      defaultTheme={theme}
      baseURL={appOrigin}
      basePath="/auth"
      social={{ providers: ["google"] }}
      redirectTo="/profile"
      navigate={navigate}
      replace={(to) => navigate(to, { replace: true })}
      Link={({ href, className, children }) => (
        <RouterLink to={href} className={className}>
          {children}
        </RouterLink>
      )}
    >
      <NeonThemeSync />
      <AuthProvider>
        <ShellContent />
      </AuthProvider>
    </NeonAuthUIProvider>
  );
}

function App() {
  return (
    <ThemeProvider>
      <BrowserRouter>
        <AppShell />
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
