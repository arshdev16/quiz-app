import { firebaseApp } from "./firebase";
import { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { getAuth } from "firebase/auth";
import { getFirestore, doc, onSnapshot } from "firebase/firestore";
// Custom hook to read  auth record and user profile doc
export function useUserData() {
  const firestore = getFirestore(firebaseApp);
  const [user] = useAuthState(getAuth(firebaseApp));
  const [username, setUsername] = useState(null);
  const [userId, setUserId] = useState(null);
  const [email, setEmail] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // turn off realtime subscription
    let unsubscribe;

    if (user) {
      const ref = doc(firestore, "users", user.uid);
      unsubscribe = onSnapshot(ref, (doc) => {
        setUsername(doc.data().username);
        setUserId(doc.data().userId);
        setEmail(doc.data().email);
        setLoading(false);
      })
    } else {
      setUsername(null);
      setUserId(null);
      setEmail(null);
    }
    setLoading(false);
    return unsubscribe;
  }, [user]);
  return { user, username, userId, email, loading, setLoading };
}
