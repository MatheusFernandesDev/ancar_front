import { Box, Button, Container, Flex, Icon, Text } from "@chakra-ui/react";
import React, { useState } from "react";
import styles from "./CascadeButton.module.css";

const CascadeButton = ({ children, icon, title, ...rest }) => {
  const [actived, setActived] = useState(false);

  return (
    <Box mx={4}>
      <Flex
        {...rest}
        align="center"
        p="4"
        // mx="4"
        borderRadius="lg"
        role="group"
        cursor="pointer"
        _hover={{
          bg: "#AE0025",
          color: "white",
        }}
        // FUNCTIONS
        onClick={() => setActived(!actived)}
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
        <Text fontSize="16px" userSelect="none" fontWeight={400}>
          {title}
        </Text>
      </Flex>
      <Box
        className={styles.cascadePadding}
        display={actived ? "flex" : "none"}
        flexDirection="column"
        width="100%"
        position="relative"
        borderLeft="1px solid #b4b4b4"
        marginLeft="20px"
        // FUNCTIONS
        actived={actived}
      >
        {/* <Box
                className={styles.borderPosition}
                position="absolute"
                height="100%"
                width="1px"
                backgroundColor="#b4b4b4"
            /> */}
        {children}
      </Box>
    </Box>
  );
};

export default CascadeButton;
