import { Td } from "@chakra-ui/react";

const Actions = ({ children, ...rest }) => {
  return <Td cursor={"pointer"} {...rest}>{children}</Td>;
};

export default Actions;
