import { StarIcon } from "@chakra-ui/icons";
import { Box, Badge, Image, Button, Skeleton } from "@chakra-ui/react";
import React, { useState } from "react";
import { useMeQuery } from "../generated/graphql";
import { useRouter } from "next/router";

interface Movie {
  id: number;
  title: string;
  imageLink: string;
  imdbId: string;
}
interface MovieProps {
  movie: Movie;
}

export const MovieCard: React.FC<MovieProps> = ({ movie }) => {
  const router = useRouter();
  const [isLoading, setLoading] = useState(true);
  const [{ data }] = useMeQuery();
  return (
    <Box
      id={movie.imdbId}
      maxWidth="400px"
      borderWidth="1px"
      borderRadius="lg"
      overflow="hidden"
    >
      {isLoading ? <Skeleton h="300px" w={"400px"} /> : null}
      <Image
        src={movie.imageLink}
        alt="Image"
        onLoad={() => setLoading(false)}
      />

      <Box p="6">
        <Box d="flex" alignItems="baseline">
          <Badge borderRadius="full" px="2" colorScheme="teal">
            New
          </Badge>
          <Box
            color="gray.500"
            fontWeight="semibold"
            letterSpacing="wide"
            fontSize="xs"
            textTransform="uppercase"
            ml="2"
          >
            Test1 &bull; Test2
          </Box>
        </Box>

        <Box mt="1" fontWeight="semibold" as="h4" lineHeight="tight">
          {movie.title}
        </Box>

        <Box>
          {movie.imdbId}
          <Box as="span" color="gray.600" fontSize="sm">
            -uniqueId
          </Box>
        </Box>

        <Box d="flex" mt="2" alignItems="center">
          {/* {Array(5)
            .fill("")
            .map((_, i) => (
              <StarIcon key={i} color={i < 2 ? "teal.500" : "gray.300"} />
            ))} */}
          <Button
            _hover={{ bg: "red.900" }}
            color="white"
            bg="twitter.300"
            onClick={() => router.push(`/movie/view/${movie.id}`)}
          >
            Comments
          </Button>
          {data?.me?.accessLevel === 1 ? (
            <Button
              ml={2}
              _hover={{ bg: "red.900" }}
              color="white"
              bg="red.300"
            >
              Modify
            </Button>
          ) : null}
        </Box>
      </Box>
    </Box>
  );
};
