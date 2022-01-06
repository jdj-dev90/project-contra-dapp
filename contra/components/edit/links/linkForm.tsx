import { Button, Select, TextInput } from "@mantine/core";
import { useForm } from "@mantine/hooks";
import { Dispatch, FC, SetStateAction } from "react";
import { useGunContext } from "../../../hooks/useGunContext";
import { UserLink } from "../../../types";

interface PropTypes {
  link: UserLink | null;
  setModalOpen: Dispatch<SetStateAction<boolean>>;
}

const LinkForm: FC<PropTypes> = ({ link, setModalOpen }) => {
  const { getGun, getUser, getCertificate } = useGunContext();
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

  const onSave = ({ id, ...values }: typeof form["values"]) => {
    const links = getGun()
      .get(`~${process.env.NEXT_PUBLIC_APP_PUBLIC_KEY}`)
      .get("profiles")
      .get(getUser().is.pub)
      .get("links");

    console.log({ id, ...values });
    if (id) {
      // UPDATE
      links.set(links.get(id), null, {
        opt: { cert: getCertificate() },
      });
    } else {
      // CREATE

      links.set(values, null, {
        opt: { cert: getCertificate() },
      });
    }
    console.log({ links });

    setModalOpen(false);
  };

  return (
    <form onSubmit={form.onSubmit(onSave)}>
      <TextInput {...form.getInputProps("label")} placeholder="Label" />
      <TextInput {...form.getInputProps("url")} placeholder="Url" />

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
      />

      <Button type="submit">save</Button>
    </form>
  );
};

export default LinkForm;
