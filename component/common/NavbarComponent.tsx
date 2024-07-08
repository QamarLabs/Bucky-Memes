import { InfoIcon } from "@chakra-ui/icons";
import {
  Avatar,
  Box,
  Button,
  Center,
  Flex,
  Icon,
  IconButton,
  Image,
  Input,
  InputGroup,
  InputLeftElement,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Spacer,
  useDisclosure,
} from "@chakra-ui/react";
import Link from "next/link";
import { useRouter } from "next/router";
import { useCallback, useContext, useState } from "react";
import {
  BsInstagram,
  BsSearch,
  BsTelegram,
  BsTiktok,
  BsTwitterX,
  BsXCircle,
  BsXLg,
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
      backgroundColor="white"
      position="sticky"
      boxShadow="md"
      w="100%"
      top="0"
      zIndex="100"
      h={{ base: "123px", md: "60px" }}
      bg="#FACD00"
      flexWrap="wrap"
    >
      <Center px="10px" my={{ base: "20px", sm: "10px", md: "0" }}>
        <Box w="100%" h="100%">
          <Link href="/" aria-label="back to bucky memes homepage" passHref>
            <Box
              width={{ base: "80px", sm: "100px", md: "100px", lg: "125px" }}
              height="100%"
              position="relative"
              cursor="pointer"
            >
              <Image
                my={{ md: "0.75rem", lg: "0.5rem" }}
                alt="$BUCKY"
                src="logo.png"
              />
            </Box>
          </Link>
        </Box>
      </Center>
      <Spacer />

      {router.pathname === "/" && (
        <Center>
          <Flex margin={{ base: "0px 0px 0px 0px", md: "10px 0px 10px 10px" }}>
            <InputGroup
              minWidth={{ base: "60vw", sm: "300px", md: "400px", xl: "500px" }}
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
      <Spacer />

      <Center
        width={{ base: "100%", md: "initial" }}
        mr={{ base: "initial", md: "10px", lg: "20px" }}
      >
        <IconButton
          fontSize={{ base: "20px", md: "30px" }}
          variant="ghost"
          mr={{ base: "17.5%", md: "initial" }}
          aria-label="get info"
          onClick={() => window.open("https://t.me/buckyonsol", "_blank")}
          icon={<BsTelegram />}
        />
        <IconButton
          fontSize={{ base: "20px", md: "30px" }}
          variant="ghost"
          mr={{ base: "17.5%", md: "initial" }}
          aria-label="get info"
          onClick={() => window.open("https://x.com/buckyonsol", "_blank")}
          icon={<BsTwitterX />}
        />
        <IconButton
          fontSize={{ base: "20px", md: "30px" }}
          variant="ghost"
          mr={{ base: "17.5%", md: "initial" }}
          aria-label="get info"
          onClick={() =>
            window.open("https://www.instagram.com/buckyonsol/", "_blank")
          }
          icon={<BsInstagram />}
        />
        <IconButton
          fontSize={{ base: "20px", md: "30px" }}
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
