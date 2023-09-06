import { MenuIcon } from 'lucide-react';
import dynamic from 'next/dynamic';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { NavBarListItem } from './NavBarListItem';
import { Button } from '../ui/button';
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from '../ui/navigation-menu';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '../ui/sheet';
import { Banner } from './Banner';
import Image from 'next/image';
import { A_MORE_PLAYFUL_FUTURE_POOL_ID } from '@/constants/database';

const WalletNoSSR = dynamic(
  () => import('./Wallet').then((res) => res.Wallet),
  { ssr: false },
);

export function NavBar() {
  const router = useRouter();

  return (
    <header className="sticky top-0 z-50 border-b bg-white pt-4">
      <div className="px-[5%] pb-3">
        <div className="navbar-logo-center-container shadow-three items-center">
          <div className="w-full max-w-[100px]">
            <Link href="/">
              <Image
                className="image-4"
                width={100}
                height={25}
                src="/logo.png"
                alt="RADAR Logo"
              />
            </Link>
          </div>
          <NavigationMenu className="z-50 hidden lg:flex">
            <NavigationMenuList className="space-x-0">
              <NavigationMenuItem>
                <Link
                  href={`/pool/${A_MORE_PLAYFUL_FUTURE_POOL_ID}`}
                  legacyBehavior
                  passHref
                >
                  <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                    ALL
                  </NavigationMenuLink>
                </Link>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <Link href="/pool" legacyBehavior passHref>
                  <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                    PRIZE POOLS
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
                  <ul className="ml-0 grid w-[400px] list-none gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
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
          <nav className="flex w-full justify-end" role="navigation">
            <div className="flex">
              <div className="hidden space-x-3 sm:flex lg:pr-0">
                <WalletNoSSR />
                <Button asChild>
                  <Link href="/project/create">SUBMIT</Link>
                </Button>
              </div>
            </div>
          </nav>
          <Sheet>
            <SheetTrigger asChild className="ml-2 block lg:hidden">
              <Button variant="outline">
                <MenuIcon />
              </Button>
            </SheetTrigger>
            <SheetContent>
              <SheetHeader>
                <SheetTitle>RADAR</SheetTitle>
                <SheetDescription></SheetDescription>
              </SheetHeader>
              <div className="flex flex-col py-4">
                <Button asChild variant="link" className="justify-start">
                  <Link href={`/pool/${A_MORE_PLAYFUL_FUTURE_POOL_ID}`}>
                    ALL
                  </Link>
                </Button>
                <Button asChild variant="link" className="justify-start">
                  <Link className="" href="/pool">
                    PRIZE POOLS
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
                <div className="flex w-full flex-col justify-between space-y-2">
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
      {router.pathname === '/' && <Banner />}
    </header>
  );
}
