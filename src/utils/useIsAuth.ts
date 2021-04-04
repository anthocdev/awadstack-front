import { useToast } from "@chakra-ui/toast";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { useMeQuery } from "../generated/graphql";

export const useIsAuth = () => {
  const toast = useToast();
  const [{ data, fetching }] = useMeQuery();
  const router = useRouter();
  var isAuth = true;
  useEffect(() => {
    if (!fetching && !data?.me) {
      isAuth = false;
      router.replace("/login?next=" + router.route);
      toast({
        title: "Unauthorized.",
        description: "Please log-in first, you shouldn't be here.",
        status: "warning",
        position: "top",
      });
    }
  }, [fetching, data, router]);

  return isAuth;
};
