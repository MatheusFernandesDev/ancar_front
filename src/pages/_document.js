import { ColorModeScript } from "@chakra-ui/react";
import { Html, Head, Main, NextScript } from "next/document";
import { theme } from "./_app";

export default function Document() {
  return (
    <Html style={{ height: "100vh", width: "100vw" }} lang="en">
      <Head>
        <link
          rel="icon"
          type="image/png"
          sizes="512x512"
          href="/icons/512x512.png"
        />
      </Head>
      <body>
        <ColorModeScript initialColorMode={theme.config.initialColorMode} />
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
