import { Box, Divider, Menu, Text } from "@mantine/core";
import { useRouter } from "next/router";
import { FC, useContext, useState } from "react";
import { AppStateContext } from "../../pages/_app";

type Page = "Home" | "Profile";

interface PropTypes {}

const NavMenu: FC<PropTypes> = () => {
  const router = useRouter();
  const { user, isLoggedIn } = useContext(AppStateContext);
  const [currentPage, setCurrentPage] = useState<Page>("Home");
  return (
    <Box sx={{ display: "flex", justifyContent: "flex-end", padding: 10 }}>
      <Box sx={{ marginRight: 10 }}>
        <Text>{currentPage}</Text>
      </Box>
      <Menu>
        <Menu.Label>Navigation</Menu.Label>
        <Menu.Item
          disabled={!isLoggedIn}
          onClick={() => {
            setCurrentPage("Home");
            router.push("/");
          }}
        >
          Home
        </Menu.Item>
        <Menu.Item
          disabled={!isLoggedIn}
          onClick={() => {
            setCurrentPage("Profile");
            router.push(`/profile/${user.is.pub}`);
          }}
        >
          Profile
        </Menu.Item>
        <Divider />
        <Menu.Label>Account</Menu.Label>

        <Menu.Item
          disabled={isLoggedIn}
          onClick={() => router.push(`/auth/signin`)}
        >
          Sign In
        </Menu.Item>
        <Menu.Item
          disabled={isLoggedIn}
          onClick={() => router.push(`/auth/signup`)}
        >
          Sign Up
        </Menu.Item>
        <Menu.Item
          disabled={!isLoggedIn}
          color="red"
          onClick={() => {
            user.leave();
            router.push(`/`);
          }}
        >
          Logout
        </Menu.Item>
      </Menu>
    </Box>
  );
};

export default NavMenu;
