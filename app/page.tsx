"use client";
import "./globals.css";

import { FileInfoContext } from "@/context/FileInfoContext";
import FileInfoContextProvider from "@/context/FileInfoContext";
import { useContext } from "react";
import SignupFormDemo from "../components/landing/mainform/signupForm";
import Post from "../components/markdown/Post";
import Header from "../components/Header";
import { Vortex } from "../components/landing/vortex";
import { useMediaQuery } from "@mui/material";

function Main() {
  const { responseGen }: any = useContext(FileInfoContext);
  const isMobile = useMediaQuery("(max-width: 600px)");

  return (
    <div className="overflow-x-hidden">
      <Vortex
        rangeY={700}
        particleCount={300}
        backgroundColor="black"
        className="flex flex-col md:flex-row lg:flex-col items-center justify-between px-2 md:px-10 py-2 w-full sm:h-full lg:h-[100vh]"
      >
        <div className="w-full mx-auto rounded-md sm:h-full lg:h-[100vh] flex flex-col md:gap-[5vh]">
          <Header />
          <div className="flex flex-col lg:flex-row items-center md:gap-[5vh] h-full">
            <div className="flex flex-col items-center md:items-start lg:gap-7 gap-6 z-10 w-full lg:w-1/2 lg:ml-10 mb-4 md:mt-0">
              {isMobile && <div className="mt-[4px]"></div>}
              <h2 className="text-white text-3xl md:text-3xl font-bold leading-tight text-center">
                Automate Blockchain Security with Cutting Edge
                <span className="ml-3 block md:inline-block">
                  <h2 className="bg-gradient-to-r from-blue-300 to-red-400 inline-block text-transparent bg-clip-text">
                    AI
                  </h2>
                </span>
              </h2>
              <p className="text-white text-lg md:text-xl text-center md:text-center">
                Voltius revolutionizes DeFi with AI-powered smart contract
                verification, delivering unparalleled blockchain integrity and
                trust.
              </p>
              <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4 w-full justify-center">
                <button className="px-4 py-2 bg-blue-600 hover:bg-blue-700 transition duration-200 rounded-lg text-white shadow-[0px_2px_0px_0px_#FFFFFF40_inset]">
                  <a href="https://docsend.com/view/9jgbtiig65yamrew">
                    Whitepaper
                  </a>
                </button>
                <a
                  href="https://voltius.ai/#"
                  className="px-4 py-2 text-white hover:underline relative"
                >
                  <span className="absolute inset-0 border-2 border-transparent bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-lg p-px">
                    <span className="absolute inset-0 bg-black rounded-lg"></span>
                  </span>
                  <span className="relative">Learn More</span>
                </a>
              </div>
            </div>
            <div className="z-10 w-full lg:w-1/2 mt-4 md:mt-0 px-3">
              <SignupFormDemo />
            </div>
          </div>
        </div>
      </Vortex>
      <div className="mt-2">
        {responseGen !== "" && (
          <div className="w-full flex items-center justify-center px-4">
            <div className="relative shadow-xl bg-neutral-950 border border-gray-800 px-4 py-4 w-full md:w-[75rem] max-w-full rounded-2xl flex flex-col justify-center items-center">
              <div>
                <span className="absolute mx-auto py-1 flex border bg-gradient-to-r blur-xl from-blue-500 via-teal-500 to-pink-500 bg-clip-text text-4xl box-content font-extrabold text-transparent text-center">
                  Our Analysis
                </span>
                <h5 className="relative top-0 w-fit h-auto py-4 justify-center flex bg-gradient-to-r items-center from-blue-500 via-teal-500 to-pink-500 bg-clip-text text-4xl font-extrabold text-transparent text-center select-auto">
                  Our Analysis
                </h5>
              </div>
              <div className="w-full">
                <Post words={responseGen} />
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default function Home() {
  return (
    <FileInfoContextProvider>
      <Main />
    </FileInfoContextProvider>
  );
}
