import { Box, Divider } from "@mantine/core";
import { useContext, useEffect, useState } from "react";
import DisplayLinkList from "../../components/common/profile/displayLinkList";
import ProfileHeader from "../../components/common/profile/header";
import { UserDetails } from "../../types";
import { gun, useMe } from "../../utils/gun";
import { AppStateContext } from "../_app";

export default function Profile() {
  const [details, setDetails] = useState<UserDetails>();
  const { userId } = useContext(AppStateContext);

  useEffect(() => {
    gun
      .get("users")
      .get(`${userId}`)
      .once((val) => {
        console.log({ val }, "VAL");
        setDetails(val as UserDetails);
      });
  }, []);
  useMe("userDetails");
  return (
    <Box sx={{ display: "flex", justifyContent: "center" }}>
      <Box sx={{ display: "flex" }}>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            padding: 10,
          }}
        >
          <ProfileHeader
            displayName={details?.displayName || ""}
            username={details?.username || ""}
            bio={details?.bio || ""}
            privacyType={details?.privacyType || ""}
          />
          <Divider
            sx={{
              margin: "15px 10px",
            }}
          />
          <DisplayLinkList />
        </Box>
      </Box>
    </Box>
  );
}
