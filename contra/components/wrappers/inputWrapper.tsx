import { Box } from "@mantine/core";
import { FC } from "react";

interface InputWrapperProps {
  children: any;
  fullWidth?: boolean;
}

const InputWrapper: FC<InputWrapperProps> = ({ children }) => {
  return <Box sx={{ margin: "10px 0" }}>{children}</Box>;
};

export default InputWrapper;
