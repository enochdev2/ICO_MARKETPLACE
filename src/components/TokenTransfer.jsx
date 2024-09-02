"use client";
import React, { useState, useEffect } from "react";

//INTERNAL IMPORT
import Input from "./Input";
import Button from "./Buttons";

const TokenTransfer = ({
  address,
  transferTokens,
  connectWallet,
  setOpenTransferToken,
}) => {
  const [transferTokenData, setTransferTokenData] = useState({
    address: "",
    tokenAdd: "",
    amount: "",
  });
  return (
    <div className="modal">
      <div className="modal-content gradiant-bg">
        <span onClick={() => setOpenTransferToken(false)} className="close">
          &times;
        </span>
        <h2>Token Transfer</h2>
        <div className="input-Container" style={{ marginTop: "1rem" }}>
          <Input
            placeholder={"To Address"}
            handleChange={(e) =>
              setTransferTokenData({
                ...transferTokenData,
                address: e.target.value,
              })
            }
          />

          <Input
            placeholder={"Token Address"}
            handleChange={(e) =>
              setTransferTokenData({
                ...transferTokenData,
                tokenAdd: e.target.value,
              })
            }
          />

          <Input
            placeholder={"Amount"}
            handleChange={(e) =>
              setTransferTokenData({
                ...transferTokenData,
                amount: e.target.value,
              })
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
                handleClick={() => transferTokens(transferTokenData)}
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

export default TokenTransfer;
