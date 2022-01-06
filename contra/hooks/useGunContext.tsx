/*
 * Provide one instance of gun to your entire app.
 * NOTE Using this component blocks render until gun is ready
 *
 * Usage examples:
 * // index.js
 *   import { GunContextProvider } from './useGunContext'
 *   // ...
 *   <GunContextProvider>
 *     <App />
 *   </GunContextProvider>
 *
 * // App.js
 *   import useGunContext from './useGunContext'
 *   // ...
 *   const { getGun, getUser } = useGunContext()
 *
 *   getGun().get('ours').put('this')
 *   getUser().get('mine').put('that')
 */
import Gun from "gun/gun";
import "gun/sea";
import "./gun.unset";
import React, {
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import { ProfileDetails, UserLink } from "../types";

const createDefaultUserProfile = (username: string) => ({
  username,
  avatar: "",
  displayName: "",
  bio: "",
  privacyType: "PUBLIC",
});

export const useGun = () => {
  const gunRef = useRef<any>();
  const userRef = useRef<any>();
  const certificateRef = useRef<any>();
  const accessTokenRef = useRef<any>();
  const onAuthCbRef = useRef<any>();
  const [userProfile, setUserProfile] = useState<ProfileDetails | null>(null);
  const [links, setLinks] = useState<UserLink[]>([]);
  // console.log({ links }, "!!!");

  //////////////////////////////////////////

  const getGun = () => gunRef.current;
  const getUser = () => userRef.current;
  const getCertificate = () => certificateRef.current;

  //////////////////////////////////////////

  const _setUserProfile = () => {
    getGun()
      .get(`~${process.env.NEXT_PUBLIC_APP_PUBLIC_KEY}`)
      .get("profiles")
      .get(getUser().is.pub)
      .once((profile: any) => {
        if (profile) {
          setUserProfile(profile);
        } else {
          getUser()
            .get("alias")
            .once((username: string) => {
              const defaultProfile = createDefaultUserProfile(username);
              getGun()
                .get(`~${process.env.NEXT_PUBLIC_APP_PUBLIC_KEY}`)
                .get("profiles")
                .get(getUser().is.pub)
                .put(defaultProfile, null, {
                  opt: { cert: getCertificate() },
                });
              setUserProfile(defaultProfile);
            });
        }
      });
  };

  const _setLinks = () => {
    getGun()
      .get(`~${process.env.NEXT_PUBLIC_APP_PUBLIC_KEY}`)
      .get("profiles")
      .get(getUser().is.pub)
      .get("links")
      .map()
      .once((link: any, id: string) => {
        const newLink = {
          id,
          label: link.label,
          url: link.url,
          type: link.type,
        };
        setLinks((li) => [...li, newLink]);
      });
  };

  const _deleteLink = (id: string) => {
    const link = getGun().get(id);
    getGun()
      .get(`~${process.env.NEXT_PUBLIC_APP_PUBLIC_KEY}`)
      .get("profiles")
      .get(getUser().is.pub)
      .get("links")
      .unset(link, null, {
        opt: { cert: getCertificate() },
      });
  };

  const clearSession = () => {
    setUserProfile(null);
    const user = getUser();

    user.leave();

    // check if logout failed, if so manually remove
    // user from session storage
    // see https://gun.eco/docs/User#user-leave
    if ((user as any)._.sea) {
      window.sessionStorage.removeItem("pair");
    }

    certificateRef.current = null;
    accessTokenRef.current = null;
  };

  useEffect(() => {
    (Gun as any).on("opt", (ctx: any) => {
      if (ctx.once) return;

      ctx.on("out", function (msg: any) {
        // @ts-ignore
        const to = this.to;
        // Adds headers for put
        msg.headers = {
          accessToken: accessTokenRef.current,
        };
        to.next(msg); // pass to next middleware

        if (msg.err === "Invalid access token") {
          // not implemented: handle invalid access token
          // you might want to do a silent refresh, or
          // redirect the user to a log in page
        }
      });
    });

    const gun = Gun(["http://localhost:8765/gun"]);

    // create user
    const user = gun
      .user()
      // save user creds in session storage
      // this appears to be the only type of storage supported.
      // use broadcast channels to sync between tabs
      .recall({ sessionStorage: true });

    (gun as any).on("auth", (...args: any) => {
      if (!accessTokenRef.current) {
        // get new token
        user.get("alias").once((username) => {
          // console.log({
          //   tokenRefresh: {
          //     username,
          //     pub: (user as any).is.pub,
          //   },
          // });
          fetch("http://localhost:8765/api/tokens", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              username,
              pub: (user as any).is.pub,
            }),
          })
            .then((resp) => resp.json())
            .then(({ accessToken }) => {
              // console.log({ renewToken: accessToken });
              // store token in app memory
              accessTokenRef.current = accessToken;
            });
        });
      }

      if (!certificateRef.current) {
        // get new certificate
        user.get("alias").once((username) => {
          // console.log({
          //   certRefresh: {
          //     username,
          //     pub: (user as any).is.pub,
          //   },
          // });
          fetch("http://localhost:8765/api/certificates", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              username,
              pub: (user as any).is.pub,
            }),
          })
            .then((resp) => resp.json())
            .then(({ certificate }) => {
              // store certificate in app memory
              // TODO check if expiry isn't working or misconfigured
              // TODO handle expired certificates
              certificateRef.current = certificate;
              _setUserProfile();
            });
        });
      }

      if (onAuthCbRef.current) {
        onAuthCbRef.current(...args);
      }
    });

    gunRef.current = gun;
    userRef.current = user;
  }, []);

  console.log({
    accessTokenRef: accessTokenRef?.current,
    certificate: certificateRef.current,
    userProfile,
  });

  return {
    userProfile,
    setUserProfile: _setUserProfile,
    setLinks: _setLinks,
    deleteLink: _deleteLink,
    links,
    getGun: getGun,
    getUser: getUser,
    getCertificate: getCertificate,
    setCertificate: (v: string | null) => {
      certificateRef.current = v;
    },
    onAuth: (cb: any) => {
      onAuthCbRef.current = cb;
    },
    clearSession: clearSession,
  };
};

