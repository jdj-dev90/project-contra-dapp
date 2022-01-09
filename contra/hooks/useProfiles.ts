import create from "zustand";
import { ProfileDetails, UserLink } from "../types";

type ProfilesState = {
  userProfile: ProfileDetails | null;
  profiles: ProfileDetails[];
  userLinks: UserLink[];
  setUserProfile: (userProfile: ProfileDetails) => void;
  addProfile: (profile: ProfileDetails) => void;
  addUserLink: (link: UserLink) => void;
  removeLink: (linkId: string) => void;
};

const filterData = <T>(itemToAdd: T, arr: T[], key: keyof T) => {
  if (arr.findIndex((p: T) => p[key] === itemToAdd[key]) === -1) {
    return [...arr, itemToAdd];
  }
  return arr.map((item) => (item[key] === itemToAdd[key] ? itemToAdd : item));
};

export const useProfiles = create<ProfilesState>((set) => ({
  userProfile: null,
  profiles: [],
  userLinks: [],
  setUserProfile: (userProfile: ProfileDetails) =>
    set((state) => ({ userProfile: userProfile })),
  addProfile: (profile: ProfileDetails) =>
    set((state) => ({
      profiles: filterData<ProfileDetails>(profile, state.profiles, "username"),
    })),
  addUserLink: (link: UserLink) =>
    set((state) => ({
      userLinks: filterData<UserLink>(link, state.userLinks, "id"),
    })),
  removeLink: (linkId: string) =>
    set((state) => ({
      userLinks: state.userLinks.filter((link) => link.id !== linkId),
    })),
}));
