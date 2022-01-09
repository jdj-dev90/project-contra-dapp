import { Box, Button, Select, TextInput } from "@mantine/core";
import { useForm } from "@mantine/hooks";
import { Dispatch, FC, SetStateAction } from "react";
import { useGunContext } from "../../../hooks/useGunContext";
import { useProfiles } from "../../../hooks/useProfiles";
import { UserLink } from "../../../types";

interface PropTypes {
  link: UserLink | null;
  setModalOpen: Dispatch<SetStateAction<boolean>>;
}

const LinkForm: FC<PropTypes> = ({ link, setModalOpen }) => {
  const { getGun, getCertificate, getAlias } = useGunContext();
  const { addUserLink } = useProfiles();
  const form = useForm({
    initialValues: {
      label: link?.label || "",
      url: link?.url || "",
      type: link?.type || null,
      id: link?.id || null,
    },

    validationRules: {
      label: (value) => value.length >= 5,
      url: (value) => value.length <= 50,
    },
    errorMessages: {
      label: "Must be at least 5 characters long.",
      url: "Must be less than 50 characters long.",
    },
  });

  const onSave = (data: typeof form["values"]) => {
    const { id, ...values } = data;
    const links = getGun().get(`${getAlias()}/profile`).get("links");
    links
      .set(!!id ? links.get(id) : values, null, {
        opt: { cert: getCertificate() },
      })
      .once((data: { [x: string]: any } | undefined, key: string) => {
        addUserLink({ id: key, ...values } as UserLink);
      });

    setModalOpen(false);
  };

  return (
    <form onSubmit={form.onSubmit(onSave)}>
      <Box>
        <TextInput {...form.getInputProps("label")} placeholder="Label" />
      </Box>
      <Box sx={{ margin: "1rem 0" }}>
        <TextInput {...form.getInputProps("url")} placeholder="Url" />
      </Box>

      {/* 
      <Select
        {...form.getInputProps("type")}
        label="Your favorite framework/library"
        placeholder="Pick one"
        data={[
          { value: "react", label: "React" },
          { value: "ng", label: "Angular" },
          { value: "svelte", label: "Svelte" },
          { value: "vue", label: "Vue" },
        ]}
      /> */}

      <Button type="submit">save</Button>
    </form>
  );
};

export default LinkForm;
