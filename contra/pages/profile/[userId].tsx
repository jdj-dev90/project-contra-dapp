import { Box, Button } from "@mantine/core";
import { useRouter } from "next/router";
import { useContext, useEffect, useState } from "react";
import { UserDetails } from "../../types";
import { gun } from "../../utils/gun";
import { AppStateContext } from "../_app";

export default function Profile() {
  const router = useRouter();
  const [details, setDetails] = useState<UserDetails>();
  const { userId } = useContext(AppStateContext);

  useEffect(() => {
    gun
      .get(`${userId}`)
      .get(`userDetails`)
      .once((val) => setDetails(val as UserDetails));
  }, []);

  return (
    <>
      PROFILE
      <Box>{details?.displayName}</Box>
      <Box>{details?.username}</Box>
      <Box>{details?.bio}</Box>
      <Box>{details?.privacyType}</Box>
      <Button onClick={() => router.push(`/profile/edit/${userId}`)}>
        Edit
      </Button>
      <Button onClick={() => router.push(`/profile/followers/${userId}`)}>
        Followers
      </Button>
      <Button onClick={() => router.push(`/profile/following/${userId}`)}>
        Following
      </Button>
    </>
  );
}
