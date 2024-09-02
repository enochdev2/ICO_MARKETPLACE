import React, { useState } from "react";

//INTERNET IMPORT
import Input from "./Input";
import Button from "./Buttons";

const CreateICO = ({
  shortenAddress,
  setOpenCreateICO,
  connectWallet,
  address,
  createICOSale,
}) => {
  const [icoSale, setIcoSale] = useState({
    address: "",
    price: "",
  });
  return (
    <div className="modal">
      <div className="modal-content gradiant-bg">
        <span onClick={() => setOpenCreateICO(false)} className="close">
          &times;
        </span>
        <h2>Create ICO</h2>
        <div className="input-Container" style={{ marginTop: "1rem" }}>
          <Input
            placeholder={"Address"}
            handleChange={(e) =>
              setIcoSale({ ...icoSale, address: e.target.value })
            }
          />

          <Input
            placeholder={"Price"}
            handleChange={(e) =>
              setIcoSale({ ...icoSale, price: e.target.value })
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
                name="Create Token"
                handleClick={() => createICOSale(icoSale)}
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

export default CreateICO;
