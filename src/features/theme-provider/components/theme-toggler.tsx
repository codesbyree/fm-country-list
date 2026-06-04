import { useShallow } from "zustand/shallow";
import { useTheme } from "../stores/theme.stores";
import { SunIcon, MoonIcon } from "lucide-react";

import Button from "../../../components/ui/button";

export default function ThemeToggler() {
  const { theme, setTheme } = useTheme(
    useShallow((s) => ({
      theme: s.theme,
      setTheme: s.setTheme,
    })),
  );

  const toggleTheme = () => {
    if (theme === "dark") setTheme("light");
    else setTheme("dark");
  };

  const content = {
    dark: (
      <>
        <SunIcon className="w-4 h-4" /> Light Mode
      </>
    ),
    light: (
      <>
        <MoonIcon className="w-4 h-4" /> Dark Mode
      </>
    ),
  };

  return <Button onClick={toggleTheme}>{content[theme]}</Button>;
}
