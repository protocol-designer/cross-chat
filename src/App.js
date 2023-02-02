import React, { useEffect, useState } from "react";
import { useMoralis } from "react-moralis";
import { useWeb3Contract, useApiContract } from "react-moralis";
import { Loading } from "web3uikit";
import { Fuji, Logo, Polygon, Send } from "./assets";
import { Header, Sidebar } from "./components";
import { abi, contractAddresses } from "./constants";


const msgArray = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j"];

const contactData = [
  { name: "Robert", address: "address1" },
  { name: "Xavier", address: "address2" },
  { name: "Xavier", address: "address2" },
  { name: "Xavier", address: "address2" },
  { name: "Xavier", address: "address2" },
];

const colors = [
  "#8AC4FF",
  "#9AFF8A",
  "#F8FFCA",
  "#FF8585",
  "#FFBA87",
  "#C3F9E5",
  "#87B0FF",
  "#B7A5FF",
  "#F094FF",
  "#FFB4E1",
];

function App() {
  const { runContractFunction } = useWeb3Contract();
  const {
    isWeb3Enabled,
    enableWeb3,
    account,
    chainId: chainIdHex,
  } = useMoralis();
  
  const [receiptAddress, setReceiptAddress] = useState();
  const [channelReceiptAddress, setChannelReceiptAddress] = useState();
  const [msg, setMsg] = useState("");
  const [chain, setChain] = useState("Select chain");
  const chainId = parseInt(chainIdHex);
  const contractAddress =
  chainId in contractAddresses ? contractAddresses[chainId][0] : null;
  

  const [contacts, setContacts] = useState();
  const [message, setMessage] = useState();

  // console.log(
  //   "contractAddress" +
  //     contractAddress +
  //     "   chainId " +
  //     chainId +
  //     "  account : " +
  //     account +
  //     "  receiptAddress : " +
  //     receiptAddress
  // );
  // console.log(contractAddresses[80001]);

  const handleCreate = async () => {
    console.log(contractAddress, contractAddresses[80001][0]);
    const options = {
      abi: abi,
      contractAddress: contractAddress,
      functionName: "pingDestination",
      params: {
        chainId: "80001",
        destinationContractAddress: contractAddresses[80001][0],
        user0: account,
        user1: channelReceiptAddress,
        message: "#NULL#",
      },
      // msgValue: 0,
    };

    console.log(account, receiptAddress);
    const something = await runContractFunction({ params: options });
    console.log(something, account);
  };

  const addMessage = async () => {
    const options = {
      abi: abi,
      contractAddress: contractAddress,
      functionName: "pingDestination",
      params: {
        chainId: "80001",
        destinationContractAddress: contractAddresses[80001][0],
        user0: account,
        user1: receiptAddress,
        message: msg,
      },
    };
    console.log(account, receiptAddress);
    const something = await runContractFunction({ params: options });
    console.log(something, account);
    setMsg("");
  };


  const getContact = async () => {
    // console.log("getContacts", account);
    const options3 = {
      abi: abi,
      contractAddress: "0x12191A578Ca827D2cd97609Bd68C26A4EA653101",
      functionName: "getContacts",
      params: { u0: account },
    };
    let something = await runContractFunction({ params: options3 });
    setContacts(something);
    console.log(something);
  };

  const getMessages = async () => {
    // // let something = [];
    const options3 = {
      chainId: chainId,
      abi: abi,
      contractAddress: "0x12191A578Ca827D2cd97609Bd68C26A4EA653101",
      // functionName: "getContacts",
      // params: {u0: account},
      functionName: "getMessages",
      params: { u0: account, u1: receiptAddress },
    };
    let something = await runContractFunction({ params: options3 });
    console.log(something);
    setMessage(something);
  };

  const handleContactClick = (address) => {
    setReceiptAddress(address);
    getMessages();
  };

  // const { runContractFunction, data, error } = useApiContract({
  //   address: "0x12191A578Ca827D2cd97609Bd68C26A4EA653101",
  //   functionName: "getContacts",
  //   abi: abi,
  //   params: { u0: account },
  // });
  // console.log(data, error);


  if (!isWeb3Enabled) {
    return (
      <div className="App overflow-hidden h-[100vh] flex flex-col justify-center items-center">
        <Logo className="w-36 h-36" />
        <h2 className="font-semibold text-[2.5rem]">CrossChat</h2>
        <button
          className="btn btn-primary mt-5"
          onClick={async () => await enableWeb3()}
        >
          Connect Wallet
        </button>
      </div>
    );
  } else {
    return (
      <div className="App overflow-hidden h-[100vh] ">
        <Header />
        <div className="flex bg-[#F1F6FB] ">
          {/* <Sidebar /> */}
          <div className="w-96 bg-white">
            <div className="container flex flex-col items-center py-5 gap-2">
              <div className=" channel">
                <a
                  href="#my-modal-2"
                  className="btn btn-primary w-72 h-16 text-[1.3rem] capitalize mb-5"
                >
                  Create Channel
                </a>
              </div>
              {contacts
                ? contacts.map((address) => {
                    return (
                      <div
                        onClick={() => handleContactClick(address)}
                        className="contact border w-[96%] h-16 rounded-xl flex items-center gap-3 pl-3 cursor-pointer hover:bg-[#FAFAFA]"
                      >
                        <div
                          className="profile h-12 w-12 rounded-[50%]"
                          style={{
                            backgroundColor:
                              // colors[Math.floor(Math.random() * colors.length)],
                              "#B7A5FF",
                          }}
                        ></div>
                        <div className="name font-bold text-[1.1rem]">
                          {address.slice(0, 6)}...
                          {address.slice(address.length - 5)}
                        </div>
                      </div>
                    );
                  })
                : ""}
              <button onClick={() => getContact()}>Refresh</button>
            </div>
          </div>

          <div className="modal" id="my-modal-2">
            <form className="modal-box flex flex-col">
              <h2 className="font-semibold text-[1.5rem] text-center mb-3">
                Create Channel
              </h2>
              <input
                type="text"
                placeholder="Address"
                className="input input-bordered w-full my-3 "
                required
                value={channelReceiptAddress}
                onChange={(e) => setChannelReceiptAddress(e.target.value)}
              />
              <div className="dropdown mb-20 mt-2">
                <label tabIndex={0} className=" border py-2 px-2 rounded-lg">
                  {chain}
                </label>
                <ul
                  tabIndex={0}
                  className="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-52"
                >
                  <li>
                    <a onClick={() => setChain("Polygon")}>
                      <Polygon className="w-7 h-7" />
                      Polygon
                    </a>
                  </li>
                  <li>
                    <a onClick={() => setChain("Fuji")}>
                      <span className="w-7 h-7">
                        <Fuji className="w-7 h-7" />
                      </span>
                      Fuji
                    </a>
                  </li>
                  <li>
                    <a onClick={() => setChain("Goerli")}>
                      <span className="w-7 h-7 flex justify-center items-center rounded-full bg-[#C3F9E5]">
                        G
                      </span>
                      Goerli
                    </a>
                  </li>
                </ul>
              </div>
              {/* <button onClick={() => handleCreate()}>Create</button> */}

              <div className=" flex justify-center my-3">
                <a
                  href="#"
                  className="btn btn-primary w-72 h-14 text-[1.3rem] capitalize"
                  type="submit"
                  onClick={() => handleCreate()}
                >
                  Create
                </a>
              </div>
            </form>
          </div>

          <div className="msgContainer h-[100vh] w-full rounded-none flex flex-col items-center">
            <div className="msgcontent w-[75%] overflow-y-auto h-[82%]">
              {message
                ? message.map((item, index) => {
                    if (index % 2 == 0) {
                      return (
                        <div className="chat chat-start">
                          <div className="chat-bubble bg-white text-[#232A30] drop-shadow-sm">
                            {item}
                          </div>
                        </div>
                      );
                    } else {
                      // console.log(index + " odd" + item);
                      return (
                        <div className="chat chat-end">
                          <div className="chat-bubble bg-white text-[#232A30] drop-shadow-sm">
                            {item}
                          </div>
                        </div>
                      );
                    }
                  })
                : ""}
            </div>
            <div className="input absolute bottom-3 w-2/3 flex rounded-none bg-transparent gap-2">
              <input
                type="text"
                className="input w-[100%]"
                value={msg}
                onChange={(e) => setMsg(e.target.value)}
              />
              <button
                className="btn btn-circle bg-[#5C15F9] border-none hover:bg-[#4F0BE6] overflow-hidden"
                onClick={() => addMessage()}
                // onClick={() => getContact()}
              >
                <Send className="w-7 relative -top-5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
