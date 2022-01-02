import { Button, Input } from "@mantine/core";
import { useRouter } from "next/router";
import { useState } from "react";
import { user } from "../../utils/gun";

export default function Signup() {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const signUpUser = () => {
    user.create(username, password, function (ack: any) {
      console.log({ ack }, "done creating user!");
      if (ack.err) {
        console.log("error", { err: ack.err });
      } else {
        router.push(`/profile/${ack.sea.pub}`);
      }
    });
  };
  return (
    <>
      <Input
        placeholder="username"
        onChange={(e: any) => setUsername(e.target.value)}
      />
      <Input
        placeholder="password"
        onChange={(e: any) => setPassword(e.target.value)}
      />
      <Button onClick={signUpUser}>Sign Up</Button>
    </>
  );
}
