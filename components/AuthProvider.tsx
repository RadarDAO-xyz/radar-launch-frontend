import {
  Dispatch,
  ReactNode,
  SetStateAction,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
import { useConnect, useDisconnect, useAccount, useQuery } from "wagmi";
import { Web3Context } from "./Web3Provider";
import { authenticateUser } from "@/lib/backend";
import { getPublicCompressed } from "@toruslabs/eccrypto";
import { Web3AuthConnector } from "@web3auth/web3auth-wagmi-connector";

interface AuthContextType {
  idToken: string;
  setIdToken: Dispatch<SetStateAction<string>>;
  login: () => void;
  logout: () => void;
  isLoggedIn: boolean;
}

export const AuthContext = createContext<AuthContextType>({
  idToken: "",
  setIdToken: () => {},
  login: () => {},
  logout: () => {},
  isLoggedIn: false,
});

export const AuthProvider = ({ children }: { children?: ReactNode }) => {
  const { connectAsync } = useConnect();
  const { disconnectAsync } = useDisconnect({});
  const { web3Auth } = useContext(Web3Context) ?? {};
  const { address } = useAccount();

  const [idToken, setIdToken] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(address !== undefined);
  const [isWalletLogin, setIsWalletLoggedIn] = useState(false);
  const [appPubKey, setAppPubKey] = useState("");

  // backend auth
  useQuery(
    ["login", isWalletLogin, idToken],
    () => authenticateUser({ idToken, isWalletLogin, address, appPubKey }),
    {
      enabled:
        isLoggedIn &&
        idToken !== "" &&
        (address !== undefined || appPubKey !== ""),
    }
  );

  useEffect(() => {
    if (address) {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }
  }, [address]);

  useEffect(() => {
    (async () => {
      if (isLoggedIn && web3Auth) {
        const socialLoginUserInfo = await web3Auth?.getUserInfo();
        // social login here
        if (socialLoginUserInfo?.idToken) {
          setIsWalletLoggedIn(false);
          const app_scoped_privkey = await web3Auth.provider?.request({
            method: "eth_private_key",
          });
          const app_pub_key = getPublicCompressed(
            Buffer.from((app_scoped_privkey as string).padStart(64, "0"), "hex")
          ).toString("hex");
          setAppPubKey(app_pub_key);
        } else {
          setIsWalletLoggedIn(true);
        }
        setIdToken((await web3Auth.authenticateUser()).idToken);
      }
    })();
  }, [isLoggedIn, setIdToken, web3Auth]);

  async function login() {
    if (web3Auth && !isLoggedIn) {
      await web3Auth?.connect();

      await connectAsync({
        connector: new Web3AuthConnector({
          options: {
            web3AuthInstance: web3Auth!,
          },
        }),
      });
      setIsLoggedIn(true);
    }
  }

  async function logout() {
    if (web3Auth && isLoggedIn) {
      await disconnectAsync();
      setIsLoggedIn(false);
    }
  }

  return (
    <AuthContext.Provider
      value={{ idToken, setIdToken, login, logout, isLoggedIn }}
    >
      {children}
    </AuthContext.Provider>
  );
};
