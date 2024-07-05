"use cllent";
import dynamic from "next/dynamic";
import { Locale } from "./common/NavbarComponent";
import { Box, Center } from "@chakra-ui/react";
const NewsletterComponent = dynamic(
  () => import("./common/NewsletterComponent"),
  { ssr: false }
);
const Newsletter = dynamic(() => import("./Newsletter"), { ssr: false });
const MemeCard = dynamic(() => import("./common/MemeCard"), { ssr: false });

const MemeList = (props: { memes: any; locale: Locale }) => {
  if (!props.memes?.length) {
    return (
      <>
        <Center fontSize="20px">
          There are no activities that match these criteria at the moment. Would
          you like to subscribe to our newsletter to be kept informed?
        </Center>
        <Center>
          <Box width="300px" margin="3%">
            <NewsletterComponent />
          </Box>
        </Center>
      </>
    );
  }
  return (
    <>
      {[
        ...props?.memes.map((meme: any, memeIdx: number) => (
          <MemeCard key={memeIdx} meme={meme} locale={props.locale} />
        )),
        Newsletter,
      ]}
    </>
  );
};

export default MemeList;
