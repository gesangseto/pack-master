import { create } from 'zustand';

export const useConfig = create((set) => ({
  config: null,
  setData: (data) => {
    set({ config: data });
    // simpan ke localStorage
    localStorage.setItem('config', JSON.stringify(data));
  },
  // init dari localStorage (biar tidak hilang saat refresh)
  init: () => {
    const stored = localStorage.getItem('config');
    if (stored) {
      set({ config: JSON.parse(stored) });
    }
  },
}));
