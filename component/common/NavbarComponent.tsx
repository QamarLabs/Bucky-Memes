import { InfoIcon } from "@chakra-ui/icons";
import {
  Avatar,
  Box,
  Button,
  Center,
  Flex,
  IconButton,
  Image,
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
import { useState } from "react";

export type Locale = "en" | "fr";

const NavbarComponent = () => {
  const router = useRouter();
  const [locale, setLocale] = useState(router.locale as Locale);
  const { isOpen, onOpen, onClose } = useDisclosure();

  const changeLocale = (value: Locale) => {
    setLocale(value);
    router.push(
      {
        pathname: router.pathname,
        query: { ...router.query },
      },
      undefined,
      {
        locale: value,
        scroll: false,
      }
    );
  };

  return (
    <Flex
      backgroundColor="white"
      position="sticky"
      boxShadow="md"
      w="100%"
      top="0"
      zIndex="100"
      h="60px"
    >
      <Center p="10px">
        <Box w="100%" h="100%">
          <Link href="/" aria-label="back to bucky memes homepage" passHref>
            <Box
              width="125px"
              height="100%"
              position="relative"
              cursor="pointer"
            >
              <Image alt="$BUCKY" src="logo.png" />
            </Box>
          </Link>
        </Box>
      </Center>
      <Spacer />
      <Center>
        {!router.pathname.includes("trip") && (
          <>
            <Button
              className="help-button-desktop"
              colorScheme="teal"
              variant="ghost"
              onClick={onOpen}
            >
              What is Bucky?
            </Button>

            <IconButton
              p="0px 15px 5px 0px"
              className="help-button-mobile"
              onClick={onOpen}
              fontSize="30px"
              variant="ghost"
              colorScheme="teal"
              aria-label="get info"
              icon={<InfoIcon />}
            />
          </>
        )}
        <Modal size="lg" isOpen={isOpen} onClose={onClose}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Welcome to success!</ModalHeader>
            <ModalCloseButton />
            <ModalBody whiteSpace="pre-line">
              <Flex mb="20px">
                <Center w="100%">
                  <a href="https://buckyonsol.com/" title="Bucky on Sol">
                    <Avatar
                      size="2xl"
                      name="Bucky"
                      src="https://res.cloudinary.com/aa1997/image/upload/v1720130139/Web3-Client-Projects/Leo_Bucky.png"
                    />
                  </a>
                </Center>
              </Flex>
              <div
                dangerouslySetInnerHTML={{
                  __html:
                    "This token empowers meme creators & celebrates internet culture. Very fun meme token project, Zero tax, pure simplicity, growing stronger by the day.<br /><br />We’re here to add a splash of color to the blockchain scene and create memorable experiences for our community. Share positive vibes, and ride the crypto wave together. Zero taxes, LP burnt, and contract renounced.",
                }}
              />
            </ModalBody>
            <ModalFooter>
              <Button onClick={onClose} variant="ghost">
                Keep it up!
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </Center>
    </Flex>
  );
};

export default NavbarComponent;
