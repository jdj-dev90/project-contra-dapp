import { Box } from "@mantine/core";
import { useRouter } from "next/router";
import { FC } from "react";

interface DisplayLinkListProps {}

const DisplayLinkList: FC<DisplayLinkListProps> = () => {
  const router = useRouter();

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
