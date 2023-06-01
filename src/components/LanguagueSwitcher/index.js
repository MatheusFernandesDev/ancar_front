import { Select, Box, Image } from "@chakra-ui/react";
import { useEffect, useState } from "react";

const LanguageSwitcher = ({ ...rest }) => {
  const portuguese = "/flags/pt-BR2.png";
  const spanish = "/flags/es2.png";
  const english = "/flags/en2.png";
  const languages = [
    { id: "pt-BR", flag: portuguese },
    { id: "en-US", flag: english },
    { id: "es-ES", flag: spanish },
  ];

  const [displayDropdown, setDisplayDropdown] = useState(false);
  const [selectedLang, setSelectedLang] = useState(languages[0]);
  const [options, setOptions] = useState([languages[1], languages[2]]);

  function openDropdown() {
    setDisplayDropdown(!displayDropdown);
  }

  function switchLang(option) {
    const selectedLangCopy = selectedLang;
    setSelectedLang(option);
    i18n.changeLanguage(option.id);

    const optionsCopy = options.slice();
    optionsCopy.splice(optionsCopy.indexOf(option), 1);
    optionsCopy.unshift(selectedLangCopy);
    setOptions(optionsCopy);
    openDropdown();
  }

  return (
    <Box
      display={{ base: "none", lg: "flex" }}
      justifyContent="center"
      position="relative"
      width="20%"
      {...rest}
    >
      <Image
        width="20px"
        height="20px"
        cursor="pointer"
        filter="drop-shadow(5px 1px 5px rgba(0, 0, 0, 0.185))"
        userSelect="none"
        src={process.env.NEXT_PUBLIC_API_FRONT + selectedLang.flag}
        onClick={openDropdown}
      />
      <Box
        display="flex"
        visibility={displayDropdown ? "visible" : "hidden"}
        opacity={displayDropdown ? "1" : "0"}
        alignItems="center"
        justifyContent="space-evenly"
        position="absolute"
        width="150px"
        height="50px"
        backgroundColor="#145DA0"
        right={displayDropdown ? "45px" : "0"}
        top="-15px"
        borderRight="1px solid"
        borderColor="#d6d6d3"
        transition="ease-in-out .1s"
      >
        <Image
          width="20px"
          height="20px"
          cursor="pointer"
          filter="drop-shadow(5px 1px 5px rgba(0, 0, 0, 0.185))"
          userSelect="none"
          src={process.env.NEXT_PUBLIC_API_FRONT + options[0].flag}
          onClick={() => switchLang(options[0])}
        />
        <Image
          width="20px"
          height="20px"
          cursor="pointer"
          filter="drop-shadow(5px 1px 5px rgba(0, 0, 0, 0.185))"
          userSelect="none"
          src={process.env.NEXT_PUBLIC_API_FRONT + options[1].flag}
          onClick={() => switchLang(options[1])}
        />
      </Box>
    </Box>
  );
};

export default LanguageSwitcher;
