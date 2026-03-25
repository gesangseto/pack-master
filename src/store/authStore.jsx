import { create } from 'zustand';

export const useAuthStore = create((set) => ({
  user: null,

  login: (userData) => {
    set({ user: userData });

    // simpan ke localStorage
    localStorage.setItem('user', JSON.stringify(userData));
  },

  logout: () => {
    set({ user: null });
    localStorage.removeItem('user');
  },

  // init dari localStorage (biar tidak hilang saat refresh)
  init: () => {
    const stored = localStorage.getItem('user');
    if (stored) {
      set({ user: JSON.parse(stored) });
    }
  },
}));
