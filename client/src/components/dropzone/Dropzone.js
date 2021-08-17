import React, { useState, useRef } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { createReceipt } from "../../actions/receiptActions";
import moment from "moment";

const Dropzone = ({ history }) => {
  const [validFile, setValidFile] = useState(null);
  const [unsupportedFile, setUnsupportedFile] = useState(null);
  const fileInputRef = useRef();
  const [uploaded, setUploaded] = useState(false);
  const [receiptName, setReceiptName] = useState("");
  const [receiptTotal, setReceiptTotal] = useState(0);
  const [receiptType, setReceiptType] = useState("");
  const [image, setImage] = useState("");
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(
      createReceipt(
        receiptName,
        receiptType,
        receiptTotal,
        moment(new Date()).format("DD/MM/YYYY").toString(),
        image
      )
    );
  };

  const dragOver = (e) => {
    e.preventDefault();
  };

  const dragEnter = (e) => {
    e.preventDefault();
  };

  const dragLeave = (e) => {
    e.preventDefault();
  };

  const fileInputClicked = () => {
    fileInputRef.current.click();
  };

  const filesSelected = () => {
    if (fileInputRef.current.files.length) {
      handleFile(fileInputRef.current.files[0]);
    }
  };

  const validateFile = (file) => {
    const validTypes = ["image/jpeg", "image/jpg", "image/png"];
    if (validTypes.indexOf(file.type) === -1) {
      return false;
    }
    return true;
  };

  const handleFile = (file) => {
    if (validateFile(file)) {
      setValidFile(file);
    } else {
      file["invalid"] = true;
      setUnsupportedFile(file);
    }
  };

  const fileDrop = (e) => {
    e.preventDefault();
    const files = e.dataTransfer.files;
    if (files.length) {
      handleFile(files[0]);
    }
  };

  const uploadFiles = async () => {
    const formData = new FormData();
    formData.append("image", validFile);
    try {
      const config = {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      };
      const { data } = await axios.post("/api/upload", formData, config);
      setReceiptName(data.name);
      setReceiptTotal(data.amount);
      setReceiptType(data.type);
      setImage(data.image);
      setValidFile("");
      setUploaded(true);
    } catch (err) {
      console.error(err);
      setUploaded(false);
    }
  };

  return (
    <>
      <div className="upload-box">
        <div
          className="upload-drop-container"
          onDragOver={dragOver}
          onDragEnter={dragEnter}
          onDragLeave={dragLeave}
          onDrop={fileDrop}
          onClick={fileInputClicked}
        >
          <div className="file-display-container"></div>
          <div className="drop-message">
            <div className="upload-icon"></div>
            Drag and drop file here
          </div>
          <input
            ref={fileInputRef}
            className="file-input"
            type="file"
            multiple
            onChange={filesSelected}
          />
          <h3> {validFile && <span>{validFile.name}</span>}</h3>

          {validFile ? (
            <button onClick={() => uploadFiles()} className="btn-upload">
              Upload
            </button>
          ) : (
            ""
          )}

          {unsupportedFile ? <p>File Not Valid</p> : ""}
        </div>
      </div>
      {uploaded && (
        <form className="receipt-input-layout" onSubmit={handleSubmit}>
          <input
            className="receipt-input"
            type="receiptName"
            id="receiptName"
            value={receiptName}
            onChange={(e) => setReceiptName(e.target.value)}
          />
          <input
            className="receipt-input"
            type="number"
            id="receiptTotal"
            value={receiptTotal}
            onChange={(e) => setReceiptTotal(e.target.value)}
          />
          <input
            className="receipt-input"
            type="receiptType"
            id="receiptType"
            value={receiptType}
            onChange={(e) => setReceiptType(e.target.value)}
          />
          <button type="submit" className="btn-upload btn-add">
            Add
          </button>
        </form>
      )}
    </>
  );
};

export default Dropzone;
