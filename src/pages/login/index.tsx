import React from "react";
import { Form, Formik } from "formik";
import { Box, Button, Flex, useToast } from "@chakra-ui/react";
import { Wrapper, WrapperVariant } from "../../components/Wrapper";
import { InputField } from "../../components/InputField";
import { useLoginMutation } from "../../generated/graphql";
import { toErrorMap } from "../../utils/toErrorMap";
import { useRouter } from "next/router";
import { withUrqlClient } from "next-urql";
import { createUrqlClient } from "../../utils/createUrqlClient";
import NextLink from "next/link";
import { NoticeType } from "../../shared/models/resTypes";

export const Login: React.FC<{}> = ({}) => {
  const router = useRouter();
  const toast = useToast();
  const [, login] = useLoginMutation();
  return (
    <Wrapper variant={WrapperVariant.small}>
      <Formik
        initialValues={{ usernameOrEmail: "", password: "" }}
        onSubmit={async (values, { setErrors }) => {
          const response = await login(values);
          /* Response alerts mapping (Toast) */
          const resAlerts = response.data?.login.alerts;
          if (resAlerts) {
            resAlerts.map((alert) => {
              toast({
                title: alert.title,
                status: alert.type as NoticeType,
                description: alert.message,
                position: "top",
                duration: 5000,
                isClosable: true,
              });
            });
          }
          if (response.data?.login.fieldErrors) {
            /* Error messages for fields */
            setErrors(toErrorMap(response.data.login.fieldErrors));
          } else if (response.data?.login.user) {
            /*Successful login */
            if (typeof router.query.next === "string") {
              /* Push to history */
              router.push(router.query.next);
            } else {
              router.push("/");
            }
          }
        }}
      >
        {({ isSubmitting }) => (
          <Form>
            <InputField
              name="usernameOrEmail"
              placeholder="username or email"
              label="Username or E-Mail"
            />
            <Box mt={4}>
              <InputField
                name="password"
                placeholder="password"
                label="Password"
                type="password"
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
                Login
              </Button>

              <NextLink href="/password-recovery">
                <Button
                  ml={4}
                  mt={4}
                  isLoading={isSubmitting}
                  type="button"
                  color="red.500"
                  background="red.200"
                >
                  Reset Password
                </Button>
              </NextLink>
            </Flex>
          </Form>
        )}
      </Formik>
    </Wrapper>
  );
};

export default withUrqlClient(createUrqlClient)(Login);
