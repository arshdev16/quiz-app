import React from "react";
import Link from "next/link";
import { firebaseApp } from "../lib/firebase";
import { getAuth } from "firebase/auth";

export const LinkBtn = (props) => (
  <Link href={props.pathname}>
    <a className="flex justify-center items-center mx-4 text-white border-2 border-white transition-all duration-300 px-4 py-2 rounded-lg hover:py-4 hover:px-6">
      {props.children}
    </a>
  </Link>
);

export const AuthBtns = (props) => (
  <Link href={props.pathname}>
    <a className="flex sm:inline-flex justify-center items-center bg-gradient-to-tr from-sky-600 to-indigo-500 hover:from-sky-700 hover:to-indigo-500 active:from-indigo-800 active:to-sky-700 focus-visible:ring ring-indigo-500 text-white font-semibold text-center rounded-md outline-none transition duration-200 px-5 py-2 mx-3">
      {props.children}
    </a>
  </Link>
);

export const LogoutBtn = (props) => {
  const auth = getAuth(firebaseApp);
  return (
    <button
      className="flex sm:inline-flex justify-center items-center bg-gradient-to-tr from-sky-600 to-indigo-500 hover:from-sky-700 hover:to-indigo-500 active:from-indigo-800 active:to-sky-700 focus-visible:ring ring-indigo-500 text-white font-semibold text-center rounded-md outline-none transition duration-200 px-5 py-2 mx-3"
      onClick={() => auth.signOut()}
    >
      {props.children}
    </button>
  );
};
