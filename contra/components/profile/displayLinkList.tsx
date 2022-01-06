import { Box } from "@mantine/core";
import { FC } from "react";
// import { useLinks } from "../../hooks";
import { UserLink } from "../../types";

interface DisplayLinkListProps {}

const DisplayLinkList: FC<DisplayLinkListProps> = () => {
  // const { links } = useLinks();
  const links: any = [];

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        padding: 10,
      }}
    >
      {links.map((link: any) => (
        <Box key={link.id}>{link.label}</Box>
      ))}
    </Box>
  );
};

export default DisplayLinkList;
