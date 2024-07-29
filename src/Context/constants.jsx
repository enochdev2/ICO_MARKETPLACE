import {ethers} from "ethers";
import Web3Modal from "web3modal";

import ERC20Generator from "./ERC20Generator.json"
import icoMarketplace from "./icoMarketplaces.json";


export const ERC20Generator_ABI = ERC20Generator.abi;
export const ERC20Generator_BYTECODE = ERC20Generator.bytecode;

export const ICO_MARKETPLACE_ADDRESS = import.meta.env.VITE_ICO_MARKETPLACE_ADDRESS; 
export const ICO_MARKETPLACE_ABI = icoMarketplace.abi;

//PINATA KEY
export const PINATA_API_KEY =  import.meta.env.VITE_PINATA_API_KEY;
export const PINATA_SECRET_KEY = import.meta.env.VITE_PINATA_SECRECT_KEY; 

//NETWORKS
// const networks = {
//     polygon_amoy: {
//         chainId: `0x${Number(80002).toString(16)}`,
//         chainName: "Polygon Amoy",
//         nativeCurrency: { 
//             name: "MATIC", 
//             symbol: "MATIC",
//             decimals: 18 
//         },
//         rpcUrls: [" https://rpc-amoy.polygon.technology/"],
//         blockExplorerUrls: ["https://www.oklink.com/amoy"],
//         // rpcUrls: ["https://rpc.ankr.polygon_amoy"],
//     },
//     polygon: {
//         chainId: `0x${Number(137).toString(16)}`,
//         chainName: "Polygon Mainnet",
//         nativeCurrency: { 
//             name: "MATIC", 
//             symbol: "MATIC",
//             decimals: 18 
//         },
//         rpcUrls: ["https://rpc.ankr.com/polygon"],
//         blockExplorerUrls: ["https://polygonscan.com/"],
//     },
//     bsc: {
//         chainId: `0x${Number(56).toString(16)}`,
//         chainName: "Binance Mainnet",
//         nativeCurrency: { 
//             name: "Binance Chain", 
//             symbol: "BNB",
//             decimals: 18 
//         },
//         rpcUrls: ["https://rpc.ankr.com/bsc"],
//         blockExplorerUrls: ["https://bscscan.com/"],
//     },

//     base_mainnet: {
//         chainId: `0x${Number(8453).toString(16)}`,
//         chainName: "Base Mainnet",
//         nativeCurrency: {
//             name: "ETH",
//             symbol: "ETH",
//             decimals: 18,
//         },
//         rpcUrls: ["http://mainnet.base.org"],
//         blockExplorerUrls: ["http://bscscan.com"], //

//     }
// }


//  const changeNetwork = async ({netkworkName}) => {
//     try {
//         if (!window.ethereum) throw new Error("No crypto wallet found");
//         await window.ethereum.request({
//             method: "wallet_addEthereumChain",
//             params: [
//                 {
//                 ...networks[netkworkName],
//             },
//         ],
//             // params: [{
//             //     chainId: networks[netkworkName].chainId,
//             //     chainName: networks[netkworkName].chainName,
//             //     nativeCurrency: networks[netkworkName].nativeCurrency,
//             //     rpcUrls: networks[netkworkName].rpcUrls,
//             //     blockExplorerUrls: networks[netkworkName].blockExplorerUrls
//             // }]
//         });
//     } catch(error) {
//     console.log(error);
//     };
//  }

 
//  export const handleNetworkSwitch = async () => {
//     const networkName = "polygon_amoy";
//     await changeNetwork({networkName});
//  };

 export const shortenAddress = (address) => `${address?.slice(0, 5)}...${address?.lenght - 4}`;

export const fetchContract = (address, abi, signer) => new ethers.Contract(address, abi, signer);

 export const ICO_MARKETPLACE_CONTRACT = async() => {
    const link = 'https://polygon-amoy.g.alchemy.com/v2/BNtFtcdka6PWOAZepdA62HWxAeGnHnCT'
    try {
        // const web3modal = await Web3Modal();
        // const connection = await web3modal.connect();        
        const provider = new ethers.providers.JsonRpcProvider(link);
        const signer = provider.getSigner();
        
        
        const contract = fetchContract(
            ICO_MARKETPLACE_ADDRESS, 
            ICO_MARKETPLACE_ABI, 
            provider);
        return contract;
    } catch (error) {
        console.error(error);
    }
 }
 export const TOKEN_CONTRACT = async(TOKEN_ADDRESS) => {
     const link = 'https://polygon-amoy.g.alchemy.com/v2/BNtFtcdka6PWOAZepdA62HWxAeGnHnCT'
    try {
            // const web3modal = await Web3Modal();
            // const connection = await web3modal.connect();        
            const provider = new ethers.providers.JsonRpcProvider(link);
            const signer = provider.getSigner();

        const contract = fetchContract(TOKEN_ADDRESS, ERC20Generator_ABI, provider);
        return contract;
    } catch (error) {
        console.error(error);
    }
 }