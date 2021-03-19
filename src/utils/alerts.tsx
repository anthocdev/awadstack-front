import {
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
  CloseButton,
  AlertStatus,
} from "@chakra-ui/react";
import React from "react";

export const simpleAlert = (
  status: AlertStatus,
  title: string,
  message: string,
  onCloseCallback: any
) => {
  return (
    <Alert status={status}>
      <AlertIcon />
      <AlertTitle mr={2}>{title}</AlertTitle>
      <AlertDescription>{message}</AlertDescription>
      <CloseButton
        position="absolute"
        right="8px"
        top="8px"
        onClick={onCloseCallback}
      />
    </Alert>
  );
};
