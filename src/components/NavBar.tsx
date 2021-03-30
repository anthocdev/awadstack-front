import {
  Avatar,
  Badge,
  Box,
  Button,
  Flex,
  Heading,
  Image,
  Link,
  Text,
} from "@chakra-ui/react";
import { useLogoutMutation, useMeQuery } from "../generated/graphql";
import React from "react";
import NextLink from "next/link";
import { isServer } from "../utils/isServer";

interface NavBarProps {}

export const NavBar: React.FC<NavBarProps> = ({}) => {
  const [{ fetching: logoutFetching }, logout] = useLogoutMutation();
  const [{ data, fetching }] = useMeQuery({
    pause: isServer(),
  });
  let body = null;

  /* Loading */
  if (fetching) {
    /* User not logged in */
  } else if (!data?.me) {
    body = (
      <>
        <NextLink href="/login">
          <Link mr={2}>Login</Link>
        </NextLink>
        <NextLink href="/register">
          <Link>Register</Link>
        </NextLink>{" "}
      </>
    );
    /* User logged in */
  } else {
    body = (
      <Flex>
        {/* Profile Display */}
        <Flex mr={2} alignItems="center">
          <Avatar
            src={`data:image/svg+xml;utf8,${encodeURIComponent(
              data.me.avatarSvg
            )}`}
          />
          <Box ml="3">
            <Text
              fontWeight="bold"
              color={data.me.accessLevel === 1 ? "red.800" : "blackAlpha.900"}
            >
              {data.me.username}
              <Badge
                ml="1"
                colorScheme={data.me.accessLevel === 1 ? "red" : "green"}
              >
                {data.me.accessLevel === 1 ? "Admin" : "User"}
              </Badge>
            </Text>
          </Box>
          <Button
            ml={4}
            onClick={() => {
              logout();
            }}
            isLoading={logoutFetching}
            colorScheme="red"
            backgroundColor="red.900"
          >
            Logout
          </Button>
        </Flex>
      </Flex>
    );
  }
  return (
    <Flex position="sticky" top={0} zIndex={1} bg="twitter.400" p={4}>
      <Flex alignItems="center">
        {/* Heading (Logo?) */}
        <NextLink href="/">
          <Heading
            _hover={{ textDecoration: "none" }}
            as={Link}
            size="md"
            mr={2}
          >
            Filmd
          </Heading>
        </NextLink>
        {/* Navigation */}
        {data?.me?.accessLevel === 1 ? (
          <NextLink href="/movie/new">
            <Link mr={2}>New Movie</Link>
          </NextLink>
        ) : null}
      </Flex>
      <Box ml={"auto"}>{body}</Box>
    </Flex>
  );
};
