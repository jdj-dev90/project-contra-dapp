import { Box } from "@mantine/core";
import { Dispatch, FC, SetStateAction, useEffect } from "react";
import { useGunContext } from "../../../hooks/useGunContext";
import { UserLink } from "../../../types";
import EditLink from "../../common/cards/editLink";

interface PropTypes {
  setModalOpen?: Dispatch<SetStateAction<boolean>>;
  setLink?: Dispatch<SetStateAction<UserLink | null>>;
}

const LinksList: FC<PropTypes> = ({ setModalOpen, setLink }) => {
  const { getGun, getUser, onAuth, links, setLinks, deleteLink } =
    useGunContext();

  useEffect(() => {
    console.log("SETTING LINKS");
    onAuth(() => {
      setLinks();
    });
  }, []);
  console.log({ links });
  return (
    <Box sx={{ display: "flex", justifyContent: "center" }}>
      <Box sx={{ width: "60%" }}>
        {links.map((l: any, ix: number) => {
          return setModalOpen && setLink ? (
            <EditLink
              key={`${l.id}-${ix}`}
              link={l}
              onDelete={(lId: string) => deleteLink(lId)}
              onEdit={(l: UserLink) => {
                console.log({ l });
                // setLink(l);
                // setModalOpen(true);
              }}
            />
          ) : (
            <EditLink key={`${l.id}-${ix}`} link={l} />
          );
        })}
        {/* <EditLink
          // key={`${l.id}-${ix}`}
          link={{
            id: "testetsttest testtest",
            type: "testetsttest testtest",
            label: "testetsttest testtest",
            url: "https://react-icons.github.io/react-icons",
          }}
          onDelete={(lId: string) => deleteLink(lId)}
          onEdit={(l: UserLink) => {
            setLink(l);
            setModalOpen(true);
          }}
        /> */}
      </Box>
    </Box>
  );
};

export default LinksList;
