import React from "react";
import Navbar from "../components/Navbar";
import "../styles/globals.css";

function MyApp({ Component, pageProps }) {
  const [loading, setLoading] = React.useState(true);
  return (
    <>
      {!loading && <Navbar />}
      <Component {...pageProps} setLoading={setLoading} loading={loading}/>
    </>
  );
}

export default MyApp;
