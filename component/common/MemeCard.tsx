/* eslint-disable no-unused-vars */
import {
  Box,
  Button,
  CircularProgress,
  Icon,
  Modal,
  ModalBody,
  ModalContent,
  ModalOverlay,
  Text,
} from "@chakra-ui/react";
import NextImage from "next/image";
import { usePathname, useRouter } from "next/navigation";
import React, { useContext, useMemo, useState } from "react";
import {
  BsCheck,
  BsClipboard,
  BsDownload,
  BsEye,
  BsTrash,
} from "react-icons/bs";

import BuckyIcon from "./BuckyIcon";
import { CustomImageLoader } from "./CustomLoader";
import { FormContext } from "./FormContext";
import { Locale } from "./NavbarComponent";

interface MemeCardProps {
  meme: any;
  deleteFunc?: (
    id: string
  ) => (e: React.MouseEvent<HTMLButtonElement>) => Promise<any>;
  locale?: Locale;
}

const MemeCard = ({ meme, deleteFunc, locale }: MemeCardProps) => {
  const router = useRouter();
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [loadingImg, setLoadingImg] = useState<boolean>(true);

  const {
    copied,
    downloaded,
    copyImageToClipboard,
    downloadImage,
    currentMinMax,
    setMemeImage,
  } = useContext(FormContext);

  const width = useMemo(() => {
    let decimalLessThanOne: number = currentMinMax[1];
    let scalingNumber = 225 + decimalLessThanOne;
    return `${scalingNumber}px`;
  }, [currentMinMax]);

  const navigateAndCreateMeme = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setMemeImage(meme.cloudinaryUrl);
    router.replace("/create-meme");
  };

  return (
    <>
      <Box
        key={meme.slug}
        flex={1}
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
        width={{ base: "45%", sm: "30%", md: "40%", lg: width }}
        mx={{ base: "auto", sm: "initial" }}
        _hover={{
          transform: { base: "unset", md: "scale(1.05)" },
        }}
        sx={{
          "&:hover #delete-meme": {
            transform: "none",
          },
          "&:hover #create-meme": {
            transform: "none",
          },
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
          <Box
            textAlign="center"
            display="flex"
            w={"100%"}
            justifyContent={{
              base: deleteFunc ? "space-between" : "center",
              md: deleteFunc ? "space-between" : "start",
            }}
            transform={{ base: "scale(0.9)", md: "scale(1)" }}
          >
            <Button
              onClick={copyImageToClipboard(meme.cloudinaryUrl, meme.name)}
              size={{ base: "lg", md: "sm" }}
              mr={{ base: "5px", md: deleteFunc ? "0" : "10px" }}
              type="button"
              borderRadius={"0"}
              display={{ base: "none", md: "initial" }}
            >
              {!copied ? <Icon as={BsClipboard} /> : <Icon as={BsCheck} />}
            </Button>

            <Button
              onClick={() => setOpen(true)}
              size={{ base: "md", md: "sm" }}
              mr={{ base: "5px", md: "10px" }}
              borderRadius={"0"}
              p={{ base: "0.75rem !important" }}
              display={{ base: "initial", md: "none" }}
              type="button"
            >
              <Icon as={BsEye} />
            </Button>
            <Button
              onClick={downloadImage(meme.cloudinaryUrl, meme.name)}
              size={{ base: "md", md: "sm" }}
              mr={{ base: "0px", md: "10px" }}
              ml={{ base: "5px", md: "0" }}
              type="button"
              borderRadius={"0"}
            >
              {!downloaded ? <Icon as={BsDownload} /> : <Icon as={BsCheck} />}
            </Button>
            {!deleteFunc && (
              <>
                <Box flex='0' id="create-meme">
                  <Button
                    onClick={navigateAndCreateMeme}
                    size={{ base: "md", md: "sm" }}
                    mr={{ base: "0px", md: "0" }}
                    ml={{ base: "10px", md: "0" }}
                    type="button"
                    variant="solid"
                    borderRadius={"0"}
                  >
                    <Text
                      className="roboto-flex-text"
                      display={{ base: "none", md: "initial" }}
                      mr="4px"
                    >
                      Create Meme
                    </Text>
                    <BuckyIcon />
                  </Button>
                </Box>
                {/* <IconButton
                  id="create-meme"
                  display={{ base: "initial", md: "none" }}
                  aria-label="Create your own meme"
                  icon={<BuckyIcon />}
                  onClick={navigateAndCreateMeme}
                  size={{ base: "md", md: "sm" }}
                  mr={{ base: "0px", md: "0" }}
                  ml={{ base: "5px", md: "0" }}
                   w={{ base: '25px', md: '50px' }}
                  type="button"
                  variant="solid"
                  borderRadius={"0"}
                /> */}
              </>
            )}
            {deleteFunc && (
              <Box id="delete-meme">
                <Button
                  onClick={deleteFunc(meme._id)}
                  size={{ base: "md", md: "sm" }}
                  mr={{ base: "5px", md: "0" }}
                  type="button"
                  variant="error"
                  borderRadius={"0"}
                >
                  <Text
                    className="roboto-flex-text"
                    display={{ base: "none", md: "initial" }}
                    mr="4px"
                  >
                    Delete Meme
                  </Text>
                  <BsTrash />
                </Button>
              </Box>
            )}
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
