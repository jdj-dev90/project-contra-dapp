import { Box, Button, TextInput, Title } from "@mantine/core";
import { useForm } from "@mantine/hooks";
import Column from "../components/wrappers/column";
import InputWrapper from "../components/wrappers/inputWrapper";
import { useGunContext } from "../hooks/useGunContext";
import { useRouter } from "next/router";
import { ChangeEvent, useEffect } from "react";
import { ProfileDetails } from "../types";

export default function Signup() {
  const router = useRouter();
  const { signup, authError, setAuthError, getUser } = useGunContext();

  const form = useForm({
    initialValues: {
      username: "",
      displayName: "",
      password: "",
    },

    validationRules: {
      username: (value) => value.length >= 4,
      displayName: (value) => value.length >= 4,
      password: (value) => value.length >= 8,
    },
    errorMessages: {
      username: "Must be at least 4 characters long.",
      displayName: "Must be at least 4 characters long.",
      password: "Must be at least 8 characters long.",
    },
  });

  const handleSignUp = () => {
    signup(form.values.username, form.values.password, form.values.displayName);
  };

  useEffect(() => {
    // redirect to home if already logged in
    if (
      (getUser()?.is && router.pathname === "/signup") ||
      router.pathname === "/signin"
    ) {
      router.push("/");
    }
  }, []);

  return (
    <Column sx={{ marginTop: "30px" }}>
      <Title order={3}>Sign Up</Title>
      <form onSubmit={form.onSubmit(handleSignUp)}>
        <InputWrapper>
          <TextInput
            {...form.getInputProps("username")}
            label="Username"
            placeholder="example"
            onChange={(event: ChangeEvent<HTMLInputElement>) => {
              form.setFieldValue("username", event.currentTarget.value);
              setAuthError(null);
            }}
          />
        </InputWrapper>
        <InputWrapper>
          <TextInput
            {...form.getInputProps("displayName")}
            label="Display Name"
            placeholder="example"
            onChange={(event: ChangeEvent<HTMLInputElement>) => {
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
            onChange={(event: ChangeEvent<HTMLInputElement>) => {
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
