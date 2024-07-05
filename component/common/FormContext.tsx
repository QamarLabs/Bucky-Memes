// context/UserContext.js
import { useToast } from "@chakra-ui/react";
import React, { createContext, useCallback, useState } from "react";

interface FormContextDefault {
  currentMinMax: number[];
  handleSizeImage: (val: number[]) => void;
  copied: boolean;
  downloaded: boolean;
  copyImageToClipboard: (
    url: string, name: string
  ) => (event: React.MouseEvent<HTMLButtonElement>) => Promise<(e: any) => any>;
  downloadImage: (
    url: string,
    name: string
  ) => (event: React.MouseEvent<HTMLButtonElement>) => Promise<(e: any) => any>;
  memeHovered: boolean;
  onMemeHovered: () => (e: any) => void;
}

export const FormContext = createContext<FormContextDefault>({
  currentMinMax: [0, 50],
  handleSizeImage: (val: number[]) => {},
  copied: false,
  downloaded: false,
  copyImageToClipboard:
    (url: string, name: string) => async (event: React.MouseEvent<HTMLButtonElement>) => {
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
});

const FormProvider = ({ children }: React.PropsWithChildren<any>) => {
  const toast = useToast();
  const [copied, setCopied] = useState(false);
  const [downloaded, setDownloaded] = useState(false);
  const [hovered, setHovered] = useState(false);
  const [currentMinMax, setCurrentMinMax] = useState<number[]>([0, 50]);
  const handleSizeImage = useCallback(
    (minMaxScale: number[]) => setCurrentMinMax(minMaxScale),
    []
  );

  const copyImageToClipboard = useCallback(
    (url: string, name: string) => async (event: React.MouseEvent<HTMLButtonElement>) => {
      event.stopPropagation();
      try {
        const response = await fetch(url);
        const blob = await response.blob();
        const item = new ClipboardItem({ [blob.type]: blob });
        await navigator.clipboard.write([item]);
        setCopied(true);
        setTimeout(() => setCopied(false), 3000);
        toast({
          description: `Copied ${name}!`,
          status: 'success',
          duration: 2000,
          isClosable: true,
          position: 'top'
        })
      } catch (error) {
        console.error("Failed to copy image: ", error);
        alert("Failed to copy image");
      }

      return (e: any) => e.stopPropagation();
    },
    []
  );

  const downloadImage = useCallback(
    (url: string, name: string) =>
      async (event: React.MouseEvent<HTMLButtonElement>) => {
        setDownloaded(true);
        try {
          const response = await fetch(url);
          const blob = await response.blob();
          const blobUrl = URL.createObjectURL(blob);
          const link = document.createElement("a");
          link.href = blobUrl;
          link.download = name; // specify the desired file name
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);
          URL.revokeObjectURL(blobUrl); // Clean up the object URL
          setTimeout(() => setDownloaded(false), 3000);
          toast({
            description: `Downloaded ${name}!`,
            status: 'success',
            duration: 2000,
            isClosable: true,
            position: 'top'
          })
        } catch (error) {
          console.error("Failed to download image: ", error);
          alert("Failed to download image");
        }

        return (e: any) => e.stopPropagation();
      },
    []
  );

  const onMemeHovered = useCallback(() => (e: any) => setHovered(!hovered), []);

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
      }}
    >
      {children}
    </FormContext.Provider>
  );
};

export default FormProvider;