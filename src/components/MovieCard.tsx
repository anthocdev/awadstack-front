import { StarIcon } from "@chakra-ui/icons";
import { Box, Badge, Image, Button, Skeleton } from "@chakra-ui/react";
import React from "react";
import { useMeQuery } from "../generated/graphql";
import { useRouter } from "next/router";

interface Movie {
  id: number;
  title: string;
  imageLink: string;
  imdbId: string;
  rating: number;
  year: number;
  genre: string;
}
interface MovieProps {
  movie: Movie;
}

export const MovieCard: React.FC<MovieProps> = ({ movie }) => {
  const router = useRouter();
  const [{ data }] = useMeQuery();
  return (
    <Box
      id={movie.id.toString()}
      borderWidth="1px"
      borderRadius="lg"
      overflow="hidden"
    >
      <Box d="flex" justifyContent="center">
        <Skeleton isLoaded>
          <Image
            src={movie.imageLink}
            fallbackSrc="https://i.giphy.com/media/26xBIygOcC3bAWg3S/giphy.webp"
          />
        </Skeleton>
      </Box>

      <Box p="6">
        <Box d="flex" justifyContent="center" alignItems="baseline">
          <Box
            color="gray.500"
            fontWeight="semibold"
            letterSpacing="wide"
            fontSize="xs"
            textTransform="uppercase"
            ml="2"
          >
            Published: {movie.year}
            {/* &bull; Test2 */}
          </Box>
        </Box>

        <Box mt="1" fontWeight="semibold" as="h4" lineHeight="tight">
          {movie.title}
        </Box>

        <Box>
          <Box as="span" color="burlywood" fontSize="sm">
            <a
              href={"https://www.imdb.com/title/tt00" + movie.imdbId}
              target="_blank"
            >
              IMDb Link
            </a>
          </Box>
        </Box>

        <Box d="flex" mt={1} mb={1} justifyContent="center" alignItems="center">
          {Array(10)
            .fill("")
            .map((_, i) => (
              <StarIcon
                maxW={"12px"}
                key={i}
                color={i < Math.round(movie.rating) ? "gold" : "gray.300"}
              />
            ))}
        </Box>

        <Badge borderRadius="full" my="2" colorScheme="twitter">
          {movie.genre}
        </Badge>

        <Box>
          <Button
            _hover={{ bg: "red.900" }}
            fontSize="sm"
            color="white"
            bg="twitter.300"
            onClick={() => router.push(`/movie/view/${movie.id}`)}
          >
            View
          </Button>
          {data?.me?.accessLevel === 1 ? (
            <Button
              ml={2}
              fontSize="sm"
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
