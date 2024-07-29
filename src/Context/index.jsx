import React,  {useState, useContext, createContext, useEffect} from "react";
import { ethers } from "ethers";
import Web3Modal from "web3modal";
import toast from "react-hot-toast";


//INTERNAL IMPORT
import {
    // ERC20Generator,
    ERC20Generator_BYTECODE,
    // handleNetworkSwitch,
    shortenAddress,
    ICO_MARKETPLACE_ADDRESS,
    ICO_MARKETPLACE_CONTRACT,
    TOKEN_CONTRACT,
    PINATA_API_KEY,
    PINATA_SECRET_KEY,
    ERC20Generator_ABI,
    ICO_MARKETPLACE_ABI,
    fetchContract,
} from "./constants"

 export const ICOContent = createContext()

export const Index = ({children}) => {
    //STATE VARIABLES
    const [address, setAddress] = useState("");
    const [accountBalance, setAccountBalance] = useState(null);
    const [loader, setLoader] = useState(false);
    const [reCall, setReCall] = useState(0);
    const [currency, setCurrency] = useState("MATIC");

    //COMPONENT
    const [openBuyToken, setOpenBuyToken] = useState(false);
    const [openWithdrawToken, setOpenWithdrawToken] = useState(false);
    const [openTransferToken, setOpenTransferToken] = useState(false);
    const [openTokenCreator, setOpenTokenCreator] = useState(false);
    const [openCreateICO, setOpenCreateICO] = useState(false);

    const notifySuccess = (msg) => toast.success(msg, {duration: 2000 });
    const notifyError = (msg) => toast.error(msg, {duration: 2000 });


          //FUNCTION
      const checkIfWalletConnected = async () => {
        try{
            if(!window.ethereum) return notifyError("No account found");
            // await handleNetworkSwitch();
            const accounts = await window.ethereum.request({ method: 'eth_accounts' });

            if(accounts.length) {
                setAddress(accounts[0]);

                const provider = new ethers.providers.Web3Provider(window.ethereum);

                const getbalance = await provider.getBalance(accounts[0]);
                const bal = ethers.utils.formatEther(getbalance);
                setAccountBalance(bal);
                return accounts[0];
            }else {
                notifyError("No account found");
            }
        } catch (error) {
            console.log(error);
            // notifyError("Please install Metamask");
        }
      }

      useEffect(() => {
         checkIfWalletConnected();
        //  ICO_MARKETPLACE_CONTRACT();
        //  TOKEN_CONTRACT("0xe87f0EdD220680d5A56fe3d374c81EBe1e0AB9A2");
      }, [address])
    //   https://rpc.ankr.com/polygon_amoy/938dc60fa369e5b3b4001273899e6da7096c2d1fa98269d57cfb77ff04b21f18

    const connectWallet = async () => {
        if(!window.ethereum) return notifyError("No account available")
        try {
    
    const accounts = await window.ethereum.request({
        method: 'eth_requestAccounts' });
        
        if(accounts.length) {
            setAddress(accounts[0]);
            
            const provider = new ethers.providers.Web3Provider(window.ethereum);
            
            console.log("here");
                const getbalance = await provider.getBalance(accounts[0]);
                const bal = ethers.utils.formatEther(getbalance);
                setAccountBalance(bal);
                return accounts[0];
            }else {
                notifyError("No account found");
            }
        } catch (error) {
            console.log(error);
            setLoader(false);
            notifyError("Error connecting wallet");
        }
      }

            //MAIN FUNCTION
        const _deployContract = async (
            signer,
            account,
            name, 
            symbol,
            supply,
            imageURL
        ) =>{
            try {
                const factory = new ethers.ContractFactory(
                    ERC20Generator_ABI,
                    ERC20Generator_BYTECODE,
                    signer
                );

                const totalSupply = Number(supply);
                const _initialSupply = ethers.utils.parseEther(totalSupply.toString(),
            "ether"
        );

         let contract = await factory.deploy(_initialSupply, name, symbol);

         const transaction = await contract.deployed();

         if(contract.address) {
            const today = Date.now();
            let date = new Date(today);
            const _tokenCreatedDate = date.toLocaleDateString("en-us");

            const _token = {
                account: account, 
                supply: supply.toString(),
                name: name,
                symbol: symbol,
                tokenAddress: contract.address,
                transactionHash : contract.deployTransaction.hash,
                createdAt: _tokenCreatedDate,
                logo: imageURL,
            };

            let tokenHistory = [];

            const history = localStorage.getItem("TOKEN_HISTORY");
            if(history){
                tokenHistory = JSON.parse(localStorage.getItem("TOKEN_HISTORY"));
                tokenHistory.push(_token);
                localStorage.setItem("TOKEN_HISTORY", JSON.stringify(tokenHistory));
                setLoader(false);
                setReCall(reCall + 1);
                setOpenTokenCreator(false);
            }else{
                tokenHistory.push(_token);
                localStorage.setItem("TOKEN_HISTORY", JSON.stringify(tokenHistory));
                setLoader(false);
                setOpenTokenCreator(false);
                setReCall(reCall + 1);
            }
         }
            } catch (error) {
                setLoader(false);
                notifyError("something went wrong, try later")
                console.log(error);
            }
        };

        const createERC20 =  async (token, account, imageURL) => {
            const { name, symbol, supply} = token;
            try {
                setLoader(true);
                notifySuccess("Creating token...");
                if(!name || !symbol || !supply) {
                    notifyError("Data Missing");
                }else{
                    const web3modal = new Web3Modal();
                    const connection = await web3modal.connect();
                    const provider = new ethers.providers.Web3Provider(connection);
                    const signer = provider.getSigner();

                    _deployContract(signer, account, name, symbol, supply, imageURL);
                }
            } catch (error) {
                setLoader(false);
                notifyError("Something went wrong, please try again");
                console.log(error);
            }
        }

        const GET_ALL_ICOSALE_TOKEN = async  () => {
            try {
                setLoader(true);
                const address = await connectWallet();
                
                const contract = await ICO_MARKETPLACE_CONTRACT();
                
                if (address) {
                const allICOSaleToken = await contract.getAllTokens();
                    const _tokenArray = await Promise.all(
                        allICOSaleToken.map(async (token) => {
                             const tokenContract = await TOKEN_CONTRACT(token?.token);

                             const balance = await tokenContract.balanceOf(ICO_MARKETPLACE_ADDRESS);

                             return {
                                creator: token.creator,
                                token: token.token,
                                name: token.name,
                                symbol: token.symbol,
                                supported: token.supported,
                                price: ethers.utils.formatEther(token?.price.toString()),
                                icoSaleBal: ethers.utils.formatEther(balance.toString()),
                             };
                        })
                    );
                    console.log("🚀 ~ constGET_ALL_ICOSALE_TOKEN= ~ _tokenArray:", _tokenArray)

                    setLoader(false);
                    return _tokenArray;
                }
            } catch (error) {
                notifyError("Something went wrong");
                console.log(error);
            }
        }

        const GET_ALL_USER_ICOSALE_TOKEN = async () => {
            try {
                const address = await connectWallet();
                const contract = await ICO_MARKETPLACE_CONTRACT();

                if(address) {
                    const allICOSaleToken = await contract.getTokenCreatedBy(address);

                    const _tokenArray = Promise.all(
                        allICOSaleToken.map(async (token) => {
                            const tokenContract = await TOKEN_CONTRACT(token?.token);

                            const balance = await tokenContract.balanceOf(
                                ICO_MARKETPLACE_ADDRESS
                            );

                            return {
                                creator: token.creator,
                                token: token.token,
                                name: token.name,
                                symbol: token.symbol,
                                supported: token.supported,

                                price: ethers.utils.formatEther(token?.price.toString()),
                                icoSaleBal: ethers.utils.formatEther(balance.toString()),
                            };
                        })
                    );

                    setLoader(false);
                    return _tokenArray;
                }
            } catch (error) {
                notifyError("Something went wrong");
                console.log(error);
            }
        };

        const createICOSALE = async (icoSale) => {
            try {
                const {address, price} = icoSale;
                const prices = Number(price)
                console.log(address, prices);
                if(!address | !prices) return notifyError("Data is Missing");

                setLoader(true);
                notifySuccess("Creating icoSale...");
                await connectWallet();
       
                const provider = new ethers.providers.Web3Provider(window.ethereum);
                const signer = provider.getSigner();
                console.log("🚀 ~ createICOSALE ~ signer:", signer.getAddress())



            // Create a contract instance for the token
            const tokenContract = new ethers.Contract(address, ERC20Generator_ABI, signer);

            // Get the amount of tokens to approve (use a large number if unsure)
            const creatorBalance = await tokenContract.balanceOf(signer.getAddress());
            
            // Approve the contract to spend tokens on behalf of the user
            const approvalAmount = ethers.constants.MaxUint256; // Approve the maximum amount
            const approveTx = await tokenContract.approve(ICO_MARKETPLACE_ADDRESS, approvalAmount);
            console.log("🚀 ~ createICOSALE ~ approveTx:", approveTx)

            // Wait for the approval transaction to be mined
            await approveTx.wait();

            console.log("Token approval successful!");
        
                
                const contract = fetchContract(
                    ICO_MARKETPLACE_ADDRESS, 
                    ICO_MARKETPLACE_ABI, 
                    signer);
                // return contract;

                // const contract = await ICO_MARKETPLACE_CONTRACT();

                const payAmount = ethers.utils.parseUnits(prices.toString(), "ether");
                console.log("🚀 ~ createICOSALE ~ payAmount:", payAmount)

                const transaction = await contract.createICOSale(address, payAmount, {
                    gasLimit: ethers.utils.hexlify(8000000)
                });

                await transaction.wait();

                if (transaction.hash) {
                    setLoader(false);
                    setOpenCreateICO(false);
                    setReCall(reCall + 1);
                }
            } catch (error) {
                setLoader(false);
                setOpenCreateICO(false);
                notifyError("something went wrong, try later")
                console.log(error);
            }
        };


        const buyToken = async (tokenAddress, tokenQuantity) => {
            try {
                setLoader(true);
                notifySuccess("Buying tokens...");

                if (!tokenQuantity || !tokenAddress) return notifyError("Data Missing");

                const address = await connectWallet();
                const provider = new ethers.providers.Web3Provider(window.ethereum);
                const signer = provider.getSigner();
                console.log("🚀 ~ createICOSALE ~ signer:", signer.getAddress())
                const contract = fetchContract(
                    ICO_MARKETPLACE_ADDRESS, 
                    ICO_MARKETPLACE_ABI, 
                    signer);

                const _tokenBal = await contract.getBalance(tokenAddress);
                console.log("🚀 ~ buyToken ~ _tokenBal:", _tokenBal)
                const _tokenDetails = await contract.getTokenDetails(tokenAddress);

                const availableToken = ethers.utils.formatEther(_tokenBal.toString());
                console.log("🚀 ~ buyToken ~ availableToken:", availableToken)

                if(availableToken >  0) {
                    const price = ethers.utils.formatEther(_tokenDetails.price.toString()) *  Number(tokenQuantity);



                    const payAmount = ethers.utils.parseUnits(price.toString(), "ether");

                    const transaction = await contract.buyToken(
                        tokenAddress, 
                        Number(tokenQuantity), 
                        {
                        value: payAmount.toString(),
                        gasLimit: ethers.utils.hexlify(8000000),
                    }
                );

                await transaction.wait();
                setLoader(false);
                setReCall(reCall + 1);
                setOpenBuyToken(false);
                notifySuccess("Transaction completed successfully");
                } else {
                    setLoader(false);
                    setOpenBuyToken(false);
                    notifyError("Your Token balance is 0");
                }
            } catch (error) {
                setLoader(false);
                setOpenBuyToken(false);
                notifyError("something went wrong, try later")
                console.log(error);
            }
        };

        const transferTokens = async (transferTokenData) => {
            try {
                if (
                    !transferTokenData.address ||
                    !transferTokenData.amount ||
                    !transferTokenData.tokenAdd
                ) return notifyError("Data is Missing");


                setLoader(true);
                notifySuccess("Transfering is processing...");
                const address = await connectWallet();

                const contract = await TOKEN_CONTRACT(transferTokenData.tokenAdd)

                const _availableBal = await contract.balanceOf(address);
                const availableToken  = ethers.utils.formatEther(_availableBal.toString());

                if(availableToken > 1 ) {
                    const payAmount = ethers.utils.parseUnits(transferTokenData.amount.toString(), "ether");


                    const transaction = await contract.transfer(
                        transferTokenData.address, 
                        payAmount, 
                        {
                            gasLimit: ethers.utils.hexlify(8000000)
                        }
                    );
                    await transaction.wait();
                    setLoader(false);
                    setReCall(reCall + 1);
                    setOpenTransferToken(false);
                    notifySuccess("transaction completed successfully");
                }else {
                    setLoader(false);
                    setReCall(reCall + 1);
                    setOpenTransferToken(false);
                    notifyError("Your Token balance is 0");
                }
            } catch (error) {
                setLoader(false);
                setReCall(reCall + 1);
                setOpenTransferToken(false);
                notifyError("something went wrong, try later")
                console.log(error);
            }
        };


        const withdrawToken = async (withdrawQuantity) => {
                try {
                    if(!withdrawQuantity.amount || !withdrawQuantity.token)  return notifyError("Data is Missing");


                    setLoader(true);
                    notifySuccess("Transaction is processing...");

                    const address = await connectWallet();
                    const contract = await ICO_MARKETPLACE_CONTRACT();

                    const payAmount = ethers.utils.parseUnits(
                        withdrawQuantity.amount.toString(), 
                        "ether"
                );

                const transaction = await contract.withdrawToken(
                    withdrawQuantity.token,
                    payAmount,
                    {
                        gasLimit: ethers.utils.hexlify(8000000)
                    }
                );
                  
                await transaction.wait();
                setLoader(false);
                setReCall(reCall + 1);
                setOpenWithdrawToken(false);
                notifySuccess("Transaction completed successfully");
            } catch (error) {
                setLoader(false);
                setReCall(reCall + 1);
                setOpenWithdrawToken(false);
                notifyError("something went wrong, try later")
                console.log(error);
            }
        };



  return (
    <ICOContent.Provider
    value={{
                withdrawToken,
                transferTokens,
                buyToken,
                createICOSALE,
                GET_ALL_ICOSALE_TOKEN,
                GET_ALL_USER_ICOSALE_TOKEN,
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
                setAccountBalance,
                loader,
                setLoader,
                currency,
                shortenAddress,
                reCall,
                }}
    >
      {children}
    </ICOContent.Provider>
  )
}





















// //CONTEXT
// const StateContext = createContext();

// export const StateContextProvider = ({Children}) => {
    

    
    

      






//     return (
//     <StateContext.Provider
//    
//         <>
//         {Children}
//         </>
// </StateContext.Provider>
//     );
// };


// export const useStateContext = () => useContext(StateContext);