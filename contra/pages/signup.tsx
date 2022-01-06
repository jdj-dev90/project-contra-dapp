import { Box, Button, TextInput, Title } from "@mantine/core";
import { useForm } from "@mantine/hooks";
import { useRouter } from "next/router";
import { useState } from "react";
import Column from "../components/wrappers/column";
import InputWrapper from "../components/wrappers/inputWrapper";
import { useGunContext } from "../hooks/useGunContext";

export default function Login() {
  const router = useRouter();
  const { getGun, getUser, setUserProfile, onAuth } = useGunContext();
  const [authError, setAuthError] = useState<string | null>(null);

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

  const onCreateSuccess = ({ pub }: { pub: string }) => {
    console.log({
      createSuccess: {
        username: form.values.username,
        pub,
      },
    });

    logIn();
  };

  const logIn = async () => {
    getUser().auth(form.values.username, form.values.password, (ack: any) => {
      console.log({ ack }, "getUser");
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

  const handleSignUp = () => {
    setAuthError(null);

    // check if user with username already exists
    getGun()
      .get(`~@${form.values.username}`)
      .once((user: any) => {
        console.log({ user });
        if (user) {
          setAuthError("Username already taken");
        } else {
          getUser().create(
            form.values.username,
            form.values.password,
            ({ err, pub }: any) => {
              console.log({ err, pub });
              if (err) {
                setAuthError(err);
              } else {
                onCreateSuccess({ pub });
              }
            }
          );
        }
      });
  };

  return (
    <Column sx={{ marginTop: "30px" }}>
      <Title order={3}>Sign Up</Title>
      <form onSubmit={form.onSubmit(handleSignUp)}>
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
            label="displayName"
            placeholder="example"
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
