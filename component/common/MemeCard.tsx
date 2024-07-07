import {
  Box,
  Button,
  CircularProgress,
  CloseButton,
  IconButton,
  Modal,
  ModalBody,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  useDisclosure,
} from "@chakra-ui/react";
import NextImage from "next/image";
import { useContext, useMemo, useState } from "react";
import { BsCheck, BsClipboard, BsDownload, BsEye } from "react-icons/bs";

import { FormContext } from "./FormContext";
import { Locale } from "./NavbarComponent";
import { CustomImageLoader } from "./CustomLoader";

interface MemeCardProps {
  meme: any;
  locale: Locale;
}

const MemeCard = ({ meme, locale }: MemeCardProps) => {
  const [open, setOpen] = useState(false);
  const [loadingImg, setLoadingImg] = useState<boolean>(true);
  const {
    copied,
    downloaded,
    copyImageToClipboard,
    downloadImage,
    currentMinMax,
  } = useContext(FormContext);

  const width = useMemo(() => {
    let decimalLessThanOne: number = currentMinMax[1];
    let scalingNumber = 225 + decimalLessThanOne;
    return `${scalingNumber}px`;
  }, [currentMinMax]);

  return (
    <>
      <Box
        key={meme.slug}
        borderRadius="sm"
        borderWidth="1px"
        borderColor="rgb(12, 12, 12)"
        boxShadow="lg"
        cursor="pointer"
        display="inline-block"
        margin={{ base: "-5px", md: "5px" }}
        overflow="hidden"
        role="group"
        textAlign="left"
        bg="rgb(12, 12, 12)"
        width={{ base: "45%", md: "40%", lg: width }}
        mx={{ base: "auto", sm: "initial" }}
        _hover={{
          transform: { base: "unset", md: "scale(1.05)" },
        }}
        position={{ base: "relative", md: "initial" }}
      >
        <Box
          width="100%"
          minHeight={{ base: 150, md: 250 }}
          position="relative"
        >
          {loadingImg ? (
            <CircularProgress
              as={CustomImageLoader}
              isIndeterminate
              color="buckyGoldOne"
            />
          ) : null}
          <NextImage
            fill={true}
            alt={meme.cloudinaryUrl}
            src={meme.cloudinaryUrl}
            sizes="(max-width: 800px) 100vw, (max-width: 1200px) 50vw, 33vw"
            loader={() => meme.cloudinaryUrl}
            onLoadingComplete={() => setLoadingImg(false)}
          />
        </Box>
        <Box
          minHeight="0px"
          px="5"
          py="3"
          fontSize={{ md: "1.2rem", xl: "1.2rem" }}
          letterSpacing="0.05rem"
          color="white"
          className="roboto-flex-text"
          fontWeight={100}
          whiteSpace={"nowrap"}
          display={{ base: "none", md: "block" }}
        >
          <p>{meme.name}</p>
        </Box>

        <Box
          minHeight="100%"
          width="100%"
          opacity={{ base: "0", md: "1" }}
          px={{ base: "0", md: "5" }}
          py={"1"}
          display="flex"
          flexDir={{ base: "column", md: "row" }}
          alignItems={{ base: "center", md: "unset" }}
          justifyContent={{ base: "center", md: "unset" }}
          position={{ base: "absolute", md: "initial" }}
          transition="opacity 0.5s ease-in-out"
          top={0}
          left={0}
          zIndex={0}
          bg={{ base: "#333", md: "unset" }}
          _groupHover={{
            opacity: "1",
          }}
        >
          <Box
            minHeight="0px"
            px="1"
            py="3"
            fontSize={"1rem"}
            letterSpacing="0.1rem"
            color="white"
            className="roboto-flex-text"
            display={{ base: "inline-flex", md: "none" }}
          >
            <p>{meme.name}</p>
          </Box>
          <Box>
            <Button
              onClick={copyImageToClipboard(meme.cloudinaryUrl, meme.name)}
              size={{ base: "lg", md: "sm" }}
              mr={{ base: "5px", md: "10px" }}
              type="button"
              borderRadius={"0"}
              display={{ base: "none", md: "initial" }}
            >
              {!copied ? <BsClipboard /> : <BsCheck />}
            </Button>

            <Button
              onClick={() => setOpen(true)}
              size={{ base: "lg", md: "sm" }}
              mr={{ base: "5px", md: "10px" }}
              type="button"
              borderRadius={"0"}
              display={{ base: "initial", md: "none" }}
            >
              <BsEye />
            </Button>

            <Button
              onClick={downloadImage(meme.cloudinaryUrl, meme.name)}
              size={{ base: "lg", md: "sm" }}
              type="button"
              borderRadius={"0"}
            >
              {!downloaded ? <BsDownload /> : <BsCheck />}
            </Button>
          </Box>
        </Box>
      </Box>
      {/* View Modal */}
      <Modal isOpen={open} onClose={() => setOpen(false)} size="full">
        <ModalOverlay />
        <ModalContent bg="transparent" onClick={() => setOpen(false)}>
          {/* <ModalHeader>CLOSE <CloseButton onClick={onClose}/></ModalHeader> */}
          <ModalBody
            p={0} // Prevent the click from closing the modal
          >
            <Box
              position="relative"
              width="100%"
              height="100vh"
              display="flex"
              alignItems="center"
              justifyContent="center"
            >
              <NextImage
                onClick={(e) => e.stopPropagation()}
                src={meme.cloudinaryUrl}
                alt={meme.name}
                layout="intrinsic"
                width={500}
                height={500}
                priority
              />
            </Box>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

export default MemeCard;
