import { ActionIcon, Avatar, Box, useMantineTheme } from "@mantine/core";
import { useHover } from "@mantine/hooks";
import { FC } from "react";
import { BiEdit } from "react-icons/bi";
import { animated, useSpring } from "react-spring";
import { createAvatar } from "@dicebear/avatars";
import * as style from "@dicebear/miniavs";

interface PropTypes {
  seed: string | null;
  onEdit?: () => void;
}

const SeededAvatar: FC<PropTypes> = ({ seed, onEdit }) => {
  const { hovered, ref } = useHover();
  const { colors, primaryColor } = useMantineTheme();
  const props = useSpring({
    opacity: hovered ? 1 : 0.2,
  });

  const seededSvg = createAvatar(style, {
    seed: seed || "",
    dataUri: true,
    backgroundColor: colors[primaryColor][5],
  });
  return (
    <Box
      ref={ref}
      sx={{
        display: "flex",
        alignItems: "center",
      }}
    >
      <Avatar color="blue" radius="xl" size="xl">
        <img src={seededSvg} />
      </Avatar>
      {onEdit && (
        <Box>
          <animated.div style={props}>
            <ActionIcon
              sx={{
                margin: "0 10px",
              }}
              variant="outline"
              color="blue"
              onClick={onEdit}
            >
              <BiEdit />
            </ActionIcon>
          </animated.div>
        </Box>
      )}
    </Box>
  );
};

export default SeededAvatar;
