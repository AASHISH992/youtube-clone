import { create } from "zustand";

const useAuthStore = create((set) => ({
  user: null,
  isLoggedIn: false,
  isLoading: true,

  setUser: (userData) =>
    set({
      user: userData,
      isLoggedIn: true,
      isLoading: false,
    }),

  clearUser: () =>
    set({
      user: null,
      isLoggedIn: false,
      isLoading: false,
    }),

  setLoading: (loadingStatus) =>
    set({
      isLoading: loadingStatus,
    }),
}));

export default useAuthStore ;
export { useAuthStore };
