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
      overlayOpacity={0.95}
    >
      <Box>{children}</Box>
    </Modal>
  );
};

export default ModalWrapper;
