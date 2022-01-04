import { Box } from "@mantine/core";
import type { NextPage } from "next";
import { FC } from "react";
import EditLink from "../components/common/cards/editLink";
import SeededAvatar from "../components/common/cards/seededAvatar";
import { UserLink } from "../types";

const Spacer: FC<{ children: any }> = ({ children }) => {
  return <Box sx={{ margin: "25px 0" }}>{children}</Box>;
};

const Test: NextPage = () => {
  return (
    <Box>
      <Spacer>
        <SeededAvatar seed="elafont" onEdit={() => console.log("clicked")} />
      </Spacer>
      <Spacer>
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
