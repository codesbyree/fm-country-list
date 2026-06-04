import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

import type { Theme } from "../types/theme.types";

interface Store {
  theme: Theme;
  setTheme: (theme: Theme) => void;
}

export const useTheme = create<Store>()(
  persist(
    (set) => ({
      theme: "light",
      setTheme: (theme: Theme) => set({ theme }),
    }),
    {
      name: "theme-store",
      storage: createJSONStorage(() => localStorage),
    },
  ),
);
