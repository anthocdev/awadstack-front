import { Box, Flex, Button } from "@chakra-ui/react";
import { Formik, Form } from "formik";
import { withUrqlClient } from "next-urql";
import React, { useEffect } from "react";
import { InputField } from "../../components/InputField";
import { Wrapper, WrapperVariant } from "../../components/Wrapper";
import { createUrqlClient } from "../../utils/createUrqlClient";
import { useCreateMovieMutation, useMeQuery } from "../../generated/graphql";
import { useRouter } from "next/router";
import { Layout } from "../../components/Layout";
import { useIsAuth } from "../../utils/useIsAuth";

const NewMovie: React.FC<{}> = ({}) => {
  const router = useRouter();
  useIsAuth(); //Authorization check
  const [, createMovie] = useCreateMovieMutation();
  return (
    <Layout variant={WrapperVariant.small}>
      <Formik
        initialValues={{ title: "", imdbId: "", imageLink: "" }}
        onSubmit={async (values) => {
          const { error } = await createMovie(values);
          if (!error) {
            router.push("/");
          }
        }}
      >
        {({ isSubmitting }) => (
          <Form>
            <InputField name="title" placeholder="title" label="Title" />
            <Box mt={4}>
              <InputField name="imdbId" placeholder="imdbId" label="IMDB ID" />
            </Box>
            <Box mt={4}>
              <InputField
                name="imageLink"
                placeholder="image link"
                label="Image Link"
              />
            </Box>
            <Flex>
              <Button
                mt={4}
                isLoading={isSubmitting}
                type="submit"
                color="twitter.700"
                background="twitter.100"
              >
                Add to Movie DB
              </Button>
            </Flex>
          </Form>
        )}
      </Formik>
    </Layout>
  );
};

export default withUrqlClient(createUrqlClient)(NewMovie);
