import React, { ReactElement } from "react";
import { useRouter } from "next/router";
import { withUrqlClient } from "next-urql";
import { createUrqlClient } from "../../../utils/createUrqlClient";
import { useMovieQuery } from "../../../generated/graphql";
import { Layout } from "../../../components/Layout";
import { StarIcon, CalendarIcon } from "@chakra-ui/icons";
import {
  Container,
  Image,
  SimpleGrid,
  Stack,
  useColorModeValue,
  Heading,
  StackDivider,
  Icon,
  Flex,
  Text,
} from "@chakra-ui/react";
import { Comment } from "../../../components/Comment";

interface DetailProps {
  text: string | undefined;
  heading: string | undefined;
  iconBg: string;
  icon?: ReactElement;
}

const Detail = ({ text, heading, icon, iconBg }: DetailProps) => {
  return (
    <Stack direction={"row"} align={"center"}>
      <Flex
        w={8}
        h={8}
        align={"center"}
        justify={"center"}
        rounded={"full"}
        bg={iconBg}
      >
        {icon}
      </Flex>
      <Text fontWeight={600}>{heading}</Text>
      <Text fontWeight={400}>{text}</Text>
    </Stack>
  );
};

const MovieDisp: React.FC<{}> = ({}) => {
  const router = useRouter();
  const intId =
    typeof router.query.id === "string" ? parseInt(router.query.id) : -1;
  const [{ data, error, fetching }] = useMovieQuery({
    pause: intId === -1,
    variables: {
      id: intId,
    },
  });

  if (fetching) {
    return (
      <Layout>
        <div>loading...</div>
      </Layout>
    );
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <Layout>
      {/* Movie Container */}
      <Container maxW={"4xl"} py={12}>
        <SimpleGrid columns={{ base: 2, md: 2 }} spacing={10}>
          <Stack spacing={4}>
            <Text
              textTransform={"uppercase"}
              color={"blue.400"}
              fontWeight={600}
              fontSize={"sm"}
              bg={useColorModeValue("blue.50", "blue.900")}
              p={2}
              alignSelf={"flex-start"}
              rounded={"md"}
            >
              {data?.movie?.genre}
            </Text>
            <Heading>{data?.movie?.title}</Heading>
            <Text color={"gray.500"} fontSize={"lg"}>
              No additional info available YET
            </Text>
            <Stack
              spacing={4}
              divider={
                <StackDivider
                  borderColor={useColorModeValue("gray.100", "gray.700")}
                />
              }
            >
              <Detail
                icon={
                  <Icon as={CalendarIcon} color={"twitter.500"} w={5} h={5} />
                }
                iconBg="twitter.100"
                heading="Release Year:"
                text={data?.movie?.year.toString()}
              />
              <Detail
                icon={<Icon as={StarIcon} color={"twitter.500"} w={5} h={5} />}
                iconBg="twitter.100"
                heading="IMDB Rating:"
                text={data?.movie?.rating.toString()}
              />
            </Stack>
          </Stack>
          <Flex>
            <Image
              rounded={"md"}
              alt={"feature image"}
              src={data?.movie?.imageLink}
            />
          </Flex>
        </SimpleGrid>
      </Container>
      {/* Comment Container */}

      <Container maxW={"4xl"} py={12}>
        <Heading>Comments</Heading>
        {!data?.movie?.comments && !fetching ? (
          <div>No comments yet, be first to comment.</div>
        ) : (
          data?.movie?.comments!.map((comment) => {
            console.log("KOMENT", comment);
            return <Comment comment={comment} />;
          })
        )}
        {}
      </Container>
    </Layout>
  );
};

export default withUrqlClient(createUrqlClient, { ssr: true })(MovieDisp);
