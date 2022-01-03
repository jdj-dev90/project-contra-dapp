import { Box, Button, TextInput, Title } from "@mantine/core";
import { useForm } from "@mantine/hooks";
import { useRouter } from "next/router";
import { useState } from "react";
import Column from "../components/wrappers/column";
import InputWrapper from "../components/wrappers/inputWrapper";
import { UserDetails } from "../types";
import { useAppState } from "../utils/gun";

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
  const { gun, user, setUserId, setIsLoggedIn } = useAppState();

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
    <Column sx={{ marginTop: "30px" }}>
      <Title order={3}>Sign Up</Title>
      <form onSubmit={form.onSubmit(signUpUser)}>
        <InputWrapper>
          <TextInput
            {...form.getInputProps("username")}
            label="Username"
            placeholder="example"
            onChange={(event) => {
              form.setFieldValue("username", event.currentTarget.value);
              setAuthError(null);
            }}
          />
        </InputWrapper>
        <InputWrapper>
          <TextInput
            {...form.getInputProps("displayName")}
            label="Display Name"
            placeholder="John Doe"
            onChange={(event) => {
              form.setFieldValue("displayName", event.currentTarget.value);
              setAuthError(null);
            }}
          />
        </InputWrapper>
        <InputWrapper>
          <TextInput
            {...form.getInputProps("password")}
            type="password"
            label="Password"
            placeholder="********"
            onChange={(event) => {
              form.setFieldValue("password", event.currentTarget.value);
              setAuthError(null);
            }}
          />
        </InputWrapper>
        <Button type="submit">Sign Up</Button>
      </form>
      {authError && <Box>{authError}</Box>}
    </Column>
  );
}
