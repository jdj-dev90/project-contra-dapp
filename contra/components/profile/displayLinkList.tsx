import { Box } from "@mantine/core";
import { FC } from "react";
import { UserLink } from "../../types";

interface DisplayLinkListProps {}

const DisplayLinkList: FC<DisplayLinkListProps> = () => {
  const links: UserLink[] = [];

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        padding: 10,
      }}
    >
      {links.map((link: UserLink) => (
        <Box key={link.id}>{link.label}</Box>
      ))}
    </Box>
  );
};

export default DisplayLinkList;
