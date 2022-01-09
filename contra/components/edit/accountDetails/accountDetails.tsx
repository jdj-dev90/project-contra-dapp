import {
  Box,
  Button,
  Checkbox,
  Textarea,
  TextInput,
  Title,
} from "@mantine/core";
import { useForm } from "@mantine/hooks";
import { useRouter } from "next/router";
import { ChangeEvent, useEffect } from "react";
import { useGunContext } from "../../../hooks/useGunContext";
import { useProfiles } from "../../../hooks/useProfiles";
import { ProfileDetails } from "../../../types";
import AppLoader from "../../common/appLoader";
import SeededAvatar from "../../common/cards/seededAvatar";

export default function AccountDetails() {
  const router = useRouter();
  const { userProfile } = useProfiles();
  const { getCertificate, getGun } = useGunContext();
  const form = useForm({
    initialValues: {
      username: userProfile?.username || "",
      displayName: userProfile?.displayName || "",
      bio: userProfile?.bio || "",
      privacyType: userProfile?.privacyType || "PUBLIC",
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

  const onSave = (values: typeof form["values"]) => {
    getGun()
      .get(`${router.query.userId}/profile`)
      .put(
        {
          displayName: values.displayName,
          bio: values.bio,
          privacyType: values.privacyType,
        },
        null,
        {
          opt: { cert: getCertificate() },
        }
      );
  };
  useEffect(() => {
    if (userProfile?.username !== router.query.userId) {
      getGun()
        .get(`${router.query.userId}/profile`)
        .once((data) => {
          form.setValues({
            username: data?.username | "",
            displayName: data?.displayName | "",
            bio: data?.bio | "",
            privacyType: data?.privacyType | "",
          });
        });
    }
  }, []);

  if (userProfile?.username !== router.query.userId) {
    return <AppLoader />;
  }

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          margin: 0,
        }}
      >
        <Title
          sx={{
            marginBottom: 25,
          }}
          order={2}
        >
          Account Details
        </Title>
        <form onSubmit={form.onSubmit(onSave)}>
          <Box
            sx={{
              marginBottom: 20,
            }}
          >
            <SeededAvatar
              seed={form.values.username}
              // onEdit={() => console.log("avatar edit clicked")}
            />
          </Box>
          <TextInput
            sx={{ padding: "5px 0" }}
            label="Display Name"
            placeholder="John Doe"
            {...form.getInputProps("displayName")}
          />
          <Textarea
            sx={{ padding: "5px 0" }}
            label="Bio"
            placeholder="..."
            {...form.getInputProps("bio")}
          />
          <Checkbox
            sx={{ padding: "10px 0" }}
            {...form.getInputProps("privacyType", { type: "checkbox" })}
            checked={form.values.privacyType === "PRIVATE"}
            onChange={(e: ChangeEvent<HTMLInputElement>) => {
              form.setFieldValue(
                "privacyType",
                e.currentTarget.checked ? "PRIVATE" : "PUBLIC"
              );
            }}
            label="Do you want to make your account private?"
          />
          <Button sx={{ margin: "10px 0 25px 0" }} type="submit">
            save
          </Button>
        </form>
      </Box>
    </Box>
  );
}
