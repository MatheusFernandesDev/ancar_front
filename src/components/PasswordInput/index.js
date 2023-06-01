import {
  Button,
  Container,
  Icon,
  Input,
  InputGroup,
  InputRightElement,
  Text,
} from "@chakra-ui/react";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { useEffect, useState } from "react";
import randomString from "@/helpers/randomString";

const PasswordInput = ({
  style,
  required,
  name_field,
  name_placeholder,
  value,
  errors,
  grid_width,
  disabled,
  param = randomString(5),
  ...rest
}) => {
  name_field = name_field || "";
  name_placeholder =
    name_placeholder ||
    `Selecione ${name_field.toLowerCase?.() || "uma opção"}`;

  const [error, setError] = useState(null);

  const [show, setShow] = useState(false);

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
      <InputGroup size="md">
        <Input
          isRequired={required}
          type={show ? "text" : "password"}
          value={value}
          border="1px solid #e5e5e5"
          backgroundColor="white"
          isInvalid={error}
          errorBorderColor="darkred"
          onFocus={() => setError(null)}
          {...rest}
        />
        <InputRightElement width="4.5rem">
          <Button h="1.75rem" size="sm" onClick={() => setShow(!show)}>
            {show ? (
              <Icon as={AiOutlineEyeInvisible} />
            ) : (
              <Icon as={AiOutlineEye} />
            )}
          </Button>
        </InputRightElement>
      </InputGroup>
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

export default PasswordInput;
