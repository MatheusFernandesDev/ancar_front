import React, { useEffect, useState, useRef } from "react";

import { FiSearch } from "react-icons/fi";
import {
  Button,
  Icon,
  Input,
  InputGroup,
  InputRightElement,
} from "@chakra-ui/react";
import { useRouter } from "next/router";

export default function SearchInput() {
  const router = useRouter();

  const button_ref = useRef(null);
  const [searchInput, setSearchInput] = useState("");

  const { query } = router;

  const search = query.search;

  function searchHandler() {
    let newurl = router.pathname;
    if (searchInput) {
      newurl += `&search=${searchInput}`;
    }

    return router.push(newurl);
  }

  useEffect(() => {
    setSearchInput(search);
  }, [search]);

  function pressHandler(e) {
    if (e.key === "Enter") {
      e.preventDefault();
      button_ref.current.click();
    }
  }

  return (
    <InputGroup
      width={{ base: "100%", lg: "50%" }}
      size="md"
      marginLeft={{ base: "10px", lg: "100px" }}
    >
      <Input
        pr="4.5rem"
        type="text"
        // placeholder={t("SEARCH")}
        value={searchInput}
        onChange={(event) => setSearchInput(event.target.value)}
        onKeyPress={(event) => pressHandler(event)}
      />
      <InputRightElement width="4.5rem">
        <Button
          ref={button_ref}
          onClick={() => searchHandler()}
          h="1.75rem"
          size="sm"
        >
          <Icon as={FiSearch} />
        </Button>
      </InputRightElement>
    </InputGroup>
    // <Container>
    // 	<Input
    // 		placeholder="Pesquisar..."
    // 		value={search}
    // 		onChange={(event) => setSearch(event.target.value)}
    // 		onKeyPress={(event) => pressHandler(event)}
    // 	/>
    // 	<Button ref={button_ref} to={() => searchHandler()}>
    // 		<MdOutlineSearch size={24} />
    // 	</Button>
    // </Container>
  );
}
