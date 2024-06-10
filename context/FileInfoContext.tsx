"use client";

import React, { createContext, useState, ReactNode } from 'react';


interface FileInfo {
  name: string;
  size: string;
  dateUploaded: Date;
  dateModified: Date;
  base64: string | ArrayBuffer | null;
}


interface FileInfoContextProps {
  fileInfo: FileInfo;
  setFileInfo: React.Dispatch<React.SetStateAction<FileInfo>>;
  showSnackbar: boolean;
  setShowSnackbar: React.Dispatch<React.SetStateAction<boolean>>;
  responseGen:string;
  setResponseGen:React.Dispatch<React.SetStateAction<string>>;
}


export const FileInfoContext = createContext<FileInfoContextProps | undefined>(undefined);

interface FileInfoContextProviderProps {
  children: ReactNode;
  
}

const FileInfoContextProvider: React.FC<FileInfoContextProviderProps> = ({ children }) => {
  const [fileInfo, setFileInfo] = useState<FileInfo>({
    name: '',
    size: '',
    dateUploaded: new Date(),
    dateModified: new Date(),
    base64: null,
  });
  const [showSnackbar, setShowSnackbar] = useState<boolean>(false);
  const [responseGen, setResponseGen] = useState<string>('');

  return (
    <FileInfoContext.Provider value={{ fileInfo, setFileInfo, showSnackbar, setShowSnackbar, responseGen, setResponseGen }}>
      {children}
    </FileInfoContext.Provider>
  );
};

export default FileInfoContextProvider;
