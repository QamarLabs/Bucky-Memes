import { Box, CircularProgress } from "@chakra-ui/react";
import { useRouter } from "next/dist/client/router";
import dynamic from "next/dynamic";
import Head from "next/head";
import NextImage from "next/legacy/image";
import Link from "next/link";
import React, { useContext, useEffect, useState } from "react";

const MemeList = dynamic(() => import("../component/MemeList"), { ssr: false });

import { FormContext } from "../component/common/FormContext";
import { Locale } from "../component/common/NavbarComponent";
import { fetchMemes } from "../services/fetchMemes";
import { CustomPageLoader } from "../component/common/CustomLoader";
import FeaturesFilter from "../component/common/FeaturesFilter";

export default function Memes() {
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();
  // const [locale] = useState(router.locale as Locale);

  const [memes, setMemes] = useState([]);

  const { searchQry, queryFeatures } = useContext<any>(FormContext);


  const [locale] = useState(router.locale as Locale);

  useEffect(() => {
    let timeoutId: NodeJS.Timeout;

    async function getMemes() {
      setIsLoading(true);
      let fetchedMemes = [];
      if (searchQry || queryFeatures.length)
        fetchedMemes = await fetchMemes(router.query, locale, {
          features: queryFeatures,
          query: searchQry,
        });
      else fetchedMemes = await fetchMemes(router.query, locale);

      setIsLoading(false);
      setMemes(fetchedMemes);
    }

    function debounceSearch() {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(getMemes, 500); // Adjust debounce time as needed (e.g., 500ms)
    }

    if (!router.isReady) return;

    debounceSearch();

    return () => clearTimeout(timeoutId); // Cleanup function to clear timeout on unmount or dependency change
  }, [searchQry, queryFeatures]);


  return (
    <>
      <Head>
        <title>$Bucky Memes</title>
        <meta property="og:title" content={"$Bucky Memes"} key="ogtitle" />
        <meta
          property="og:description"
          content={"BUCKY is a crypto that supports  the memes."}
          key="ogdesc"
        />
        <meta
          property="og:image"
          content="https://res.cloudinary.com/aa1997/image/upload/v1720130151/Web3-Client-Projects/Bucky_s_Arrived.png"
          key="ogpic"
        />
      </Head>
      <Box
        bg="rgb(12, 12, 12)"
        className="memes-list"
        width={{ base: "100%", xl: "95%" }}
      >
        <Box className="filters">
          <Box
            mb="20px"
            overflow="hidden"
            ml={{ base: "unset", lg: "1%" }}
            px={{ base: "10px", lg: "unset" }}
          >
            <FeaturesFilter selectFeatures />
            <FeaturesFilter removeFeatures />
          </Box>
        </Box>
        <Box h="100vh" padding={{ base: '0', md: "15px"}}>
          {isLoading ? (
            <Box textAlign="center">
              <CircularProgress
                as={CustomPageLoader}
                isIndeterminate
                color="buckyGoldOne"
              />
            </Box>
          ) : (
            <MemeList memes={memes} locale="en" />
          )}
        </Box>
      </Box>
      <Link href={"https://buckyonsol.com/"} target="_blank">
        <Box className="floating-button">
          <NextImage
            layout="fill"
            style={{ transform: "scale(0.6)" }}
            src="/navigate-bucky.svg"
            alt="Navigate to Bucky on Sol"
          />
        </Box>
      </Link>
    </>
  );
}
