import { Box } from "@mantine/core";
import type { NextPage } from "next";
import { useContext } from "react";
import { AppStateContext } from "./_app";

const Home: NextPage = () => {
  const { gun, user, isLoggedIn } = useContext(AppStateContext);
  console.log({ gun, user, isLoggedIn }, "asdadsad");
  return <Box></Box>;
};

export default Home;
