import {
  ActionIcon,
  Anchor,
  Autocomplete,
  Box,
  Menu,
  Paper,
} from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";
import { useRouter } from "next/router";
import { FC, useState } from "react";
import { BiArrowBack, BiNetworkChart, BiSearchAlt } from "react-icons/bi";
import { IconContext } from "react-icons/lib";
import { useGunContext } from "../../hooks/useGunContext";
import useSessionChannel from "../../hooks/useSessionChannel";
import SeededAvatar from "./cards/seededAvatar";

interface PropTypes {}
const NavMenu: FC<PropTypes> = () => {
  const { getAlias, getUser, clearSession } = useGunContext();
  const router = useRouter();
  const isLoggedIn = !!getUser()?.is;
  const sessionChannel = useSessionChannel();
  const logout = (evt?: React.ChangeEvent<HTMLElement>) => {
    clearSession();
    // logged out from click, notify other tabs
    if (evt) {
      sessionChannel.postMessage({
        eventName: "REMOVE_YOUR_CREDS",
      });
    }
    router.push("/signin");
  };
  const [value, setValue] = useState("");
  const mobile = useMediaQuery("(max-width: 600px)");

  return (
    <>
      <Paper
        radius="xs"
        padding="md"
        shadow="sm"
        sx={{
          display: "flex",
          padding: 10,
          alignItems: "center",
          justifyContent: "space-between",
          borderTopLeftRadius: 0,
          borderTopRightRadius: 0,
        }}
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            flex: 1,
          }}
        >
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              margin: "0 10px",
            }}
          >
            <IconContext.Provider value={{ style: { fontSize: "28px" } }}>
              <BiNetworkChart />
            </IconContext.Provider>
          </Box>
          {isLoggedIn && !mobile && (
            <Box>
              <Anchor
                sx={{ margin: "0 10px 0 20px" }}
                onClick={() => {
                  router.push("/");
                }}
              >
                Home
              </Anchor>
              <Anchor
                sx={{ margin: "0 30px 0 0" }}
                onClick={() => {
                  router.push(`/profile/${getAlias()}`);
                }}
              >
                Profile
              </Anchor>
            </Box>
          )}
          <Box>
            <Autocomplete
              value={value}
              onChange={setValue}
              placeholder="Pick one"
              data={["React", "Angular", "Svelte", "Vue"]}
              icon={<BiSearchAlt />}
              transition="pop-top-left"
              transitionDuration={80}
              transitionTimingFunction="ease"
            />
          </Box>
        </Box>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
          }}
        >
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
            }}
          >
            <Menu
              sx={{
                display: "flex",
                alignItems: "center",
              }}
              control={
                <button
                  style={{
                    display: "flex",
                    alignItems: "center",
                    all: "unset",
                    cursor: "pointer",
                  }}
                >
                  <SeededAvatar seed="adsfgaljsdkf" size="md" />
                </button>
              }
            >
              <Menu.Item onClick={() => router.push(`/test`)}>
                Test page
              </Menu.Item>
              {isLoggedIn && mobile && (
                <Menu.Item
                  onClick={() => {
                    router.push("/");
                  }}
                >
                  Home
                </Menu.Item>
              )}
              {isLoggedIn && mobile && (
                <Menu.Item
                  onClick={() => {
                    router.push(`/profile/${getUser().is.pub}`);
                  }}
                >
                  Profile
                </Menu.Item>
              )}
              {isLoggedIn && (
                <Menu.Item
                  color="red"
                  onClick={() => {
                    logout();
                  }}
                >
                  Logout
                </Menu.Item>
              )}
              {!isLoggedIn && (
                <Menu.Item
                  disabled={isLoggedIn}
                  onClick={() => router.push(`/signin`)}
                >
                  Sign In
                </Menu.Item>
              )}
              {!isLoggedIn && (
                <Menu.Item
                  disabled={isLoggedIn}
                  onClick={() => router.push(`/signup`)}
                >
                  Sign Up
                </Menu.Item>
              )}
            </Menu>
          </Box>
        </Box>
      </Paper>
      {router.pathname !== "/" && (
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            margin: "10px 0 5px 15px",
            cursor: "pointer",
          }}
        >
          <ActionIcon
            color="blue"
            size="xl"
            radius="xl"
            variant="hover"
            onClick={() => {
              router.back();
            }}
          >
            <BiArrowBack />
          </ActionIcon>
        </Box>
      )}
    </>
  );
};

export default NavMenu;
