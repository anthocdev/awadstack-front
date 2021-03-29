import { Badge, Box, Button, Flex, Heading, Link } from "@chakra-ui/react";
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
        {data.me.accessLevel === 1 ? (
          <NextLink href="/movie/new">
            <Link mr={2}>New Movie</Link>
          </NextLink>
        ) : null}
        <Badge
          mr={2}
          background="none"
          color={data.me.accessLevel === 1 ? "red.600" : "blackAlpha.500"}
          fontSize="1em"
        >
          {data.me.username}
        </Badge>
        <Button
          onClick={() => {
            logout();
          }}
          variant="link"
          isLoading={logoutFetching}
        >
          Logout
        </Button>
      </Flex>
    );
  }
  return (
    <Flex position="sticky" top={0} zIndex={1} bg="twitter.400" p={4}>
      <Flex>
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
      </Flex>
      <Box ml={"auto"}>{body}</Box>
    </Flex>
  );
};
