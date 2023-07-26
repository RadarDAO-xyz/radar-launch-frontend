import { useContext } from "react";
import { Web3Context } from "./Web3Provider";
import { Button } from "./ui/button";

export function Wallet() {
  const { onLogin, onLogout, provider } = useContext(Web3Context) ?? {};

  return (
    <Button
      onClick={() => {
        if (provider) {
          void onLogout?.();
        } else {
          void onLogin?.();
        }
      }}
    >
      {provider ? "LOG OUT" : "LOG IN"}
    </Button>
  );
}
