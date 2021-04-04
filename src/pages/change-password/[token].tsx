import { Box, Button } from "@chakra-ui/react";
import { Formik, Form } from "formik";
import { NextPage } from "next";
import { withUrqlClient, NextComponentType } from "next-urql";
import React, { useState } from "react";
import { InputField } from "../../components/InputField";
import { Wrapper, WrapperVariant } from "../../components/Wrapper";
import { createUrqlClient } from "../../utils/createUrqlClient";
import { toErrorMap } from "../../utils/toErrorMap";
import { useChangePasswordMutation } from "../../generated/graphql";
import { useRouter } from "next/router";
import { simpleAlert } from "../../components/Alerts";

const ChangePassword: NextPage<{ token: string }> = () => {
  const router = useRouter();
  const [, changePassword] = useChangePasswordMutation();
  const [customError, setCustomError] = useState("");

  const customAlert = simpleAlert("error", "Error", customError, () =>
    setCustomError("")
  );
  return (
    <Wrapper variant={WrapperVariant.regular}>
      {customError ? customAlert : null}
      <Formik
        initialValues={{ newPassword: "", confirmPassword: "" }}
        onSubmit={async (values, { setErrors }) => {
          if (values.newPassword !== values.confirmPassword) {
            setCustomError("Passwords don't match!");
            return;
          }
          const response = await changePassword({
            newPassword: values.newPassword,
            token:
              typeof router.query.token === "string" ? router.query.token : "",
          });

          if (response.data?.changePassword.fieldErrors) {
            const errorMap = toErrorMap(
              response.data.changePassword.fieldErrors
            );

            if ("token" in errorMap) {
              setCustomError(errorMap.token);
            }

            setErrors(errorMap);
          } else if (response.data?.changePassword.user) {
            /*Successful login */
            router.push("/");
          }
        }}
      >
        {({ isSubmitting }) => (
          <Form>
            <InputField
              name="newPassword"
              placeholder="new password"
              label="New Password"
              type="password"
            />
            <Box mt={4}>
              <InputField
                name="confirmPassword"
                placeholder="confirm new password"
                label="Confirm New Password"
                type="password"
              />
            </Box>

            <Button
              mt={4}
              isLoading={isSubmitting}
              type="submit"
              color="twitter.700"
              background="twitter.100"
            >
              Change Password
            </Button>
          </Form>
        )}
      </Formik>
    </Wrapper>
  );
};

export default withUrqlClient(createUrqlClient, { ssr: false })(
  ChangePassword as any
);
