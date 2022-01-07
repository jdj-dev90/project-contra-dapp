import { Box, Paper, useMantineTheme } from "@mantine/core";
import { FC } from "react";
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
      }}
    >
      <Paper
        padding="md"
        shadow="sm"
        sx={{
          width: "80%",

          backgroundColor:
            theme.colorScheme === "dark"
              ? theme.colors.dark[6]
              : theme.colors.gray[1],
        }}
      >
        {children}
      </Paper>
    </Box>
  );
};

export default Main;
