import React from "react";
import { FloatingDock } from "@/components/ui/floating-dock";
import {
  IconForklift,
  IconHome,
  IconLogin,
  IconMessageChatbot,
  IconPlus,
} from "@tabler/icons-react";
import { useConnect } from "wagmi";

export function FloatingDockDemo({ handleClickOpen, handleChatOpen }: any) {
  const { connectors, connect } = useConnect();

  // Function to handle the MetaMask connection
  const handleMetaMaskConnect = () => {
    console.log("MetaMask connect button clicked"); // Debugging log

    const metaMaskConnector = connectors.find(
      (connector) => connector.name === "MetaMask"
    );

    if (metaMaskConnector) {
      console.log("MetaMask connector found, attempting to connect"); // Debugging log
      connect({ connector: metaMaskConnector });
    } else {
      console.error("MetaMask connector not found");
    }
  };

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
        <IconMessageChatbot
          onClick={handleChatOpen}
          className="h-full w-full text-neutral-500 dark:text-neutral-300"
        />
      ),
      href: "#",
    },
    {
      title: "Add",
      icon: (
        <IconPlus
          onClick={handleClickOpen}
          className="h-full w-full text-neutral-500 dark:text-neutral-300"
        />
      ),
      href: "#",
    },
    {
      title: "Inventory",
      icon: (
        <IconForklift className="h-full w-full text-neutral-500 dark:text-neutral-300"></IconForklift>
      ),
      href: "https://detect.roboflow.com/?model=asajs&version=1&api_key=8YAu3beq4eq744zdYXcj",
    },
    {
      title: "Connect MetaMask",
      icon: (
        <IconLogin
          onClick={handleMetaMaskConnect}
          className="h-full w-full text-neutral-500 dark:text-neutral-300"
        />
      ),
      href:"#"
    },
  ];

  return (
    <div className="fixed bottom-[15px] w-full flex items-center justify-center">
      <FloatingDock mobileClassName="translate-y-20" items={links} />
    </div>
  );
}
