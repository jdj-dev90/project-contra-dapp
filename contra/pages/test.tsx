import { Box, Paper, Text } from "@mantine/core";
import type { NextPage } from "next";
import { FC } from "react";
import EditLink from "../components/common/cards/editLink";
import SeededAvatar from "../components/common/cards/seededAvatar";
import UserCard from "../components/common/cards/userCard";
import { UserLink } from "../types";

const Spacer: FC<{ children: any }> = ({ children }) => {
  return <Box sx={{ margin: "25px 0" }}>{children}</Box>;
};

const Test: NextPage = () => {
  return (
    <Box>
      <Box>
        <Spacer>
          <Text weight={500} size="sm">
            avatar
          </Text>
          <SeededAvatar
            seed="elasfdghjdghksdgha fregsfghjsfghjfont"
            onEdit={() => console.log("clicked")}
          />
        </Spacer>
      </Box>
      <Spacer>
        <Text weight={500} size="sm">
          add someone (outbound)
        </Text>
        <UserCard type="outbound" />
      </Spacer>
      <Spacer>
        <Text weight={500} size="sm">
          some add me (inbound)
        </Text>
        <UserCard type="inbound" />
      </Spacer>
      <Spacer>
        <Text weight={500} size="sm">
          link
        </Text>
        <EditLink
          link={{
            id: "testetsttest testtest",
            type: "testetsttest testtest",
            label: "testetsttest testtest",
            url: "https://react-icons.github.io/react-icons",
          }}
          onDelete={(lId: string) => console.log({ lId })}
          onEdit={(l: UserLink) => console.log({ l })}
        />
      </Spacer>
    </Box>
  );
};

export default Test;
