"use client";

import { create } from "zustand";

interface UIState {
  commandOpen: boolean;
  searchOpen: boolean;
  notificationsOpen: boolean;
  setCommandOpen: (v: boolean) => void;
  setSearchOpen: (v: boolean) => void;
  setNotificationsOpen: (v: boolean) => void;
}

export const useUIStore = create<UIState>((set) => ({
  commandOpen: false,
  searchOpen: false,
  notificationsOpen: false,
  setCommandOpen: (v) => set({ commandOpen: v }),
  setSearchOpen: (v) => set({ searchOpen: v }),
  setNotificationsOpen: (v) => set({ notificationsOpen: v }),
}));
