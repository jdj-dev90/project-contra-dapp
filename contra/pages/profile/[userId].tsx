import { Box, Divider } from "@mantine/core";
import { useEffect, useState } from "react";
import LinksList from "../../components/edit/links/linksList";
import ProfileHeader from "../../components/profile/header";
import { useGunContext } from "../../hooks/useGunContext";

export default function Profile() {
  const { userProfile } = useGunContext();

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        padding: 10,
      }}
    >
      <ProfileHeader
        displayName={userProfile?.displayName || ""}
        username={userProfile?.username || ""}
        bio={userProfile?.bio || ""}
        privacyType={userProfile?.privacyType || ""}
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
