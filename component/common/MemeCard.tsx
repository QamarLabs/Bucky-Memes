import {
  Link as ChakraLink,
  Box,
  Badge,
  Button,
  CircularProgress,
} from "@chakra-ui/react";
import { Locale } from "./NavbarComponent";
import Link from "next/link";
import NextImage from "next/image";
import { BsCheck, BsClipboard, BsDownload } from "react-icons/bs";
import { useContext, useMemo, useState } from "react";
import { FormContext } from "./FormContext";

const MAX_DESCRIPTION_LENGTH = 250;

interface MemeCardProps {
  meme: any;
  locale: Locale;
}

const MemeCard = ({ meme, locale }: MemeCardProps) => {
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
    let scalingNumber = 150 + decimalLessThanOne;
    return `${scalingNumber}px`;
  }, [currentMinMax]);

  const imageHeight = useMemo(() => {
    let decimalLessThanOne: number = currentMinMax[1];
    let scalingNumber = 100 + decimalLessThanOne;
    return `${scalingNumber}px`;
  }, [currentMinMax]);

  const iconSize = useMemo(() => {
    let decimalLessThanOne: number = currentMinMax[1];
    let size = 100 + decimalLessThanOne > 150 ? "sm" : "xs";
    return size;
  }, [currentMinMax]);

  return (
    <Box
      key={meme.slug}
      borderRadius="lg"
      borderWidth="1px"
      borderColor="#333"
      boxShadow="lg"
      cursor="pointer"
      display="inline-block"
      margin="5px"
      overflow="hidden"
      role="group"
      textAlign="left"
      bg="#333"
      width={width}
      _hover={{
        transform: "scale(1.05)",
      }}
    >
      <Box width="100%" minHeight={imageHeight} position="relative">
        {loadingImg ? (
          <CircularProgress isIndeterminate color="buckyGoldOne" />
        ) : null}
        <NextImage
          fill={true}
          alt={meme.cloudinaryUrl}
          src={meme.cloudinaryUrl}
          loader={() => meme.cloudinaryUrl}
          onLoadingComplete={() => setLoadingImg(false)}
        />
      </Box>

      <Box minHeight="0px" p="5" display="flex">
        <Button
          onClick={copyImageToClipboard(meme.cloudinaryUrl, meme.name)}
          size={iconSize}
          mr="10px"
          type="button"
        >
          {!copied ? <BsClipboard /> : <BsCheck />}
        </Button>

        <Button
          onClick={downloadImage(meme.cloudinaryUrl, meme.name)}
          size={iconSize}
          type="button"
        >
          {!downloaded ? <BsDownload /> : <BsCheck />}
        </Button>
        {/* <Box
          opacity="1"
          transition={"opacity 0.5s ease-in-out"}
          pl="5"
          py="1"
          color="white"
          fontSize="0.75rem"
          fontFamily={'body'}
          fontWeight="light"
        >
          {meme.name}
        </Box> */}
      </Box>
    </Box>
  );
};

export default MemeCard;
