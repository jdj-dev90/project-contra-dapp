import { Box, Loader } from "@mantine/core";
import { FC } from "react";

interface PropTypes {}

const AppLoader: FC<PropTypes> = () => {
  return (
    <Box>
      <Loader color="teal" size="xl" />
    </Box>
  );
};

export default AppLoader;
