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
  login: () => Promise<void>;
  logout: () => Promise<void>;
  authenticate: () => Promise<void>;
  isLoggedIn: boolean;
}

const JWT_LOCAL_STORAGE_KEY = 'radar_login_token';
const AUTH_SESSION_DURATION = 1000 * 60 * 60 * 24 * 1; // 1 day

export const AuthContext = createContext<AuthContextType>({
  idToken: '',
  setIdToken: () => {},
  login: async () => {},
  logout: async () => {},
  authenticate: async () => {},
  isLoggedIn: false,
});

export const AuthProvider = ({ children }: { children?: ReactNode }) => {
  const { connectAsync, connectors } = useConnect();
  const { disconnectAsync } = useDisconnect({});
  const { web3Auth } = useContext(Web3Context) ?? {};
  const { address, isConnected } = useAccount();

  const [idToken, setIdToken] = useState('');
  // logged in status is dependent on backend as well, hence we use idToken and not isConnected
  const isLoggedIn = idToken.length > 0 && isConnected;

  // for backend auth
  const [isWalletLogin, setIsWalletLoggedIn] = useState(false);
  const [appPubKey, setAppPubKey] = useState('');

  // create user if not exists
  useQuery(
    [CacheKey.LOGIN, isWalletLogin, idToken, address, appPubKey],
    () => authenticateUser({ idToken, isWalletLogin, address, appPubKey }),
    {
      enabled:
        isLoggedIn &&
        idToken.length > 0 &&
        (isWalletLogin ? address !== undefined : appPubKey.length > 0),
    },
  );

  console.log({ idToken, address, isLoggedIn });

  useEffect(() => {
    const storageString = localStorage.getItem(JWT_LOCAL_STORAGE_KEY);
    try {
      const { jwtToken, timestamp } = JSON.parse(storageString ?? '{}');
      if (timestamp && jwtToken) {
        const timeDiff = new Date().getTime() - timestamp;
        if (timeDiff > AUTH_SESSION_DURATION) {
          localStorage.removeItem(JWT_LOCAL_STORAGE_KEY);
          return;
        }
        setIdToken(jwtToken);
      }
    } catch (e) {
      console.log('Error retrieving jwt', e);
      localStorage.removeItem(JWT_LOCAL_STORAGE_KEY);
    }
  }, []);

  // to auto login with wallet
  useEffect(() => {
    if (connectors.length > 0 && idToken) {
      connectAsync({
        connector: connectors[0],
      });
    }
  }, [connectAsync, connectors, idToken]);

  useEffect(() => {
    (async () => {
      if (isLoggedIn && web3Auth && !idToken) {
        const socialLoginUserInfo = await web3Auth.getUserInfo();

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
        const storageString = JSON.stringify({
          jwtToken: userAuthInfo.idToken,
          timestamp: new Date().getTime(),
        });
        localStorage.setItem(JWT_LOCAL_STORAGE_KEY, storageString);
        setIdToken(userAuthInfo.idToken);
      }
    })();
  }, [idToken, isLoggedIn, setIdToken, web3Auth]);

  async function login() {
    if (!web3Auth || isLoggedIn || connectors.length === 0) {
      console.log('error logging in', { web3Auth, isLoggedIn, connectors });
      return;
    }
    await web3Auth.connect();
    await connectAsync({
      connector: connectors[0],
    });
  }

  async function authenticate() {
    if (!web3Auth) {
      console.log('no web3auth found');
      return;
    }
    const userAuthInfo = await web3Auth.authenticateUser();
    localStorage.setItem(JWT_LOCAL_STORAGE_KEY, userAuthInfo.idToken);
    setIdToken(userAuthInfo.idToken);
  }

  async function logout() {
    if (!web3Auth || !isLoggedIn) {
      console.log('error logging out', { web3Auth, isLoggedIn });
      return;
    }
    await disconnectAsync();
    localStorage.removeItem(JWT_LOCAL_STORAGE_KEY);
    setIdToken('');
  }

  return (
    <AuthContext.Provider
      value={{ idToken, setIdToken, login, logout, authenticate, isLoggedIn }}
    >
      {children}
    </AuthContext.Provider>
  );
};
