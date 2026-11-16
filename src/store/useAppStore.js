import { create } from 'zustand';
import { persist } from 'zustand/middleware';

const initialCities = ['Mumbai', 'Delhi', 'Bangalore', 'Hyderabad', 'Chennai', 'Kolkata', 'Pune'];

export const useAppStore = create(
  persist(
    (set, get) => ({
      selectedCity: 'Bangalore',
      cities: initialCities,
      languageFilters: ['Hindi'],
      formatFilters: [],
      searchQuery: '',
      reminders: {},
      selectedShowtime: null,
      selectedMovie: null,
      toast: null,
      setCity: (city) => set({ selectedCity: city }),
      setSearchQuery: (value) => set({ searchQuery: value }),
      toggleLanguage: (lang) => {
        const current = get().languageFilters;
        const exists = current.includes(lang);
        const next = exists ? current.filter((item) => item !== lang) : [...current, lang];
        set({ languageFilters: next.length ? next : ['Hindi'] });
      },
      toggleFormat: (format) => {
        const current = get().formatFilters;
        const exists = current.includes(format);
        set({ formatFilters: exists ? current.filter((item) => item !== format) : [...current, format] });
      },
      clearFilters: () => set({ languageFilters: ['Hindi'], formatFilters: [] }),
      setSelectedMovie: (movie) => set({ selectedMovie: movie }),
      setSelectedShowtime: (showtime) => set({ selectedShowtime: showtime }),
      setReminder: (movieId, value) => set((state) => ({ reminders: { ...state.reminders, [movieId]: value } })),
      showToast: (message, type = 'info') => set({ toast: { message, type } }),
      dismissToast: () => set({ toast: null }),
    }),
    {
      name: 'cinepass-store',
      partialize: (state) => ({
        selectedCity: state.selectedCity,
        reminders: state.reminders,
      }),
    }
  )
);
