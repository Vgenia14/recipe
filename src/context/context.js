import { createContext, useReducer, useEffect } from "react";
import { projectAuth } from "../firebase/firebase";

// export const ContextColor = createContext();

// export const ContextColorProvider=({children})=>{return(
// <ContextColor.Provider value={{colorText:"red", colorBackgraund: "green", colorElement:"blue", colorEffeckt:"aqua"}}>
//     {children}
// </ContextColor.Provider>
// )}


export const AuthContext = createContext();

export const authReducer = (state, action) => {
  switch (action.type) {
    case "LOGIN":
      return { ...state, user: action.payload };
    case "LOGOUT":
      return { ...state, user: null };
    case "AUTH_IS_READY":
      return { user: action.payload, authIsReady: true };
    default:
      return state;
  }
};

export const AuthContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, {
    user: null,
    authIsReady: false,
  });
  useEffect(() => {
    const unsub = projectAuth.onAuthStateChanged((user) => {
      dispatch({ type: "AUTH_IS_READY", payload: user });
      unsub();
    });
  }, []);
  return (
    <AuthContext.Provider value={{ ...state, dispatch }}>
      {children}
    </AuthContext.Provider>
  );
};
