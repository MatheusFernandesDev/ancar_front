import randomString from "@/helpers/randomString";
import {
  Container,
  Input,
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInputField,
  NumberInputStepper,
  NumberInput,
  Text,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import InputMask from "react-input-mask";

const InputNumber = ({
  required,
  name_field,
  name_placeholder,
  value,
  errors,
  grid_width,
  disabled,
  param = randomString(5),
  hideArrows,
  ...rest
}) => {
  name_field = name_field || "";
  name_placeholder = name_placeholder || "";

  const [error, setError] = useState(null);

  useEffect(() => {
    if (errors) {
      setError(errors.find((err) => err.path === param));
    }
  }, [errors, param]);

  return (
    <Container
      flexGrow="0"
      flexShrink="0"
      position="relative"
      height="100%"
      width={grid_width > 0 ? `${grid_width * 8.3}` + "%" : "100%"}
    >
      <Text mb="8px" color={error ? "darkred" : "black"}>
        {name_field}
      </Text>
      <NumberInput
        id={name_field}
        isInvalid={error}
        errorBorderColor="darkred"
        value={value}
        isRequired={required}
        backgroundColor="white"
        onFocus={() => setError(null)}
        {...rest}
      >
        <NumberInputField />
        {!hideArrows && (
          <NumberInputStepper>
            <NumberIncrementStepper />
            <NumberDecrementStepper />
          </NumberInputStepper>
        )}
      </NumberInput>
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

export default InputNumber;
