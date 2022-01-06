import { Box, Button, TextInput, Title } from "@mantine/core";
import { useForm } from "@mantine/hooks";
import { useRouter } from "next/router";
import { useState } from "react";
import Column from "../components/wrappers/column";
import InputWrapper from "../components/wrappers/inputWrapper";
import { useGunContext } from "../hooks/useGunContext";

export default function Login() {
  const router = useRouter();

  const { onAuth, getUser, setUserProfile } = useGunContext();
  const [authError, setAuthError] = useState<string | null>(null);

  const form = useForm({
    initialValues: {
      username: "",
      password: "",
    },

    validationRules: {
      username: (value) => value.length >= 4,
      password: (value) => value.length >= 8,
    },
    errorMessages: {
      username: "Must be at least 4 characters long.",
      password: "Must be at least 8 characters long.",
    },
  });

  const logIn = () => {
    getUser().auth(form.values.username, form.values.password, (ack: any) => {
      console.log({ ack });
      if (ack.err) {
        setAuthError(ack.err);
      } else {
        onAuth(() => {
          setUserProfile();
        });
        router.push(`/profile/${ack.sea.pub}`);
      }
    });
  };

  const handleSubmit = () => {
    setAuthError(null);
    logIn();
  };

  return (
    <Column sx={{ marginTop: "30px" }}>
      <Title order={3}>Sign In</Title>
      <form onSubmit={form.onSubmit(handleSubmit)}>
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
        <Button type="submit">Sign In</Button>
      </form>
      {authError && <Box>{authError}</Box>}
    </Column>
  );
}
