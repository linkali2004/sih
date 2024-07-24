/* eslint-disable @next/next/no-img-element */
"use client";
import React from "react";
import { cn } from "../utils/cn";
import { create } from "zustand";

export function useScrollDirection() {
  const [scrollDirection, setScrollDirection] = React.useState(null);

  React.useEffect(() => {
    let lastScrollY = window.pageYOffset;

    const updateScrollDirection = () => {
      const scrollY = window.pageYOffset;
      const direction = scrollY > lastScrollY ? "down" : "up";
      if (
        direction !== scrollDirection &&
        (scrollY - lastScrollY > 5 || scrollY - lastScrollY < -5)
      ) {
        setScrollDirection(direction);
      }
      lastScrollY = scrollY > 0 ? scrollY : 0;
    };
    window.addEventListener("scroll", updateScrollDirection); // add event listener
    return () => {
      window.removeEventListener("scroll", updateScrollDirection); // clean up
    };
  }, [scrollDirection]);

  return scrollDirection;
}

export const useNavStore = create((set) => ({}));

const Header = () => {
  const scrollDirection = useScrollDirection();

  return (
<header
  className={cn(
    "w-full transition-all duration-500 z-50 top-0 left-0 right-0 sm:mt-4 sm:ml-3 sm:mr-3 mt-2 ml-2 mr-2 flex items-center justify-between lg:flex-row flex-col gap-4 mb-3 sm:mb-4",
    `${scrollDirection === "down" ? "sm:top-0 -top-48" : "top-0"}`
  )}
>
  <img
    src="./logo.png"
    alt="logo"
    className="w-40 block backdrop-blur-xl bg-slate-900 bg-opacity-45 rounded-2xl pl-4 pr-5 pt-3 pb-2"
  />
  <a
    href="https://voltius.ai/"
    className="flex items-center gap-2 text-white bg-slate-900 bg-opacity-45 rounded-2xl px-4 py-2 backdrop-blur-xl"
  >
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="icon icon-tabler icons-tabler-outline icon-tabler-info-square"
    >
      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
      <path d="M12 9h.01" />
      <path d="M3 5a2 2 0 0 1 2 -2h14a2 2 0 0 1 2 2v14a2 2 0 0 1 -2 2h-14a2 2 0 0 1 -2 -2v-14z" />
      <path d="M11 12h1v4h1" />
    </svg>
    Contact Us
  </a>
</header>

  );
};

export default Header;