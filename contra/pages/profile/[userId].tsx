import { Box, Button } from "@mantine/core";
import { useRouter } from "next/router";
import { useContext } from "react";

export default function Profile() {
  const router = useRouter();
  const { userId } = router.query;
  console.log("profile userId", { userId });

  return (
    <>
      <Box>Name</Box>
      <Box></Box>
      <Box></Box>

      <Button onClick={() => router.push(`/profile/edit/${userId}`)}>
        Edit
      </Button>
    </>
  );
}
