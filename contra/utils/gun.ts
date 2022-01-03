import GUN from "gun";
import "gun/sea";
import "gun/axe";
import { IGunChainReference } from "gun/types/chain";
import { BaseUserDetails, UserDetails, UserLink } from "../types";
import { useEffect } from "react";
// Database
export const gun = GUN({
  peers: ["http:localhost:8000/gun"], // Put the relay node that you want here
});
type User = IGunChainReference & {
  is: { alias: string; epub: string; pub: string };
};
// Gun User
export const user = gun.user().recall({ sessionStorage: true }) as User;

// Current User's username
// export const username = writable('');

// user.get('alias').on(v => username.set(v))

// db.on('auth', async(event) => {
//     const alias = await user.get('alias'); // username string
//     username.set(alias);

//     console.log(`signed in as ${alias}`);
// });

interface ss {
  userDetails: UserDetails;
  links: UserLink[];
  followers: BaseUserDetails[];
  following: BaseUserDetails[];
}
export const useMe = (userId: string, ...args: (keyof ss)[]) => {
  useEffect(() => {
    if (args.includes("userDetails")) {
      gun.get(`${userId}`).once((val) => {
        console.log({ val });
        sss.userDetails = val;
      });
      // user.get("userDetails").once((val) => {
      //   console.log({ val });
      //   sss.userDetails = val;
      // });
    }
    return () => {};
  }, []);
  const sss: any = {
    userDetails: "yo",
  };
  // gun.get('users').get(`${userId}`).get(`userDetails`).put(values);

  console.log({ args, sss });
  // const s = user.get('')
  //   const obj = {
  //     userId,
  //     userDetails:{
  //       avatar: string;
  //       bio: string;
  //       displayName: string;
  //       username: string;
  //       privacyType: string;
  //     }
  // links:[]
  //   }
};
