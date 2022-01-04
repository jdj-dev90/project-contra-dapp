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
      type: "EDIT_LINK";
      payload: UserLink & { existingLinkIndex: number };
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
    case "ADD_LINK": {
      // This block covers add and edit functionality

      if (!state.links.length) {
        return { ...state, links: [action.payload] };
      }

      // Check if efit action occurs
      const { editFound, links } = state.links.reduce<{
        editFound: boolean;
        links: UserLink[];
      }>(
        (acc, link) => {
          if (action.payload.id === link.id) {
            acc.links.push(action.payload);
            acc.editFound = true;
          } else {
            acc.links.push(link);
          }

          return acc;
        },
        { editFound: false, links: [] }
      );

      // If edit action occurs, links array is complete
      if (editFound) {
        return { ...state, links };
      }

      // If edit action did not occur, this is an assumed .push operation links array is complete
      return { ...state, links: [...state.links, action.payload] };
    }

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
          console.log("DELETE_LINK");

          dispatch({ type: "DELETE_LINK", payload: key });
        } else {
          console.log("ADD_LINK");
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
