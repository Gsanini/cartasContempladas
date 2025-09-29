"use client";

import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

export function ThemeToggle() {
  const { theme, setTheme, systemTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const currentTheme = theme === "system" ? systemTheme : theme;

  return (
    <div className="cursor-pointer">
      {currentTheme === "dark" ? (
        <div onClick={() => setTheme("light")}>
          <div className="text-white hover:bg-gray-300/30 p-2 rounded-full transition-colors duration-300">
            <Sun size={18} />
          </div>
        </div>
      ) : (
        <div onClick={() => setTheme("dark")}>
          <div className="text-white hover:bg-gray-300/30 p-2 rounded-full transition-colors duration-300">
            <Moon size={18} />
          </div>
        </div>
      )}
    </div>
  );
}
