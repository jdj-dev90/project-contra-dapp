import { Button, Checkbox, TextInput } from "@mantine/core";
import { useForm } from "@mantine/hooks";
import { useContext, useEffect } from "react";
import Links from "../../../components/links/links";
import { gun } from "../../../utils/gun";
import { AppStateContext } from "../../_app";

export default function Edit() {
  const { userId } = useContext(AppStateContext);

  const form = useForm({
    initialValues: {
      displayName: "",
      bio: "",
      privacyType: "PUBLIC",
    },

    validationRules: {
      displayName: (value) => value.length >= 5,
      bio: (value) => value.length <= 50,
    },
    errorMessages: {
      displayName: "Must be at least 5 characters long.",
      bio: "Must be less than 50 characters long.",
    },
  });

  useEffect(() => {
    if (userId) {
      gun.get(`${userId}`).once((val) => {
        form.setValues({
          displayName: val?.displayName || "",
          bio: val?.bio || "",
          privacyType: val?.privacyType || "PUBLIC",
        });
      });
    }
  }, [userId]);

  const onSave = (values: typeof form["values"]) =>
    gun.get(`${userId}`).get(`userDetails`).put(values);

  return (
    <>
      <form onSubmit={form.onSubmit(onSave)}>
        <TextInput
          placeholder="Display Name"
          {...form.getInputProps("displayName")}
        />
        <TextInput placeholder="Bio" {...form.getInputProps("bio")} />
        <Checkbox
          {...form.getInputProps("privacyType", { type: "checkbox" })}
          checked={form.values.privacyType === "PRIVATE"}
          onChange={(e: any) => {
            form.setFieldValue(
              "privacyType",
              e.currentTarget.checked ? "PRIVATE" : "PUBLIC"
            );
          }}
          label="Do you want to make your account private?"
        />
        <Button type="submit">save</Button>
      </form>
      <Links />
    </>
  );
}
