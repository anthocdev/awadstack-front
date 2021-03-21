import React from "react";
import { useRouter } from "next/router";
import { withUrqlClient } from "next-urql";
import { createUrqlClient } from "../../../utils/createUrqlClient";

const MovieDisp: React.FC<{}> = ({}) => {
  const router = useRouter();
  return <div>{router.query.id}</div>;
};

export default withUrqlClient(createUrqlClient)(MovieDisp);
