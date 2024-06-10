// ProduceReport.jsx
import React, { useState } from "react";
import { IconPrompt } from "@tabler/icons-react";
import { MultiStepLoader as Loader } from "../landing/multi-step-loader";

const loadingStates = [
  {
    text: "Retrieving and analyzing contract data...",
  },
  {
    text: "Applying GNN for structural insights...",
  },
  {
    text: "Generating semantic mappings with RAG...",
  },
  {
    text: "Executing dynamic transaction analysis...",
  },
  {
    text: "Detecting anomalies and vulnerabilities...",
  },
  {
    text: "Compiling security recommendations...",
  },
];

export const ProduceReport = ({report,setReport,handleAnalyzeClick,fileInfo}) => {
  const handleLoadingComplete = () => {
    setReport(false);
  };

  return (
    <div>
      <Loader
        loadingStates={loadingStates}
        loading={report}
        duration={4000}
        onLoadingComplete={handleLoadingComplete}
        showWhile={()=>report}
      />
      <div className="flex flex-col space-y-4">
        <button
          className="p-[4px] relative"
          onClick={() => handleAnalyzeClick(fileInfo.name)}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-lg" />
          <div className="px-8 py-2 bg-black rounded-[6px] relative group transition duration-200 text-white hover:bg-transparent flex items-center justify-center">
            <IconPrompt className="mr-2" />
            <span>Produce Report</span>
          </div>
        </button>
      </div>
    </div>
  );
};