import { MoonStar, SunMedium } from "lucide-react";
import { Button } from "../ui/Button";
import { useThemeMode } from "../../context/useThemeMode";

export default function ThemeToggle() {
  const { theme, toggleTheme } = useThemeMode();

  return (
    <Button
      variant="ghost"
      size="sm"
      className="gap-2"
      onClick={toggleTheme}
      type="button"
      aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} theme`}
    >
      {theme === "dark" ? (
        <SunMedium className="w-4 h-4" />
      ) : (
        <MoonStar className="w-4 h-4" />
      )}
      <span className="hidden sm:inline">
        {theme === "dark" ? "Light" : "Dark"}
      </span>
    </Button>
  );
}