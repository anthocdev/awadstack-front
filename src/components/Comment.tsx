import {
  ArrowUpIcon,
  ArrowDownIcon,
  CheckIcon,
  CloseIcon,
  DeleteIcon,
  EditIcon,
} from "@chakra-ui/icons";
import {
  HStack,
  Text,
  Box,
  Avatar,
  VStack,
  Flex,
  Badge,
  IconButton,
  Editable,
  EditableInput,
  EditablePreview,
  useEditableControls,
  ButtonGroup,
  Button,
} from "@chakra-ui/react";
import React from "react";

interface CommentProps {
  comment: {
    id: number;
    body: string;
    likes: number;
    dislikes: number;
    createdAt: string;
    updatedAt: string;
    user: {
      username: string;
      avatarSvg: string;
      id: number;
      accessLevel: number;
    };
  };
  userId: number | undefined;
  voteFunc: any; //Like/dislike comment
  updateFunc: any; //Edit comment
  removeFunc: any; //Remove comment
}

/* Badges based on access levels */
const badge = (owner: boolean, accessLevel: number) => {
  if (owner) {
    return (
      <Badge background="none" color="twitter.600" fontSize="0.6em">
        You
      </Badge>
    );
  }

  switch (accessLevel) {
    case -1:
      return (
        <Badge background="none" color="red.600" fontSize="0.6em">
          Banned
        </Badge>
      );
    case 1:
      return (
        <Badge background="none" color="green.600" fontSize="0.6em">
          Admin
        </Badge>
      );
    default:
      return (
        <Badge background="none" color="twitter.900" fontSize="0.6em">
          User
        </Badge>
      );
  }
};

export const Comment: React.FC<CommentProps> = ({
  comment,
  userId,
  voteFunc,
  updateFunc,
  removeFunc,
}) => {
  const isOwner = comment.user.id === userId;
  const EditControl = () => {
    const {
      isEditing,
      getSubmitButtonProps,
      getCancelButtonProps,
      getEditButtonProps,
    } = useEditableControls();

    return isEditing ? (
      /* (Displays whileediting)  */
      <ButtonGroup justifyContent="center" size="sm">
        <IconButton
          aria-label="confirm-edit"
          icon={<CheckIcon />}
          {...getSubmitButtonProps()}
        />
        <IconButton
          aria-label="cancel-editing"
          icon={<CloseIcon />}
          {...getCancelButtonProps()}
        />
      </ButtonGroup>
    ) : (
      /* (Displays while not editing)  */
      <Flex justifyContent="center">
        {/* Edit Comment */}
        <IconButton
          aria-label="edit-comment"
          size="sm"
          icon={<EditIcon />}
          {...getEditButtonProps()}
        />
        {/* Delete comment*/}
        <IconButton
          ml={2}
          size="sm"
          aria-label="delete-comment"
          icon={<DeleteIcon />}
          onClick={() => removeFunc({ commentId: comment.id })}
          background="red.300"
        />
      </Flex>
    );
  };

  const CommentControls = (isOwner: boolean) => {
    return isOwner ? (
      <Flex>
        <Editable
          colorScheme="twitter"
          defaultValue={comment.body}
          onSubmit={async (value) =>
            await updateFunc({ commentId: comment.id, body: value })
          }
          submitOnBlur={false}
        >
          <Flex>
            <EditableInput />
            <Box mr={2}>
              <EditablePreview />
            </Box>
            <EditControl />
          </Flex>
        </Editable>
      </Flex>
    ) : (
      <Text>{comment.body}</Text>
    );
  };

  const DateDisplay = () => {
    const createdTimestampInt = parseInt(comment.createdAt);
    const updatedTimestampInt = parseInt(comment.updatedAt);
    return createdTimestampInt < updatedTimestampInt ? (
      <Text fontSize="xs">
        Edited At: {new Date(updatedTimestampInt).toUTCString()}
      </Text>
    ) : (
      <Text fontSize="xs">
        Created At: {new Date(createdTimestampInt).toUTCString()}
      </Text>
    );
  };

  return (
    <div>
      <HStack key={comment.id} align={"top"} py={2}>
        <Box color={"green.400"} px={2}>
          <Avatar
            src={`data:image/svg+xml;utf8,${encodeURIComponent(
              comment.user.avatarSvg
            )}`}
          />
        </Box>
        <VStack align={"start"}>
          <Flex>
            <Text fontWeight={isOwner ? 700 : 600}>
              {comment.user.username}
            </Text>
            {badge(isOwner, comment.user.accessLevel)}
          </Flex>
          {CommentControls(comment.user.id === userId)}
          <DateDisplay />
          <Flex>
            <Box mr={2}>
              {comment.likes}
              <IconButton
                ml={1}
                variant="solid"
                onClick={() =>
                  voteFunc({ commentId: comment.id, isLike: true })
                }
                colorScheme="green"
                aria-label="Like"
                size="xs"
                icon={<ArrowUpIcon />}
              />
            </Box>
            <Box>
              {comment.dislikes}
              <IconButton
                ml={1}
                variant="solid"
                onClick={() =>
                  voteFunc({ commentId: comment.id, isLike: false })
                }
                colorScheme="red"
                aria-label="Like"
                size="xs"
                icon={<ArrowDownIcon />}
              />
            </Box>
          </Flex>
        </VStack>
      </HStack>
    </div>
  );
};
