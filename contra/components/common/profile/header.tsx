import { Blockquote, Box, Button, Divider, Title } from "@mantine/core";
import { useRouter } from "next/router";
import { FC, useContext } from "react";
import { AppStateContext } from "../../../pages/_app";
import { BiLockAlt, BiLockOpen, BiEdit } from "react-icons/bi";
import { IconContext } from "react-icons/lib";

interface ProfileHeaderProps {
  displayName: string;
  username: string;
  bio: string;
  privacyType: string;
}

const HeaderItem: FC<{ children: any }> = ({ children }) => {
  return (
    <Box
      sx={{
        display: "flex",
        padding: "5px",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      {children}
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
    <IconContext.Provider value={{ style: { fontSize: "24px" } }}>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          padding: 10,
        }}
      >
        <HeaderItem>
          <Title order={2}>{displayName}</Title>
          <Box
            sx={{
              display: "flex",
              marginTop: "5px",
              alignItems: "center",
            }}
          >
            <HeaderItem>
              <Title order={3}>{`$${username}`}</Title>
            </HeaderItem>
            <HeaderItem>
              {privacyType === "PRIVATE" ? <BiLockAlt /> : <BiLockOpen />}
            </HeaderItem>
            <HeaderItem>
              <BiEdit onClick={() => router.push(`/profile/edit/${userId}`)} />
            </HeaderItem>
          </Box>
        </HeaderItem>
        {bio ? (
          <HeaderItem>
            <Blockquote cite={username}>{bio}</Blockquote>
          </HeaderItem>
        ) : (
          <HeaderItem>
            <Blockquote cite={username}>
              {displayName} testtest test testtest test testtesttest te st test
            </Blockquote>
          </HeaderItem>
        )}

        <Box
          sx={{
            display: "flex",
            width: "100%",
            justifyContent: "space-around",
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
        </Box>
      </Box>
    </IconContext.Provider>
  );
};

export default ProfileHeader;
