import { ActionIcon, Box, Button, Card, Text } from "@mantine/core";
import { FC, useState } from "react";
import { BiEdit, BiTrash } from "react-icons/bi";
import { UserLink } from "../../../types";
import { useSpring, animated } from "react-spring";
import { useHover } from "@mantine/hooks";

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
      <Card
        sx={{
          display: "flex",
          width: "100%",
          padding: "5px",
          cursor: "pointer",
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
      </Card>

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
