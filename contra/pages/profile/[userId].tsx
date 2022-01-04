import { Box, Divider } from "@mantine/core";
import { useEffect, useState } from "react";
import LinksList from "../../components/edit/links/linksList";
import ProfileHeader from "../../components/profile/header";
import { useGun, useUser } from "../../hooks";
import { UserDetails } from "../../types";

export default function Profile() {
  const [details, setDetails] = useState<UserDetails>();

  const { gun } = useGun();
  const { userId } = useUser();
  useEffect(() => {
    gun.get(`${userId}`).once((val) => {
      setDetails(val as UserDetails);
    });
  }, []);

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        padding: 10,
      }}
    >
      <ProfileHeader
        displayName={details?.displayName || ""}
        username={details?.username || ""}
        bio={details?.bio || ""}
        privacyType={details?.privacyType || ""}
      />
      <Divider
        sx={{
          margin: "15px 10px",
        }}
      />
      <LinksList />
    </Box>
  );
}
