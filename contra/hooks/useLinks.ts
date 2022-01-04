import { useEffect, useReducer } from "react";
import { useGun, useUser } from ".";
import { UserLink } from "../types";

interface UseLinksState {
  links: UserLink[];
}

type UseUserActionPayload =
  | {
      type: "ADD_LINK";
      payload: UserLink;
    }
  | {
      type: "DELETE_LINK";
      payload: string;
    };

function reducer(
  state: UseLinksState,
  action: UseUserActionPayload
): UseLinksState {
  switch (action.type) {
    case "ADD_LINK":
      return { ...state, links: [...state.links, action.payload] };
    case "DELETE_LINK": {
      return {
        ...state,
        links: state.links.filter((link) => link.id !== action.payload),
      };
    }

    default:
      throw new Error();
  }
}

export const useLinks = () => {
  const { gun } = useGun();
  const { userId } = useUser();

  const [state, dispatch] = useReducer(reducer, {
    links: [],
  });

  const deleteLink = (id: string) => {
    const links: any = gun.get(`${userId}`).get("links");
    const link = gun.get(id);

    links.unset(link);
  };

  useEffect(() => {
    gun
      .get(`${userId}`)
      .get("links")
      .map()
      .on((data: UserLink, key: string) => {
        // console.log({ data, key }, "THEN2222");
        if (!data) {
          // console.log({
          //   type: "DELETE_LINK",
          //   payload: key,
          // });
          dispatch({ type: "DELETE_LINK", payload: key });
        } else {
          dispatch({
            type: "ADD_LINK",
            payload: {
              label: data.label,
              type: data.type,
              url: data.url,
              id: key,
            },
          });
        }
      });

    // return () => gun.off();
  }, []);

  return { ...state, deleteLink };
};
