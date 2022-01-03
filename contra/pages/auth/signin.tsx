import { Box, Button, Input, TextInput } from "@mantine/core";
import { useForm } from "@mantine/hooks";
import { useRouter } from "next/router";
import { useContext, useState } from "react";
import { user, gun } from "../../utils/gun";

export default function Signin() {
  const router = useRouter();
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

  const signInUser = (values: typeof form["values"]) => {
    user.auth(values.username, values.password, function (ack: any) {
      console.log({ ack }, "done authenticating user!");
      if (ack.err) {
        console.log("error", { err: ack.err });
        setAuthError(ack.err);
      } else {
        router.push(`/profile/${ack.sea.pub}`);
      }
    });
  };

  return (
    <>
      <form onSubmit={form.onSubmit(signInUser)}>
        <TextInput
          {...form.getInputProps("username")}
          onChange={(event) => {
            form.setFieldValue("username", event.currentTarget.value);
            setAuthError(null);
          }}
          placeholder="username"
        />
        <TextInput
          {...form.getInputProps("password")}
          onChange={(event) => {
            form.setFieldValue("password", event.currentTarget.value);
            setAuthError(null);
          }}
          placeholder="password"
          type="password"
        />
        <Button type="submit">Sign In</Button>
      </form>
      {authError && <Box>{authError}</Box>}
    </>
  );
}
