import { Box } from "@mantine/core";
import { IGunChainReference } from "gun/types/chain";
import { Dispatch, FC, SetStateAction, useEffect, useState } from "react";
import { useGunContext } from "../../../hooks/useGunContext";
import { useProfiles } from "../../../hooks/useProfiles";
import { UserLink } from "../../../types";
import EditLink from "../../common/cards/editLink";

interface PropTypes {
  setModalOpen?: Dispatch<SetStateAction<boolean>>;
  setLink?: Dispatch<SetStateAction<UserLink | null>>;
}

const LinksList: FC<PropTypes> = ({ setModalOpen, setLink }) => {
  const { getGun, getAlias, getCertificate } = useGunContext();
  const { userLinks, addUserLink, removeLink } = useProfiles();

  const deleteLink = (id: string) => {
    const link = getGun().get(id);
    getGun()
      .get(`${getAlias()}/profile`)
      .get("links")
      .unset(link, null, {
        opt: { cert: getCertificate() },
      })
      .once(() => {
        removeLink(id);
      });
  };

  useEffect(() => {
    let evt: IGunChainReference | null = null;
    getGun()
      .get(`${getAlias()}/profile`)
      .get("links")
      .map()
      .on(
        (
          link: UserLink,
          id: string,
          chain: IGunChainReference,
          e: IGunChainReference
        ) => {
          evt = e;
          if (link) {
            const newLink = {
              id,
              label: link.label,
              url: link.url,
              type: link.type,
            };
            addUserLink(newLink);
          }
        }
      );

    return () => {
      evt && evt?.off();
    };
  }, []);

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        flexDirection: "column",
      }}
    >
      {!!userLinks.length ? (
        userLinks.map((l: UserLink, ix: number) => {
          return setModalOpen && setLink ? (
            <EditLink
              key={`${l.id}-${ix}`}
              link={l}
              onDelete={(lId: string) => deleteLink(lId)}
              onEdit={(l: UserLink) => {
                setLink(l);
                setModalOpen(true);
              }}
            />
          ) : (
            <EditLink key={`${l.id}-${ix}`} link={l} />
          );
        })
      ) : (
        <Box>No Links!</Box>
      )}
    </Box>
  );
};

export default LinksList;
