import { Box, Button, Card, Text } from "@mantine/core";
import { FC, useState } from "react";
import SeededAvatar from "./seededAvatar";

interface PropTypes {
  type: "outbound" | "inbound";
}

interface FollowState {
  following: boolean;
  status: "APPROVED" | "PENDING" | "REJECTED" | null;
  isPrivate: boolean;
}

interface ChangeState {
  following?: boolean;
  status?: "APPROVED" | "PENDING" | "REJECTED" | null;
  isPrivate?: boolean;
}

const buildBtnText = (followState: FollowState) => {
  const { following, status, isPrivate } = followState;
  if (!isPrivate) {
    return following ? "Following" : "Follow";
  } else {
    switch (status) {
      case "APPROVED": {
        return "Following";
      }
      case "PENDING": {
        return "Pending";
      }
      default: {
        return "Follow";
      }
    }
  }
};

const handleFollowClick = (
  followState: FollowState,
  setFollowState: any,
  type?: "APPROVE" | "REJECT" | null
) => {
  const setChanges = (changes: ChangeState) =>
    setFollowState({
      ...followState,
      ...changes,
    });
  const { following, status, isPrivate } = followState;

  if (!isPrivate) {
    setChanges({ following: !following });
  } else {
    switch (status) {
      case "APPROVED": {
        setChanges({
          following: !following,
          status: !following ? "PENDING" : null,
        });
      }
      case "PENDING": {
        if (type === "APPROVE") {
          setChanges({
            following: true,
            status: "APPROVED",
          });
        } else {
          setChanges({
            following: false,
            status: "REJECTED",
          });
        }
        return;
      }
      default: {
        setChanges({
          following: !following,
          status: !following ? "PENDING" : null,
        });
      }
    }
  }
};

const UserCard: FC<PropTypes> = ({ type }) => {
  const [followState, setFollowState] = useState<FollowState>({
    following: true,
    status: "PENDING",
    isPrivate: true,
  });

  return (
    <Card
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
      }}
    >
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          cursor: "pointer",
          width: "100%",
        }}
        onClick={() => console.log("nav to acc")}
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            marginRight: "20px",
          }}
        >
          <SeededAvatar size="md" seed="asdfiuhkjnbasjdnfrrr" />
        </Box>
        <Box>
          <Text weight={500} size="lg">
            Display Name
          </Text>
          <Text weight={500} size="sm">
            $username
          </Text>
        </Box>
      </Box>
      <Box>
        {type === "outbound" ? (
          <Button
            variant="outline"
            onClick={() => handleFollowClick(followState, setFollowState, null)}
          >
            {buildBtnText(followState)}
          </Button>
        ) : (
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <Button
              sx={{ marginRight: 10 }}
              color="green"
              onClick={() =>
                handleFollowClick(followState, setFollowState, "APPROVE")
              }
            >
              Approve
            </Button>

            <Button
              variant="light"
              color="red"
              onClick={() =>
                handleFollowClick(followState, setFollowState, "REJECT")
              }
            >
              Reject
            </Button>
          </Box>
        )}
      </Box>
    </Card>
  );
};

export default UserCard;
