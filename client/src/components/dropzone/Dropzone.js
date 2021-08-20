import React, { useState, useRef, useEffect } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { createReceipt } from "../../actions/receiptActions";
import moment from "moment";
import Loading from "../loading/Loading";

const Dropzone = ({ history }) => {
  const [validFile, setValidFile] = useState(null);
  const [unsupportedFile, setUnsupportedFile] = useState(null);
  const fileInputRef = useRef();
  const [uploaded, setUploaded] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [receiptName, setReceiptName] = useState("");
  const [receiptTotal, setReceiptTotal] = useState(0);
  const [receiptType, setReceiptType] = useState("Other");
  const [image, setImage] = useState("");
  const dispatch = useDispatch();

  const receiptCreate = useSelector((state) => state.receiptCreate);
  const { success: successCreate } = receiptCreate;

  useEffect(() => {
    if (successCreate) {
      setReceiptName("");
      setReceiptTotal(0);
      setReceiptType("Other");
      setImage("");
      setUploaded(false);
    }
  }, [successCreate]);

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
      setUploading(true);
      const { data } = await axios.post("/api/upload", formData, config);
      setUploading(false);
      setReceiptName(data.name);
      setReceiptTotal(data.amount);
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
      {uploading && <Loading />}
      {!uploaded && !uploading && (
        <form className="receipt-input-layout" onSubmit={handleSubmit}>
          <input
            className="receipt-input"
            type="receiptName"
            id="receiptName"
            value={receiptName}
            required
            onChange={(e) => setReceiptName(e.target.value)}
          />
          <input
            className="receipt-input"
            type="number"
            id="receiptTotal"
            value={receiptTotal}
            required
            onChange={(e) => setReceiptTotal(e.target.value)}
          />
          <select
            className="receipt-input"
            value={receiptType}
            type="transactionType"
            id="transactionType"
            required
            onChange={(e) => setReceiptType(e.target.value)}
          >
            <option value="Other">Other</option>
            <option value="Rent">Rent</option>
            <option value="Food">Food</option>
            <option value="Going Out">Going Out</option>
            <option value="Clothes/Shoes">Clothes</option>
            <option value="Groceries">Groceries</option>
            <option value="Bills">Bills</option>
            <option value="Holiday">Holiday</option>
          </select>
          <button type="submit" className="btn-upload btn-add">
            Add
          </button>
        </form>
      )}
    </>
  );
};

export default Dropzone;
