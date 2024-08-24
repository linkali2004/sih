import React from "react";
import { BackgroundBeamsWithCollision } from "@/components/ui/background-beams-with-collision";
import Link from "next/link";

export function BackgroundBeamsWithCollisionDemo() {
  return (
    <BackgroundBeamsWithCollision>
      <div className="flex flex-col items-center justify-center h-full px-4 md:px-8 lg:px-12">
        <h2 className="text-2xl relative z-20 md:text-4xl lg:text-5xl xl:text-7xl font-bold text-center text-black dark:text-white font-sans tracking-tight">
          Sushrut Aushadruchi
        </h2>
        <div className="relative mx-auto inline-block w-full max-w-3xl mt-4 sm:mt-6 md:mt-8 lg:mt-10 [filter:drop-shadow(0px_1px_3px_rgba(27,_37,_80,_0.14))]">
          <div className="absolute left-0 top-[1px] bg-clip-text bg-no-repeat text-transparent bg-gradient-to-r py-4 from-purple-500 via-violet-500 to-pink-500 [text-shadow:0_0_rgba(0,0,0,0.1)]">
            <span className="text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl block text-center">
              Revolutionizing Drug Safety with Blockchain and ML-Driven Supply Chain Intelligence.
            </span>
          </div>
          <div className="relative bg-clip-text text-transparent bg-no-repeat bg-gradient-to-r from-purple-500 via-violet-500 to-pink-500 py-4">
            <span className="text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl block text-center">
              Revolutionizing Drug Safety with Blockchain and ML-Driven Supply Chain Intelligence.
            </span>
          </div>
        </div>
        <button className="p-[3px] relative mt-6 sm:mt-8 md:mt-10 lg:mt-12">
          <div className="absolute inset-0 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-lg" />
          <div className="px-6 md:px-8 lg:px-12 py-2 md:py-3 lg:py-4 bg-black rounded-[6px] relative group transition duration-200 text-white hover:bg-transparent">
            <Link href="/MainPage">
              Upload Drug Info
            </Link>
          </div>
        </button>
      </div>
    </BackgroundBeamsWithCollision>
  );
}
