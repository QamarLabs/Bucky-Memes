import "../styles/globals.css";

import dynamic from "next/dynamic";
import { ChakraProvider } from "@chakra-ui/react";
import type { AppProps } from "next/app";
import Script from "next/script";
import { appWithTranslation } from "next-i18next";
import customTheme from "../theme";
import { FormProvider } from "../component/common/FormContext";

const Navbar = dynamic(() => import("../component/common/NavbarComponent"), {ssr: false});

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Script
        id="google_analytics_script"
        strategy="lazyOnload"
        src={"https://www.googletagmanager.com/gtag/js?id=G-X13RB8105W"}
      />

      <Script strategy="lazyOnload" id="google_analytics_script_config">
        {`
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());

                gtag('config', 'G-X13RB8105W');
        `}
      </Script>

      <ChakraProvider theme={customTheme}>
        <FormProvider>
          <Navbar />
          <Component {...pageProps} />
        </FormProvider>
      </ChakraProvider>
    </>
  );
}

export default appWithTranslation(MyApp);
