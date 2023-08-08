import { useAuth } from "@/hooks/useAuth";
import { Button } from "./ui/button";

export function Wallet() {
  const { login, logout, isLoggedIn } = useAuth();

  return (
    <Button
      onClick={() => {
        if (isLoggedIn) {
          logout();
        } else {
          login();
        }
      }}
      variant={"ghost"}
    >
      {isLoggedIn ? "Logout" : "Login ⚙"}
    </Button>
  );
}
