import GUN from "gun";
import "gun/axe";
import "gun/lib/open.js";
import "gun/sea";
import { IGunChainReference } from "gun/types/chain";
import { createContext, FC, ReactNode, useContext, useReducer } from "react";
import { BaseUserDetails, UserDetails, UserLink } from "../types";
// Database
const gun = GUN({
  peers: ["http:localhost:8000/gun"], // Put the relay node that you want here
});
type User = IGunChainReference & {
  is: { alias: string; epub: string; pub: string };
};
// Gun User
const user = gun.user().recall({ sessionStorage: true }) as User;

// Current User's username
// export const username = writable('');

// user.get('alias').on(v => username.set(v))

// db.on('auth', async(event) => {
//     const alias = await user.get('alias'); // username string
//     username.set(alias);

//     console.log(`signed in as ${alias}`);
// });

function reducer(state: any, action: any) {
  switch (action.type) {
    case "SET_USER_ID":
      return { ...state, userId: action.payload };
    case "SET_IS_LOGGED_IN":
      return { ...state, isLoggedIn: action.payload };
    case "RESET":
      return {
        userId: "",
        setUserId: () => {},
        gun: null,
        user: null,
        isLoggedIn: false,
        setIsLoggedIn: () => {},
      };
    default:
      throw new Error();
  }
}

interface AppContext {
  userId: string;
  setUserId: (userId: string) => void;
  gun: IGunChainReference;
  user: User;
  isLoggedIn: boolean;
  setIsLoggedIn: (isLoggedIn: boolean) => void;
  reset: () => void;
}

export const AppStateContext = createContext<AppContext>({
  userId: "",
  setUserId: (userId: string) => {},
  gun,
  user,
  isLoggedIn: false,
  setIsLoggedIn: (isLoggedIn: boolean) => {},
  reset: () => {},
});

export const AppContextProvider: FC<{ children: ReactNode }> = ({
  children,
}) => {
  const setUserId = (userId: string) => {
    console.log({ userId }, "HEREREER");
    dispatch({ type: "SET_USER_ID", payload: userId });
  };
  const setIsLoggedIn = (isLoggedIn: boolean) => {
    dispatch({ type: "SET_IS_LOGGED_IN", payload: isLoggedIn });
  };
  const reset = () => {
    dispatch({ type: "RESET" });
  };

  const initState = {
    userId: "",
    setUserId: setUserId,
    gun,
    user,
    isLoggedIn: !!user.is,
    setIsLoggedIn: setIsLoggedIn,
    reset,
  };

  const [state, dispatch] = useReducer(reducer, initState);
  // const [state, setState] = useState(initState);
  console.log({ state });
  return (
    <AppStateContext.Provider value={state}>
      {children}
    </AppStateContext.Provider>
  );
};

export const useAppState = () => useContext(AppStateContext);

interface ss {
  userDetails: UserDetails;
  links: UserLink[];
  followers: BaseUserDetails[];
  following: BaseUserDetails[];
}

// export const useMe = (...args: (keyof ss)[]) => {
//   const userId = user?.is?.pub;

//   const [me, setMe] = useState();
//   useEffect(() => {
//     if (userId) {
//       // console.log({ me });
//       if (args.includes("userDetails")) {
//         gun.get(`${userId}`).once((val) => {
//           setMe(val);
//         });
//         // user.get("userDetails").once((val) => {
//         //   console.log({ val });
//         //   sss.userDetails = val;
//         // });
//       }
//     }
//     return () => {};
//   }, [userId]);
//   const sss: any = {
//     userDetails: "yo",
//   };
//   // gun.get('users').get(`${userId}`).get(`userDetails`).put(values);

//   console.log({ me, args, sss });
//   // const s = user.get('')
//   //   const obj = {
//   //     userId,
//   //     userDetails:{
//   //       avatar: string;
//   //       bio: string;
//   //       displayName: string;
//   //       username: string;
//   //       privacyType: string;
//   //     }
//   // links:[]
//   //   }
// };
