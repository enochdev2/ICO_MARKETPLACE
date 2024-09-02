import React, { useEffect, useState, useCallback } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useDropzone } from "react-dropzone";

// INTERNAL IMPORT
import UploadICON from "./SVG/UploadICON";

const UploadLogo = ({
  imageURL,
  setimageURL,
  setLoader,
  PINATA_API_KEY,
  PINATA_SECRET_KEY,
}) => {
  const notifySuccess = (msg) => toast.success(msg, { duration: 3000 });
  const notifyError = (msg) => toast.error(msg, { duration: 3000 });

  const uploadToIPFS = async (file) => {
    console.log("🚀 ~ PINATA_API_KEY:", PINATA_API_KEY);
    console.log("🚀 ~ PINATA_SECRET_KEY:", PINATA_SECRET_KEY);
    if (file) {
      try {
        setLoader(true);
        const formData = new FormData();
        formData.append("file", file);

        const response = await axios({
          method: "post",
          url: "https://api.pinata.cloud/pinning/pinFileToIPFS",
          data: formData,
          maxBodyLength: "Infinity",
          headers: {
            pinata_api_key: PINATA_API_KEY,
            pinata_secret_api_key: PINATA_SECRET_KEY,
            "Content-Type": "multipart/form-data",
          },
        });
        console.log("🚀 ~ uploadToIPFS ~ response:", response);

        const url = `https://copper-leading-yak-964.mypinata.cloud/ipfs/${response.data.IpfsHash}`;
        console.log("🚀 ~ uploadToIPFS ~ url:", url);

        setimageURL(url);
        setLoader(false);
        notifySuccess("Logo uploaded successfully");
      } catch (error) {
        setLoader(false);
        notifyError("check your pinata keys");
        console.log(error);
      }
    }
  };

  const onDrop = useCallback(async (acceptedFile) => {
    await uploadToIPFS(acceptedFile[0]);
  });

  const { getInputProps, getRootProps } = useDropzone({
    onDrop,
    maxSize: 500000000000,
  });

  return (
    <>
      {imageURL ? (
        <div>
          <img
            src={imageURL}
            style={{ width: "200px", height: "200ox" }}
            alt=""
          />
        </div>
      ) : (
        <div {...getRootProps()}>
          <label for="file" className="custum-file-upload">
            <div className="icon">
              <UploadICON />
            </div>
            <div className="text">
              <span> Click to upload Logo</span>
            </div>
            <input type="file" id="file" {...getInputProps()} />
          </label>
        </div>
      )}
    </>
  );
};

export default UploadLogo;
