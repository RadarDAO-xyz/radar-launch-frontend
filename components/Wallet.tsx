import { Web3AuthConnector } from "@web3auth/web3auth-wagmi-connector";
import { useContext, useState } from "react";
import { useConnect, useDisconnect } from "wagmi";
import { Web3Context } from "./Web3Provider";
import { Button } from "./ui/button";

export function Wallet() {
  const { connectAsync } = useConnect();
  const { disconnectAsync } = useDisconnect({});
  const { web3Auth } = useContext(Web3Context) ?? {};

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  return (
    <Button
      onClick={async () => {
        if (isLoggedIn) {
          await disconnectAsync();
          setIsLoggedIn(false);
        } else {
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
