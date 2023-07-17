import {
    AuthKitSignInData,
    Web3AuthEventListener,
    Web3AuthModalPack
} from '@safe-global/auth-kit';
import {
    ADAPTER_EVENTS,
    CHAIN_NAMESPACES,
    SafeEventEmitterProvider,
    UserInfo,
    WALLET_ADAPTERS
} from '@web3auth/base';
import { Web3AuthOptions } from '@web3auth/modal';
import { OpenloginAdapter } from '@web3auth/openlogin-adapter';
import { useEffect, useState } from 'react';

const connectedHandler: Web3AuthEventListener = (data) =>
    console.log('CONNECTED', data);
const disconnectedHandler: Web3AuthEventListener = (data) =>
    console.log('DISCONNECTED', data);

function Wallet() {
    const [web3AuthModalPack, setWeb3AuthModalPack] =
        useState<Web3AuthModalPack>();
    const [safeAuthSignInResponse, setSafeAuthSignInResponse] =
        useState<AuthKitSignInData | null>(null);
    const [userInfo, setUserInfo] = useState<Partial<UserInfo>>();
    const [provider, setProvider] = useState<SafeEventEmitterProvider | null>(
        null
    );

    console.log({ safeAuthSignInResponse, userInfo });

    useEffect(() => {
        void (async () => {
            const options: Web3AuthOptions = {
                clientId: process.env.VITE_WEB3AUTH_CLIENT_ID || '',
                web3AuthNetwork: 'testnet',
                chainConfig: {
                    chainNamespace: CHAIN_NAMESPACES.EIP155,
                    chainId: '0x1',
                    rpcTarget: `https://mainnet.infura.io/v3/${process.env.VITE_IPNFURA_KEY}`
                },
                uiConfig: {
                    theme: 'dark',
                    loginMethodsOrder: ['google', 'facebook']
                }
            };

            const modalConfig = {
                [WALLET_ADAPTERS.TORUS_EVM]: {
                    label: 'torus',
                    showOnModal: false
                },
                [WALLET_ADAPTERS.METAMASK]: {
                    label: 'metamask',
                    showOnDesktop: true,
                    showOnMobile: false
                }
            };

            const openloginAdapter = new OpenloginAdapter({
                loginSettings: {
                    mfaLevel: 'mandatory'
                },
                adapterSettings: {
                    uxMode: 'popup',
                    whiteLabel: {
                        name: 'Safe'
                    }
                }
            });

            const web3AuthModalPack = new Web3AuthModalPack({
                txServiceUrl: 'https://safe-transaction-goerli.safe.global'
            });

            await web3AuthModalPack.init({
                options,
                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                // @ts-ignore
                adapters: [openloginAdapter],
                modalConfig
            });

            web3AuthModalPack.subscribe(
                ADAPTER_EVENTS.CONNECTED,
                connectedHandler
            );

            web3AuthModalPack.subscribe(
                ADAPTER_EVENTS.DISCONNECTED,
                disconnectedHandler
            );

            setWeb3AuthModalPack(web3AuthModalPack);

            return () => {
                web3AuthModalPack.unsubscribe(
                    ADAPTER_EVENTS.CONNECTED,
                    connectedHandler
                );
                web3AuthModalPack.unsubscribe(
                    ADAPTER_EVENTS.DISCONNECTED,
                    disconnectedHandler
                );
            };
        })();
    }, []);

    useEffect(() => {
        if (web3AuthModalPack && web3AuthModalPack.getProvider()) {
            void onLogin();
        }
    }, [web3AuthModalPack]);

    const onLogin = async () => {
        if (!web3AuthModalPack) return;

        const signInInfo = await web3AuthModalPack.signIn();
        console.log('SIGN IN RESPONSE: ', signInInfo);

        const userInfo = await web3AuthModalPack.getUserInfo();
        console.log('USER INFO: ', userInfo);

        setSafeAuthSignInResponse(signInInfo);
        setUserInfo(userInfo || undefined);
        setProvider(
            web3AuthModalPack.getProvider() as SafeEventEmitterProvider
        );
    };

    const onLogout = async () => {
        if (!web3AuthModalPack) return;

        await web3AuthModalPack.signOut();

        setProvider(null);
        setSafeAuthSignInResponse(null);
    };

    if (provider) {
        return (
            <button
                id="walletButton"
                onClick={() => {
                    void onLogout();
                }}
            >
                Log Out
            </button>
        );
    }

    return (
        <button
            id="walletButton"
            onClick={() => {
                void onLogin();
            }}
        >
            Login
        </button>
    );
}

export default Wallet;
