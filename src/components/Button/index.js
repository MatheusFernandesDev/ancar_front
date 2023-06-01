import { Button } from "@chakra-ui/react";

export default function Index({
  children,
  secondary,
  onClick,
  isLoading,
  loadingText = "Carregando",
  ...rest
}) {
  return (
    <Button
      width={{ base: "100%", lg: "fit-content" }}
      color={secondary ? "black" : "white"}
      backgroundColor={secondary ? "#ddd" : "#AE0025"}
      _hover={{ backgroundColor: secondary ? "#aaa" : "#0D4172" }}
      onClick={onClick}
      isLoading={isLoading}
      loadingText={loadingText}
      {...rest}
    >
      {children}
    </Button>
  );
}
