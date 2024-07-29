import React, { useState } from "react";

//INTERNAL IMPORT
import Input from './Input'
import Button from './Buttons'


const WidthdrawToken = ({
  address,
  widthdrawToken,
  connectWallet,
  setOpenWithdrawToken,
}) => {
  const [withdrawQuantity, setWithdrawQuantity] = useState({
    token: "",
    amount: "",
  })
  return (
    <div className="model">
    <div className="modal-content gradiant-bg">
      <span onClick={()=> setOpenWithdrawToken(false)} className="close">
        &times;
      </span>
      <h2>Withdraw Token </h2>
      <div className="input-Container flex-col md:flex-row " style={{marginTop: "1rem"}}>
        <Input
        placeholder={"To Address"}
        handleChange={(e) => 
        setWithdrawQuantity({...withdrawQuantity, token: e.target.value})}
        />

        <Input
        placeholder={"Token Address"}
        handleChange={(e) => 
        setOpenWithdrawToken({...withdrawQuantity, amount: e.target.value})}
        />

       

        <div className="button-box" style={{
          marginTop: "1rem"
        }}>
        {address ? (
          <Button
          name="Token Transfer"
          handleClick={() => widthdrawToken(widthdrawToken)}
          />
        ) : (
          <Button
          name="Connect Wallet"
          handleClick={() => connectWallet()}
          />
        )
      }
        </div>
      </div>
    </div>
  </div>
  )
};

export default WidthdrawToken;
