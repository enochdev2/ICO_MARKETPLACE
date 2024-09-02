import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { disablePageScroll, enablePageScroll } from "scroll-lock";

import DevNoch from "../assets/Dev-Noch1.png";
import { navigation } from "../constants";
import Button from "./Button";
import MenuSvg from "../assets/svg/MenuSvg";
import { HamburgerMenu } from "./design/Header";

const Header = ({
  accountBalance,
  setAddress,
  address,
  connectWallet,
  ICO_MARKETPLACE_ADDRESS,
  shortenAddress,
  setOpenCreateICO,
  openCreateICO,
  setOpenAllICO,
  openAllICO,
  setOpenTokenCreator,
  openTokenCreator,
  setOpenTokenHistory,
  openTokenHIstory,
  setOpenICOMarketplace,
  openICOMarketplace,
}) => {
  // const pathname = usePath();
  const [isMetaMaskInstalled, setIsMetaMaskInstalled] = useState(false);
  const pathname = useLocation();
  const [openNavigation, setOpenNavigation] = useState(false);

  useEffect(() => {
    if (typeof window.ethereum !== "undefined") {
      setIsMetaMaskInstalled(true);

      window.ethereum.on("accountsChange", handleAccountsChanged);

      return () => {
        if (typeof window.ethereum !== "undefined") {
          window.ethereum.removeListener(
            "accountsChange",
            handleAccountsChanged
          );
        }
      };
    }
  }, [address]);

  const handlewallet = () => {
    console.log("wallet................");
  };

  const handleAccountsChanged = async (accounts) => {
    setAddress(accounts[0]);
  };

  const toggleNavigation = () => {
    if (openNavigation) {
      setOpenNavigation(false);
      enablePageScroll();
    } else {
      setOpenNavigation(true);
      disablePageScroll();
    }
  };

  const handleClick = () => {
    if (!openNavigation) return;

    enablePageScroll();
    setOpenNavigation(false);
  };

  return (
    <div
      className={`fixed top-0 left-0 w-full z-50  border-b border-n-6 lg:bg-n-8/90 lg:backdrop-blur-sm ${
        openNavigation ? "bg-n-8" : "bg-n-8/90 backdrop-blur-sm"
      }`}
    >
      <div className="flex items-center px-5 lg:px-7.5 xl:px-10 max-lg:py-4">
        <a
          className="flex justify-center items-center text-2xl font-bold space-x-3 w-[12rem] xl:mr-8"
          href=""
        >
          ICO <span className="text-[#ffee55]">MARKET</span>
        </a>

        <nav
          className={`${
            openNavigation ? "flex" : "hidden"
          } fixed top-[5rem] left-0 right-0 bottom-0 bg-n-8 lg:static lg:flex lg:mx-auto lg:bg-transparent`}
        >
          <div className="relative z-2 flex flex-col items-center justify-center m-auto lg:flex-row">
            <li className=" relative font-code text-2xl uppercase text-n-1 transition-colors hover:text-color-1 px-4 py-6 md:py-8 lg:-mr-0.25 lg:text-sm font-bold lg:font-semibol lg:leading-5 lg:hover:text-n-1 xl:px-6 cursor-pointer">
              <a href="/">Home </a>
            </li>
            <li className=" relative font-code text-2xl uppercase text-n-1 transition-colors hover:text-color-1 px-4 py-6 md:py-8 lg:-mr-0.25 lg:text-sm font-bold lg:font-semibol lg:leading-5 lg:hover:text-n-1 xl:px-6">
              <a
                href="#icomarket"
                // onClick={() => openICOMarketplace ? setOpenICOMarketplace(false)
                // : setOpenICOMarketplace(true)}
              >
                ICO Marketplace
              </a>
            </li>
            <li className=" relative font-code text-2xl uppercase text-n-1 transition-colors hover:text-color-1 px-4 py-6 md:py-8 lg:-mr-0.25 lg:text-sm font-bold lg:font-semibol lg:leading-5 lg:hover:text-n-1 xl:px-6 cursor-pointer">
              <a
                onClick={() =>
                  openCreateICO
                    ? setOpenCreateICO(false)
                    : setOpenCreateICO(true)
                }
              >
                Create ICO
              </a>
            </li>
            <li className=" relative font-code text-2xl uppercase text-n-1 transition-colors hover:text-color-1 px-4 py-6 md:py-8 lg:-mr-0.25 lg:text-sm font-bold lg:font-semibol lg:leading-5 lg:hover:text-n-1 xl:px-6 cursor-pointer">
              <a
                href="/#history"
                onClick={() =>
                  openTokenHIstory
                    ? setOpenTokenHistory(false)
                    : setOpenTokenHistory(true)
                }
              >
                HIstory
              </a>
            </li>
            <li className=" relative font-code text-2xl uppercase text-n-1 transition-colors hover:text-color-1 px-4 py-6 md:py-8 lg:-mr-0.25 lg:text-sm font-bold lg:font-semibol lg:leading-5 lg:hover:text-n-1 xl:px-6 cursor-pointer">
              <a
                onClick={() =>
                  openTokenCreator
                    ? setOpenTokenCreator(false)
                    : setOpenTokenCreator(true)
                }
              >
                Create Token
              </a>
            </li>
            {/* {navigation.map((item) => (
              <a
                key={item.id}
                href={item.url}
                onClick={handleClick}
                className={`block relative font-code text-2xl uppercase text-n-1 transition-colors hover:text-color-1 ${
                  item.onlyMobile ? "lg:hidden" : ""
                } px-6 py-6 md:py-8 lg:-mr-0.25 lg:text-xs lg:font-semibold ${
                  item.url === pathname.hash
                    ? "z-2 lg:text-n-1"
                    : "lg:text-n-1/50"
                } lg:leading-5 lg:hover:text-n-1 xl:px-12`}
              >
                {item.title}
              </a>
            ))} */}
          </div>

          <HamburgerMenu />
        </nav>

        {address ? (
          <li>
            <Button className="hidden lg:flex text-black bg-gradient-to-r from-[#ffee55] to-orange-500 rounded-lg ">
              name=
              {`${shortenAddress(address)} : ${accountBalance?.slice(0, 5)}`}
            </Button>
          </li>
        ) : (
          <button
            onClick={connectWallet}
            className="button relative  items-center justify-center h-11 transition-colors hover:text-color-1 hidden lg:flex text-black px-7  bg-[#ffee55] rounded-lg"
          >
            Connect Wallet
          </button>
        )}

        <Button
          className="ml-auto lg:hidden"
          px="px-3"
          onClick={toggleNavigation}
        >
          <MenuSvg openNavigation={openNavigation} />
        </Button>
      </div>
    </div>
  );
};

export default Header;
