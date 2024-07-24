"use client";
import React, { useContext, useRef, useState, useCallback } from "react";
import Snackbar from "../../Snackbar";
import axios from 'axios';
import { BackgroundGradient } from "../background-gradient";
import { FileInfoContext } from "@/context/FileInfoContext";
import { CircularProgress } from "@mui/material";
import { ProduceReport } from "../producereport";
import DescriptionIcon from '@mui/icons-material/Description';
import { IconPrompt, IconUpload } from "@tabler/icons-react";
import FormData from 'form-data';
import { atob } from 'atob';

const SignupFormDemo = React.memo(() => {
  const { fileInfo, setFileInfo, setShowSnackbar, showSnackbar, setResponseGen, responseGen } = useContext(FileInfoContext);
  const [loading, setLoading] = useState(false);
  const [report, setReport] = useState(false);
  const [message, setMessage] = useState({ text: "", color: "" });
  let timer;
  const fileInputRef = useRef(null);

  const handleShowSnackbar = useCallback((text, color) => {
    setMessage({ text, color });
    setShowSnackbar(true);
    setTimeout(() => {
      setShowSnackbar(false);
      setMessage({ text: "", color: "" });
    }, 3000);
  }, [setShowSnackbar]);

  const createFileFromBase64 = (dataURI, filename) => {
    const base64Data = dataURI.split(',')[1];
    const binaryData = window.atob(base64Data);
    const arrayBuffer = new ArrayBuffer(binaryData.length);
    const uint8Array = new Uint8Array(arrayBuffer);
    for (let i = 0; i < binaryData.length; i++) {
      uint8Array[i] = binaryData.charCodeAt(i);
    }
    return new Blob([uint8Array], { type: 'application/octet-stream' });
  };

  const uploadFile = useCallback(async (file, filename) => {
    try {
      const fileBlob = createFileFromBase64(file, filename);

      const formData = new FormData();
      formData.append('files', fileBlob, filename);

      const response = await axios.post('https://api.voltius.ai/uploadfiles/', formData);

      return response;
    } catch (error) {
      console.error('Error making API call:', error);
      throw error;
    }
  }, []);

  const handleAnalyzeClick = useCallback((filename) => {
    setReport(true);
    let data = sessionStorage.getItem(filename);
    if (data) {
      uploadFile(data, filename)
        .then(response => {
          setResponseGen(response.data.responses[0].recommendation);
          setReport(false);
        })
        .catch(error => {
          console.error('Error uploading file:', error);
          handleShowSnackbar("Error uploading file", "#D70040");
        });
    }
  }, [uploadFile, setResponseGen, handleShowSnackbar]);

  const handleFileChange = async (event) => {
    clearTimeout(timer);
    setLoading(true);
    setResponseGen("");
    const file = event.target.files?.[0];
    if (file) {
      const fileSizeInBytes = file.size;
      const fileSizeInMB = (fileSizeInBytes / (1024 * 1024)).toFixed(4);
      const fileExtension = file.name.split('.').pop();

      if (fileExtension !== "sol") {
        handleShowSnackbar("Only .sol files are allowed.", "#D70040");
        setLoading(false);
        return;
      }

      if (fileSizeInBytes > 50 * 1024 * 1024) { // 50 MB
        handleShowSnackbar("File size exceeds 50 MB limit.", "#D70040");
        setLoading(false);
        return;
      }

      const reader = new FileReader();

      reader.onload = async () => {
        const base64 = reader.result;

        setFileInfo({
          name: file.name,
          size: fileSizeInMB,
          dateUploaded: new Date(),
          dateModified: new Date(file.lastModified),
          base64,
        });
        timer = setTimeout(() => {
          setLoading(false);
          sessionStorage.setItem(file.name, base64);
          console.log('File uploaded successfully');
        }, 4000);
      };

      reader.readAsDataURL(file);
    }
  };

  const triggerUpload = useCallback(() => {
    fileInputRef.current?.click();
  }, []);

  const handleReupload = useCallback(() => {
    setFileInfo({
      name: "",
      size: "",
      dateUploaded: null,
      dateModified: null,
      base64: "",
    });
    setResponseGen("");
    triggerUpload();
  }, [setFileInfo, setResponseGen, triggerUpload]);

  const handleSubmit = useCallback((e) => {
    e.preventDefault();
    console.log("Form submitted");
  }, []);

  return (
    <BackgroundGradient containerClassName="mx-auto max-w-md w-full p-[5px] mb-3">
      <div className="max-w-md w-full mx-auto rounded-2xl md:rounded-3xl p-4 md:p-8 shadow-input bg-white dark:bg-black">
        <h2 className="font-bold text-xl text-neutral-800 dark:text-neutral-200 text-center">
          Upload Your Contract
        </h2>
        <form className="my-4" onSubmit={handleSubmit}>
          {loading ? (
            <div className="max-w-md w-full mx-auto p-4 flex justify-center items-center">
              <CircularProgress />
            </div>
          ) : fileInfo.name !== "" && responseGen === "" ? (
            <div className="flex justify-center items-center flex-col p-4">
              <DescriptionIcon />
              <p className="text-neutral-600 text-sm max-w-sm mt-2 mx-auto text-center dark:text-neutral-300">
                {fileInfo.name} has been uploaded
              </p>
            </div>
          ) : (
            <>
              <label
                htmlFor="uploadFile1"
                className="text-gray-500 font-semibold text-base rounded max-w-md h-26 flex flex-col items-center justify-center cursor-pointer mx-auto font-[sans-serif]"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-11 mb-2 fill-gray-500"
                  viewBox="0 0 32 32"
                >
                  <path
                    d="M23.75 11.044a7.99 7.99 0 0 0-15.5-.009A8 8 0 0 0 9 27h3a1 1 0 0 0 0-2H9a6 6 0 0 1-.035-12 1.038 1.038 0 0 0 1.1-.854 5.991 5.991 0 0 1 11.862 0A1.08 1.08 0 0 0 23 13a6 6 0 0 1 0 12h-3a1 1 0 0 0 0 2h3a8 8 0 0 0 .75-15.956z"
                    data-original="#000000"
                  />
                  <path
                    d="M20.293 19.707a1 1 0 0 0 1.414-1.414l-5-5a1 1 0 0 0-1.414 0l-5 5a1 1 0 0 0 1.414 1.414L15 16.414V29a1 1 0 0 0 2 0V16.414z"
                    data-original="#000000"
                  />
                </svg>
                Upload file
                <input
                  type="file"
                  id="uploadFile1"
                  className="hidden"
                  onChange={handleFileChange}
                  ref={fileInputRef}
                />
                <p className="text-xs font-medium text-gray-400 mt-2">
                  File size is limited to 50 MB
                </p>
              </label>
              <div className="mt-4">
                <button
                  className="bg-gradient-to-br relative group/btn from-black dark:from-zinc-900 dark:to-zinc-900 to-neutral-600 dark:bg-zinc-800 w-full text-white rounded-md h-10 font-medium shadow-[0px_2px_0px_0px_#ffffff40_inset,0px_-2px_0px_0px_#ffffff40_inset] dark:shadow-[0px_2px_0px_0px_var(--zinc-800)_inset,0px_-2px_0px_0px_var(--zinc-800)_inset] transition-all duration-500 flex items-center justify-center"
                  type="button"
                  onClick={triggerUpload}
                >
                  <IconUpload className="mr-2" />
                  <span>Upload Contract</span>
                  <BottomGradient />
                </button>
              </div>
            </>
          )}
          {fileInfo.name !== "" && responseGen === "" && !loading && !message.text && (
            <>
              <div className="bg-gradient-to-r from-transparent via-neutral-300 dark:via-neutral-700 to-transparent my-4 h-[2px] w-full" />
              <div className="flex lg:flex-row flex-col gap-2 justify-center">
                <div className="flex flex-col space-y-4">
                  <button
                    className="p-[2.2px] relative"
                    onClick={handleReupload}
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-lg" />
                    <div className="px-8 py-2 bg-black rounded-[6px] relative group transition duration-200 text-white hover:bg-transparent flex items-center justify-center">
                      <span>Reupload</span>
                    </div>
                  </button>
                </div>
                <div className="flex flex-col space-y-4">
                  <ProduceReport
                    report={report}
                    setReport={setReport}
                    handleAnalyzeClick={handleAnalyzeClick}
                    fileInfo={fileInfo}
                  />
                </div>
              </div>
            </>
          )}
        </form>
      </div>
      {showSnackbar && <Snackbar message={message.text} color={message.color} />}
    </BackgroundGradient>
  );
});

const BottomGradient = React.memo(() => {
  return (
    <>
      <span className="group-hover/btn:opacity-100 block transition duration-500 opacity-0 absolute h-px w-full -bottom-[6px] inset-x-0 bg-gradient-to-r from-transparent via-cyan-500 to-transparent" />
      <span className="group-hover/btn:opacity-100 blur-sm block transition duration-500 opacity-0 absolute h-px w-1/2 mx-auto -bottom-[6px] inset-x-10 bg-gradient-to-r from-transparent via-indigo-500 to-transparent" />
    </>
  );
});

export default SignupFormDemo;
