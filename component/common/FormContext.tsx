/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import { useToast } from "@chakra-ui/react";
import React, { createContext, useCallback, useEffect, useState } from "react";

import fetchFeatures from "../../services/fetchFeatures";
import { isMobileDevice } from "../../utils";

interface FormContextDefault {
  currentMinMax: number[];
  handleSizeImage: (val: number[]) => void;
  copied: boolean;
  downloaded: boolean;
  copyImageToClipboard: (
    url: string,
    name: string
  ) => (event: React.MouseEvent<HTMLButtonElement>) => Promise<(e: any) => any>;
  downloadImage: (
    url: string,
    name: string
  ) => (event: React.MouseEvent<HTMLButtonElement>) => Promise<(e: any) => any>;
  memeHovered: boolean;
  onMemeHovered: () => (e: any) => void;
  setSearchQuery: (val: string) => void;
  searchQry: string;
  queryFeatures: string[];
  features: string[];
  setQueryFeatures: (feats: string[]) => void;
  handleSelectFeature: (
    feat: string
  ) => (e: React.MouseEvent<HTMLSpanElement, MouseEvent>) => void;
  handleRemoveFeature: (
    feat: string
  ) => (e: React.MouseEvent<HTMLSpanElement, MouseEvent>) => void;
  memeImage: string;
  setMemeImage: (mImage: string) => void;
}

const defaultValues = {
  currentMinMax: [0, 50],
  handleSizeImage: (val: number[]) => {},
  copied: false,
  downloaded: false,
  copyImageToClipboard:
    (url: string, name: string) =>
    async (event: React.MouseEvent<HTMLButtonElement>) => {
      event.stopPropagation();
      console.log("Copying image to clipboard from URL:", url);
      return Promise.resolve((e: any) => e.stopPropagation());
    },
  downloadImage:
    (url: string, name: string) =>
    async (event: React.MouseEvent<HTMLButtonElement>) => {
      event.stopPropagation();
      console.log("Downloading image from URL:", url, "with name:", name);
      return Promise.resolve((e: any) => e.stopPropagation());
    },
  memeHovered: false,
  onMemeHovered: () => (e: any) => {},
  setSearchQuery: (val: string) => {},
  searchQry: "",
  features: [],
  queryFeatures: [],
  setQueryFeatures: (feats: string[]) => {},
  handleSelectFeature:
    (feat: string) => (e: React.MouseEvent<HTMLSpanElement, MouseEvent>) => {},
  handleRemoveFeature:
    (feat: string) => (e: React.MouseEvent<HTMLSpanElement, MouseEvent>) => {},
  memeImage: "",
  setMemeImage: (val: string) => {},
};

export const FormContext = createContext<FormContextDefault>(defaultValues);

const FormProvider = ({ children }: React.PropsWithChildren<any>) => {
  const toast = useToast();
  const [copied, setCopied] = useState(false);
  const [downloaded, setDownloaded] = useState(false);
  const [hovered, setHovered] = useState(false);
  const [currentMinMax, setCurrentMinMax] = useState<number[]>([0, 50]);
  const [query, setQuery] = useState<string>("");
  const [queryFeatures, setQueryFeatures] = useState<string[]>([]);
  const [features, setFeatures] = useState<string[]>([]);
  const [memeImage, setMemeImage] = useState<string>("");

  const handleSizeImage = useCallback(
    (minMaxScale: number[]) => setCurrentMinMax(minMaxScale),
    []
  );

  const copyImageToClipboard = useCallback(
    (url: string, name: string) =>
      async (event: React.MouseEvent<HTMLButtonElement>) => {
        event.stopPropagation();
        setCopied(true);

        if (isMobileDevice()) {
          await navigator.clipboard.writeText(url);
          window.open(url, "_blank")?.focus();
        } else {
          const response = await fetch(url);
          const blob = await response.blob();
          const item = new ClipboardItem({ [blob.type]: blob });
          await navigator.clipboard.write([item]);
        }
        setTimeout(() => setCopied(false), 3000);
        toast({
          description: `Copied ${name}!`,
          status: "success",
          duration: 2000,
          isClosable: true,
          position: "top",
        });

        return (e: any) => e.stopPropagation();
      },
    []
  );

  const downloadImage = useCallback(
    (url: string, name: string) =>
      async (event: React.MouseEvent<HTMLButtonElement>) => {
        setDownloaded(true);

        const response = await fetch(url);
        const blob = await response.blob();

        if (isMobileDevice()) {
          const file = new File([blob], `${name}.png`, {
            type: "image/png",
          });
          if (navigator.canShare && navigator.canShare({ files: [file] }))
            await navigator.share({
              files: [file],
              title: "Download Image",
              text: `Download ${name}!`,
            });
        } else {
          const blobUrl = URL.createObjectURL(blob);
          const link = document.createElement("a");
          link.href = blobUrl;
          link.download = name; // specify the desired file name
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);
          URL.revokeObjectURL(blobUrl); // Clean up the object URL
        }
        setTimeout(() => setDownloaded(false), 3000);
        toast({
          description: `Downloaded ${name}!`,
          status: "success",
          duration: 2000,
          isClosable: true,
          position: "top",
        });
        return (e: any) => e.stopPropagation();
      },
    []
  );

  const setMemeImageFunc = useCallback((val: string) => setMemeImage(val), []);

  const onMemeHovered = useCallback(() => (e: any) => setHovered(!hovered), []);

  const handleSelectFeature = useCallback(
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

  const handleRemoveFeature = useCallback(
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

  useEffect(() => {
    async function getFeatures() {
      const fetchedfeatures = await fetchFeatures();
      setFeatures(fetchedfeatures);
    }

    getFeatures();
  }, []);

  return (
    <FormContext.Provider
      value={{
        currentMinMax,
        handleSizeImage,
        copied,
        downloaded,
        copyImageToClipboard,
        downloadImage,
        memeHovered: hovered,
        onMemeHovered,
        setSearchQuery: (val: string) => setQuery(val),
        searchQry: query,
        features,
        queryFeatures,
        setQueryFeatures: (feats: string[]) => {
          setQueryFeatures(feats);
        },
        handleRemoveFeature,
        handleSelectFeature,
        setMemeImage: setMemeImageFunc,
        memeImage,
      }}
    >
      {children}
    </FormContext.Provider>
  );
};

export default FormProvider;
