import React from "react";
import { FloatingDock } from "@/components/ui/floating-dock";
import {
  IconForklift,
  IconHome,
  IconLogin,
  IconMessageChatbot,
  IconPlus
} from "@tabler/icons-react";

export function FloatingDockDemo() {
  const links = [
    {
      title: "Home",
      icon: (
        <IconHome className="h-full w-full text-neutral-500 dark:text-neutral-300" />
      ),
      href: "/",
    },

    {
      title: "ChatBot",
      icon: (
        <IconMessageChatbot className="h-full w-full text-neutral-500 dark:text-neutral-300" />
      ),
      href: "#",
    },
    {
      title: "Add",
      icon: (
        <IconPlus className="h-full w-full text-neutral-500 dark:text-neutral-300" />
      ),
      href: "#",
    },
    {
      title: "Inventory",
      icon: (
        <IconForklift className="h-full w-full text-neutral-500 dark:text-neutral-300"></IconForklift>
      ),
      href: "#",
    },
    {
      title: "Signup",
      icon: (
        <IconLogin className="h-full w-full text-neutral-500 dark:text-neutral-300" />
      ),
      href: "#",
    },
  ];

  return (
    <div className="fixed bottom-[15px] w-full flex items-center justify-center">
      <FloatingDock
        mobileClassName="translate-y-20" 
        items={links}
      />
    </div>
  );
}
