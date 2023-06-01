import React from "react";

import { Button } from "@chakra-ui/react";

export default function Index({
  icon,
  title,
  disabled,
  action,
  isLoading,
  loadingText = "Carregando",
  ...rest
}) {
  return (
    <Button
      leftIcon={icon}
      minWidth="50px"
      padding="10px 10px"
      color="white"
      display="flex"
      alignItems="center"
      justifyContent="center"
      flexWrap="nowrap"
      backgroundColor="transparent"
      border="none"
      borderRadius="none"
      cursor="pointer"
      userSelect="none"
      _first={{ borderTopLeftRadius: "10px" }}
      _hover={{ backgroundColor: "rgba(0, 0, 0, 0.3)" }}
      _disabled={{
        color: "gray",
        cursor: "default",
      }}
      onClick={action}
      isLoading={isLoading}
      loadingText={loadingText}
      {...rest}
    >
      {title}
    </Button>
  );
}
