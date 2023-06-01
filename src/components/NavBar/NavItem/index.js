import { Flex, Icon } from "@chakra-ui/react";
import Link from "next/link";

const NavItem = ({ icon, children, path, style, className, ...rest }) => {
  return (
    <Link
      className={className}
      href={path}
      style={{ textDecoration: "none", ...style }}
      _focus={{ boxShadow: "none" }}
    >
      <Flex
        align="center"
        p="4"
        mx="4"
        borderRadius="lg"
        role="group"
        cursor="pointer"
        _hover={{
          bg: "#AE0025",
          color: "white",
        }}
        {...rest}
      >
        {icon && (
          <Icon
            mr="4"
            fontSize="16"
            _groupHover={{
              color: "white",
            }}
            as={icon}
          />
        )}
        {children}
      </Flex>
    </Link>
  );
};

export default NavItem;
