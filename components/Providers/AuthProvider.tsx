import { CacheKey } from '@/constants/react-query';
import { authenticateUser } from '@/lib/backend';
import { getPublicCompressed } from '@toruslabs/eccrypto';
import {
  Dispatch,
  ReactNode,
  SetStateAction,
  createContext,
  useContext,
  useEffect,
  useState,
} from 'react';
import { useAccount, useConnect, useDisconnect, useQuery } from 'wagmi';
import { Web3Context } from './Web3Provider';

interface AuthContextType {
  idToken: string;
  setIdToken: Dispatch<SetStateAction<string>>;
  login: () => void;
  logout: () => void;
  isLoggedIn: boolean;
}

export const AuthContext = createContext<AuthContextType>({
  idToken: '',
  setIdToken: () => {},
  login: () => {},
  logout: () => {},
  isLoggedIn: false,
});

export const AuthProvider = ({ children }: { children?: ReactNode }) => {
  const { connectAsync } = useConnect();
  const { disconnectAsync } = useDisconnect({});
  const { web3Auth, web3AuthConnecter } = useContext(Web3Context) ?? {};
  const { address, isConnected } = useAccount();

  const [idToken, setIdToken] = useState('');
  // logged in status is dependent on backend as well, hence we use idToken and not isConnected
  const [isLoggedIn, setIsLoggedIn] = useState(
    idToken !== undefined && isConnected,
  );
  const [isWalletLogin, setIsWalletLoggedIn] = useState(false);
  const [appPubKey, setAppPubKey] = useState('');

  // backend auth
  useQuery(
    [CacheKey.LOGIN, isWalletLogin, idToken, address, appPubKey],
    () => authenticateUser({ idToken, isWalletLogin, address, appPubKey }),
    {
      enabled:
        isLoggedIn &&
        idToken.length > 0 &&
        (address !== undefined || appPubKey.length > 0),
    },
  );

  useEffect(() => {
    if (idToken.length > 0 && isConnected && web3Auth !== undefined) {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }
  }, [idToken, isConnected, web3Auth]);
  console.log({ web3Auth, idToken, address });

  useEffect(() => {
    (async () => {
      if (isLoggedIn && web3Auth && !idToken) {
        const socialLoginUserInfo = await web3Auth?.getUserInfo();

        console.log({ socialLoginUserInfo });
        // social login here
        if (socialLoginUserInfo?.idToken) {
          setIsWalletLoggedIn(false);
          const app_scoped_privkey = await web3Auth.provider?.request({
            method: 'eth_private_key',
          });
          const app_pub_key = getPublicCompressed(
            Buffer.from(
              (app_scoped_privkey as string).padStart(64, '0'),
              'hex',
            ),
          ).toString('hex');
          setAppPubKey(app_pub_key);
        } else {
          setIsWalletLoggedIn(true);
        }
        const userAuthInfo = await web3Auth.authenticateUser();
        console.log({ userAuthInfo });
        setIdToken(userAuthInfo.idToken);
      }
    })();
  }, [idToken, isLoggedIn, setIdToken, web3Auth]);

  async function login() {
    if (web3Auth && !isLoggedIn) {
      await web3Auth?.connect();

      await connectAsync({
        connector: web3AuthConnecter,
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
