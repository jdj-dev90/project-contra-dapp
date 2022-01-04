import { useReducer } from "react";
import { UserData, UseUserActions, UseUserState } from "../types";
import { user } from "../utils/gun";

type UseUserActionPayload =
  | {
      type: "SET_USER";
      payload: UserData;
    }
  | {
      type: "RESET";
      payload: UserData;
    };

function reducer(
  state: UseUserState,
  action: UseUserActionPayload
): UseUserState {
  switch (action.type) {
    case "SET_USER":
      return {
        ...state,
        userId: action.payload.userId,
        isLoggedIn: action.payload.isLoggedIn,
      };
    case "RESET":
      return {
        ...state,
        userId: action.payload.userId,
        isLoggedIn: action.payload.isLoggedIn,
      };
    default:
      throw new Error();
  }
}

const resetState: UseUserState = {
  userId: "",
  isLoggedIn: false,
};

export const useUser = () => {
  const setUser = (userData: UserData) => {
    console.log({ type: "SET_USER", payload: userData });
    dispatch({ type: "SET_USER", payload: userData });
  };
  const reset = () => {
    console.log({ type: "RESET" });
    dispatch({ type: "RESET", payload: resetState });
  };

  const [state, dispatch] = useReducer(reducer, {
    userId: user?.is?.pub || "",
    isLoggedIn: !!user?.is?.pub,
  });

  const actions: UseUserActions = {
    setUser,
    reset,
  };
  return { ...state, ...actions };
};
