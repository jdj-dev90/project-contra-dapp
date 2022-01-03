import { Box, Button, Divider } from "@mantine/core";
import { useRouter } from "next/router";
import { FC, useContext } from "react";
import { AppStateContext } from "../../../pages/_app";

interface DisplayLinkListProps {}

const DisplayLinkList: FC<DisplayLinkListProps> = () => {
  const router = useRouter();
  const { userId } = useContext(AppStateContext);

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        padding: 10,
        // border: "1px solid pink",
      }}
    >
      links
    </Box>
  );
};

export default DisplayLinkList;
