import { useReducer } from "react";
import { UseGunState, GunData, UseGunActions } from "../types";
import { gun, user } from "../utils/gun";

type useGunActionPayload =
  | {
      type: "SET_GUN";
      payload: GunData;
    }
  | {
      type: "RESET";
      payload: GunData;
    };

function reducer(state: UseGunState, action: useGunActionPayload): UseGunState {
  switch (action.type) {
    case "SET_GUN":
      return action.payload;

    case "RESET":
      return action.payload;
    default:
      throw new Error();
  }
}

const resetState: UseGunState = {
  gun,
  user,
};

export const useGun = () => {
  const reset = () => {
    console.log({ type: "RESET" });
    dispatch({ type: "RESET", payload: resetState });
  };

  const [state, dispatch] = useReducer(reducer, {
    gun: gun,
    user: user,
  });

  const actions: UseGunActions = {
    reset,
  };
  return { ...state, ...actions };
};
