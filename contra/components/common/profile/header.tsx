import { Box, Button, Divider } from "@mantine/core";
import { useRouter } from "next/router";
import { FC, useContext } from "react";
import { AppStateContext } from "../../../pages/_app";

interface ProfileHeaderProps {
  displayName: string;
  username: string;
  bio: string;
  privacyType: string;
}

const HeaderItem: FC<{ title: string }> = ({ title }) => {
  return (
    <Box
      sx={{
        display: "flex",
        padding: "5px 0",
        // border: "1px solid orange",
      }}
    >
      {title}
    </Box>
  );
};

const ProfileHeader: FC<ProfileHeaderProps> = ({
  displayName,
  username,
  bio,
  privacyType,
}) => {
  const router = useRouter();
  const { userId } = useContext(AppStateContext);

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        padding: 10,
        // border: "1px solid blue",
      }}
    >
      <HeaderItem title={displayName} />
      <HeaderItem title={username} />
      <HeaderItem title={bio} />
      <HeaderItem title={privacyType} />

      <Box
        sx={{
          display: "flex",
          width: "100%",
          justifyContent: "space-around",
          //   border: "1px solid blue",
          paddingTop: 10,
        }}
      >
        <Button
          variant="outline"
          onClick={() => router.push(`/profile/followers/${userId}`)}
        >
          Followers
        </Button>
        <Divider orientation="vertical" />
        <Button
          variant="outline"
          onClick={() => router.push(`/profile/following/${userId}`)}
        >
          Following
        </Button>
        <Divider orientation="vertical" />
        <Button
          variant="outline"
          onClick={() => router.push(`/profile/edit/${userId}`)}
        >
          Edit
        </Button>
      </Box>
    </Box>
  );
};

export default ProfileHeader;
