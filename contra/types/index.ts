import { IGunChainReference } from "gun/types/chain";

export interface UserTheme {
  primaryColor: string;
}

export interface User {
  displayName: string;
  bio: string;
  links: string[];
  theme: UserTheme;
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
