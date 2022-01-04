import { Box, Divider, Menu, Text } from "@mantine/core";
import { useRouter } from "next/router";
import { FC, useState } from "react";
import { useGun, useUser } from "../../hooks";

type Page = "Home" | "Profile";

interface PropTypes {}

const NavMenu: FC<PropTypes> = () => {
  const router = useRouter();
  const { user } = useGun();
  const { isLoggedIn, reset } = useUser();
  const [currentPage, setCurrentPage] = useState<Page>("Home");
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "flex-end",
        padding: 10,
      }}
    >
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

        <Menu.Item disabled={isLoggedIn} onClick={() => router.push(`/signin`)}>
          Sign In
        </Menu.Item>
        <Menu.Item disabled={isLoggedIn} onClick={() => router.push(`/signup`)}>
          Sign Up
        </Menu.Item>
        <Menu.Item
          disabled={!isLoggedIn}
          color="red"
          onClick={() => {
            user.leave();
            reset();
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
