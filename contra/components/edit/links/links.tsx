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
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        width: "100%",
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          width: "100%",
        }}
      >
        <Title
          order={2}
          sx={{
            marginBottom: 20,
          }}
        >
          Links
        </Title>
        <Button
          sx={{
            marginBottom: 20,
          }}
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
        <LinksList setModalOpen={setOpen} setLink={setLink} />
      </Box>
    </Box>
  );
};

export default Links;
