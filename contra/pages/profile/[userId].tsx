import { Box, Divider } from "@mantine/core";
import { useRouter } from "next/router";
import { useEffect } from "react";
import AppLoader from "../../components/common/appLoader";
import LinksList from "../../components/edit/links/linksList";
import ProfileHeader from "../../components/profile/header";
import { useGunContext } from "../../hooks/useGunContext";
import { useProfiles } from "../../hooks/useProfiles";
import { ProfileDetails } from "../../types";

export default function Profile() {
  const { getGun } = useGunContext();
  const router = useRouter();
  const { userProfile, setUserProfile } = useProfiles();

  useEffect(() => {
    if (userProfile?.username !== router.query.userId) {
      getGun()
        .get(`${router.query.userId}/profile`)
        .once((prof: { [x: string]: any } | undefined) => {
          setUserProfile(prof as ProfileDetails);
        });
    }
  }, []);

  if (userProfile?.username !== router.query.userId) {
    return <AppLoader />;
  }

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
