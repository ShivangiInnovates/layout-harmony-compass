import React from "react";
import { Switch } from "@/components/ui/switch";
import { useTheme } from "@/contexts/ThemeContext";

const ThemeToggle = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <div className="flex items-center gap-2">
      <span className="text-xs">🌞</span>
      <Switch checked={theme === "dark"} onCheckedChange={toggleTheme} />
      <span className="text-xs">🌜</span>
    </div>
  );
};

export default ThemeToggle;
