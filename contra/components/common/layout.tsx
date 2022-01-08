import { FC, ReactNode } from "react";
import { Main } from "../wrappers";
import NavMenu from "./navMenu";
import { useGunContext } from "../../hooks/useGunContext";
import { useRouter } from "next/router";
import { RouteGuard } from "./routeGuard";
interface PropTypes {
  children: ReactNode;
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
      <RouteGuard>
        <Main>{children}</Main>
      </RouteGuard>
    </>
  );
};

export default Layout;
