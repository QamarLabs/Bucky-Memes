import { InfoIcon } from "@chakra-ui/icons";
import {
  Avatar,
  Box,
  Button,
  Center,
  Flex,
  IconButton,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Spacer,
  useDisclosure,
  Image,
} from "@chakra-ui/react";
import Link from "next/link";
import { useRouter } from "next/router";
import { useTranslation } from "next-i18next";
import { useState } from "react";

export type Locale = "en" | "fr";

const NavbarComponent = () => {
  const router = useRouter();
  const [locale, setLocale] = useState(router.locale as Locale);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { t } = useTranslation("common");

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
              {t("whatIsBucky")}
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
            <ModalHeader>{t("whatIsBuckyModal.welcome")}</ModalHeader>
            <ModalCloseButton />
            <ModalBody whiteSpace="pre-line">
              <Flex mb="20px">
                <Center w="100%">
                  <a
                    href="https://buckyonsol.com/"
                    title="Bucky on Sol"
                  >
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
                  __html: t("whatIsBuckyModal.text"),
                }}
              />
            </ModalBody>
            <ModalFooter>
              <Button onClick={onClose} variant="ghost">
                {t("whatIsBuckyModal.endText")}
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </Center>
      <Center cursor="pointer" mr="10px">
        {(["en", "fr"] as Locale[]).map((language: Locale) => (
          <Button
            key={language}
            ml="5px"
            onClick={() => changeLocale(language)}
            colorScheme="solid"
            variant={locale === language ? "solid" : "outline"}
          >
            {language.toUpperCase()}
          </Button>
        ))}
      </Center>
    </Flex>
  );
};

export default NavbarComponent;
