import { ColorModeScript } from "@chakra-ui/react";
import NextDocument, { Head, Html, Main, NextScript } from "next/document";
import Script from "next/script";
import theme from "../theme";

export default class Document extends NextDocument {
    render() {
        return (
            <Html lang="en">
                <Head>
                    <link rel="shortcut icon" href="/favicon.jpg" />
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
                </Head>
                <body>
                    <Main />
                    <NextScript />
                </body>
            </Html>
        );
    }
}
