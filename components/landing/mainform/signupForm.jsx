"use client";
import React, { useContext, useRef, useState, useCallback } from "react";
import Snackbar from "../../Snackbar";
import axios from 'axios';
import { BackgroundGradient } from "../background-gradient";
import { FileInfoContext } from "@/context/FileInfoContext";
import { CircularProgress } from "@mui/material";
import { ProduceReport } from "../producereport";
import DescriptionIcon from '@mui/icons-material/Description';
import { IconUpload } from "@tabler/icons-react";

const SignupFormDemo = React.memo(() => {
  const { fileInfo, setFileInfo, setShowSnackbar, showSnackbar, setResponseGen, responseGen } = useContext(FileInfoContext);
  const [loading, setLoading] = useState(false);
  const [report, setReport] = useState(false);

  const fileInputRef = useRef(null);

  const handleShowSnackbar = useCallback(() => {
    setShowSnackbar(true);
    setTimeout(() => {
      setShowSnackbar(false);
    }, 3000);
  }, [setShowSnackbar]);

  const uploadFile = useCallback((file, filename) => {
    const formData = new FormData();
    formData.append('datauri', file);
    formData.append('filename', filename);
    return axios.post(`${process.env.NEXT_PUBLIC_API_URL}voltias`, formData);
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
        });
    }
  }, [uploadFile, setResponseGen]);

  const handleFileChange = async (event) => {
    setLoading(true);
    setResponseGen("");
    const file = event.target.files?.[0];
    if (file) {
      const fileSizeInBytes = file.size;
      const fileSizeInMB = (fileSizeInBytes / (1024 * 1024)).toFixed(4);
      const reader = new FileReader();

      reader.onload = async () => {
        const base64 = reader.result;
        const formData = new FormData();
        formData.append('file', file);

        try {
          const response = await fetch('http://localhost:3001/upload', {
            method: 'POST',
            body: formData,
          });

          if (response.ok) {
            console.log('File uploaded successfully');
            setLoading(false);
            handleShowSnackbar();
            setFileInfo({
              name: file.name,
              size: fileSizeInMB,
              dateUploaded: new Date(),
              dateModified: new Date(file.lastModified),
              base64,
            });
            sessionStorage.setItem(file.name, base64);
          } else {
            console.error('Upload failed');
          }
        } catch (error) {
          console.error('Error:', error);
        }
      };

      reader.readAsDataURL(file);
    }
  };

  const triggerUpload = useCallback(() => {
    fileInputRef.current?.click();
  }, []);

  const handleSubmit = useCallback((e) => {
    e.preventDefault();
    console.log("Form submitted");
  }, []);

  return (
    <BackgroundGradient containerClassName="mx-auto max-w-md w-full">
      <div className="max-w-md w-full mx-auto rounded-none md:rounded-2xl p-4 md:p-8 shadow-input bg-white dark:bg-black">
        <h2 className="font-bold text-xl text-neutral-800 dark:text-neutral-200 text-center">
          Upload Your Contract
        </h2>
        <p className="text-neutral-600 text-sm max-w-sm mt-2 mx-auto text-center dark:text-neutral-300">
        for thorough security analysis and
          optimization report
        </p>

        <form className="my-4" onSubmit={handleSubmit}>
          {loading ? (
            <div className="mx-auto max-w-md w-full flex items-center justify-center p-3">
              <CircularProgress style={{ color: "#14b8a6" }} />
            </div>
          ) : (
            (fileInfo.name !== "" && responseGen === "") ? (
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
            )
          )}
          {fileInfo.name !== "" && responseGen === "" && !loading && (
            <>
              <div className="bg-gradient-to-r from-transparent via-neutral-300 dark:via-neutral-700 to-transparent my-4 h-[2px] w-full" />
              <div className="flex flex-col space-y-4">
                <ProduceReport
                  report={report}
                  setReport={setReport}
                  handleAnalyzeClick={handleAnalyzeClick}
                  fileInfo={fileInfo}
                />
              </div>
            </>
          )}
        </form>
      </div>
      {showSnackbar && <Snackbar />}
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