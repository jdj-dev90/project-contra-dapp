import { Box, Button, Title } from "@mantine/core";
import { FC, useState } from "react";
import ModalWrapper from "../common/modalWrapper";
import LinkForm from "./linkForm";
import LinksList from "./linksList";

interface PropTypes {}

const Links: FC<PropTypes> = () => {
  const [open, setOpen] = useState(false);
  return (
    <Box sx={{ display: "flex", justifyContent: "center" }}>
      <Box sx={{ display: "flex", flexDirection: "column", width: "100%" }}>
        <Title order={2}>Account Details</Title>

        <Button onClick={() => setOpen(true)}>+ Add Link</Button>
        <ModalWrapper open={open} setOpen={setOpen}>
          <LinkForm setOpen={setOpen} />
        </ModalWrapper>
        <LinksList modalOpen={open} />
      </Box>
    </Box>
  );
};

export default Links;
