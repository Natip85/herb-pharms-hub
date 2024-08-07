"use client";
import { motion } from "framer-motion";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { useEffect } from "react";
export default function SliderThemeToggle() {
  const { theme, setTheme } = useTheme();
  useEffect(() => {
    setTheme("system");
  }, []);
  const TOGGLE_CLASSES =
    "text-sm font-medium flex items-center gap-2 px-3 md:pl-3 md:pr-3.5 py-3 md:py-1.5 transition-colors relative z-10";

  return (
    <div className="relative flex w-fit items-center rounded-full bg-secondary">
      <button
        className={`${TOGGLE_CLASSES} ${
          theme === "light" ? "text-white" : "text-slate-300"
        }`}
        onClick={() => {
          setTheme("light");
        }}
      >
        <Sun className="relative z-10 text-lg md:text-sm size-5" />
      </button>
      <button
        className={`${TOGGLE_CLASSES} ${
          theme === "dark" ? "text-white" : "text-slate-800"
        }`}
        onClick={() => {
          setTheme("dark");
        }}
      >
        <Moon className="relative z-10 text-lg md:text-sm size-5 text-black" />
      </button>
      <div
        className={`absolute inset-0 z-0 flex ${
          theme === "dark" ? "justify-end" : "justify-start"
        }`}
      >
        <motion.span
          layout
          transition={{ type: "spring", damping: 15, stiffness: 250 }}
          className="h-full w-1/2 rounded-full bg-gradient-to-r from-green-400 to-emerald-500"
        />
      </div>
    </div>
  );
}
