import { Box, Button, Title } from "@mantine/core";
import { FC, useState } from "react";
import { UserLink } from "../../../types";
import ModalWrapper from "../../common/modalWrapper";
import LinkForm from "./linkForm";
import LinksList from "./linksList";

interface PropTypes {}

const Links: FC<PropTypes> = () => {
  const [open, setOpen] = useState(false);
  const [link, setLink] = useState<UserLink | null>(null);
  return (
    <Box sx={{ display: "flex", flexDirection: "column", marginTop: "30px" }}>
      <Title order={2}>Links</Title>

      <Button
        onClick={() => {
          setLink(null);
          setOpen(true);
        }}
      >
        + Add Link
      </Button>
      <ModalWrapper open={open} setOpen={setOpen}>
        <LinkForm link={link} setModalOpen={setOpen} />
      </ModalWrapper>
      <LinksList modalOpen={open} setModalOpen={setOpen} setLink={setLink} />
    </Box>
  );
};

export default Links;
