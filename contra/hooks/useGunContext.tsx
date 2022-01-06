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
import { useRouter } from "next/router";

const createUserProfile = ({
  username = "",
  avatar = "",
  displayName = "",
  bio = "",
  privacyType = "PUBLIC",
}: Partial<ProfileDetails>) => ({
  username: username,
  avatar: avatar,
  displayName: displayName,
  bio: bio,
  privacyType: privacyType,
});

export const useGun = () => {
  const gunRef = useRef<any>();
  const userRef = useRef<any>();
  const certificateRef = useRef<any>();
  const accessTokenRef = useRef<any>();
  const onAuthCbRef = useRef<any>();
  const [userProfile, setUserProfile] = useState<ProfileDetails | null>(null);
  const [links, setLinks] = useState<UserLink[]>([]);
  const [authError, setAuthError] = useState<string | null>(null);

  //////////////////////////////////////////

  const _getGun = () => gunRef.current;
  const _getUser = () => userRef.current;
  const _getCertificate = () => certificateRef.current;
  //////////////////////////////////////////

  const router = useRouter();

  const _setUserProfile = (username:string) => {
    console.log({username})
    _getGun()
      .get(`~${process.env.NEXT_PUBLIC_APP_PUBLIC_KEY}`)
      .get("profiles")
      .get(username)
      .once((profile: any) => {
        if (profile) {
          setUserProfile(createUserProfile(profile));
        } else {
          _getUser()
            .get("alias")
            .once((username: string) => {
              const defaultProfile = createUserProfile({
                username,
              });
              _getGun()
                .get(`~${process.env.NEXT_PUBLIC_APP_PUBLIC_KEY}`)
                .get("profiles")
                .get(userProfile?.username)
                .put(defaultProfile, null, {
                  opt: { cert: _getCertificate() },
                });
              setUserProfile(defaultProfile);
            });
        }
      });
  };


  // const _setProfiles = () => {
  //   _getGun()
  //     .get(`~${process.env.NEXT_PUBLIC_APP_PUBLIC_KEY}`)
  //     .get("profiles")
  //     .map()
  //     .once((profile: any, id: string) => {
  //       const newProfile = {
  //         id,
  //         label: profile.label,
  //         url: profile.url,
  //         type: profile.type,
  //       };
  //       console.log({newProfile})
  //       setLinks((pr) => [...pr, newProfile]);
  //     });
  // };


  const _setLinks = () => {
    _getGun()
      .get(`~${process.env.NEXT_PUBLIC_APP_PUBLIC_KEY}`)
      .get("profiles")
      .get(userProfile?.username)
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
    const link = _getGun().get(id);
    _getGun()
      .get(`~${process.env.NEXT_PUBLIC_APP_PUBLIC_KEY}`)
      .get("profiles")
      .get(userProfile?.username)
      .get("links")
      .unset(link, null, {
        opt: { cert: _getCertificate() },
      });
  };

  const _clearSession = () => {
    setUserProfile(null);
    const user = _getUser();

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

    const gun = Gun({
      file: "radataclient",
      peers: ["http://localhost:8765/gun"],
    });

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
        user.get("alias").once((username:any) => {
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
              _setUserProfile(username);
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
    userProfile,
    accessTokenRef: accessTokenRef?.current,
    certificate: certificateRef.current,
  });



  const _login = (username: string, password: string) => {
    _getUser().auth(username, password, (ack: any) => {
      if (ack.err) {
        setAuthError(ack.err);
      } else {
           const returnUrl = router.query.returnUrl as string || '/';
           router.push(returnUrl);
      }
    });
  };

  const _signup = (username: string, password: string) => {
    setAuthError(null);

    // check if user with username already exists
    _getGun()
      .get(`~@${username}`)
      .once((user: any) => {
        if (user) {
          setAuthError("Username already taken");
        } else {
          _getUser().create(username, password, ({ err, pub }: any) => {
            if (err) {
              setAuthError(err);
            } else {
              _login(username, password);
            }
          });
        }
      });
  };

  return {
    login: _login,
    signup: _signup,
    userProfile,
    setUserProfile: _setUserProfile,
    setLinks: _setLinks,
    deleteLink: _deleteLink,
    links,
    getGun: _getGun,
    getUser: _getUser,
    getCertificate: _getCertificate,
    setCertificate: (v: string | null) => {
      certificateRef.current = v;
    },
    onAuth: (cb: any) => {
      onAuthCbRef.current = cb;
    },
    clearSession: _clearSession,
    authError,
    setAuthError,
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
