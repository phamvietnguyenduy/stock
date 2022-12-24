import React,{useState, useEffect,useRef} from 'react';
import Candlechart from '../componets/Candlechart';
const Coin = ({id,image,name,symbol,price,volume,price_change,kl,chart}) => {
    const src_chart= `https://www.coingecko.com/coins/${chart}/sparkline`
  return (
    <div className='coin_cointainer lg:w-[60%] md:w-[40%] relative'>
        
        <div className="coin_row  flex pb-8 lg:min-w-[45%] relative">
            <div className='group hidden lg:flex flex-row flex-nowrap justify-center items-center'>
                <div className='bg-blue-600 w-[100px] h-[30px] text-base flex items-center justify-center mr-3 text-white rounded-md'>OHLC</div>
                <Candlechart id={id} />
            </div>
            <div className="coin flex items-center text">
                <div className='w-4'><img src={image} alt="" className='logo'/></div>
                <div className='flex lg:flex-row flex-col-reverse box-border'>
                    <h1 className='pl-4 lg:min-w-[20rem] w-[5rem] lg:text-base text-[9px]'>{name}</h1>
                    <p className="coin_symbol font-bold pl-4 min-w-[5rem] lg:text-base text-sm">{symbol}</p>
                </div>
            </div>
            <div className='flex lg:flex-row flex-col box-border lg:ml-5 items-center justify-center'>
                <p className='coin_price lg:min-w-[12rem] min-w-[7rem] lg:text-center lg:text-base text-xs'>{price} $</p>
                { price_change < 0 ?(
                    <p className='coin_percent down text-red-600 lg:min-w-[6rem] lg:text-center lg:text-base text-[9px]'>{price_change.toFixed(2)} %</p>
                ):
                    (
                        <p className='coin_percent up text-green-600 lg:min-w-[6rem] lg:text-center lg:text-base text-[9px]'>{price_change.toFixed(2)} %</p>
                    )
                }
            </div>
            <div className="coin_data flex lg:flex-row flex-col box-border items-center justify-center ">
                <p className="coin_volume text-sm min-w-[100px] md:min-w-[11rem] lg:min-w-[8rem] ml-5 box-content lg:text-base text-xs">{volume.toLocaleString()} $</p>
                <p className="coin_volume text-sm min-w-[100px] md:min-w-[11rem] lg:min-w-[8rem] ml-5 box-content lg:text-base text-[9px]">{kl.toLocaleString()} $</p>
            </div>
            <div className='lg:min-w-[176px]'>
                <img className='lg:min-w-[176px] h-[64px]' src={src_chart} alt="" />
            </div>
        </div>
    </div>
  )
}

export default Coin