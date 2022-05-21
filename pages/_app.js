import React, { useContext } from "react";
import Navbar from "../components/Navbar";
import "../styles/globals.css";
import { Toaster } from "react-hot-toast";
import { AppContext } from "../lib/Context";
import { useUserData } from "../lib/Hooks";
import Loading from "../components/Loading";

function MyApp({ Component, pageProps }) {
  const AppData = useUserData();

  return (
    <AppContext.Provider value={AppData}>
      {AppData.loading ? (
        <div className="flex w-screen h-screen justify-center items-center">
          <Loading />
        </div>
      ) : (
        <>
          <Navbar />
          <Component {...pageProps} />
          <Toaster />
        </>
      )}
    </AppContext.Provider>
  );
}

export default MyApp;
