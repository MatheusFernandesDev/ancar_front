import React, { useEffect, useState } from "react";
import {
  Box,
  useColorModeValue,
  Drawer,
  DrawerContent,
  useDisclosure,
} from "@chakra-ui/react";
import SidebarContent from "./SidebarContent";
import CategoriesBar from "./CategoriesBar";

import api from "@/services/api";

const NavBar = ({
  children,
  hideSidebar = false,
  homePage = false,
  internal = true,
  disableScrollY,
  disableScrollX,
  column,
  ...rest
}) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [user, setUser] = useState(null);
  const [userType, setUserType] = useState(-1);
  // const userType = 1;

  async function loadProfile() {
    const { data: response } = await api.get("/user", {
      validateStatus: (status) => status === 200 || status === 204,
    });
    setUser(response);
    setUserType(response?.id_user_type);
  }

  useEffect(() => {
    loadProfile();
  }, []);

  return (
    <Box
      height="100vh"
      bg={useColorModeValue("gray.100", "gray.900")}
      display="flex"
      flexDirection="column"
      alignItems="space-between"
      overflow="hidden"
    >
      {!hideSidebar && (
        <SidebarContent
          onClose={() => onClose}
          display={{ base: "none", lg: "block" }}
          width={{ base: "100%", lg: "240px" }}
          user={user}
        />
      )}
      <Drawer
        autoFocus={false}
        isOpen={isOpen}
        placement="bottom"
        onClose={onClose}
        returnFocusOnClose={false}
        onOverlayClick={onClose}
        size="full"
      >
        <DrawerContent>
          <SidebarContent user={user} onClose={onClose} />
        </DrawerContent>
      </Drawer>
      {homePage && <CategoriesBar />}
      {!hideSidebar ? (
        <>
          <Box
            display="flex"
            flexDirection={column ? "column" : "row"}
            ml={{ base: 0, lg: 60 }}
            p="4"
            height="100%"
            overflowY={disableScrollY ? "hidden" : "auto"}
            overflowX={disableScrollX ? "hidden" : "auto"}
            {...rest}
          >
            {children}
          </Box>
        </>
      ) : (
        <Box
          width="100%"
          display="flex"
          flexDirection={column ? "column" : "row"}
          p="4"
          overflowY={disableScrollY ? "hidden" : "auto"}
          overflowX={disableScrollX ? "hidden" : "auto"}
          {...rest}
        >
          {children}
          {/* <Footer internal={internal} position="static" /> */}
        </Box>
      )}
    </Box>
  );
};

export default NavBar;
