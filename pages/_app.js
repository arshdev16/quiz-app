import React from "react";
import Navbar from "../components/Navbar";
import "../styles/globals.css";
import { Toaster } from "react-hot-toast";

function MyApp({ Component, pageProps }) {
  const [loading, setLoading] = React.useState(true);
 
 //add conetext api 
  return (
    <>
      {!loading && <Navbar />}
      <Component {...pageProps} setLoading={setLoading} loading={loading} />
      <Toaster />
    </>
  );
}

export default MyApp;