const GunContext = createContext<ReturnType<typeof useGun> | null>(null);

export const useGunContext = () => useContext(GunContext)!;

export function GunContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  return <GunContext.Provider value={useGun()}>{children}</GunContext.Provider>;
}

// export const GunContextProvider: FC<PropTypes> = ({ children }) => {
//   const gunRef = useRef<any>();
//   const userRef = useRef<any>();
//   const onAuthCbRef = useRef<any>();

//   useEffect(() => {
//     // (GUN as any).on("opt", (ctx: any) => {
//     //   if (ctx.once) return;

//     //   ctx.on("out", function (msg: any) {
//     //     // @ts-ignore
//     //     const to = this.to;

//     //     // Adds headers for put
//     //     msg.headers = {
//     //       accessToken: accessTokenRef.current,
//     //     };
//     //     to.next(msg); // pass to next middleware

//     //     if (msg.err === "Invalid access token") {
//     //       // not implemented: handle invalid access token
//     //       // you might want to do a silent refresh, or
//     //       // redirect the user to a log in page
//     //     }
//     //   });
//     // });

//     const gun = GUN([RELAY_DEV_SERVER]);
//     // create user
//     const user = gun
//       .user()
//       // save user creds in session storage
//       // this appears to be the only type of storage supported.
//       // use broadcast channels to sync between tabs
//       .recall({ sessionStorage: true });

//     // (gun as any).on("auth", (...args: any[]) => {
//     //   if (!accessTokenRef.current) {
//     //     // get new token
//     //     console.log("get new token");
//     //     user.get("alias").once((username) => {
//     //       console.log(
//     //         { username, pub: (user as any).is.pub, RELAY_DEV_SERVER },
//     //         "TOKEN"
//     //       );
//     //       fetch(`${RELAY_DEV_SERVER}/api/tokens`, {
//     //         method: "POST",
//     //         // headers: {
//     //         //   "Content-Type": "application/json",
//     //         // },
//     //         body: JSON.stringify({
//     //           username,
//     //           pub: (user as any).is.pub,
//     //         }),
//     //       })
//     //         .then((resp) => {
//     //           const s = resp.json();
//     //           console.log({ resp: s });
//     //           return s;
//     //         })
//     //         .then((r) => {
//     //           console.log({ r });
//     //           // store token in app memory
//     //           accessTokenRef.current = r.accessToken;
//     //         });
//     //     });
//     //   }

//     //   if (!certificateRef.current) {
//     //     console.log({ pub: (user as any).is.pub });
//     //     // get new certificate
//     //     user.get("alias").once((username) => {
//     //       console.log({
//     //         username,
//     //         pub: (user as any).is.pub,
//     //       });
//     //       fetch(`${RELAY_DEV_SERVER}/api/certificates`, {
//     //         method: "POST",
//     //         // headers: {
//     //         //   "Content-Type": "application/json",
//     //         // },
//     //         body: JSON.stringify({
//     //           username,
//     //           pub: (user as any).is.pub,
//     //         }),
//     //       })
//     //         .then((resp) => resp.json())
//     //         .then(({ certificate }) => {
//     //           console.log({ certificate });
//     //           // store certificate in app memory
//     //           // TODO check if expiry isn't working or misconfigured
//     //           // TODO handle expired certificates
//     //           certificateRef.current = certificate;
//     //         });
//     //     });
//     //   }

//     //   if (onAuthCbRef.current) {
//     //     onAuthCbRef.current(...args);
//     //   }
//     // });

//     gunRef.current = gun;
//     userRef.current = user;
//   }, []);

//   return (
//     <GunContext.Provider
//       value={{
//         getGun: () => gunRef.current,
//         getUser: () => userRef.current,
//         // getCertificate: () => certificateRef.current,
//         // setCertificate: (v) => {
//         //   certificateRef.current = v;
//         // },
//         onAuth: (cb) => {
//           onAuthCbRef.current = cb;
//         },
//       }}
//     >
//       {children}
//     </GunContext.Provider>
//   );
// };

// export default function useGunContext() {
//   return useContext(GunContext);
// }
