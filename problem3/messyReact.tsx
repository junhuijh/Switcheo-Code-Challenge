// A lot of missing imports
// Should try to place the
//    1. interface
//    2. class
//    3. certain functions (e.g. getPriority())
// into a library folder and import for use


import React from "react";
import { useEffect, useMemo, useState } from "react";

interface WalletBalance {
  currency: string;
  amount: number;
  blockchain:string
}
interface FormattedWalletBalance {
  currency: string;
  amount: number;
  formatted: string;
}

interface Currency{
  currency:string;
  date:Date;
  price:number;
}

class Datasource {
  // TODO: Implement datasource class
  url:string;
  constructor(url:string){
    this.url = url;
  }
  async getPrices(){
    try{
      const res = await fetch(this.url,{
          method:'GET'
      });
    
      if(!res.ok){
          throw new Error(`HTTP ERROR! STATUS:${res.status}`);
      }
      const data:Currency[] = await res.json();
      var parsedData:{[key:string]:number} = {};
      for (var i = 0; i < data.length; i++) {
        parsedData[data[i].currency] = data[i].price;
      }
      return parsedData;
    }catch(err:any){
      console.log(err.stack);
    }
    return null;
  }
}

// missing import for BoxProps
// interface Props extends BoxProps {
interface Props {
  children:string;
  rest:{}

}

// missing import for this function?
const useWalletBalances = ()=>{
  const walletBalances:WalletBalance[] = [
    {
      currency:"",
      amount: 0,
      blockchain:"",
    },
    {
      currency:"",
      amount: 0,
      blockchain:"",
    },
    {
      currency:"",
      amount: 0,
      blockchain:"",
    },
  ]
  return walletBalances;
}
const WalletPage: React.FC<Props> = (props: Props) => {
  const { children, ...rest } = props;
  const balances = useWalletBalances();
	const [prices, setPrices] = useState<{[key:string]:number}|null>();

  useEffect(() => {
    const datasource = new Datasource("https://interview.switcheo.com/prices.json");
    datasource.getPrices().then(prices => {
      setPrices(prices);
    }).catch(err => {
      //typo
      console.error(err);
    });
  }, []);

	const getPriority = (blockchain: any): number => {
	  switch (blockchain) {
	    case 'Osmosis':
	      return 100;
	    case 'Ethereum':
	      return 50;
	    case 'Arbitrum':
	      return 30;
	    case 'Zilliqa':
	      return 20;
	    case 'Neo':
	      return 20;
	    default:
	      return -99;
	  }
	}

  const sortedBalances = useMemo(() => {
    return balances.filter((balance: WalletBalance) => {
		  const balancePriority = getPriority(balance.blockchain);
		  if (balancePriority > -99 && balance.amount<=0) {
		    return true;
		  }else{
        return false;
      }
		}).sort((lhs: WalletBalance, rhs: WalletBalance) => {
			return getPriority(rhs.blockchain)-getPriority(lhs.blockchain)
    });
  }, [balances, prices]);

  const formattedBalances = sortedBalances.map((balance: WalletBalance) => {
    return {
      ...balance,
      formatted: balance.amount.toFixed()
    }
  })

  //formattedBalances instead of sorted Balances
  const rows = formattedBalances.map((balance: FormattedWalletBalance, index: number) => {
    if(prices==null) return (<></>);
    const usdValue = prices[balance.currency] * balance.amount;
    return (
      <WalletRow 
        // not sure what classes.row is
        // className={classes.row} 
        key={index}
        amount={balance.amount}
        usdValue={usdValue}
        formattedAmount={balance.formatted}
      />
    )
  })

  return (
    <div {...rest}>
      {rows}
    </div>
  )
}

export interface WalletRowProps
  extends React.AllHTMLAttributes<HTMLAllCollection>{
    amount:number;
    usdValue:number;
    formattedAmount:string;
  }
const WalletRow =  React.forwardRef<HTMLInputElement, WalletRowProps>(
  ({ className, type, ...props }, ref) => {
  return(
    <div>
    </div>
  )
})