"use client";
import "./globals.css";

import { FileInfoContext } from "@/context/FileInfoContext";
import FileInfoContextProvider from "@/context/FileInfoContext";
import { useContext } from "react";
import SignupFormDemo from "../components/landing/mainform/signupForm";
import Post from "../components/markdown/Post";
import Header from "../components/Header";
import { Vortex } from "../components/landing/vortex";

function Main() {
  const { responseGen }:any = useContext(FileInfoContext);

  return (
    <>
      <Header />
      <Vortex
        backgroundColor="black"
        rangeY={700}
        particleCount={300}
        className={
          "flex flex-row md:flex-row items-center justify-between px-4 md:px-10 py-4 w-full"
        }
      >
      <div className="w-[calc(100%-4rem)] mx-auto rounded-md">

        <div className="flex flex-row items-center justify-between min-h-screen h-full">
          <div className="flex flex-col items-start gap-10 z-10 md:w-1/2 ml-10">
            <h2 className="text-white text-4xl md:text-6xl font-bold leading-tight">
              Automate Blockchain Security with Cutting Edge
              <span className="ml-3">
                <h2 className="bg-gradient-to-r from-blue-300 to-red-400 inline-block text-transparent bg-clip-text">
                  AI
                </h2>
              </span>
            </h2>
            <p className="text-white text-lg md:text-2xl ">
              Voltius revolutionizes DeFi with AI-powered smart contract
              verification, delivering unparalleled blockchain integrity and
              trust.
            </p>
            <div className="flex flex-col sm:flex-row items-start gap-4">
              <button className="px-4 py-2 bg-blue-600 hover:bg-blue-700 transition duration-200 rounded-lg text-white shadow-[0px_2px_0px_0px_#FFFFFF40_inset]">
                <a href="https://docsend.com/view/9jgbtiig65yamrew">
                  Whitepaper
                </a>
              </button>
              <a
                href="https://voltius.ai/#"
                className="px-4 py-2 text-white hover:underline"
              >
                Learn More
              </a>
            </div>
          </div>

          <div className="z-10 md:w-1/2">
            <SignupFormDemo />
          </div>
        </div>
        {responseGen !== "" && (
          <div className="w-full flex items-center justify-center">
            <div className="relative shadow-xl bg-neutral-950 border border-gray-800 px-4 py-8 w-[75rem] rounded-2xl flex flex-col justify-center items-center">
              <div>
                <span className="absolute mx-auto py-1 flex border bg-gradient-to-r blur-xl from-blue-500 via-teal-500 to-pink-500 bg-clip-text text-6xl box-content font-extrabold text-transparent text-center">
                  Our Analysis
                </span>
                <h1 className="relative top-0 w-fit h-auto py-4 justify-center flex bg-gradient-to-r items-center from-blue-500 via-teal-500 to-pink-500 bg-clip-text text-6xl font-extrabold text-transparent text-center select-auto">
                  Our Analysis
                </h1>
              </div>
              <div className="w-full">
                <Post words={responseGen} />
              </div>
            </div>
          </div>
        )}
      </div>
      </Vortex>
    </>
  );
}

export default function Home() {
  return (
    <FileInfoContextProvider>
      <Main />
    </FileInfoContextProvider>
  );
}
