import { Box, Divider, Menu, Text } from "@mantine/core";
import { useRouter } from "next/router";
import { FC, useState } from "react";
import { useGunContext } from "../../hooks/useGunContext";
import useSessionChannel from "../../utils/useSessionChannel";

type Page = "Home" | "Profile";

interface PropTypes {}
const NavMenu: FC<PropTypes> = () => {
  const { getUser, userProfile, clearSession } = useGunContext();
  const router = useRouter();
  const [currentPage, setCurrentPage] = useState<Page>("Home");
  const isLoggedIn = !!userProfile;
  const sessionChannel = useSessionChannel();

  const logout = (evt?: React.ChangeEvent<any>) => {
    clearSession();

    // logged out from click, notify other tabs
    if (evt) {
      sessionChannel.postMessage({
        eventName: "REMOVE_YOUR_CREDS",
      });
    }
  };

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
            router.push(`/profile/${getUser().is.pub}`);
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
            logout();
            // reset();
            router.push(`/`);
            console.log("done");
          }}
        >
          Logout
        </Menu.Item>
      </Menu>
    </Box>
  );
};

export default NavMenu;
