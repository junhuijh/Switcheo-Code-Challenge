"use client"
import CurrencyCard from "@/components/CurrencyCard";
import { DropdownMenu, DropdownMenuContent, DropdownMenuLabel, DropdownMenuTrigger } from "@radix-ui/react-dropdown-menu";
import { useEffect, useRef, useState } from "react";
import { currencies } from "@/components/CurrencyCard";
import { DropdownMenuSeparator } from "./ui/dropdown-menu";
import { Input } from "./ui/input";
import { CiCircleAlert } from "react-icons/ci";
import { FaArrowRightArrowLeft } from "react-icons/fa6";


export default function CurrencyExchange() {
  // B is 0.3 of A 
  // Fixed since there is no backend. 
  // If there is backend, we can call it for exchange rates)
  const EXCHANGE_RATE = 0.3;
  const [currencyA, setCurrencyA] = useState("AAVE");
  const [searchA, setSearchA] = useState("");
  const [dropdownWidth, setDropdownWidth] = useState(0);
  const [amountA, setAmountA] = useState("");
  const [amountAError, setAmountAError] = useState("");

  const [currencyB, setCurrencyB] = useState("ADA");
  const [searchB, setSearchB] = useState("");
  const [amountB, setAmountB] = useState("");
  const [amountBError, setAmountBError] = useState("");

  const triggerRef = useRef<HTMLDivElement | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    const updateDropdownWidth = () => {
      if (triggerRef.current) {
        const totalWidth = triggerRef.current.offsetWidth;
        setDropdownWidth(totalWidth);
      }
    };
    updateDropdownWidth();
    window.addEventListener('resize', updateDropdownWidth);
    return () => {
      window.removeEventListener('resize', updateDropdownWidth);
    };
  }, []);


  const handleDropdownOpenChange = (open: boolean) => {
    if (open) {
      // Wait for input to mount with timeout
      setTimeout(() => {
        if (inputRef.current) {
          inputRef.current.focus();
          setSearchA("");
          setSearchB("");
        }
      }, 0);
    }
  };

  const handleAmountAChange = (amount: string) => {
    if (/^\d*\.?\d{0,2}$/.test(amount)) {
        setAmountA(amount);
        let parsedAmount = Number.parseFloat(amount)*EXCHANGE_RATE;
        const formattedAmount = isNaN(parsedAmount) ? "0.00" : parsedAmount.toFixed(2);
        setAmountB(formattedAmount);
        setAmountBError("");
        setAmountAError("");
    } else if (amount.length > 0 && amount.split(".")[1]?.length > 2) {
        setAmountAError("Up to 2 decimals!");
    } else {
        setAmountAError("Enter Numbers!");
    }
  };

  const handleAmountBChange = (amount: string) => {
    if (/^\d*\.?\d{0,2}$/.test(amount)) {
        setAmountB(amount);
        let parsedAmount = Number.parseFloat(amount)/EXCHANGE_RATE;
        const formattedAmount = isNaN(parsedAmount) ? "0.00" : parsedAmount.toFixed(2);
        setAmountA(formattedAmount);
        setAmountBError("");
        setAmountAError("");
    } else if (amount.length > 0 && amount.split(".")[1]?.length > 2) {
        setAmountBError("Up to 2 decimals!");
    } else {
        setAmountBError("Enter Numbers!");
    }
  };



  return (
    <div className="flex p-10 border-[5px] border-white rounded-[22px] m-[5%] justify-between">
      {/* CurrencyA */}
      <div className="flex flex-col w-[40%]">
        <DropdownMenu onOpenChange={(open)=>handleDropdownOpenChange(open)}>
        <DropdownMenuTrigger asChild className="border-white rounded-xl p-4 border-[1px]">
            <div className="px-3" ref={triggerRef} ><CurrencyCard currency={currencyA}/></div>
          </DropdownMenuTrigger>
          <DropdownMenuContent 
            className="bg-black overflow-auto max-h-[60vh] border-[5px] border-white rounded-xl"  
            style={{ width: dropdownWidth }}>
            <Input 
              placeholder="Search" onChange={(event)=>setSearchA(event.target.value)} 
              className="h-12 text-xl"
              ref = {inputRef}/>
            {currencies.filter(currency => currency.toLowerCase().includes(searchA.toLowerCase())).
              map((currency=>{
                if(currency != currencyA && currency!= currencyB){
                  return(
                  <DropdownMenuLabel onClick={()=>setCurrencyA(currency)} className="pt-1 px-2">
                    <CurrencyCard currency={currency}/>
                    <DropdownMenuSeparator/>
                  </DropdownMenuLabel>
                  )}
            }))}
          </DropdownMenuContent>
        </DropdownMenu>

        <Input 
          className="mt-5 text-[5rem] h-auto" 
          onChange={(event)=>handleAmountAChange(event.target.value)}
          value={amountA}/>
        {amountAError!="" 
          && 
          <div className="bg-red-300 rounded-lg flex items-center justify-start space-x-1 my-2 text-2xl">
            <CiCircleAlert className="ml-2"/>
            <div className="">{amountAError}</div>
          </div>
        }
      </div>

      {/* Splitter */}
      <div className="flex flex-col items-center justify-center space-y-[2px]">
        <div className=" text-gray-600">x{EXCHANGE_RATE.toFixed(2)}</div>
        <FaArrowRightArrowLeft/>
        <div className=" text-gray-600">x{(1/EXCHANGE_RATE).toFixed(2)}</div>
      </div>


      {/* CurrencyB */}
      <div className="flex flex-col w-[40%]">
        <DropdownMenu onOpenChange={(open)=>handleDropdownOpenChange(open)}>
        <DropdownMenuTrigger asChild className="border-white rounded-xl p-4 border-[1px]">
            <div className="px-3" ref={triggerRef} ><CurrencyCard currency={currencyB}/></div>
          </DropdownMenuTrigger>
          <DropdownMenuContent 
            className="bg-black overflow-auto max-h-[60vh] border-[5px] border-white rounded-xl"  
            style={{ width: dropdownWidth }}>
            <Input 
              placeholder="Search" onChange={(event)=>setSearchB(event.target.value)} 
              className="h-12 text-xl"
              ref = {inputRef}/>
            {currencies.filter(currency => currency.toLowerCase().includes(searchB.toLowerCase())).
              map((currency=>{
                if(currency != currencyA && currency!=currencyB){
                  return(
                  <DropdownMenuLabel onClick={()=>setCurrencyB(currency)} className="pt-1 px-2">
                    <CurrencyCard currency={currency}/>
                    <DropdownMenuSeparator/>
                  </DropdownMenuLabel>
                  )}
            }))}
          </DropdownMenuContent>
        </DropdownMenu>

        <Input 
          className="mt-5 text-[5rem] h-auto" 
          onChange={(event)=>handleAmountBChange(event.target.value)}
          value={amountB}/>
        {amountBError!="" 
          && 
          <div className="bg-red-300 rounded-lg flex items-center justify-start space-x-1 my-2 text-2xl">
            <CiCircleAlert className="ml-2"/>
            <div className="">{amountBError}</div>
          </div>
        }
      </div>
          
    </div>
  );
}
