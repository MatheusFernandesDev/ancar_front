import randomString from "@/helpers/randomString";
import { Container, Input, Text } from "@chakra-ui/react";
import moment from "moment/moment";
import { useEffect, useState } from "react";

const DatePicker = ({
  style,
  required,
  name_field,
  name_placeholder,
  value,
  errors,
  grid_width,
  disabled,
  param = randomString(5),
  dateTime,
  maxDate,
  minDate,
  ...rest
}) => {
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

  // NO USESTATE SALVA ASSIM PARA PRE-SETAR UMA DATA "yyyy-MM-DD"
  // NO USESTATE SALVA ASSIM PARA PRE-SETAR UMA DATA COM HORA "yyyy-MM-DDTHH:mm"

  return (
    <Container
      flexGrow="0"
      flexShrink="0"
      position="relative"
      width={grid_width > 0 ? `${grid_width * 8.3}` + "%" : "100%"}
    >
      <Text mb="8px" color={error ? "darkred" : "black"}>
        {name_field}
      </Text>
      <Input
        type={dateTime ? "datetime-local" : "date"}
        id={name_field}
        padding="10px"
        isInvalid={error}
        errorBorderColor="darkred"
        border="1px solid #e5e5e5"
        value={value}
        isRequired={required}
        backgroundColor="white"
        onFocus={() => setError(null)}
        max={maxDate}
        min={minDate}
        {...rest}
      />
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
};

export default DatePicker;
