import { Box } from "@chakra-ui/react";
import React from "react";

export enum WrapperVariant {
  "regular" = "100%",
  "medium" = "800px",
  "small" = "400px",
}

interface WrapperProps {
  variant?: WrapperVariant;
}

export const Wrapper: React.FC<WrapperProps> = ({
  children,
  variant = "regular",
}) => {
  return (
    <Box mt={8} textAlign="center" maxWidth={variant} w="100%">
      {children}
    </Box>
  );
};
