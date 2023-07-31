import { _Builtin } from "@/devlink";
import dynamic from "next/dynamic";
import Link from "next/link";
import { Button } from "./ui/button";

const WalletNoSSR = dynamic(() => import("./Wallet").then((res) => res.Wallet));

export function NavBar() {
  return (
    <header className="navbar-logo-center z-50">
      <div className="navbar-logo-center-container shadow-three">
        <div className="navbar-wrapper-three">
          <div className="logo-wrapper">
            <Link href="/">
              <img
                className="image-4"
                loading="lazy"
                width="auto"
                height="auto"
                src="https://uploads-ssl.webflow.com/64548f6f8feacfafa79c9592/645ddcb1ed7bc34887f6efc9_Asset%204%402x-8.png"
              />
            </Link>
          </div>
          <nav className="nav-menu-wrapper-three" role="navigation">
            <div className="nav-menu-three">
              <ul className="nav-menu-block">
                <li className="mobile-menu">
                  <Link className="nav-link-2" href="/pool">
                    {"FUNDING POOLS"}
                  </Link>
                </li>
                <li className="mobile-menu">
                  <Link className="nav-link-2" href="#">
                    {"HOW IT WORKS"}
                  </Link>
                </li>
                <li className="mobile-menu">
                  <_Builtin.DropdownWrapper
                    className="nav-dropdown"
                    delay={0}
                    hover={false}
                  >
                    <>
                      <_Builtin.DropdownToggle className="nav-dropdown-toggle">
                        <_Builtin.Icon
                          className="nav-dropdown-icon"
                          widget={{
                            type: "icon",
                            icon: "dropdown-toggle",
                          }}
                        />
                        <div className="text-block-5">{"INSPIRATION"}</div>
                      </_Builtin.DropdownToggle>
                      <_Builtin.DropdownList
                        className="nav-dropdown-list shadow-three mobile-shadow-hide"
                        tag="nav"
                      >
                        <_Builtin.DropdownLink
                          className="nav-dropdown-link"
                          options={{
                            href: "#",
                            target: "_blank",
                          }}
                        >
                          {"About RADAR"}
                        </_Builtin.DropdownLink>
                        <_Builtin.DropdownLink
                          className="nav-dropdown-link"
                          options={{
                            href: "#",
                          }}
                        >
                          {"Read the report"}
                        </_Builtin.DropdownLink>
                      </_Builtin.DropdownList>
                    </>
                  </_Builtin.DropdownWrapper>
                </li>
                <li className="mobile-menu">
                  <a className="nav-link-2" href="#">
                    {"FAQs"}
                  </a>
                </li>
              </ul>
              <div className="div-block-35 space-x-3">
                <div className="admin-divider">
                  <div className="submit-subtitle-mobile">{"Admin"}</div>
                  <div className="div-block-5">
                    <div className="voting">
                      <div className="small-text caps">{"0/3 votes "}</div>
                    </div>
                    <div className="countdown" id="countdown">
                      <div className="countdown-item" id="hours">
                        00
                      </div>
                      <div className="time-text">{"h"}</div>
                      <div className="countdown-item" id="minutes">
                        00
                      </div>
                      <div className="time-text">{"m"}</div>
                      <div className="countdown-item" id="seconds">
                        00
                      </div>
                      <div className="time-text end">{"s"}</div>
                    </div>
                    <Button variant={'ghost'} asChild>
                      <Link href="https://airtable.com/appGvDqIhUSP0caqo/shrMcuu3zvWEfRqGM" target="_blank">
                        Sign up for drops
                      </Link>
                    </Button>
                    {/* <WalletNoSSR /> */}
                  </div>
                </div>
                <div className="div-block-34">
                  <div className="submit-subtitle-mobile">
                    {"Submit your vision"}
                  </div>
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
            </div>
          </nav>
          <Button className="menu-button sm:hidden">
            <_Builtin.Icon
              className="icon-2"
              widget={{
                type: "icon",
                icon: "nav-menu",
              }}
            />
          </Button>
        </div>
      </div>
    </header>
  );
}
