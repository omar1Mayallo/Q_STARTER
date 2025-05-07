/* eslint-disable @typescript-eslint/no-explicit-any */
import { create } from "zustand";
import { UserModel } from "../shared/types/models/User.model";
import Cookies from "js-cookie";

interface UserState {
  token?: string;
  user?: UserModel;
  userPermissions?: any;
  userActions?: string[];
  setToken: (token: string) => void;
  setUser: (user: UserModel) => void;
  setUserPermissions: (userPermissions: any) => void;
  setUserActions: (userActions: string[]) => void;
}

const useUserStore = create<UserState>((set) => ({
  token: Cookies.get("token"),
  user: undefined,
  userPermissions: undefined,
  userActions: undefined,
  setToken: (token) => {
    Cookies.set("token", token);
    set({ token });
  },
  setUser: (user) => set({ user }),
  setUserPermissions: (userPermissions: any) => set({ userPermissions }),
  setUserActions: (userActions: string[]) => set({ userActions }),
}));

export default useUserStore;
