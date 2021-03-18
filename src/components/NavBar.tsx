import { Box, Button, Flex, Link } from "@chakra-ui/react";
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
        <Box mr={2}>{data.me.username}</Box>
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
    <Flex bg="twitter.400" p={4}>
      <Box ml={"auto"}>{body}</Box>
    </Flex>
  );
};
