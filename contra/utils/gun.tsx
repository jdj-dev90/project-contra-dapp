import GUN from "gun";
import "gun/axe";
import "gun/sea";
import { createContext, FC, ReactNode, useContext, useReducer } from "react";
import { AppContext, Gun, User } from "../types";

// Database
export const gun = GUN({
  peers: ["http:localhost:8000/gun"], // Put the relay node that you want here
});

// Gun User
export const user = gun.user().recall({ sessionStorage: true }) as User;

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

export const AppStateContext = createContext<AppContext>({
  userId: "",
  setUserId: (userId: string) => {},
  isLoggedIn: false,
  setIsLoggedIn: (isLoggedIn: boolean) => {},
  reset: () => {},
});

export const AppContextProvider: FC<{ children: ReactNode }> = ({
  children,
}) => {
  const setUserId = (userId: string) => {
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
    isLoggedIn: !!user.is,
    setIsLoggedIn: setIsLoggedIn,
    reset,
  };

  const [state, dispatch] = useReducer(reducer, initState);

  return (
    <AppStateContext.Provider value={state}>
      {children}
    </AppStateContext.Provider>
  );
};

export const useAppState = () => useContext(AppStateContext);
