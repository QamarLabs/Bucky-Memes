import "../styles/globals.css";

import type { AppProps } from "next/app";
import dynamic from "next/dynamic";

const ChakraProviderWrapper = dynamic(() => import('../component/common/ChakraProviderWrapper'))
const FormProvider = dynamic(() => import('../component/common/FormContext'))

const Navbar = dynamic(() => import("../component/common/NavbarComponent"), {ssr: false});

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <ChakraProviderWrapper>
        <FormProvider>
          <Navbar />
          <Component {...pageProps} />
        </FormProvider>
      </ChakraProviderWrapper>
    </>
  );
}

export default MyApp;
