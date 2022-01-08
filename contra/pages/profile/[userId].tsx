import { Box, Divider } from "@mantine/core";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import LinksList from "../../components/edit/links/linksList";
import ProfileHeader from "../../components/profile/header";
import { useGunContext } from "../../hooks/useGunContext";

export default function Profile() {
  const { getGun } = useGunContext();
  const router = useRouter();
  const [profile, setProfile] = useState<any>([]);

  useEffect(() => {
    getGun()
      .get(`${router.query.userId}/profile`)
      .once((prof: any) => {
        setProfile(prof);
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
        displayName={profile?.displayName || ""}
        username={profile?.username || ""}
        bio={profile?.bio || ""}
        privacyType={profile?.privacyType || ""}
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
