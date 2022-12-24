import React from 'react'

const Cointop = ({img,symbol,rank,score,price_change}) => {
  return (
    <div className='coin_row flex p-4 items-center'>
      <div className='w-4'><img src={img} alt="" className='logo'/></div>
      <p className='pl-4 font-bold min-w-[6rem] text-xs'>{symbol}</p>
      <p className='min-w-[5rem] text-xs'>{rank}</p>
      { 
      price_change ?(
        price_change<0 ? <p className='coin_percent down text-red-600 lg:text-center text-xs'>{price_change?.toFixed(2)} %</p>
        :<p className='coin_percent up text-green-600 lg:text-center text-xs'>+ {price_change?.toFixed(2)} %</p>
      )
      :(<p></p>)
      }
      <p className='text-xs'>{score}</p>
    </div>
  )
}
export default Cointop