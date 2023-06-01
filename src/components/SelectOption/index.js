import React, { useEffect, useState } from "react";
import randomString from "../../helpers/randomString";
import { Container, Select, Text } from "@chakra-ui/react";

export default function SelectOptionInput({
  style,
  required,
  initial_state,
  disableFirstOption,
  name_field,
  name_placeholder,
  errors,
  grid_width,
  grid_height,
  options = [],
  hidden,
  disabled,
  disabledSelect,
  param = randomString(5),
  onChange,
  ...rest
}) {
  name_field = name_field || "";
  name_placeholder =
    name_placeholder ||
    `Selecione ${name_field.toLowerCase?.() || "uma opção"}`;

  const [error, setError] = useState(null);

  useEffect(() => {
    if (errors) {
      setError(errors.find((err) => err.path === param));
    }
  }, [errors, param]);

  return (
    <Container
      width={grid_width > 0 ? `${grid_width * 8.3}` + "%" : "100%"}
      style={style}
      flexGrow="0"
      flexShrink="0"
      position="relative"
    >
      <Text mb="8px" color={error ? "darkred" : "black"}>
        {name_field}
      </Text>
      <Select
        errors={error}
        onFocus={() => setError(null)}
        disabled={disabledSelect}
        backgroundColor="white"
        border="1px solid #e5e5e5"
        isInvalid={error}
        errorBorderColor="darkred"
        onChange={(event) => onChange(parseInt(event.target.value))}
        {...rest}
      >
        <option
          key={-1}
          value={-1}
          disabled={disableFirstOption}
          required={required}
        >
          {name_placeholder}
        </option>
        {options.map((option) => (
          <option key={option.id} value={option.id} style={{ color: "black" }}>
            {option.name}
          </option>
        ))}
      </Select>
      <Text
        position="absolute"
        top="100%"
        color={error ? "darkred" : "black"}
        marginLeft={error ? "5px" : "0"}
        display={!error && "none"}
      >
        {error ? t(`${error.msg}`) : ""}
      </Text>
    </Container>
  );
}
