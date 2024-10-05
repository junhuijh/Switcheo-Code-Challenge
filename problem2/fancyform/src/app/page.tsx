import CurrencyExchange from "@/components/currencyExchange";
import { DropdownMenu, DropdownMenuContent, DropdownMenuLabel, DropdownMenuTrigger } from "@radix-ui/react-dropdown-menu";
import { useState } from "react";
import AAVE from '@/components/tokens/AAVE.svg'
export default function Home() {

  return (
    // <AAVE/>
    <CurrencyExchange/>
  );
}
