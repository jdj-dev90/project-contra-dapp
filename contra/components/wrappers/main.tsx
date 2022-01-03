import { Box } from "@mantine/core";
import { useRouter } from "next/router";
import { FC } from "react";
import { useAppState } from "../../utils/gun";

interface MainProps {
  children: any;
}

const Main: FC<MainProps> = ({ children }) => {
  return (
    <Box sx={{ display: "flex", justifyContent: "center" }}>
      <Box sx={{ width: "80%" }}>{children}</Box>
    </Box>
  );
};

export default Main;
