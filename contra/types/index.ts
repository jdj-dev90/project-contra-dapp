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
  type: string;
  title: string;
  url: string;
}

export type User = Gun & {
  is: { alias: string; epub: string; pub: string };
};
export interface AppContext {
  userId: string;
  setUserId: (userId: string) => void;
  isLoggedIn: boolean;
  setIsLoggedIn: (isLoggedIn: boolean) => void;
  reset: () => void;
}
