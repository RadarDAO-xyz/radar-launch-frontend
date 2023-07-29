import {
  Dispatch,
  ReactNode,
  SetStateAction,
  createContext,
  useState,
} from "react";

interface AuthContextType {
  idToken: string;
  setIdToken: Dispatch<SetStateAction<string>>;
}

export const AuthContext = createContext<AuthContextType>({
  idToken: "",
  setIdToken: () => {},
});

export const AuthProvider = ({ children }: { children?: ReactNode }) => {
  const [idToken, setIdToken] = useState("");

  return (
    <AuthContext.Provider value={{ idToken, setIdToken }}>
      {children}
    </AuthContext.Provider>
  );
};
