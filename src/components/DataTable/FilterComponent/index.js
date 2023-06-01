import React, { useEffect, useState } from "react";
// import { ClearButton, SearchField, Container } from "./styles";
import { FiX } from "react-icons/fi";
import Select from "./Select";

import { Box, Button, Icon, Input } from "@chakra-ui/react";

const FilterComponent = ({
  selectValue,
  selectSetValue,
  onFilter,
  onClear,
  //
  textValue,
  options,
}) => {
  useEffect(() => {
    selectSetValue(options && options[0].id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const [placeholder, setPlaceholder] = useState("");
  useEffect(() => {
    setPlaceholder(
      options &&
        options.find((column) => column.id === selectValue)?.name.toLowerCase()
    );
  }, [selectValue, options]);

  const [filterTextLocal, setFilterTextLocal] = useState("");

  return (
    <Box display="flex" height="32px" position="relative" width="100%">
      <Select
        options={options}
        onChange={(event) => selectSetValue(event.target.value)}
      />
      <Input
        width={{ base: "60%", md: "200px" }}
        height="33px"
        padding="0 5px 0 16px"
        borderRadius="0px"
        backgroundColor="white"
        border="1px solid transparent"
        placeholder={`Filtrar por ${placeholder}`}
        value={textValue}
        onChange={(event) => {
          onFilter(event);
          setFilterTextLocal(event.target.value);
        }}
      />
      <Button
        height="33px"
        width={{ base: "10%", md: "32px" }}
        minWidth="21px"
        textAlign="center"
        display="flex"
        alignItems="center"
        justifyContent="center"
        borderStyle="none"
        backgroundColor="#AE0025"
        borderRadius="0px 10px 10px 0px"
        cursor="pointer"
        _hover={{ opacity: "0.5" }}
        onClick={onClear}
      >
        <Icon as={FiX} boxSize={5} color="white" />
      </Button>
    </Box>
  );
};

export default FilterComponent;
