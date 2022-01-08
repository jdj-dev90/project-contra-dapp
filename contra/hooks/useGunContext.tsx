import Gun from "gun";
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
  avatar = "AVATAR",
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
  const meRef = useRef<any>();
  const aliasRef = useRef<any>();
  const certificateRef = useRef<any>();
  const accessTokenRef = useRef<any>();
  const onAuthCbRef = useRef<any>();

  const [links, setLinks] = useState<UserLink[]>([]);
  const [authError, setAuthError] = useState<string | null>(null);

  //////////////////////////////////////////

  const _getCertificate = () => certificateRef.current;
  const _getGun = () => gunRef.current;
  const _getUser = () => meRef.current;
  const _getAlias = () => aliasRef.current;
  const router = useRouter();

  const _login = (username: string, password: string, displayName?: string) => {
    _getUser().auth(username, password, (ack: any) => {
      if (ack.err) {
        setAuthError(ack.err);
      } else {
        const defaultProfile = createUserProfile({
          username,
          displayName,
        });
        aliasRef.current = username;
        if (displayName) {
          _getGun()
            .get(`${username}/profile`)
            .put(defaultProfile, null, {
              opt: { cert: _getCertificate() },
            })
            .once((data: any) => {
              _getGun().get("profiles").set(data);
            });
        }

        const returnUrl = (router.query.returnUrl as string) || "/";
        router.push(returnUrl);
      }
    });
  };

  const _signup = (username: string, password: string, displayName: string) => {
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
              fetchCertificate(username, pub, () => {
                _login(username, password, displayName);
              });
            }
          });
        }
      });
  };

  const fetchCertificate = (username: string, pub: string, cb?: () => any) => {
    fetch("http://localhost:8765/api/certificates", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username,
        pub,
      }),
    })
      .then((resp) => resp.json())
      .then(({ certificate }) => {
        certificateRef.current = certificate;
        aliasRef.current = username;

        cb && cb();
      });
  };

  const _setLinks = () => {
    _getGun()
      .get(`${_getAlias()}/profile`)
      .get("links")
      .map()
      .once((link: any, id: string) => {
        if (link) {
          const newLink = {
            id,
            label: link.label,
            url: link.url,
            type: link.type,
          };
          setLinks((li) => [...li, newLink]);
        }
      });
  };

  const _deleteLink = (id: string) => {
    const link = _getGun().get(id);
    _getGun()
      .get(`${_getAlias()}/profile`)
      .get("links")
      .unset(link, null, {
        opt: { cert: _getCertificate() },
      });
  };

  const _clearSession = () => {
    const user = _getUser();

    user.leave();
    // check if logout failed, if so manually remove
    // user from session storage
    // see https://gun.eco/docs/User#user-leave
    if ((user as any)._.sea) {
      window.sessionStorage.removeItem("pair");
    }
    // certificateRef.current = null;
    aliasRef.current = null;
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
    (window as any).gun = gun;
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
              // store token in app memory
              accessTokenRef.current = accessToken;
            });
        });
      }

      if (!certificateRef.current) {
        // get new certificate
        user.get("alias").once((username: any) => {
          fetchCertificate(username, (user as any).is.pub);
        });
      }

      if (onAuthCbRef.current) {
        onAuthCbRef.current(...args);
      }
    });
    gunRef.current = gun;
    meRef.current = user;
  }, []);

  return {
    login: _login,
    signup: _signup,
    setLinks: _setLinks,
    deleteLink: _deleteLink,
    links,
    getGun: _getGun,
    getUser: _getUser,
    getAlias: _getAlias,
    getCertificate: _getCertificate,
    // setCertificate: (v: string | null) => {
    //   certificateRef.current = v;
    // },
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
