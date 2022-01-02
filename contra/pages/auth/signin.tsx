import { Button, Input } from "@mantine/core";
import { useRouter } from "next/router";
import { useContext, useState } from "react";
import { user } from "../../utils/gun";

export default function Signin() {
  const router = useRouter();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const signInUser = () => {
    user.auth(username, password, function (ack: any) {
      console.log({ ack }, "done authenticating user!");
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
      <Button onClick={signInUser}>Sign In</Button>
    </>
  );
}
