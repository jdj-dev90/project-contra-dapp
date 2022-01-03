import { Box, Button } from "@mantine/core";
import { FC, useState } from "react";
import ModalWrapper from "../common/modalWrapper";
import LinkForm from "./linkForm";
import LinksList from "./linksList";
interface PropTypes {}

const Links: FC<PropTypes> = () => {
  const [open, setOpen] = useState(false);
  console.log("open", { open });
  return (
    <Box>
      <h1>links header</h1>
      <Button onClick={() => setOpen(true)}>+ Add Link</Button>
      <ModalWrapper open={open} setOpen={setOpen}>
        <LinkForm setOpen={setOpen} />
      </ModalWrapper>
      <LinksList modalOpen={open} />
    </Box>
  );
};

export default Links;
