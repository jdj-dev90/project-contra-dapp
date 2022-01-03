import { Box, Button } from "@mantine/core";
import { useRouter } from "next/router";
import { useContext, useEffect, useState } from "react";
import DisplayLinkList from "../../components/common/profile/displayLinkList";
import ProfileHeader from "../../components/common/profile/header";
import { UserDetails } from "../../types";
import { gun } from "../../utils/gun";
import { AppStateContext } from "../_app";

// const LinkItem: FC<{ title: string }> = ({ title }) => {
//   return (
//     <Box
//       sx={{
//         display: "flex",
//         padding: "5px 0",
//         border: "1px solid orange",
//       }}
//     >
//       {title}
//     </Box>
//   );
// };

export default function Profile() {
  const router = useRouter();
  const [details, setDetails] = useState<UserDetails>();
  const { userId } = useContext(AppStateContext);

  useEffect(() => {
    gun
      .get(`${userId}`)
      .get(`userDetails`)
      .once((val) => setDetails(val as UserDetails));
  }, []);

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        padding: 10,
        // border: "1px solid red",
      }}
    >
      <ProfileHeader
        displayName={details?.displayName || ""}
        username={details?.username || ""}
        bio={details?.bio || ""}
        privacyType={details?.privacyType || ""}
      />
      <DisplayLinkList />
    </Box>
  );
}
