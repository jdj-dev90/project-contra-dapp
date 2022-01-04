import { Box } from "@mantine/core";
import { useForm } from "@mantine/hooks";
import { useEffect } from "react";
import AccountDetails from "../../../components/edit/accountDetails/accountDetails";
import Links from "../../../components/edit/links/links";
import { useGun, useUser } from "../../../hooks";

export default function Edit() {
  const { gun } = useGun();
  const { userId } = useUser();
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
    gun.get(`${userId}`).put(values);

  return (
    <Box sx={{ display: "flex", flexDirection: "column" }}>
      {/* <Title order={2}>Account Details</Title>
      <form onSubmit={form.onSubmit(onSave)}>
        <TextInput
          sx={{ padding: "5px 0" }}
          label="Display Name"
          placeholder="John Doe"
          {...form.getInputProps("displayName")}
        />
        <TextInput
          sx={{ padding: "5px 0" }}
          label="Bio"
          placeholder="..."
          {...form.getInputProps("bio")}
        />
        <Checkbox
          sx={{ padding: "10px 0" }}
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
        <Button sx={{ margin: "5px 0" }} type="submit">
          save
        </Button>
      </form> */}
      <AccountDetails />
      <Links />
    </Box>
  );
}
