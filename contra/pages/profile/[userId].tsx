import { Box, Button } from "@mantine/core";
import { useRouter } from "next/router";
import { useContext, useEffect, useState } from "react";
import DisplayLinkList from "../../components/common/profile/displayLinkList";
import ProfileHeader from "../../components/common/profile/header";
import { UserDetails } from "../../types";
import { AppStateContext } from "../_app";
import { gun, useMe } from "../../utils/gun";

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
    gun.get(`${userId}`).once((val) => setDetails(val as UserDetails));
  }, []);

  // useMe(userId as string, "userDetails");
  console.log("details", { details, userId });
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
