import { Button } from "@mantine/core";
import { useRouter } from "next/router";
import { FC } from "react";
import { user } from "../../utils/gun";
import NavMenu from "./navMenu";
interface PropTypes {
  children: React.ReactChild;
}

const Layout: FC<PropTypes> = ({ children }) => {
  const router = useRouter();
  console.log({ user });
  return (
    <>
      <NavMenu />
      <main>{children}</main>
    </>
  );
};

export default Layout;
