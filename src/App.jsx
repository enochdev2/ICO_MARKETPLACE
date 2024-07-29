import  { useContext, useEffect, useState } from "react";
import toast from "react-hot-toast";

//INTERNAL IMPORT 
// import BuyToken from "../Components/BuyToken";
import Card from "./components/Card";
// import CreateICO from "../Components/CreateICO";
// import Footer from "../Components/Footer";
import Header from "./components/Header";
// import ICOMarket from "../Components/ICOMarket";
// import Marketplace from "../Components/Marketplace";
// import Pricing from "../Components/Pricing";
// import TokenCreator from "../Components/TokenCreator";
// import TokenHistory from "../Components/TokenHistory";
// import TokenTransfer from "../Components/TokenTransfer";
// import WidthdrawToken from "../Components/WidthdrawToken";
import { ICOContent } from "./Context/index";
import Collaboration from "./components/Collaboration copy";
import Footer from "./components/Footer";
import TokenHistory from "./components/TokenHistory";
import Pricing from "./components/Pricing copy";
import ICOMarket from "./components/ICOMarket";
import TokenCreator from "./components/TokenCreator";
import BuyToken from "./components/BuyToken";
import TokenTransfer from "./components/TokenTransfer";
import CreateICO from "./components/CreateICO";
import WidthdrawToken from "./components/WidthdrawToken";
import Marketplace from "./components/Marketplace copy";

const App = () => {
  const contexts = useContext(ICOContent)
const {
  withdrawToken, 
  creeateERC20,
  transferTokens,
  buyToken,
  createICOSALE,
  GET_ALL_USER_ICOSALE_TOKEN,
  GET_ALL_ICOSALE_TOKEN,
  createERC20,
  connectWallet,
  PINATA_API_KEY,
  PINATA_SECRET_KEY,
  ICO_MARKETPLACE_ADDRESS,
  openBuyToken,
  setOpenBuyToken,
  openWithdrawToken,
  setOpenWithdrawToken,
  openTransferToken,
  setOpenTransferToken,
  openTokenCreator,
  setOpenTokenCreator,
  openCreateICO,
  setOpenCreateICO,
  address,
  setAddress,
  accountBalance,
  Loader,
  setLoader,
  currency,
  shortenAddress,
  reCall,
} = contexts;

  const notifySuccess = (msg) => toast.success(msg, {duration: 3000 });
    const notifyError = (msg) => toast.error(msg, {duration: 3000 });

  const [allICOs, setAllICOs] = useState([]);
  const [allUserIcos, setAllUserIcos] = useState([]);

    //COMPONENT OPEN
const [openAllICO, setOpenAllICO] = useState(false);
const [openTokenHistory, setOpenTokenHistory] = useState(false);
const [openICOMarketplace, setOpenICOMarketplace] = useState(false);
const [buyIco, setBuyIco] = useState()

 const copyAddress = () => {
  navigator.clipboard.writeText(ICO_MARKETPLACE_ADDRESS);
  notifySuccess("Address copied successfully");
 };

 useEffect(() => {
   if(address) {
    GET_ALL_ICOSALE_TOKEN().then((token)=> {
      console.log("USER", token);
      setAllICOs(token);
    });
    GET_ALL_USER_ICOSALE_TOKEN().then((token)=> {
      console.log("ALL_USER", token);
      setAllUserIcos(token);
    });
   }
 }, [address, reCall])
 
 

  return(
    <div className=" bg-[#0E0C15] overflow-x-hidden">
     {/* HEADER */}
    <Header 
       accountBalance={accountBalance}
     setAddress={
        setAddress}
       address={address}
       connectWallet={connectWallet}
       ICO_MARKETPLACE_ADDRESS={ICO_MARKETPLACE_ADDRESS}
       shortenAddress={shortenAddress}
       setOpenAllICO={setOpenAllICO}
       openAllICO={openAllICO}
       setOpenCreateICO={setOpenCreateICO}
       openCreateICO={openCreateICO}
       setOpenTokenCreator={setOpenTokenCreator}
       openTokenCreator={openTokenCreator}
       setOpenTokenHistory={setOpenTokenHistory}
       openTokenHistory={openTokenHistory}
       setOpenICOMarketplace={setOpenICOMarketplace}
       openICOMarketplace={openICOMarketplace}
       />

    <div className="pt-[4.75rem] lg:pt-[5.25rem] overflow-hidden">
      <Collaboration />
    </div>
      
    <div id="icomarket" className="create">
       <h1 style={{ 
        fontSize: "2rem"
        }}> All ICOs Marketplace</h1> 
        { 
          allICOs?.length != 0 && (
          <Marketplace 
            array={allICOs}
            shortenAddress={shortenAddress}
            setBuyIco={setBuyIco}
            setOpenBuyToken={setOpenBuyToken}
            currency={currency}
            />

          )
        } 

        <Card setOpenAllICO={setOpenAllICO}
          setOpenTokenCreator={setOpenTokenCreator} 
          setOpenTransferToken={setOpenTransferToken}
          setOpenTokenHistory={setOpenTokenHistory}
          setOpenWithdrawToken={setOpenWithdrawToken}
          setOpenICOMarketplace={setOpenICOMarketplace}
          copyAddress={copyAddress}
          setOpenCreateICO={setOpenCreateICO}
        />
    </div>

    <div className="pt-[4.75rem] lg:pt-[5.25rem] overflow-hidden" id="history">
      <TokenHistory 
      shortenAddress={shortenAddress}
      setOpenTokenHistory={setOpenTokenHistory}
      />
    <Pricing />
    </div>

    


    {openAllICO && 
      <ICOMarket 
        array={allICOs} 
        shortenAddress={shortenAddress} 
        handleClick={setOpenAllICO} 
        currency={currency}
      />
    }

    {openTokenCreator  && 
      <TokenCreator 
      createERC20={createERC20}
      shortenAddress={shortenAddress}
      setOpenTokenCreator={setOpenTokenCreator}
      setLoader={setLoader}
      address={address}
      connectWallet={connectWallet}
      PINATA_API_KEY={PINATA_API_KEY}
      PINATA_SECRET_KEY={PINATA_SECRET_KEY}
      />
    }

    


    {openCreateICO && <CreateICO 
      shortenAddress={shortenAddress}
      setOpenCreateICO={setOpenCreateICO}
      connectWallet={connectWallet}
      address={address}
      createICOSale={createICOSALE}
      />
    }

    {openICOMarketplace  && 
      <ICOMarket   
        array={allUserIcos} 
        shortenAddress={shortenAddress} 
        handleClick={setOpenICOMarketplace} 
          currency={currency}
      />
    }

    {openBuyToken && 
      <BuyToken 
        address={address}
      buyToken={buyToken}
      connectWallet={connectWallet}
      setOpenBuyToken={setOpenBuyToken}
      buyIco={buyIco }
      currency={currency}
      />
    }

    {openTransferToken && 
      <TokenTransfer 
      address={address}
      transferTokens={transferTokens}
      connectWallet={connectWallet}
      setOpenTransferToken={setOpenTransferToken}
      />
    }

    {
    // openWithdrawToken && 
    <WidthdrawToken 
      address={address}
      WithdrawToken={withdrawToken}
      connectWallet={connectWallet}
      setOpenWithdrawToken={setOpenWithdrawToken}
    />
    }

    <Footer /> 
     { Loader && <Loader />} 
    </div>
  )
};

export default App;
