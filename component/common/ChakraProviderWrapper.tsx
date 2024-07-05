"use client";
import { ChakraProvider } from "@chakra-ui/react";

import customTheme from "../../theme";

function ChakraProviderWrapper({ children }: React.PropsWithChildren<any>) {
    return (
        <ChakraProvider theme={customTheme}>
            {children}
        </ChakraProvider>
    );
}

export default ChakraProviderWrapper;