import { ActionIcon, Box, Paper, Text } from "@mantine/core";
import { useHover } from "@mantine/hooks";
import { FC } from "react";
import { BiEdit, BiTrash } from "react-icons/bi";
import { animated, useSpring } from "react-spring";
import { UserLink } from "../../../types";

interface PropTypes {
  link: UserLink;
  onDelete?: (id: string) => void | null;
  onEdit?: (link: UserLink) => void | null;
}

const EditLink: FC<PropTypes> = ({ onDelete, onEdit, link }) => {
  const { hovered, ref } = useHover();
  const props = useSpring({
    opacity: hovered ? 1 : 0.2,
  });

  return (
    <Box
      ref={ref}
      sx={{
        display: "flex",
        alignItems: "center",
      }}
    >
      <Paper
        padding="md"
        shadow="sm"
        withBorder
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "5px",
          cursor: "pointer",
          width: "100%",
        }}
        component="a"
        href={link.url}
        target="_blank"
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            width: "100%",
          }}
        >
          <Text weight={500} size="lg">
            {link.label}
          </Text>
        </Box>
      </Paper>

      {(!!onEdit || !!onDelete) && (
        <animated.div style={props}>
          <Box
            sx={{
              display: "flex",
            }}
          >
            {onEdit && (
              <ActionIcon
                sx={{
                  margin: "0 10px",
                }}
                variant="outline"
                color="blue"
                onClick={() => onEdit(link)}
              >
                <BiEdit />
              </ActionIcon>
            )}
            {onDelete && (
              <ActionIcon
                variant="light"
                color="red"
                onClick={() => onDelete(link.id)}
              >
                <BiTrash />
              </ActionIcon>
            )}
          </Box>
        </animated.div>
      )}
    </Box>
  );
};

export default EditLink;
