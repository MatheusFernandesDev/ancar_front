import randomString from "@/helpers/randomString";
import { Container, Text, Textarea } from "@chakra-ui/react";
import { useEffect, useState } from "react";

const TextAreaInput = ({
  style,
  required,
  name_field,
  name_placeholder,
  value,
  errors,
  grid_width,
  disabled,
  size = "lg",
  resize = "none",
  param = randomString(5),
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
      width={grid_width > 0 ? `${grid_width * 8.3}` + "%" : "100%"}
    >
      <Text mb="8px" color={error ? "darkred" : "black"}>
        {name_field}
      </Text>
      <Textarea
        id={name_field}
        padding="10px"
        isInvalid={error}
        errorBorderColor="darkred"
        border="1px solid #e5e5e5"
        value={value}
        isRequired={required}
        backgroundColor="white"
        onFocus={() => setError(null)}
        size={size}
        resize={resize}
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

export default TextAreaInput;
