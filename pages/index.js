import React, { useEffect } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import Loading from "../components/Loading";
import { auth } from "../lib/firebase";

export default function Home({ setLoading }) {
  const [user, loading] = useAuthState(auth);
  useEffect(() => {
    setLoading(loading);
  }, [loading]);
  console.log(user)
  return (
    <div className="flex w-screen h-screen overflow-hidden">
      {loading ? <Loading /> : <div></div>}
    </div>
  );
}
