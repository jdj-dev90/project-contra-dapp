import { Box } from "@mantine/core";
import type { NextPage } from "next";
import { useGun } from "../hooks";

const Home: NextPage = () => {
  const gunsss = useGun();
  console.log({ gunsss }, "STATE_STATE_STATE_ACTIONS_ACTIONS_ACTIONS");

  return <Box>Landing Page</Box>;
};

export default Home;
