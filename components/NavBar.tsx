import { cn } from "@/lib/utils";
import { MenuIcon } from "lucide-react";
import Link from "next/link";
import { ComponentPropsWithoutRef, ElementRef, forwardRef } from "react";
import { Button } from "./ui/button";
import { NavigationMenu, NavigationMenuContent, NavigationMenuItem, NavigationMenuLink, NavigationMenuList, NavigationMenuTrigger, navigationMenuTriggerStyle } from "./ui/navigation-menu";
import { Sheet, SheetClose, SheetContent, SheetDescription, SheetFooter, SheetHeader, SheetTitle, SheetTrigger } from "./ui/sheet";
import { Dialog } from "./ui/dialog";

// const WalletNoSSR = dynamic(() => import("./Wallet").then((res) => res.Wallet));

const ListItem = forwardRef<
  ElementRef<"a">,
  ComponentPropsWithoutRef<"a">
>(({ className, title, children, ...props }, ref) => {
  return (
    <li>
      <Link href="/docs" legacyBehavior passHref>
        <NavigationMenuLink asChild>
          <a
            ref={ref}
            className={cn(
              "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
              className
            )}
            {...props}
          >
            <div className="text-sm font-medium leading-none">{title}</div>
            <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
              {children}
            </p>
          </a>
        </NavigationMenuLink>
      </Link>
    </li>
  )
})
ListItem.displayName = "ListItem"

export function NavBar() {
  return (
    <header className="px-[5%] pt-4 z-50">
      <div className="">
        <div className="navbar-logo-center-container shadow-three items-center">
          <div className="w-40 mr-8">
            <Link href="/">
              <img
                className=" image-4"
                loading="lazy"
                width="auto"
                height="auto"
                src="https://uploads-ssl.webflow.com/64548f6f8feacfafa79c9592/645ddcb1ed7bc34887f6efc9_Asset%204%402x-8.png"
              />
            </Link>
          </div><NavigationMenu className="z-50 lg:flex hidden">
            <NavigationMenuList>
              <NavigationMenuItem>
                <Link href="/pool" legacyBehavior passHref>
                  <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                    FUNDING POOLS
                  </NavigationMenuLink>
                </Link>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <Link href="https://www.launch.radardao.xyz/" target="_blank" legacyBehavior passHref>
                  <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                    HOW IT WORKS
                  </NavigationMenuLink>
                </Link>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <NavigationMenuTrigger>INSPIRATION</NavigationMenuTrigger>
                <NavigationMenuContent>
                  <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px] ">

                    <ListItem href="https://www.radardao.xyz/" target="_blank" title="Introduction">
                      About RADAR
                    </ListItem>
                    <ListItem href="https://www.play.radardao.xyz/" target="_blank" title="Report">
                      Read the report
                    </ListItem>
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <Link href="https://www.launch.radardao.xyz/faqs" target="_blank" legacyBehavior passHref>
                  <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                    FAQ
                  </NavigationMenuLink>
                </Link>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <Link href="https://www.launch.radardao.xyz/why-launch" target="_blank" legacyBehavior passHref>
                  <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                    WHY
                  </NavigationMenuLink>
                </Link>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>
          <nav className="w-full flex justify-end" role="navigation">
            <div className="flex">
              <div className="flex space-x-3 pr-2 lg:pr-0">
                <Button variant={'ghost'} asChild>
                  <Link href="https://airtable.com/appGvDqIhUSP0caqo/shrMcuu3zvWEfRqGM" target="_blank">
                    Sign up for drops
                  </Link>
                </Button>
                {/* <WalletNoSSR /> */}
                <Button asChild>
                  <Link
                    href="https://airtable.com/appGvDqIhUSP0caqo/shrvi09PTUP5mTSHN"
                    target="_blank"
                  >
                    {"Share your project"}
                  </Link>
                </Button>
              </div>
            </div>
          </nav>
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline">
                <MenuIcon />
              </Button>
            </SheetTrigger>
            <SheetContent>
              <SheetHeader>
                <SheetTitle>RADAR</SheetTitle>
                <SheetDescription>
                </SheetDescription>
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
                  <Link href="https://www.launch.radardao.xyz/faqs" target="_blank">
                    FAQS
                  </Link>
                </Button>
                <Button asChild variant="link" className="justify-start">
                  <Link href="https://www.launch.radardao.xyz/why-launch" target="_blank">
                    WHY
                  </Link>
                </Button>
              </div>
              <SheetFooter>
                <div className="flex justify-between">
                  <Button variant={'ghost'} asChild>
                    <Link href="https://airtable.com/appGvDqIhUSP0caqo/shrMcuu3zvWEfRqGM" target="_blank">
                      Sign up for drops
                    </Link>
                  </Button>
                  {/* <WalletNoSSR /> */}
                  <Button asChild>
                    <Link
                      href="https://airtable.com/appGvDqIhUSP0caqo/shrvi09PTUP5mTSHN"
                      target="_blank"
                    >
                      {"Share your project"}
                    </Link>
                  </Button>
                </div>
              </SheetFooter>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
