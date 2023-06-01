import { Box, useColorModeValue } from "@chakra-ui/react";

import NavItem from "../NavItem";
import CascadeButton from "./CascadeButton";

import { FiHome, FiUsers } from "react-icons/fi";
import { MdAppRegistration } from "react-icons/md";
import { MdOutlineQuestionAnswer } from "react-icons/md";
const SidebarContent = ({ user, onClose, ...rest }) => {
  return (
    <Box
      transition="3s ease"
      bg={useColorModeValue("white", "gray.900")}
      borderRight="1px"
      borderRightColor={useColorModeValue("gray.200", "gray.700")}
      pos="fixed"
      height={{ base: "100%", lg: "92%" }}
      zIndex={2}
      overflowX="hidden"
      overflowY="auto"
      width="100%"
      {...rest}
    >
      <br />
      <NavItem icon={MdOutlineQuestionAnswer} path={"/questionnaire"}>
        Inicio
      </NavItem>
      <NavItem icon={MdOutlineQuestionAnswer} path={"/questions"}>
        Questionarios
      </NavItem>
    </Box>
  );
};

export default SidebarContent;
