import React from "react";

import Buttons from "./Buttons";
import toast from "react-hot-toast";

const Marketplace = ({
  array,
  shortenAddress,
  setBuyIco,
  setOpenBuyToken,
  currency,
}) => {

  const notifySuccess = (msg) => toast.success(msg, {duration: 2000 });
  const notifyError = (msg) => toast.error(msg, {duration: 2000 });
   
  const openAndsetBuyToken = (token) => {
    console.log("working");
    setBuyIco(token);
    setOpenBuyToken(true);
    
  }

  const copyAddress = (text) => {
    navigator.clipboard.writeText(text);
    notifySuccess("Copied Successfully")
  }

  return (
    <div className="table-container gradiant-bg md:my-[50px] md:mx-[50px]">
    <table className="custom-table">
      <thead>
        <tr>
          <td>Name</td>
          <td>Symbol</td>
          <td>Supply</td>
          <td>Token</td>
          <td>Creator</td>
          <td>Price</td>
          <td>Buy</td>
        </tr>
      </thead>
      <tbody>
        {array?.map((token, index) => (
          <tr key={index + 1}>
            <td>{token?.name}</td>
            <td>{token?.symbol}</td>
            <td>{token?.icoSaleBal}</td>
            <td onClick={ () => {
              copyAddress(token?.token)
            }}>
              {shortenAddress(token?.token)}
          </td>
            <td onClick={ () => {
              copyAddress(token?.creator)
            }}>
              {shortenAddress(token?.creator)}
          </td>
          <td> {token.price} {currency} </td>
          <td onClick={() => openAndsetBuyToken(token)
            }>
            <Buttons name={"Buy"} className="bg-black z-3" />
          </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
  );
};

export default Marketplace;
