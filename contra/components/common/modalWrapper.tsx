import { Box, Modal } from "@mantine/core";
import { Dispatch, FC, SetStateAction } from "react";

interface PropTypes {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  children: React.ReactChild;
}

const ModalWrapper: FC<PropTypes> = ({ open, setOpen, children }) => {
  return (
    <Modal
      opened={open}
      onClose={() => setOpen(false)}
      title="Introduce yourself!"
      // overlayColor={theme.colorScheme === 'dark' ? theme.colors.dark[9] : theme.colors.gray[2]}
      overlayOpacity={0.95}
    >
      <Box>{children}</Box>
    </Modal>
  );
};

export default ModalWrapper;
