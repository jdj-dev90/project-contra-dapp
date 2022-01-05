import {
  Autocomplete,
  Box,
  Button,
  Menu,
  Paper,
  useMantineTheme,
} from "@mantine/core";
import { useRouter } from "next/router";
import { FC, useState } from "react";
import { BiNetworkChart, BiSearchAlt } from "react-icons/bi";
import { IconContext } from "react-icons/lib";
import { useGun, useUser } from "../../hooks";
import SeededAvatar from "./cards/seededAvatar";

type Page = "Home" | "Profile";

interface PropTypes {}

const NavMenu: FC<PropTypes> = () => {
  const theme = useMantineTheme();

  const router = useRouter();
  const { user } = useGun();
  const { isLoggedIn, reset } = useUser();
  const [currentPage, setCurrentPage] = useState<Page>("Home");
  const [value, setValue] = useState("");

  console.log("user", { user });

  return (
    <Paper
      padding="md"
      shadow="sm"
      sx={{
        display: "flex",
        padding: 10,
        justifyContent: "space-between",
      }}
    >
      <Box
        sx={{
          display: "flex",
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
        {isLoggedIn && (
          <Box>
            <Button
              sx={{ margin: "0 10px 0 20px" }}
              variant="outline"
              onClick={() => {
                setCurrentPage("Home");
                router.push("/");
              }}
            >
              Home
            </Button>
            <Button
              sx={{ margin: "0 30px 0 0" }}
              variant="outline"
              onClick={() => {
                setCurrentPage("Profile");
                router.push(`/profile/${user.is.pub}`);
              }}
            >
              Profile
            </Button>
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
        }}
      >
        <Box>
          <Menu
            control={
              <button
                style={{
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
            {isLoggedIn && (
              <Menu.Item
                color="red"
                onClick={() => {
                  user.leave();
                  reset();
                  router.push(`/`);
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
  );
};

export default NavMenu;
