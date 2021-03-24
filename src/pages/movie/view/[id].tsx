import React, { ReactElement } from "react";
import { useRouter } from "next/router";
import { withUrqlClient } from "next-urql";
import { createUrqlClient } from "../../../utils/createUrqlClient";
import {
  useCreateCommentMutation,
  useMeQuery,
  useMovieQuery,
} from "../../../generated/graphql";
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
  Button,
} from "@chakra-ui/react";
import { Comment } from "../../../components/Comment";
import { isServer } from "../../../utils/isServer";
import { TextAreaField } from "../../../components/TextAreaField";
import { Form, Formik } from "formik";

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
  const [, createComment] = useCreateCommentMutation();
  const [{ data: meData, fetching: meFetching }] = useMeQuery({
    pause: isServer(),
  });

  const intId =
    typeof router.query.id === "string" ? parseInt(router.query.id) : -1;
  const [{ data, error, fetching }] = useMovieQuery({
    pause: intId === -1,
    variables: {
      id: intId,
    },
  });

  if (fetching || meFetching) {
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
        {!data?.movie?.comments?.length && !fetching ? (
          <Container mt={6}>No comments available.</Container>
        ) : (
          data?.movie?.comments!.map((comment) => {
            return <Comment comment={comment} userId={meData?.me?.id} />;
          })
        )}
        {/* Comment Input */}
      </Container>
      <Container maxW={"4x1"} py={6}>
        <Heading size="lg">Leave a Comment</Heading>
        <Formik
          initialValues={{ body: "", movieId: intId }}
          onSubmit={async (values, { setErrors }) => {
            const response = await createComment(values);
            /*@Todo more validation */
            // if (response.data?.login.errors) {
            //   setErrors(toErrorMap(response.data.createComment.errors));
            // } else if (response.data?.login.user) {
            //   /*Successful login */
            //   if (typeof router.query.next === "string") {
            //     /* Push to history */
            //     router.push(router.query.next);
            //   } else {
            //     router.push("/");
            //   }
            // }
            if (response.data?.createComment.id) {
            }
          }}
        >
          {({ isSubmitting }) => (
            <Form>
              <TextAreaField
                name="body"
                placeholder="comment"
                label="Comment"
              />
              <Flex>
                <Button
                  mt={4}
                  isLoading={isSubmitting}
                  type="submit"
                  color="twitter.700"
                  background="twitter.100"
                >
                  Submit
                </Button>
              </Flex>
            </Form>
          )}
        </Formik>
      </Container>
    </Layout>
  );
};

export default withUrqlClient(createUrqlClient, { ssr: true })(MovieDisp);
