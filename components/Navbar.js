import React from "react";
import { auth } from "../lib/firebase";
import { LinkBtn, AuthBtns } from "./Buttons";

const Navbar = () => {
  return (
    <div className="flex justify-between p-4 max-h-12">
      <div>EXAMPLE</div>
      <ul className="flex">
        <li>
          <LinkBtn>Home</LinkBtn>
        </li>
        <li>
          <LinkBtn>Quizes</LinkBtn>
        </li>
        <li>
          <LinkBtn>Your Quizes</LinkBtn>
        </li>
      </ul>
      {!auth.currentUser && (
        <div>
          <AuthBtns pathname="/login">Login</AuthBtns>
          <AuthBtns pathname="/signup">Sign up</AuthBtns>
        </div>
      )}
    </div>
  );
};

export default Navbar;
