import { ChakraProvider } from "@chakra-ui/react";
import "../styles/globals.css";
import { extendTheme } from "@chakra-ui/react";

const colors = {
  brand: {
    900: "#1a365d",
    800: "#153e75",
    700: "#2a69ac",
  },
};

export const theme = extendTheme(colors);

const App = ({ Component, pageProps }) => {
  return (
    <ChakraProvider
      toastOptions={{
        defaultOptions: { position: "top-right", isClosable: true },
      }}
    >
      <Component {...pageProps} />
    </ChakraProvider>
  );
};

export default App;
