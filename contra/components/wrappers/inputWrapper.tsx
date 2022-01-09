import { Box } from "@mantine/core";
import { FC, ReactNode } from "react";

interface InputWrapperProps {
  children: ReactNode;
  fullWidth?: boolean;
}

const InputWrapper: FC<InputWrapperProps> = ({ children }) => {
  return <Box sx={{ margin: "10px 0" }}>{children}</Box>;
};

export default InputWrapper;
