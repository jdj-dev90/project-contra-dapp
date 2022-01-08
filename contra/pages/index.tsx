import { Box } from "@mantine/core";
import { NextPage } from "next";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import UserCard from "../components/common/cards/userCard";
import { useGunContext } from "../hooks/useGunContext";

const Home: NextPage = () => {
  const router = useRouter();
  const [profiles, setProfiles] = useState<any>([]);
  const { getGun } = useGunContext();
  // console.log({ profiles, getGun: getGun().get(`~${process.env.NEXT_PUBLIC_APP_PUBLIC_KEY}`) }, "profilesprofilesprofiles");
  useEffect(() => {
    let evt: any = null;
    getGun()
      .get("profiles")
      .map()
      .on((profff: any, id, node, e) => {
        evt = e;
        setProfiles((p) => [...p, profff]);
      });

    return () => evt?.off();
  }, []);
  return (
    <Box>
      {profiles.map((profile: any, idx: number) => {
        return (
          <UserCard
            key={idx}
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
// const SEA = {
//   m: {
//     "#": "k09bq9wzS52y91sqSbGe~1XwPF6sfMeXwig7-QTciJNROKX1B_NulFXNnKlb60G4.KEU0paOs4VCIObxt6GkJRPv4Q9m5dNlEz73coKwqySI.",
//     ".": "what",
//     ":": {
//       ct: "DSL8fcwcmQiuZMXHO/tb9l/DgCIWo2gEGII+JR97hnNEkggFwy3B6XrRIDMN82hj/e0F02EhZjwGuBXcetaornDgxZZmvAAJ16of0XsGKKeOFTQ=",
//       iv: "pv/DXi2kyseiXjFja+hH",
//       s: "ATj/NMBJ8trm",
//       v: 1,
//       w: "4Kp72Ns5s+VdaIGx.jHvE7ExASZPfXCa9",
//     },
//     ">": 1567847179189,
//   },
//   s: "/3t/ICV204T7E6fE0cqcZmB9M16aBcTAr9VpifEpXNPXGwYbqaj7IWAkKvK4sn1ZK1Yen3cBsCU9C0I01pomUg==",
// };
