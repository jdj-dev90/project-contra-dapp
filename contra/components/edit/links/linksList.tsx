import { Box, Button, Card, Text } from "@mantine/core";
import { Dispatch, FC, SetStateAction, useEffect, useState } from "react";
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
          return (
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
            // <Card key={`${l.id}-${ix}`}>
            //   <Box
            //     sx={{
            //       display: "flex",
            //       justifyContent: "space-between",
            //     }}
            //   >
            //     <Box
            //       sx={{
            //         border: "1px solid black",
            //       }}
            //       component="a"
            //       href="https://www.youtube.com/watch?v=dQw4w9WgXcQ"
            //       target="_blank"
            //     >
            //       <Text size="sm">{l.type}</Text>
            //       <Text weight={500} size="lg">
            //         {l.label}
            //       </Text>
            //     </Box>

            //     <Box></Box>
            //   </Box>
            //   <Button
            //     onClick={() => {
            //       deleteLink(l.id);
            //     }}
            //   >
            //     Delete
            //   </Button>
            //   <Button
            //     onClick={() => {
            //       setLink(l);
            //       setModalOpen(true);
            //     }}
            //   >
            //     Edit
            //   </Button>
            // </Card>
            // <Box
            //   key={`${l.id}-${ix}`}
            //   sx={{ border: "2px solid red", margin: "10px" }}
            // >
            //   <h5>{l.label}</h5>
            //   <a href={l.url} about="_blank">
            //     {l.url}
            //   </a>
            //   <h5>{l.type}</h5>
            // </Box>
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
