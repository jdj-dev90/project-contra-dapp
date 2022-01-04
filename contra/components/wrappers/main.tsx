import { Box } from "@mantine/core";
import { FC } from "react";

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
