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
    <div className='cursor-pointer'>
      {currentTheme === "dark" ? (
        <div onClick={() => setTheme("light")}>
          <div className='text-white hover:bg-white/10 p-2.5 rounded-xl transition-all duration-300'>
            <Sun size={16} />
          </div>
        </div>
      ) : (
        <div onClick={() => setTheme("dark")}>
          <div className='text-white hover:bg-white/10 p-2.5 rounded-xl transition-all duration-300'>
            <Moon size={16} />
          </div>
        </div>
      )}
    </div>
  );
}
