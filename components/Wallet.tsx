import { Web3AuthConnector } from "@web3auth/web3auth-wagmi-connector";
import { useContext, useState } from "react";
import { useConnect, useDisconnect, useQuery } from "wagmi";
import { Web3Context } from "./Web3Provider";
import { Button } from "./ui/button";

function authenticateUser({
  idToken,
  isWalletLogin,
}: {
  idToken: string;
  isWalletLogin: boolean;
}) {
  return fetch(`${process.env.BACKEND_URL}/verify`, {
    method: "POST",
    headers: {
      "X-Auth-Method": isWalletLogin ? "Wallet" : "Social",
      "Content-Type": "application/json",
      Authorization: `Bearer ${idToken}`,
      "Access-Control-Allow-Origin": "no-cors",
    },
  });
}

export function Wallet() {
  const { connectAsync } = useConnect();
  const { disconnectAsync } = useDisconnect({});
  const { data, error, refetch } = useQuery(
    ["login"],
    () => authenticateUser({ idToken: "", isWalletLogin: true }),
    {
      enabled: false,
    }
  );
  const { web3Auth } = useContext(Web3Context) ?? {};
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  console.log(data, error);

  return (
    <Button
      onClick={async () => {
        if (isLoggedIn) {
          await disconnectAsync();
          setIsLoggedIn(false);
        } else {
          await refetch();
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
      }}
      variant={"ghost"}
    >
      {isLoggedIn ? "Logout" : "Login ⚙"}
    </Button>
  );
}
