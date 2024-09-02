import React, { useState, useEffect } from "react";

//INTERNAL IMPORT
import Input from "./Input";
import Button from "./Buttons";

const BuyToken = ({
  buyToken,
  address,
  connectWallet,
  setOpenBuyToken,
  buyIco,
  currency,
}) => {
  const [tokenQuantity, setTokenQuantity] = useState();

  return (
    <div className="modal">
      <div className="modal-content gradiant-bg">
        <span onClick={() => setOpenBuyToken(false)} className="close">
          &times;
        </span>
        <h2> Buy Token </h2>
        <div className="input-Container" style={{ marginTop: "1rem" }}>
          <Input
            placeholder={"Quantity"}
            handleChange={(e) => setTokenQuantity(e.target.value)}
          />

          <Input
            placeholder={
              tokenQuantity
                ? `${tokenQuantity * Number(buyIco?.price)} ${currency}`
                : "Ouput"
            }
          />

          <div
            className="button-box"
            style={{
              marginTop: "1rem",
            }}
          >
            {address ? (
              <Button
                name="Token Transfer"
                handleClick={() => buyToken(buyIco?.token, tokenQuantity)}
              />
            ) : (
              <Button
                name="Connect Wallet"
                handleClick={() => connectWallet()}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BuyToken;
