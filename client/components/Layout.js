import Head from "next/head";

function Layout({ children }) {
  return (
    <>
      <Head>
        <title>devdesHub</title>
        <link rel="icon" href="/favicon.ico" />
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width, shrink-to-fit=no"
        />
        <title>devdesHub</title>
        <meta name="title" content="devdesHub" />
        <meta property="og:type" content="website"/>
        <meta property="og:url" content="https://devdesHub.ge/" />
        <meta property="og:title" content="devdesHub." />
        <meta name="keywords" content="developers, georgia, recruting" />
        <link href="/fonts.css" rel="stylesheet" />
      </Head>
      <div className="layout-content-wrapper">
        {children}
      </div>
    </>
  );
}
export default Layout;
