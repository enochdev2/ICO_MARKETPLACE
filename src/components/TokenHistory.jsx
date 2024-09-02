import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";

const TokenHistory = ({ shortenAddress, setOpenTokenHistory }) => {
  // const [openTokenHistory, setOpenTokenHistory] = useState()
  const notifySuccess = (msg) => toast.success(msg, { duration: 3000 });
  const notifyError = (msg) => toast.error(msg, { duration: 3000 });

  const copyAddress = (text) => {
    navigator.clipboard.writeText(text);
    notifySuccess("Copied Successfully");
  };

  const [history, setHistory] = useState([]);

  useEffect(() => {
    const storedData = localStorage.getItem("TOKEN_HISTORY");

    if (storedData) {
      setHistory(JSON.parse(storedData));
      console.log(JSON.parse(storedData));
    }
  }, []);
  return (
    <div className="">
      <div className="modal-content gradiant-bg">
        <span onClick={() => setOpenTokenHistory(false)} className="close">
          &times;
        </span>
        <h2> Token History</h2>
        <div className="table-container md:my-[50px] md:mx-[50px]">
          <table className="custom-table">
            <thead>
              <tr>
                <td>Logo</td>
                <td>Name</td>
                <td>Symbol</td>
                <td>Supply</td>
                <td>Address</td>
                <td>Hash</td>
              </tr>
            </thead>
            <tbody>
              {history?.map((token, index) => (
                <tr key={index + 1}>
                  <td
                    onClick={() => navigator.clipboard.writeText(token?.logo)}
                  >
                    <img
                      src={token?.logo || "schoolofdapp.com.ng"}
                      alt=""
                      style={{
                        width: "30px",
                        height: "auto",
                        borderRadius: "10px",
                      }}
                    />
                  </td>
                  <td>{token?.name}</td>
                  <td>{token?.symbol}</td>
                  <td>{token?.supply}</td>
                  <td onClick={() => copyAddress(token?.tokenAddress)}>
                    {shortenAddress(token?.tokenAddress)}
                    {/* {token?.tokenAddress} */}
                  </td>
                  <td
                    onClick={() => {
                      copyAddress(token?.transactionHash);
                    }}
                  >
                    {shortenAddress(token?.transactionHash)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default TokenHistory;
