import { Box } from "@mantine/core";
import { NextPage } from "next";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import UserCard from "../components/common/cards/userCard";
import { useGunContext } from "../hooks/useGunContext";

const Home: NextPage = () => {
  const { getGun } = useGunContext();
  const router = useRouter();
  const [profiles, setProfiles] = useState<any>([]);
  console.log({ profiles }, "profilesprofilesprofiles");
  useEffect(() => {
    if (getGun()) {
      getGun()
        .get(`~${process.env.NEXT_PUBLIC_APP_PUBLIC_KEY}`)
        .get("profiles")
        .map()
        .once((profile: any) => {
          console.log({ profile });
          setProfiles((profs: any) => [...profs, profile]);
        });
    }
  }, [getGun()]);

  return (
    <Box>
      {profiles.map((profile: any) => {
        console.log({ profile }, "asakcajio");
        return (
          <UserCard
            key={profile.username}
            type={"outbound"}
            profile={profile}
            onCardClick={() => router.push(`/profile/${profile.username}`)}
          />
        );
      })}
    </Box>
  );
};

export default Home;
