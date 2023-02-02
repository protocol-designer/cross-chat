import React, { useEffect } from "react";
import { useMoralis } from "react-moralis";
import { Logo } from "../assets";

const Header = () => {
  const {
    enableWeb3,
    isWeb3Enabled,
    account,
    deactivateWeb3,
    Moralis,
    isWeb3EnableLoading,
  } = useMoralis();

  useEffect(() => {
    if (isWeb3Enabled) return;

    if (
      typeof window !== "undefined" &&
      window.localStorage.getItem("connected")
    ) {
      enableWeb3();
    }
  }, []);

  useEffect(() => {
    // Moralis
    Moralis.onAccountChanged((account) => {
      console.log(`Account changed to ${account}`);
      if (account == null) {
        window.localStorage.removeItem("connected");
        deactivateWeb3();
        console.log("Null account found");
      }
    });
  }, []);

  return (
    <div className=" bg-white h-[70px] w-[100%] flex justify-between items-center px-5 shadow-sm drop-shadow-sm">
      <div className="text-[1.5rem] font-bold flex justify-center items-center gap-2 cursor-pointer">
        <span className="h-16 overflow-hidden flex justify-center items-center">
          <Logo className="w-[45px] h-[45px]" />
        </span>
        CrossChat
      </div>
      {/* <button className="btn btn-primary ">Connect</button> */}
      <div>
        {account ? (
          <div className="profileContainer flex justify-center items-center gap-2 cursor-pointer py-2 px-2 rounded-xl hover:bg-[#FAFAFA]">
            <div className="w-10 h-10 rounded-full bg-[#8AC4FF]"></div>
            <div className="font-semibold">
              {account.slice(0, 6)}...
              {account.slice(account.length - 5)}
            </div>
          </div>
        ) : (
          // <div>
          //   Is Connected to {account.slice(0, 6)}...
          //   {account.slice(account.length - 5)}
          // </div>
          <button
            className="btn btn-primary"
            onClick={async () => {
              await enableWeb3();
              if (typeof window !== "undefined") {
                window.localStorage.setItem("connected", "injected");
              }
            }}
            disabled={isWeb3EnableLoading}
          >
            Connect
          </button>
        )}
      </div>
    </div>
  );
};

export default Header;
