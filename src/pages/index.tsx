import { NavBar } from "../components/NavBar";
import { withUrqlClient } from "next-urql";
import { createUrqlClient } from "../utils/createUrqlClient";
import { useMoviesQuery } from "../generated/graphql";
import { Layout } from "../components/Layout";
import { MovieCard } from "../components/MovieCard";
import React from "react";
import { Button, Flex, Grid, GridItem, SimpleGrid } from "@chakra-ui/react";
import { WrapperVariant } from "../components/Wrapper";

const Index = () => {
  const [{ fetching, data }] = useMoviesQuery({
    variables: {
      limit: 10,
    },
  });

  if (!fetching && !data) {
    return <div> No movies listed.</div>;
  }

  return (
    <Layout variant={WrapperVariant.regular}>
      {!data && fetching ? (
        <div>...Loading</div>
      ) : (
        <div>
          <SimpleGrid columns={4} minChildWidth="200px" spacing="40px">
            {fetching ? <div>Loading</div> : null}
            {!data && !fetching ? (
              <div>No movies found.</div>
            ) : (
              data?.movies.map((m) => (
                <GridItem>
                  <MovieCard movie={m} />
                </GridItem>
              ))
            )}
          </SimpleGrid>
          <Button alignContent="center" mt={4}>
            Load More
          </Button>
        </div>
      )}
    </Layout>
  );
};

export default withUrqlClient(createUrqlClient, { ssr: true })(Index);
