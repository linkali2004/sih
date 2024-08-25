"use client";
import { FloatingDockDemo } from '@/components/FloatingDockDemo'
import { FocusCardsDemo } from '@/components/FocusCardsDemo';
import Modal from '@/components/Modals';
import React from 'react'
import { useAccount, useDisconnect} from 'wagmi'

function MainPage() {
  const [open, setOpen] = React.useState(false);
  const[title,setTitle] = React.useState("");
  const[fileUploadTrue,setfileUploadTrue] = React.useState(false);
  const handleClickOpen = () => {
    setOpen(true);
    setfileUploadTrue(true);
    setTitle("Upload Drug Information")
  };
  const handleChatOpen = () => {
    setOpen(true);
    setfileUploadTrue(false);
    setTitle("ChatBot");
  };
  const handleClose = () => {
    setOpen(false);
  };
  const { address } = useAccount()
  return (
    <div className="p-4 w-full h-full bg-dark flex flex-col">
      <div className='w-full p-3 flex justify-end'>
      <button className="shadow-[0_0_0_3px_#000000_inset] px-6 py-2 bg-transparent border border-neutral-500 dark:border-neutral-500 dark:text-neutral-300 text-black rounded-lg font-bold transform hover:-translate-y-1 transition duration-400">
  Manufacturer
</button>
      </div>
    <div className="h-full w-full">
      <div className='bg-neutral-800 h-full w-full rounded-lg pt-[28px] pb-[28px]'>
        <FocusCardsDemo></FocusCardsDemo>
      </div>
    </div>
    {/* Spacer to push the dock to the bottom */}
    <div className="flex-grow"></div>

    {/* Floating dock at the bottom */}
    <FloatingDockDemo handleClickOpen={handleClickOpen} handleChatOpen={handleChatOpen}/>

    <Modal open = {open} setOpen={setOpen} handleClickOpen={handleClickOpen} handleClose={handleClose} title={title} fileUploadTrue={fileUploadTrue}></Modal>
  </div>
  )
}

export default MainPage
