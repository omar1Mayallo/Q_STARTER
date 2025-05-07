import { create } from "zustand";

export interface SideNavStateI {
  isOpen: boolean;
  toggleSideNav: () => void;
}

const useSideDrawerStore = create<SideNavStateI>((set) => {
  const isScreenSmall = window.innerWidth < 900;

  return {
    isOpen: !isScreenSmall,
    toggleSideNav: () => set((state) => ({ isOpen: !state.isOpen })),
  };
});

export default useSideDrawerStore;
