import "../styles/globals.css";

import type { AppProps } from "next/app";
import dynamic from "next/dynamic";
import Script from "next/script";
import { appWithTranslation } from "next-i18next";

const ChakraProviderWrapper = dynamic(() => import('../component/common/ChakraProviderWrapper'))
const FormProvider = dynamic(() => import('../component/common/FormContext'))

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

      <ChakraProviderWrapper>
        <FormProvider>
          <Navbar />
          <Component {...pageProps} />
        </FormProvider>
      </ChakraProviderWrapper>
    </>
  );
}

export default appWithTranslation(MyApp, );
