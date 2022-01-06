import { Box } from "@mantine/core";
import { FC } from "react";
import { useMantineTheme } from "@mantine/core";
interface MainProps {
  children: any;
}

const Main: FC<MainProps> = ({ children }) => {
  const theme = useMantineTheme();

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        // backgroundColor:
        //   (theme.colorScheme !== "dark" && theme.colors.gray[]) || undefined,
      }}
    >
      <Box sx={{ width: "80%" }}>{children}</Box>
    </Box>
  );
};

export default Main;
