import { Button, Checkbox, TextInput, Title } from "@mantine/core";
import { useForm } from "@mantine/hooks";
import { useEffect } from "react";
import { useGunContext } from "../../../hooks/useGunContext";
import SeededAvatar from "../../common/cards/seededAvatar";

export default function AccountDetails() {
  const { getUser, getGun, getCertificate, userProfile } = useGunContext();
  const form = useForm({
    initialValues: {
      username: "",
      displayName: "",
      bio: "",
      privacyType: "PUBLIC"
    },

    validationRules: {
      displayName: value => value.length >= 5,
      bio: value => value.length <= 50
    },
    errorMessages: {
      displayName: "Must be at least 5 characters long.",
      bio: "Must be less than 50 characters long."
    }
  });

  const onSave = (values: typeof form["values"]) => {
    getGun()
      .get(`~${process.env.NEXT_PUBLIC_APP_PUBLIC_KEY}`)
      .get("profiles")
      .get(userProfile?.username)
      .put(values, null, {
        opt: { cert: getCertificate() }
      });
  };

  useEffect(() => {
    if (userProfile) {
      form.setValues({
        username: userProfile.username,
        displayName: userProfile.displayName,
        bio: userProfile.bio,
        privacyType: userProfile.privacyType
      });
    }
  }, [userProfile]);
  return (
    <>
      <Title order={2}>Account Details</Title>

      <form onSubmit={form.onSubmit(onSave)}>
        <SeededAvatar
          seed={form.values.username}
          onEdit={() => console.log("avatar edit clicked")}
        />
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
      </form>
    </>
  );
}
