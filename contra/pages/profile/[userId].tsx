import { Box, Divider } from "@mantine/core";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import LinksList from "../../components/edit/links/linksList";
import ProfileHeader from "../../components/profile/header";
import { useGunContext } from "../../hooks/useGunContext";

export default function Profile() {
  const { userProfile, getGun,} = useGunContext();
  const router = useRouter()
  const [profile, setProfile] = useState<any>([])
  console.log({router})
useEffect(() => {
  const pppp =   getGun().get(`${router.query.userId||userProfile?.username}`).once((aaa)=>console.log({aaa}))

  console.log({pppp})
  getGun()
      .get(`~${process.env.NEXT_PUBLIC_APP_PUBLIC_KEY}`)
      .get("profiles")
      .get(router.query.userId||userProfile?.username)
      .once((profile: any, id: string) => {
        console.log({profile,id,useid:router.query.userId},'zzzZZZZZZZZzzzz')
        // const newProfile = {
        //   id,
        //   label: profile.label,
        //   url: profile.url,
        //   type: profile.type,
        // };
        // console.log({newProfile})
        // setProfile((pr:any) => [...pr, newProfile]);
      });
},[])
console.log({profile},'profile')

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
