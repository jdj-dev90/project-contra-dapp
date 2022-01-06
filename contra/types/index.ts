import { IGunChainReference } from "gun/types/chain";
import { IGunStaticSEA } from "gun/types/static/sea";

export interface UserTheme {
  primaryColor: string;
}

export type Gun = IGunChainReference<any, any, false>;
export type SEA = IGunStaticSEA;

export type GunUser = IGunChainReference;
export interface ProfileDetails {
  avatar: string;
  displayName: string;
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

export interface UseGunActions {
  reset: () => void;
}
