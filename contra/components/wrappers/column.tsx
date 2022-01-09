import { Box } from "@mantine/core";
import { BoxSx } from "@mantine/core/lib/components/Box/use-sx/use-sx";
import { FC, ReactNode } from "react";

interface ColumnProps {
  children: ReactNode;
  fullWidth?: boolean;
  sx?: BoxSx;
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
