import { MantineProvider } from "@mantine/core";
import { AppProps } from "next/app";
import Head from "next/head";
import { IconContext } from "react-icons/lib";
import Layout from "../components/common/layout";
import { GunContextProvider } from "../hooks/useGunContext";

export default function App(props: AppProps) {
  const { Component, pageProps } = props;
  return (
    <div style={{ width: "100vw", height: "100vh" }}>
      <Head>
        <title>Page title</title>
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width"
        />
      </Head>
      <GunContextProvider>
        <MantineProvider
          withGlobalStyles
          withNormalizeCSS
          theme={{
            /** Put your mantine theme override here */
            colorScheme: "dark",
          }}
        >
          <IconContext.Provider value={{ style: { fontSize: "18px" } }}>
            <Layout>
              <Component {...pageProps} />
            </Layout>
          </IconContext.Provider>
        </MantineProvider>
      </GunContextProvider>
    </div>
  );
}
