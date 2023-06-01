import {
  Avatar,
  Box,
  Button,
  Flex,
  HStack,
  Icon,
  IconButton,
  Image,
  Input,
  InputGroup,
  InputRightElement,
  Menu,
  MenuButton,
  MenuDivider,
  MenuItem,
  MenuList,
  Select,
  Text,
  VStack,
  useColorModeValue,
  useDisclosure,
} from "@chakra-ui/react";
import Link from "next/link";
import {
  FiMenu,
  FiBell,
  FiChevronDown,
  FiSearch,
  FiShoppingCart,
} from "react-icons/fi";

import LanguageSwitcher from "@/components/LanguagueSwitcher";
import { useEffect, useState } from "react";
import SearchInput from "./SearchInput";

const MobileNav = ({ hideSidebar, onOpen, user, ...rest }) => {
  const [image, setImage] = useState(null);

  useEffect(() => {
    async function loadImage() {
      if (user !== null && user.photo_filename !== null) {
        try {
          const imageUrl =
            process.env.NEXT_PUBLIC_API_URI + `/image/${user.photo_filename}`;
          setImage(imageUrl);
        } catch {
          return console.log({ title: t("GETIMAGEERROR"), status: "error" });
        }
      }
    }
    loadImage();
  }, [user]);

  return (
    <Flex
      // ml={{ base: 0, md: 60 }}
      px={{ base: 4, md: 4 }}
      py="2"
      height="20"
      alignItems="center"
      bg={useColorModeValue("white", "gray.900")}
      borderBottomWidth="1px"
      borderBottomColor={useColorModeValue("gray.200", "gray.700")}
      justifyContent="space-between" //{{ base: "space-between", md: "flex-end" }}
      {...rest}
    >
      <Box>
        <IconButton
          display="flex"
          visibility={{ base: "block", lg: "hidden" }}
          onClick={onOpen}
          variant="outline"
          aria-label="open menu"
          icon={<FiMenu />}
        />
        <Link href="/home">
          <Image
            display={{ base: "none", lg: "block" }}
            borderRadius="full"
            width="100%"
            height="130px"
            marginTop="-35px"
            src={
              process.env.NEXT_PUBLIC_API_FRONT + "/images/logocomsombra.png"
            }
            // fallbackSrc={process.env.NEXT_PUBLIC_API_FRONT + "/images/default-placeholder.png"}
          />
        </Link>
      </Box>
      <SearchInput />
      <HStack width="220px">
        <LanguageSwitcher />
        <Box position="relative">
          <IconButton
            size="lg"
            variant="ghost"
            aria-label="open menu"
            position="relative"
            icon={<FiBell />}
            onClick={onOpen}
          />
          {/* {
            <Box
              height="15px"
              width="fit-content"
              minWidth="15px"
              borderRadius="full"
              color="white"
              backgroundColor="teal"
              position="absolute"
              top="5px"
              right="8px"
              fontSize={10}
              textAlign="center"
            >
              10
            </Box>
          } */}
        </Box>

        <Flex display={{ base: "none", lg: "block" }} alignItems={"center"}>
          <Menu>
            <MenuButton
              py={2}
              transition="all 0.3s"
              _focus={{ boxShadow: "none" }}
            >
              <HStack>
                <Avatar size={"sm"} src={image} bg="teal.500" />
              </HStack>
            </MenuButton>
            {/* <MenuList
              bg={useColorModeValue("white", "gray.900")}
              borderColor={useColorModeValue("gray.200", "gray.700")}
              zIndex={2}
            >
              {user !== null ? (
                <>
                  <Link href="/myprofile">
                    <MenuItem>{t("PROFILE")}</MenuItem>
                  </Link>
                  <Link href="/settings">
                    <MenuItem>{t("SETTINGS")}</MenuItem>
                  </Link>
                  <MenuDivider />
                  <MenuItem>{t("SIGNOUT")}</MenuItem>
                </>
              ) : (
                <>
                  <Link href="/login">
                    <MenuItem>{t("SIGNIN")}</MenuItem>
                  </Link>
                  <Link href="/register">
                    <MenuItem>{t("SIGNUP")}</MenuItem>
                  </Link>
                </>
              )}
            </MenuList> */}
          </Menu>
        </Flex>
      </HStack>
    </Flex>
  );
};

export default MobileNav;
