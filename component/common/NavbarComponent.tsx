import {
  Box,
  Center,
  Flex,
  Icon,
  IconButton,
  Image,
  Input,
  InputGroup,
  InputLeftElement,
  Spacer,
} from "@chakra-ui/react";
import Link from "next/link";
import { useRouter } from "next/router";
import { useCallback, useContext } from "react";
import {
  BsInstagram,
  BsSearch,
  BsTelegram,
  BsTiktok,
  BsTwitterX,
} from "react-icons/bs";

import { FormContext } from "./FormContext";

export type Locale = "en" | "fr";

const NavbarComponent = () => {
  const router = useRouter();
  const { setSearchQuery, searchQry } = useContext(FormContext);

  const handleSearchChange = useCallback((e: any) => {
    setSearchQuery(e.target.value);
  }, []);

  return (
    <Flex
      position="sticky"
      boxShadow="md"
      w="100%"
      top="0"
      zIndex="100"
      h={{ base: "123px", sm: "60px", lg: "60px" }}
      bg="#FACD00"
      flexWrap={"wrap"}
    >
      <Box
        p="0"
        w={{ base: "100%", sm: "60%", lg: "70%" }}
        display={"flex"}
        justifyContent={
          router.pathname !== "/create-meme" ? "space-between" : "space-around"
        }
      >
        <Center px="10px" my={{ base: "20px", sm: "10px", md: "0" }}>
          <Box w="100%" h="100%">
            <Link href="/" aria-label="back to bucky memes homepage" passHref>
              <Box
                width={{ base: "80px", sm: "70px", md: "100px", lg: "125px" }}
                height="100%"
                position="relative"
                cursor="pointer"
              >
                <Image
                  my={{ sm: "0.5rem", md: "0.75rem", lg: "0.5rem" }}
                  alt="$BUCKY"
                  src="logo.png"
                />
              </Box>
            </Link>
          </Box>
        </Center>
        <Spacer display={{ base: "none", md: "initial" }} />

        {(router.pathname === "/" || router.pathname === "/create-meme") && (
          <Center>
            <Flex
              maxW={{
                base: "60vw",
                sm: "45vw",
                md: "unset",
              }}
              margin={{ base: "0rem 1rem", sm: "0", md: "10px 0px 10px 10px" }}
              justifyContent="center"
            >
              <InputGroup
                maxW={{
                  base: "60vw",
                  sm: "45vw",
                  md: "unset",
                }}
                minWidth={{
                  base: "60vw",
                  sm: "45vw",
                  md: "500px",

                  xl: "600px",
                }}
              >
                <InputLeftElement
                  pointerEvents="none"
                  children={
                    <Icon
                      fontSize={{ base: "10px", md: "16px", lg: "1rem" }}
                      as={BsSearch}
                      color="white"
                    />
                  }
                />
                <Input
                  className="search-bar roboto-flex-text"
                  color="white"
                  defaultValue={router.query.query}
                  value={searchQry}
                  onChange={handleSearchChange}
                  fontSize={{ base: "14px", md: "22px", lg: "1rem" }}
                  placeholder="Search Bucky's"
                  variant="md"
                />
              </InputGroup>
            </Flex>
          </Center>
        )}
      </Box>
      <Spacer display={{ base: "none", sm: "none", md: "initial" }} />

      <Center
        width={{ base: "100%", lg: "initial" }}
        maxWidth={{ base: "100%", sm: "30vw", md: "20vw" }}
        mr={{ base: "initial", md: "10px", lg: "20px" }}
        ml={{ base: "initial", sm: "5vw", md: "unset" }}
        px={{ base: "0.5rem", sm: "0rem", lg: "initial" }}
        display="flex"
        justifyContent={{
          base: "space-between",
          sm: "center",
          md: "space-between",
        }}
      >
        <IconButton
          fontSize={{ base: "1rem", md: "30px" }}
          variant="ghost"
          mr={{ base: "14.5%", sm: "0", md: "initial" }}
          px="0"
          aria-label="get info"
          onClick={() => window.open("https://t.me/buckyonsol", "_blank")}
          icon={<BsTelegram />}
        />
        <IconButton
          fontSize={{ base: "1rem", sm: "0.8rem", md: "30px" }}
          variant="ghost"
          mr={{ base: "14.5%", sm: "0", md: "initial" }}
          px="0"
          aria-label="get info"
          onClick={() => window.open("https://x.com/buckyonsol", "_blank")}
          icon={<BsTwitterX />}
        />
        <IconButton
          fontSize={{ base: "1rem", md: "30px" }}
          variant="ghost"
          mr={{ base: "14.5%", sm: "initial", md: "initial" }}
          px="0"
          aria-label="get info"
          onClick={() =>
            window.open("https://www.instagram.com/buckyonsol/", "_blank")
          }
          icon={<BsInstagram />}
        />
        <IconButton
          fontSize={{ base: "1rem", md: "30px" }}
          mr="0"
          variant="ghost"
          aria-label="get info"
          onClick={() =>
            window.open("https://www.tiktok.com/@buckyonsol", "_blank")
          }
          icon={<BsTiktok />}
        />
      </Center>
    </Flex>
  );
};

export default NavbarComponent;
