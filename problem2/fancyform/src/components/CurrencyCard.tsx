import React from 'react'
import AAVE from '@/components/tokens/AAVE.svg'
import ADA from '@/components/tokens/ADA.svg'
import AEVO from '@/components/tokens/AEVO.svg'
import AGI from '@/components/tokens/AGI.svg'
import AKRO from '@/components/tokens/AKRO.svg'
import AKT from '@/components/tokens/AKT.svg'
import ALGO from '@/components/tokens/ALGO.svg'
import ALPHA from '@/components/tokens/ALPHA.svg'
import ALT from '@/components/tokens/ALT.svg'
import AMP from '@/components/tokens/AMP.svg'


const currenciesDictionary:{ [key: string]: React.FunctionComponent<React.SVGProps<SVGSVGElement>> } = {
    "AAVE": AAVE,
    "ADA": ADA,
    "AEVO": AEVO,
    "AGI": AGI,
    "AKRO": AKRO,
    "AKT": AKT,
    "ALGO": ALGO,
    "ALPHA": ALPHA,
    "ALT": ALT,
    "AMP": AMP,
}

export const currencies = [
    "AAVE",
    "ADA",
    "AEVO",
    "AGI",
    "AKRO",
    "AKT",
    "ALGO",
    "ALPHA",
    "ALT",
    "AMP"
]

export default function CurrencyCard({currency}:{currency:string}){
    const Currency = currenciesDictionary[currency];
    return (
        <div className='flex space-x-2 text-4xl'>
            <Currency/>
            <div>{currency}</div>
        </div>
    )
}
