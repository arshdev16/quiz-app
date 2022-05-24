import React from "react";
import { firebaseApp } from "../lib/firebase";
import { LinkBtn, AuthBtns, LogoutBtn} from "./Buttons";
import { getAuth } from "firebase/auth";

const Navbar = () => {
  const auth = getAuth(firebaseApp);
  return (
    <div className="flex justify-between p-4 max-h-12">
      <div>EXAMPLE</div>
      <ul className="flex">
        <li>
          <LinkBtn pathname="/">Home</LinkBtn>
        </li>
        <li>
          <LinkBtn pathname="/">Quizes</LinkBtn>
        </li>
        <li>
          <LinkBtn pathname="/admin/yourquizes">Your Quizes</LinkBtn>
        </li>
      </ul>
      {!auth.currentUser ? (
        <div>
          <AuthBtns pathname="/login">Login</AuthBtns>
          <AuthBtns pathname="/signup">Sign up</AuthBtns>
        </div>
      ) : (
        <div>
          <AuthBtns pathname="/">Quiz History</AuthBtns>
          <LogoutBtn pathname="/">Logout</LogoutBtn>
        </div>
      )}
    </div>
  );
};

export default Navbar;
