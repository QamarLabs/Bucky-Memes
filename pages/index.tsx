import {
  Badge,
  Box,
  CircularProgress,
} from "@chakra-ui/react";
import { useRouter } from "next/dist/client/router";
import dynamic from "next/dynamic";
import Head from "next/head";
import NextImage from "next/legacy/image";
import Link from "next/link";
import React, { useCallback, useContext, useEffect, useState } from "react";

const MemeList = dynamic(() => import("../component/MemeList"), {ssr: false });

import { SmallCloseIcon } from "@chakra-ui/icons";

import { FormContext } from "../component/common/FormContext";
import { Locale } from "../component/common/NavbarComponent";
import fetchFeatures from "../services/fetchFeatures";
import { fetchMemes } from "../services/fetchMemes";


export default function Memes() {
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();
  // const [locale] = useState(router.locale as Locale);
  const [queryFeatures, setQueryFeatures] = useState<string[]>([]);
  const [features, setFeatures] = useState<string[]>([]);

  const [memes, setMemes] = useState([]);

  const { searchQry } = useContext<any>(FormContext);

  useEffect(() => {
    async function getFeatures() {
      const fetchedfeatures = await fetchFeatures();
      setFeatures(fetchedfeatures);
    }

    getFeatures();
  }, []);

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

  const handleFeatureChange = useCallback(
    (feat: string) => (e: React.MouseEvent<HTMLSpanElement, MouseEvent>) => {
      const value = feat;
      const copyOfFeatures = features.slice();
      const copyOfQFeatures = queryFeatures.slice();
      // console.log("value:", value);
      // console.log('features', features)
      const valueIndex = copyOfFeatures.findIndex((f) => f === value);
      // console.log("valueIndex:", valueIndex);
      if (valueIndex != -1) {
        const qFeature = copyOfFeatures[valueIndex];
        // console.log('copyOfFeatures[valueIndex]', copyOfFeatures[valueIndex]);
        copyOfQFeatures.push(qFeature);
        copyOfFeatures.splice(valueIndex, 1);
      }
      setQueryFeatures(copyOfQFeatures);
      setFeatures(copyOfFeatures);
    },
    [features]
  );

  const removeFeatureChange = useCallback(
    (feat: string) => (e: React.MouseEvent<HTMLSpanElement, MouseEvent>) => {
      const value = feat;
      const copyOfFeatures = features.slice();
      const copyOfQFeatures = queryFeatures.slice();
      // console.log('value', value);
      // console.log('queryFeatures', queryFeatures)
      const valueIndex = copyOfQFeatures.findIndex((f) => f === value);
      // console.log("valueIndex:", valueIndex);
      if (valueIndex != -1) {
        const featureToAddBack = copyOfQFeatures[valueIndex];
        // console.log('copyOfFeatures[valueIndex]', copyOfFeatures[valueIndex]);
        copyOfFeatures.push(featureToAddBack);
        copyOfQFeatures.splice(valueIndex, 1);
      }
      setQueryFeatures(copyOfQFeatures);
      setFeatures(copyOfFeatures);
    },
    [queryFeatures]
  );

  return (
    <>
      <Head>
        <title>$Bucky Memes</title>
        <meta
          property="og:title"
          content={"$Bucky Memes"}
          key="ogtitle"
        />
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
      <Box bg='rgb(12, 12, 12)' className="memes-list" width={{ base: "90%", lg: "95%" }}>
        <Box className="filters">
          <Box
            mb="20px"
            overflow="hidden"
            ml={{ base: "unset", lg: "1%" }}
            px={{ base: "10px", lg: "unset" }}
          >
            <Box
              display="flex"
              overflowX="auto"
              css={{
                "&::-webkit-scrollbar": { display: "none" },
                "-ms-overflow-style": "none",
                "scrollbar-width": "none",
              }}
              whiteSpace="nowrap"
              mb="10px"
            >
              {features &&
                features.map((feature) => (
                  <Badge
                    cursor="pointer"
                    variant={
                      queryFeatures.includes(feature) ? "ghost" : "outline"
                    }
                    id={feature}
                    key={feature}
                    onClick={handleFeatureChange(feature)}
                    mr="1"
                    fontSize="1em"
                    borderRadius="full"
                    px="2"
                    boxShadow="inset 0 0 0px 1px #FFA500"
                    className="roboto-flex-text"
                  >
                    {feature}
                  </Badge>
                ))}
            </Box>
            <Box
              display="flex"
              overflowX="auto"
              css={{
                "&::-webkit-scrollbar": { display: "none" },
                "-ms-overflow-style": "none",
                "scrollbar-width": "none",
              }}
              whiteSpace="nowrap"
            >
              {queryFeatures &&
                queryFeatures.map((qFeature) => (
                  <Badge
                    cursor="pointer"
                    variant={"solid"}
                    id={qFeature}
                    key={`${qFeature}-selected`}
                    onClick={removeFeatureChange(qFeature)}
                    mr="1"
                    fontSize="1em"
                    borderRadius="full"
                    px="2"
                    boxShadow="inset 0 0 0px 1px #FFA500"
                    className="roboto-flex-text"
                    // fontWeight="100"
                  >
                    {qFeature}
                    <SmallCloseIcon />
                  </Badge>
                ))}
            </Box>
          </Box>
          {/* <SizeSlider /> */}
        </Box>
        <Box h="100vh" padding="15px">
          {isLoading ? (
            <Box textAlign="center">
              <CircularProgress isIndeterminate color="buckyGoldOne" />
            </Box>
          ) : (
            <MemeList memes={memes} locale="en" />
          )}
        </Box>
      </Box>
      <Link
        href={"https://buckyonsol.com/"}
        target="_blank"
      >
        <Box className="floating-button">
          <NextImage
            layout="fill"
            style={{transform: 'scale(0.8)'}}
            src="/navigate-bucky.svg"
            alt="Navigate to Bucky on Sol"
          />
        </Box>
      </Link>
    </>
  );
}

// export async function getStaticProps({ locale }: GetStaticPropsContext) {
//   return {
//     props: {
//       ...(await serverSideTranslations(locale as Locale, ["common"])),
//     },
//     revalidate: 30,
//   };
// }
