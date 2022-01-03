import { FC } from "react";
import NavMenu from "./navMenu";
interface PropTypes {
  children: React.ReactChild;
}

const Layout: FC<PropTypes> = ({ children }) => {
  return (
    <>
      <NavMenu />
      <main>{children}</main>
    </>
  );
};

export default Layout;
