import { Button } from "@mantine/core";
import { useRouter } from "next/router";
import { FC } from "react";
import { user, db } from "../utils/gun";
interface PropTypes {
  children: React.ReactChild;
}
const Layout: FC<PropTypes> = ({ children }) => {
  const router = useRouter();
  return (
    <>
      {!user.is ? (
        <>
          {router.pathname !== "/auth/signin" && (
            <Button onClick={() => router.push(`/auth/signin`)}>Sign In</Button>
          )}
          {router.pathname !== "/auth/signup" && (
            <Button onClick={() => router.push(`/auth/signup`)}>Sign Up</Button>
          )}
        </>
      ) : (
        <Button
          onClick={() => {
            user.leave();
            router.push(`/`);
          }}
        >
          Logout
        </Button>
      )}
      <main>{children}</main>
    </>
  );
};

export default Layout;
