import { Box, useMantineTheme } from "@mantine/core";
import React, { FC } from "react";
import { Main } from "../wrappers";
import NavMenu from "./navMenu";
interface PropTypes {
  children: React.ReactChild;
}

const Layout: FC<PropTypes> = ({ children }) => {
  const theme = useMantineTheme();
  console.log({ theme });

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        backgroundColor:
          theme.colorScheme === "dark"
            ? theme.colors.dark[4]
            : theme.colors.gray[3],
        width: "100%",
        minHeight: "100vh",
        height: "100%",
      }}
    >
      <NavMenu />
      {/* <main> */}
      <Main>{children}</Main>
      {/* </main> */}
    </Box>
  );
};

export default Layout;
