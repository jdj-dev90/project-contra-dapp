import React, { FC } from "react";
import { Main } from "../wrappers";
import NavMenu from "./navMenu";
interface PropTypes {
  children: React.ReactChild;
}

const Layout: FC<PropTypes> = ({ children }) => {
  return (
    <>
      <NavMenu />
      {/* {!userProfile && (
        <div>
          <Signup />
        </div>
      )} */}
      {/* {userProfile && (
      )} */}
      <main>
        <Main>{children}</Main>
      </main>
    </>
  );
};

export default Layout;
