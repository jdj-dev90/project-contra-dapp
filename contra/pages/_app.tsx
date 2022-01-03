import { MantineProvider } from "@mantine/core";
import { AppProps } from "next/app";
import Head from "next/head";
import { createContext } from "react";
import Layout from "../components/common/layout";
import { gun, user } from "../utils/gun";

export const AppStateContext = createContext({
  gun,
  user,
  isLoggedIn: !!user.is,
  userId: user?.is?.pub || null,
});

export default function App(props: AppProps) {
  const { Component, pageProps } = props;

  return (
    <>
      <Head>
        <title>Page title</title>
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width"
        />
      </Head>

      <AppStateContext.Provider
        value={{
          gun,
          user,
          isLoggedIn: !!user.is,
          userId: user?.is?.pub || null,
        }}
      >
        <MantineProvider
          withGlobalStyles
          withNormalizeCSS
          theme={{
            /** Put your mantine theme override here */
            colorScheme: "dark",
          }}
        >
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </MantineProvider>
      </AppStateContext.Provider>
    </>
  );
}
