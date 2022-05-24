import { useContext } from "react";
import { AppContext } from "../lib/Context";
import Link from "next/link";

const AuthCheck = (props) => {
  const { user } = useContext(AppContext);

  return user ? props.children : props.fallback || <Link href="/enter">You must be signed in</Link>;
};

export default AuthCheck;
