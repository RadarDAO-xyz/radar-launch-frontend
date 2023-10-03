import { CacheKey } from '@/constants/react-query';
import { authenticateUser } from '@/lib/backend';
import { usePrivy } from '@privy-io/react-auth';
import { usePrivyWagmi } from '@privy-io/wagmi-connector';
import { ReactNode, createContext, useEffect, useState } from 'react';
import { useAccount, useDisconnect, useQuery } from 'wagmi';

interface AuthContextType {
  idToken: string;
  login: () => Promise<void>;
  logout: () => Promise<void>;
  isLoading: boolean;
  isLoggedIn: boolean;
  isVerified: boolean;
}

interface Props {
  children?: ReactNode;
}

const JWT_LOCAL_STORAGE_KEY = 'privy_token';

export const AuthContext = createContext<AuthContextType>({
  idToken: '',
  login: async () => {},
  logout: async () => {},
  isLoading: false,
  isLoggedIn: false,
  isVerified: false,
});

export const AuthProvider = ({ children }: Props) => {
  const {
    getAccessToken,
    authenticated,
    ready,
    login: privyLogin,
    logout: privyLogout,
    connectWallet,
  } = usePrivy();
  const { wallet } = usePrivyWagmi();
  const { isConnected } = useAccount();
  const { disconnect } = useDisconnect();

  const [idToken, setIdToken] = useState('');

  // for backend auth
  const [isVerified, setIsVerified] = useState(false);

  // logged in status refers to whether the wallet is connected,
  // and not whether the backend verification was successful
  const isLoggedIn = idToken.length > 0 && authenticated;

  // create user if not exists
  const { isLoading } = useQuery(
    [CacheKey.LOGIN, idToken],
    async () => {
      try {
        await authenticateUser({ idToken });
        setIsVerified(true);
        return true;
      } catch (e) {
        console.error(e);
        setIsVerified(false);
      }
      return false;
    },
    {
      enabled:
        !isVerified &&
        idToken.length > 0 &&
        wallet?.address !== undefined &&
        authenticated,
    },
  );

  // retrieve jwt from storage on page load
  useEffect(() => {
    if (idToken === '') {
      const jwtToken = localStorage.getItem(JWT_LOCAL_STORAGE_KEY);
      if (jwtToken !== null) {
        console.log('setting id token from storage');
        setIdToken(jwtToken);
      }
    }
  }, []);

  // update auth token if authenticated
  useEffect(() => {
    if (authenticated && idToken === '') {
      getAccessToken().then((token) => {
        if (token !== null) {
          console.log('setting id token authenticated');
          setIdToken(token);
        }
      });
    }
  }, [authenticated, getAccessToken, idToken]);

  useEffect(() => {
    if (!isConnected && wallet !== undefined) {
    }
  }, [connectWallet, isConnected, wallet]);

  async function login() {
    privyLogin();
  }

  async function logout() {
    await privyLogout();
    wallet?.disconnect();
    disconnect();
    setIdToken('');
    setIsVerified(false);
  }

  return (
    <AuthContext.Provider
      value={{
        idToken,
        login,
        logout,
        isLoading: !ready || isLoading,
        isLoggedIn,
        isVerified,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
