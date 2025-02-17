"use cllent";
import { Box, Center } from "@chakra-ui/react";
import dynamic from "next/dynamic";

import { Locale } from "./common/NavbarComponent";
const NewsletterComponent = dynamic(
  () => import("./common/NewsletterComponent"),
  { ssr: false }
);

import MemeCard from "./common/MemeCard";
import Newsletter  from "./Newsletter";

const MemeList = (props: { memes: any; locale: Locale }) => {
  if (!props.memes?.length) {
    return (
      <>
        <Center className='roboto-flex-text' fontSize="1.75rem" color='white'>
          There are no memes that match these criteria at the moment. <br/>
          Would you like to subscribe to our newsletter to be kept informed?
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
