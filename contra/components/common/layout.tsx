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
  return (
    <>
      <NavMenu />
      <RouteGuard>
        <Main>{children}</Main>
      </RouteGuard>
    </>
  );
};

export default Layout;
