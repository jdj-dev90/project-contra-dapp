import { Box, Button } from "@mantine/core";
import { useRouter } from "next/router";
import { useContext, useEffect, useState } from "react";
import { UserDetails } from "../../types";
import { gun, useMe } from "../../utils/gun";

export default function Profile() {
  const router = useRouter();
  const [details, setDetails] = useState<UserDetails>();
  const { userId } = router.query;
  useEffect(() => {
    gun
      .get("users")
      .get(`${userId}`)
      .once((val) => {
        console.log({ val }, "VAL");
        setDetails(val as UserDetails);
      });
  }, []);
  useMe("userDetails");
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
