import { ArrowUpIcon, ArrowDownIcon } from "@chakra-ui/icons";
import { HStack, Text, Box, Icon, VStack, Flex, Badge } from "@chakra-ui/react";
import React from "react";

interface CommentProps {
  comment: {
    id: number;
    body: string;
    likes: number;
    dislikes: number;
    user: {
      username: string;
      avatarId: number;
      id: number;
      accessLevel: number;
    };
  };
  userId: number | undefined;
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

export const Comment: React.FC<CommentProps> = ({ comment, userId }) => {
  const isOwner = comment.user.id === userId;
  return (
    <div>
      <HStack key={comment.id} align={"top"} py={2}>
        <Box color={"green.400"} px={2}>
          {/*Need to implement avatars*/}
          <Badge colorScheme="twitter">{comment.user.avatarId}</Badge>
        </Box>
        <VStack align={"start"}>
          <Flex>
            <Text fontWeight={isOwner ? 700 : 600}>
              {comment.user.username}
            </Text>
            {badge(isOwner, comment.user.accessLevel)}
          </Flex>

          <Text color={"gray.600"}>{comment.body}</Text>
          <Flex>
            <Badge colorScheme="green" mr={2}>
              {comment.likes} <Icon as={ArrowUpIcon} />
            </Badge>
            <Badge colorScheme="red">
              {comment.dislikes} <Icon as={ArrowDownIcon} />
            </Badge>
          </Flex>
        </VStack>
      </HStack>
    </div>
  );
};
