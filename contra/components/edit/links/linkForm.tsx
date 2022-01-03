import { Button, Select, TextInput } from "@mantine/core";
import { useForm } from "@mantine/hooks";
import { Dispatch, FC, SetStateAction, useEffect } from "react";
import { useAppState } from "../../../utils/gun";

interface PropTypes {
  linkId?: string;
  setOpen: Dispatch<SetStateAction<boolean>>;
}

const LinkForm: FC<PropTypes> = ({ linkId, setOpen }) => {
  const { userId, gun } = useAppState();
  const form = useForm({
    initialValues: {
      label: "",
      url: "",
      type: null,
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

  useEffect(() => {
    if (linkId) {
      // gun
      //   .get(`${userId}`)
      // .once((val) => {
      //   form.setValues({
      //     displayName: val?.displayName || "",
      //     bio: val?.bio || "",
      //     privacyType: val?.privacyType || "PUBLIC",
      //   });
      // });
    }
  }, []);

  const onSave = (values: typeof form["values"]) => {
    const links = gun.get(`${userId}`).get("links");
    links.set(values);
    setOpen(false);
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
