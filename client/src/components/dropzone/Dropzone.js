import React, { useState, useEffect, useRef } from "react";
import axios from "axios";

const Dropzone = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);
  const [validFile, setValidFile] = useState(null);
  const [unsupportedFile, setUnsupportedFile] = useState(null);
  const fileInputRef = useRef();
  const [uploaded, setUploaded] = useState(false);

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
      setSelectedFile(file);
      setValidFile(file);
    } else {
      file["invalid"] = true;
      setErrorMessage("File type not permitted");
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
      await axios.post("/api/upload", formData, config);
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
        <div>
          <h2>Uploaded</h2>
        </div>
      )}
    </>
  );
};

export default Dropzone;
