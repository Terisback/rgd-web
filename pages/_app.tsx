import React from "react";
import "../styles/globals.css";
import type { AppProps } from "next/app";
import Sidebar from "../Components/Sidebar";

import { AppContext } from "../libs/context";

import { useRouter } from "next/router";
import { elements } from "../Components/Sidebar/components/";
import Head from "next/head";
import { UserTemplate } from "../libs/api";

function MyApp({ Component, pageProps }: AppProps) {
  const router = useRouter();

  const [User, setUser] = React.useState(UserTemplate);

  const title = elements.find(
    (element) => element.href === router.asPath
  )?.title ?? "???";
  return (
    <AppContext.Provider value={{ User, setUser }}>
      <main>
        <Head>
          <title>{title}</title>
        </Head>
        <Sidebar />
        <div className="Content">
          <Component {...pageProps} />
        </div>
      </main>
    </AppContext.Provider>
  );
}
export default MyApp;
