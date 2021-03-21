import { Box, Flex, Button } from "@chakra-ui/react";
import { Formik, Form } from "formik";
import { withUrqlClient } from "next-urql";
import router from "next/router";
import React, { useState } from "react";
import { InputField } from "../../components/InputField";
import { Wrapper, WrapperVariant } from "../../components/Wrapper";
import { createUrqlClient } from "../../utils/createUrqlClient";
import { toErrorMap } from "../../utils/toErrorMap";
import { useForgotPasswordMutation } from "../../generated/graphql";
import login from "../login";
import { simpleAlert } from "../../utils/alerts";

const PasswordRecovery: React.FC<{}> = ({}) => {
  const [{}, forgotPassword] = useForgotPasswordMutation();
  const [showInfo, setInfo] = useState(false);
  const infoMessage = simpleAlert(
    "info",
    "Request Complete",
    "If your address exists within our system, you will receive an e-mail shortly.",
    () => setInfo(false)
  );
  return (
    <div>
      {showInfo ? infoMessage : null}
      <Wrapper variant={WrapperVariant.small}>
        <Formik
          initialValues={{ email: "" }}
          onSubmit={async (values, { setErrors }) => {
            const response = await forgotPassword(values);
            if (response.data?.forgotPassword) {
              setInfo(true);
              values.email = ""; //clear input
            }
          }}
        >
          {({ isSubmitting }) => (
            <Form>
              <Box mt={4}>
                <InputField name="email" placeholder="email" label="E-mail" />
              </Box>
              <Flex>
                <Button
                  mt={4}
                  isLoading={isSubmitting}
                  type="submit"
                  color="twitter.700"
                  background="twitter.100"
                >
                  Send Recovery Link
                </Button>
              </Flex>
            </Form>
          )}
        </Formik>
      </Wrapper>
    </div>
  );
};

export default withUrqlClient(createUrqlClient)(PasswordRecovery);
