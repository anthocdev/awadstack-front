import { NavBar } from "../components/NavBar";
import { withUrqlClient } from "next-urql";
import { createUrqlClient } from "../utils/createUrqlClient";
import { useMoviesQuery } from "../generated/graphql";
import { Layout } from "../components/Layout";

const Index = () => {
  const [{ fetching, data }] = useMoviesQuery();
  return (
    <Layout>
      <div> Hi.</div>
      {fetching ? <div>Loading</div> : null}
      {!data && !fetching ? (
        <div>No movies found.</div>
      ) : (
        data?.movies.map((m) => (
          <div key={m.id}>
            {m.title} - {m.imdbId}
          </div>
        ))
      )}
    </Layout>
  );
};

export default withUrqlClient(createUrqlClient, { ssr: true })(Index);
