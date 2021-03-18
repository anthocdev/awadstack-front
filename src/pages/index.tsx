import { NavBar } from "../components/NavBar";
import { withUrqlClient } from "next-urql";
import { createUrqlClient } from "../utils/createUrqlClient";
import { useMoviesQuery } from "../generated/graphql";

const Index = () => {
  const [{ fetching, data }] = useMoviesQuery();
  return (
    <>
      <NavBar />
      <div> Hi.</div>
      {fetching ? <div>Loading</div> : null}
      {!data && !fetching ? (
        <div>No movies found.</div>
      ) : (
        data?.movies.map((m) => <div key={m.id}>{m.title}</div>)
      )}
    </>
  );
};

export default withUrqlClient(createUrqlClient, { ssr: true })(Index);
