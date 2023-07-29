import { Web3AuthConnector } from "@web3auth/web3auth-wagmi-connector";
import { useContext, useState } from "react";
import { useAccount, useConnect, useDisconnect, useQuery } from "wagmi";
import { Web3Context } from "./Web3Provider";
import { Button } from "./ui/button";
import { getPublicCompressed } from "@toruslabs/eccrypto";

function authenticateUser({
  idToken,
  isWalletLogin,
  address,
  appPubKey,
}: {
  idToken: string;
  isWalletLogin: boolean;
  address?: string;
  appPubKey?: string;
}) {
  console.log("fetching", { idToken, isWalletLogin, address, appPubKey });
  return fetch(`${process.env.BACKEND_URL}/verify`, {
    method: "POST",
    headers: {
      "X-Auth-Method": isWalletLogin ? "Wallet" : "Social",
      "Content-Type": "application/json",
      Authorization: `Bearer ${idToken}`,
    },
    body: isWalletLogin
      ? JSON.stringify({
          public_address: address,
        })
      : JSON.stringify({
          appPubKey,
        }),
  });
}

export function Wallet() {
  const { connectAsync } = useConnect();
  const { disconnectAsync } = useDisconnect({});
  const { web3Auth } = useContext(Web3Context) ?? {};
  const { address } = useAccount();

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isWalletLogin, setIsWalletLoggedIn] = useState(false);
  const [idToken, setIdToken] = useState("");
  const [appPubKey, setAppPubKey] = useState("");

  const { data, error } = useQuery(
    ["login", isWalletLogin, idToken],
    () => authenticateUser({ idToken, isWalletLogin, address, appPubKey }),
    {
      enabled:
        isLoggedIn &&
        idToken !== "" &&
        (address !== undefined || appPubKey !== ""),
    }
  );

  return (
    <Button
      onClick={async () => {
        if (web3Auth) {
          if (isLoggedIn) {
            await disconnectAsync();
            setIsLoggedIn(false);
          } else {
            await web3Auth?.connect();
            const socialLoginUserInfo = await web3Auth.getUserInfo();
            // social login here
            if (socialLoginUserInfo?.idToken) {
              setIsWalletLoggedIn(false);
              const app_scoped_privkey = await web3Auth.provider?.request({
                method: "eth_private_key",
              });
              const app_pub_key = getPublicCompressed(
                Buffer.from(
                  (app_scoped_privkey as string).padStart(64, "0"),
                  "hex"
                )
              ).toString("hex");
              setAppPubKey(app_pub_key);
            } else {
              setIsWalletLoggedIn(true);
            }
            setIdToken((await web3Auth.authenticateUser()).idToken);
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
      }}
      variant={"ghost"}
    >
      {isLoggedIn ? "Logout" : "Login ⚙"}
    </Button>
  );
}
