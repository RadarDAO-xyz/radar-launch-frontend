import { MenuIcon } from "lucide-react";
import dynamic from "next/dynamic";
import Link from "next/link";
import { useRouter } from "next/router";
import { NavBarListItem } from "./NavBarListItem";
import { Button } from "./ui/button";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "./ui/navigation-menu";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "./ui/sheet";
import { Banner } from "./Layout/Banner";

const WalletNoSSR = dynamic(() => import("./Wallet").then((res) => res.Wallet));

export function NavBar() {
  const router = useRouter();

  return (
    <header className="pt-4 z-50 sticky top-0 bg-white border-b">
      <div className="px-[5%] pb-3">
        <div className="navbar-logo-center-container shadow-three items-center">
          <div className="w-40 mr-8">
            <Link href="/">
              <img
                className="image-4"
                loading="lazy"
                width="auto"
                height="auto"
                src="/logo.png"
              />
            </Link>
          </div>
          <NavigationMenu className="z-50 lg:flex hidden">
            <NavigationMenuList className="space-x-0">
              <NavigationMenuItem>
                <Link href="/pool" legacyBehavior passHref>
                  <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                    FUNDING POOLS
                  </NavigationMenuLink>
                </Link>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <Link
                  href="https://www.launch.radardao.xyz/"
                  target="_blank"
                  legacyBehavior
                  passHref
                >
                  <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                    HOW IT WORKS
                  </NavigationMenuLink>
                </Link>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <NavigationMenuTrigger>INSPIRATION</NavigationMenuTrigger>
                <NavigationMenuContent>
                  <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px] ">
                    <NavBarListItem
                      href="https://www.radardao.xyz/"
                      target="_blank"
                      title="Introduction"
                    >
                      About RADAR
                    </NavBarListItem>
                    <NavBarListItem
                      href="https://www.play.radardao.xyz/"
                      target="_blank"
                      title="Report"
                    >
                      Read the report
                    </NavBarListItem>
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <Link
                  href="https://www.launch.radardao.xyz/faqs"
                  target="_blank"
                  legacyBehavior
                  passHref
                >
                  <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                    FAQ
                  </NavigationMenuLink>
                </Link>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <Link
                  href="https://www.launch.radardao.xyz/why-launch"
                  target="_blank"
                  legacyBehavior
                  passHref
                >
                  <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                    WHY
                  </NavigationMenuLink>
                </Link>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>
          <nav className="w-full flex justify-end" role="navigation">
            <div className="flex">
              <div className="space-x-3 lg:pr-0 hidden sm:flex">
                <WalletNoSSR />
                <Button asChild>
                  <Link href="/project/create">SUBMIT</Link>
                </Button>
              </div>
            </div>
          </nav>
          <Sheet>
            <SheetTrigger asChild className="block lg:hidden ml-2">
              <Button variant="outline">
                <MenuIcon />
              </Button>
            </SheetTrigger>
            <SheetContent>
              <SheetHeader>
                <SheetTitle>RADAR</SheetTitle>
                <SheetDescription></SheetDescription>
              </SheetHeader>
              <div className="py-4 flex flex-col">
                <Button asChild variant="link" className="justify-start">
                  <Link className="" href="/pool">
                    FUNDING POOLS
                  </Link>
                </Button>
                <Button asChild variant="link" className="justify-start">
                  <Link href="https://www.launch.radardao.xyz/" target="_blank">
                    HOW IT WORKS
                  </Link>
                </Button>
                <Button asChild variant="link" className="justify-start">
                  <Link href="https://www.radardao.xyz/" target="_blank">
                    ABOUT RADAR
                  </Link>
                </Button>
                <Button asChild variant="link" className="justify-start">
                  <Link href="https://www.play.radardao.xyz/" target="_blank">
                    READ THE REPORT
                  </Link>
                </Button>
                <Button asChild variant="link" className="justify-start">
                  <Link
                    href="https://www.launch.radardao.xyz/faqs"
                    target="_blank"
                  >
                    FAQS
                  </Link>
                </Button>
                <Button asChild variant="link" className="justify-start">
                  <Link
                    href="https://www.launch.radardao.xyz/why-launch"
                    target="_blank"
                  >
                    WHY
                  </Link>
                </Button>
              </div>
              <SheetFooter>
                <div className="flex justify-between flex-col space-y-2 w-full">
                  <WalletNoSSR />
                  <Button asChild>
                    <Link href="/project/create">SUBMIT</Link>
                  </Button>
                </div>
              </SheetFooter>
            </SheetContent>
          </Sheet>
        </div>
      </div>
      {router.pathname === "/" && <Banner />}
    </header>
  );
}
