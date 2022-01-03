import { Box } from "@mantine/core";
import { FC } from "react";

interface ColumnProps {
  children: any;
  fullWidth?: boolean;
  sx?: any;
}

const Column: FC<ColumnProps> = ({ children, fullWidth, sx }) => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        width: fullWidth ? "100%" : "",
        ...sx,
      }}
    >
      {children}
    </Box>
  );
};

export default Column;
