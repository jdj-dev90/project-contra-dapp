import { Box } from "@mantine/core";
import { IGunChainReference } from "gun/types/chain";
import { NextPage } from "next";
import { useRouter } from "next/router";
import { useEffect } from "react";
import AppLoader from "../components/common/appLoader";
import UserCard from "../components/common/cards/userCard";
import { useGunContext } from "../hooks/useGunContext";
import { useProfiles } from "../hooks/useProfiles";
import { ProfileDetails } from "../types";

const Home: NextPage = () => {
  const router = useRouter();
  const { getGun } = useGunContext();
  const { profiles, addProfile } = useProfiles();

  useEffect(() => {
    let evt: IGunChainReference | null = null;
    getGun()
      .get("profiles")
      .map()
      .on(
        (
          profff: ProfileDetails,
          id: string,
          node: IGunChainReference,
          e: IGunChainReference
        ) => {
          evt = e;
          addProfile(profff);
        }
      );

    return () => {
      evt?.off();
    };
  }, []);

  if (profiles === null) {
    return <AppLoader />;
  }
  return (
    <Box>
      {profiles.map((profile: ProfileDetails, idx: number) => {
        return (
          <UserCard
            key={idx}
            type={"outbound"}
            profile={profile}
            onCardClick={() => {
              router.push(`/profile/${profile.username}`);
            }}
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
