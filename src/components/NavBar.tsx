import { Box, Button, Flex, Link } from "@chakra-ui/react";
import { useMeQuery } from "../generated/graphql";
import React from "react";
import NextLink from "next/link";

interface NavBarProps {}

export const NavBar: React.FC<NavBarProps> = ({}) => {
  const [{ data, fetching }] = useMeQuery();
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
        <Button variant="link">Logout</Button>
      </Flex>
    );
  }
  return (
    <Flex bg="twitter.400" p={4}>
      <Box ml={"auto"}>{body}</Box>
    </Flex>
  );
};
