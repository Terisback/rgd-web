import Document, {
  Html,
  Head,
  Main,
  NextScript,
  DocumentContext,
} from "next/document";

import { CookiesProvider } from "react-cookie";

class MyDocument extends Document {
  static async getInitialProps(ctx: DocumentContext) {
    const initialProps = await Document.getInitialProps(ctx);
    return { ...initialProps };
  }

  render() {
    return (
      <CookiesProvider>
        <Html>
          <Head>
            <link rel="shortcut icon" type="image/x-icon" href="/favicon.png" />
            <meta name="title" content="Russian Gamedev" />
            <meta name="description" content="" />
            <meta property="og:type" content="website" />
            <meta property="og:url" content="https://rgd.chat/" />
            <meta property="og:title" content="Russian Gamedev" />
            <meta
              property="og:description"
              content="Если вы — крутой прогер, моделлер, дизигнер, художник, аниматор или просто задрот хороший специалист
    — значит, вы пришли по адресу и можете принять участие в жизни лампового комьюнити,
    которое точно оценит ваш скилл."
            />
            <meta property="og:image" content="rgd.png" />
            <meta property="og:image:width" content="128" />
            <meta property="og:image:height" content="128" />
          </Head>
          <body>
            <Main />
            <NextScript />
          </body>
        </Html>
      </CookiesProvider>
    );
  }
}

export default MyDocument;
