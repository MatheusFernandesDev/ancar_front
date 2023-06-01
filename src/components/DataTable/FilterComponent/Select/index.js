import React from "react";
import { Select } from "@chakra-ui/react";

const index = ({ options = [], ...rest }) => {
  return (
    <Select
      height="33px"
      minWidth="100px"
      border="1px solid transparent"
      borderRight="none"
      borderRadius="10px 0px 0px 10px"
      width="150px"
      backgroundColor="white"
      {...rest}
    >
      {options.map((option) => (
        <option key={option.id} value={option.id}>
          {option.name}
        </option>
      ))}
    </Select>
  );
};

export default index;
