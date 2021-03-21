import { NavBar } from "../components/NavBar";
import { withUrqlClient } from "next-urql";
import { createUrqlClient } from "../utils/createUrqlClient";
import { useMoviesQuery } from "../generated/graphql";
import { Layout } from "../components/Layout";
import { MovieCard } from "../components/MovieCard";
import React, { useState } from "react";
import { Button, Flex, Grid, GridItem, SimpleGrid } from "@chakra-ui/react";
import { WrapperVariant } from "../components/Wrapper";

const Index = () => {
  const [variables, setVariables] = useState({
    limit: 10,
    cursor: null as null | string,
  });
  const [{ fetching, data }] = useMoviesQuery({
    variables,
  });

  if (!fetching && !data) {
    return <div> No movies listed.</div>;
  }

  return (
    <Layout variant={WrapperVariant.regular}>
      {!data?.movies && fetching ? (
        <div>...Loading</div>
      ) : (
        <div>
          <SimpleGrid columns={4} minChildWidth="200px" spacing="40px">
            {fetching ? <div>Loading</div> : null}
            {!data?.movies.movies && !fetching ? (
              <div>No movies found.</div>
            ) : (
              data!.movies.movies.map((m) => (
                <GridItem>
                  <MovieCard movie={m} />
                </GridItem>
              ))
            )}
          </SimpleGrid>
          {data && data.movies.hasMore ? (
            <Button
              onClick={() => {
                setVariables({
                  limit: variables.limit,
                  cursor: data!.movies.movies[data!.movies.movies.length - 1]
                    .createdAt,
                });
              }}
              alignContent="center"
              mt={4}
            >
              Load More
            </Button>
          ) : null}
        </div>
      )}
    </Layout>
  );
};

export default withUrqlClient(createUrqlClient, { ssr: true })(Index);
