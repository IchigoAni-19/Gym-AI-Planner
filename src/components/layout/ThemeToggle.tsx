import { MoonStar, SunMedium } from "lucide-react";
import { Button } from "../ui/Button";
import { useThemeMode } from "../../context/useThemeMode";

export default function ThemeToggle() {
  const { theme, toggleTheme } = useThemeMode();
  const next = theme === "dark" ? "light" : "dark";

  return (
    <Button
      variant="ghost"
      size="sm"
      className="gap-2 group"
      onClick={toggleTheme}
      type="button"
      aria-label={`Switch to ${next} theme`}
    >
      <span className="relative w-4 h-4 inline-flex items-center justify-center">
        <SunMedium
          className="w-4 h-4 absolute transition-all duration-300 group-hover:rotate-45"
          style={{
            opacity: theme === "dark" ? 0 : 1,
            transform: theme === "dark" ? "scale(0.5)" : "scale(1)",
          }}
        />
        <MoonStar
          className="w-4 h-4 absolute transition-all duration-300 group-hover:-rotate-12"
          style={{
            opacity: theme === "dark" ? 1 : 0,
            transform: theme === "dark" ? "scale(1)" : "scale(0.5)",
          }}
        />
      </span>
      <span className="hidden sm:inline">{theme === "dark" ? "Light" : "Dark"}</span>
    </Button>
  );
}
