import { createContext } from "react";

export const AppContext = createContext({user: null, username: null, userId: null, email: null, loading: true, setLoading: ()=> {}});