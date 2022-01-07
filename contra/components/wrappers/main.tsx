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
        minHeight: "80%",
        paddingBottom: "80px",
      }}
    >
      <Paper
        padding="md"
        shadow="sm"
        sx={{
          display: "flex",
          flexDirection: "column",
          width: "80%",
          height: "100%",

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
