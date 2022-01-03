import { Box, Card, Text } from "@mantine/core";
import { FC, useContext, useEffect, useState } from "react";
import { AppStateContext } from "../../pages/_app";
import { gun } from "../../utils/gun";

interface PropTypes {
  modalOpen: boolean;
}

const LinksList: FC<PropTypes> = ({ modalOpen }) => {
  const { userId } = useContext(AppStateContext);

  const [links, setLinks]: any[] = useState([]);

  useEffect(() => {
    console.log("userIduserId", { userId });
    if (userId && !modalOpen) {
      const arr: any = [];
      gun
        .get(`${userId}`)
        .get("links")
        .map()
        .once((link: any, id) => {
          console.log({ link, id });
          arr.push({ label: link.label, type: link.type, url: link.url, id });
          console.log("arr", { arr });
          setLinks(arr);
        });
    }
  }, [userId, modalOpen]);
  console.log({ links });

  return (
    <Box sx={{ display: "flex", justifyContent: "center" }}>
      <Box sx={{ width: "60%" }}>
        {links.map((l: any, ix: number) => {
          return (
            <Card key={`${l.id}-${ix}`}>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                }}
              >
                <Box
                  sx={{
                    border: "1px solid black",
                  }}
                  component="a"
                  href="https://www.youtube.com/watch?v=dQw4w9WgXcQ"
                  target="_blank"
                >
                  <Text size="sm">{l.type}</Text>
                  <Text weight={500} size="lg">
                    {l.label}
                  </Text>
                </Box>

                <Box></Box>
              </Box>
            </Card>
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
      </Box>
    </Box>
  );
};

export default LinksList;
