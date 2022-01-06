import { Box } from "@mantine/core";
import type { NextPage } from "next";
import { useEffect, useState } from "react";
import { useGunContext } from "../hooks/useGunContext";

const Home: NextPage = () => {
  // const gunsss = useGun();
  // console.log({ gunsss }, "STATE_STATE_STATE_ACTIONS_ACTIONS_ACTIONS");
  const { getGun } = useGunContext();
  const [profiles, setProfiles] = useState<any>([]);
  useEffect(() => {
    console.log({ getGun: getGun() });
    if (getGun()) {
      getGun()
        .get(`~${process.env.NEXT_PUBLIC_APP_PUBLIC_KEY}`)
        .get("profiles")
        .map()
        .once((profile: any) => {
          console.log({ profiles }, "profilesprofilesprofiles");
          setProfiles((profs: any) => [...profs, profile]);
        });
    }
  }, [getGun()]);

  return <Box></Box>;
};

export default Home;
