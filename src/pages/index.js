import Head from "next/head";
import { Inter } from "next/font/google";
import {
  Button,
  Flex,
  Heading,
  Image,
  Stack,
  Text,
  useBreakpointValue,
} from "@chakra-ui/react";
import Link from "next/link";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <>
      <Head>
        <title>Desafio Fullstack Ancar</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />

        {/* <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/icons/16x16.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/icons/32x32.png"
        /> */}
      </Head>
      <Stack minH={"100vh"} direction={{ base: "column", md: "row" }}>
        <Flex p={8} flex={1} align={"center"} justify={"center"}>
          <Stack spacing={6} w={"full"} maxW={"lg"}>
            <Heading fontSize={{ base: "3xl", md: "4xl", lg: "5xl" }}>
              <Text
                as={"span"}
                position={"relative"}
                _after={{
                  content: "''",
                  width: "full",
                  height: useBreakpointValue({ base: "20%", md: "30%" }),
                  position: "absolute",
                  bottom: 1,
                  left: 0,
                  bg: "blue.400",
                  zIndex: -1,
                }}
              >
                Desafio de Desenvolvimento Fullstack
              </Text>
              <br />{" "}
              <Text color={"blue.400"} as={"span"}>
                ANCAR
              </Text>{" "}
            </Heading>
            <Text fontSize={{ base: "md", lg: "lg" }} color={"gray.500"}>
              O Desafio consiste em um Projeto que será um sistema de
              Questionarios, Perguntas e Respostas. A API desenvolvida em NestJS
              (TypeScript) com TypeORM e utilizando o conceito REST, O Front End
              é densenvolvido em ReactJs, com Chkara UI
            </Text>
            <Stack direction={{ base: "column", md: "row" }} spacing={4}>
              <Link href="/questionnaire">
                <Button
                  width={500}
                  rounded={"full"}
                  bg={"blue.400"}
                  color={"white"}
                  _hover={{
                    bg: "blue.500",
                  }}
                >
                  Criar Questionarios
                </Button>
              </Link>
            </Stack>
          </Stack>
        </Flex>
        <Flex flex={1}>
          <Image
            alt={"Login Image"}
            objectFit={"cover"}
            src={
              "https://images.unsplash.com/photo-1527689368864-3a821dbccc34?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80"
            }
          />
        </Flex>
      </Stack>
    </>
  );
}