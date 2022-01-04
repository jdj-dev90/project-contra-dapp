import { IGunChainReference } from "gun/types/chain";

export interface UserTheme {
  primaryColor: string;
}

export type Gun = IGunChainReference<any, any, "pre_root">;

export type GunUser = IGunChainReference;
export interface BaseUserDetails {
  userId: string;
  avatar: string;
  displayName: string;
}
export interface UserDetails extends BaseUserDetails {
  bio: string;
  username: string;
  privacyType: string;
}

export interface UserLink {
  id: string;
  type: string;
  label: string;
  url: string;
}
export type UserData = { userId: string; isLoggedIn: boolean };
export type GunData = { gun: Gun; user: User };

export type User = Gun & {
  is: { alias: string; epub: string; pub: string };
};
export interface AppContext {
  userId: string;
  isLoggedIn: boolean;
  setUser: (userData: UserData) => void;
  reset: () => void;
}

export interface UseGunState {
  gun: Gun;
  user: User;
}

export interface UseUserState {
  userId: string;
  isLoggedIn: boolean;
}

export interface UseGunActions {
  reset: () => void;
}

export interface UseUserActions {
  setUser: (userData: UserData) => void;
  reset: () => void;
}
