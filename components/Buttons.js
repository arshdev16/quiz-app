import React from "react";
import Link from "next/link";
import { auth } from "../lib/firebase";

export const LinkBtn = (props) => (
  <Link href="/">
    <a className="flex justify-center items-center mx-4 text-white border-2 border-white transition-all duration-300 px-4 py-2 rounded-lg hover:py-4 hover:px-6">
      {props.children}
    </a>
  </Link>
);

export const AuthBtns = (props) => (
  <Link href={props.pathname}>
    <a className="flex sm:inline-flex justify-center items-center bg-gradient-to-tr from-sky-700 to-indigo-600 hover:from-sky-800 hover:to-indigo-600 active:from-indigo-900 active:to-purple-800 focus-visible:ring ring-indigo-300 text-white font-semibold text-center rounded-md outline-none transition duration-200 px-5 py-2 mx-3">
      {props.children}
    </a>
  </Link>
);

export const LogoutBtn = (props) => (
  <button
    className="flex sm:inline-flex justify-center items-center bg-gradient-to-tr from-sky-700 to-indigo-600 hover:from-sky-800 hover:to-indigo-600 active:from-indigo-900 active:to-purple-800 focus-visible:ring ring-indigo-300 text-white font-semibold text-center rounded-md outline-none transition duration-200 px-5 py-2 mx-3"
    onClick={() => auth.signOut()}
  >
    {props.children}
  </button>
);
