import { Box, Button, TextInput } from "@mantine/core";
import { useForm } from "@mantine/hooks";
import { useRouter } from "next/router";
import { useState } from "react";
import { UserDetails } from "../../types";
import { gun, useAppState, user } from "../../utils/gun";

function createUserDetails(
  userId: string,
  username: string,
  displayName: string
): UserDetails {
  return {
    userId,
    avatar: "",
    bio: "",
    displayName: displayName,
    privacyType: "PUBLIC",
    username: username,
  };
}

export default function Signup() {
  const { setUserId, setIsLoggedIn } = useAppState();

  const router = useRouter();
  const [authError, setAuthError] = useState<string | null>(null);

  const form = useForm({
    initialValues: {
      username: "",
      displayName: "",
      password: "",
    },

    validationRules: {
      username: (value) => value.length >= 4,
      displayName: (value) => value.length >= 5,
      password: (value) => value.length >= 8,
    },
    errorMessages: {
      username: "Must be at least 4 characters long.",
      displayName: "Must be at least 5 characters long.",
      password: "Must be at least 8 characters long.",
    },
  });

  const signUpUser = (values: typeof form["values"]) => {
    user.create(values.username, values.password, function (ack: any) {
      console.log({ ack }, "done creating user!");
      if (ack.err) {
        console.log("error", { err: ack.err });
      } else {
        const newUser = gun
          .get(ack.pub)
          .put(createUserDetails(ack.pub, values.username, values.displayName));
        const userDetails = gun.get("users").set(newUser);

        setUserId(ack.pub);
        setIsLoggedIn(true);

        router.push(`/profile/${ack.pub}`);
      }
    });
  };
  return (
    <>
      <form onSubmit={form.onSubmit(signUpUser)}>
        <TextInput
          placeholder="Username"
          {...form.getInputProps("username")}
          onChange={(event) => {
            form.setFieldValue("username", event.currentTarget.value);
            setAuthError(null);
          }}
        />
        <TextInput
          placeholder="Display Name"
          {...form.getInputProps("displayName")}
          onChange={(event) => {
            form.setFieldValue("displayName", event.currentTarget.value);
            setAuthError(null);
          }}
        />
        <TextInput
          placeholder="Password"
          {...form.getInputProps("password")}
          onChange={(event) => {
            form.setFieldValue("password", event.currentTarget.value);
            setAuthError(null);
          }}
          type="password"
        />
        <Button type="submit">Sign Up</Button>
      </form>
      {authError && <Box>{authError}</Box>}
    </>
  );
}
