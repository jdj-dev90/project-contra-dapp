import { Box, Divider, Menu, Text } from "@mantine/core";
import { useRouter } from "next/router";
import { FC, useState } from "react";
import { user } from "../../utils/gun";
type Page = "Home" | "Profile";
interface PropTypes {}

const NavMenu: FC<PropTypes> = () => {
  const router = useRouter();
  const { userId } = router.query;
  const id = userId;
  // || user.is.pub;
  const [currentPage, setCurrentPage] = useState<Page>("Home");
  return (
    <Box sx={{ display: "flex", justifyContent: "flex-end", padding: 10 }}>
      <Box sx={{ marginRight: 10 }}>
        <Text>{currentPage}</Text>
      </Box>
      <Menu>
        <Menu.Label>Navigation</Menu.Label>
        <Menu.Item
          onClick={() => {
            setCurrentPage("Home");
            router.push("/");
          }}
        >
          Home
        </Menu.Item>
        <Menu.Item
          onClick={() => {
            setCurrentPage("Profile");
            router.push(`/profile/${id}`);
          }}
        >
          Profile
        </Menu.Item>
        <Divider />
        <Menu.Label>Account</Menu.Label>

        <Menu.Item
          disabled={!!user.is}
          onClick={() => router.push(`/auth/signin`)}
        >
          Sign In
        </Menu.Item>
        <Menu.Item
          disabled={!!user.is}
          onClick={() => router.push(`/auth/signup`)}
        >
          Sign Up
        </Menu.Item>
        <Menu.Item
          disabled={!user.is}
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
