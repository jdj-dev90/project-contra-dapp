import {
  ActionIcon,
  Blockquote,
  Box,
  Button,
  Divider,
  Title,
} from "@mantine/core";
import { useRouter } from "next/router";
import { FC } from "react";
import { BiEdit, BiLockAlt, BiLockOpen } from "react-icons/bi";
import { useGunContext } from "../../hooks/useGunContext";
import SeededAvatar from "../common/cards/seededAvatar";

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
  const { getUser } = useGunContext();
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        padding: 10,
      }}
    >
      <HeaderItem>
        <HeaderItem>
          <SeededAvatar seed={username} />
        </HeaderItem>

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
            <ActionIcon
              variant="outline"
              color="blue"
              onClick={() => router.push(`/profile/edit/${userId}`)}
            >
              <BiEdit />
            </ActionIcon>
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
  );
};

export default ProfileHeader;
