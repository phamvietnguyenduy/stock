import axios from 'axios';
import React,{useState, useEffect,useRef} from 'react'
import Coin from './componets/Coin';
import Navbar from './componets/Navbar';
import ReactPaginate from 'react-paginate';
import _ from 'lodash';
import isEqual from 'lodash/isEqual';
import Cointop from './componets/Cointop';


function App() {
  // resAPI
  const crypto_URL= 'https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false'
  const trendcoin_URL='https://api.coingecko.com/api/v3/search/trending'
  const [allcoins, setallcoins] = useState([]);
  const [trendcoin, settrendcoin] = useState({});
  const [search, setsearch] = useState('');
  const [checkmenu, setcheckmenu] = useState(false);
  const typingtimeout= useRef(null)
  //pagginate variable
  const [currentitems, setcurrentitems] = useState([]);
  const [pagecount, setpagecount] = useState(0);
  const [itemsAmount, setitemsAmount] = useState(0);
  const [stateitem, setstateitem] = useState(false);
  console.log('request')
  // const time_reload = setTimeout(() => { 
  useEffect(() => {
    const request1=axios.get(crypto_URL)
    const request2=axios.get(trendcoin_URL)
    axios.all([request1, request2]).then(axios.spread((...res) => {
    // .then( res=>{
      setallcoins(res[0].data)
      settrendcoin(res[1].data)
      if(stateitem===true) {setstateitem(false)} else setstateitem(true)
    })).catch(error=>alert('something went wrong'))
  },[]);
  // }, 100);
  // return () => clearTimeout(time_reload);
  const {coins}=trendcoin
  //onchange search filter
  const handle_searchchange= e=>{
    const value_search=e.target.value
    //debounce technique
    if(typingtimeout.current){
      clearTimeout(typingtimeout.current)
    }
    typingtimeout.current = setTimeout(() => {
      setsearch(value_search)
      if(stateitem===true) {setstateitem(false)} else setstateitem(true)
      setitemsAmount(0)
    }, 500);
  }
  const coin_filter= allcoins.filter( coin =>
    coin.name.toLowerCase().includes(search.toLowerCase())
  )
  //check state cause error
  //pagginate effect
  useEffect(() => {
    const endOffset= itemsAmount + 10
    // console.log(`Loading items from ${itemsAmount} to ${endOffset}`);
    setcurrentitems(coin_filter.slice(itemsAmount, endOffset));
    setpagecount(Math.ceil(coin_filter.length/10))
  }, [itemsAmount,stateitem])
  //handle pagginate
  const handle_pagginate= e=>{
    const newOffset =(e.selected*10)%(coin_filter.length)
    setitemsAmount(newOffset)
  }
  //responsive by js
//js_responsive by get window_width
  const [width, setWidth]   = useState(window.innerWidth);
  const updateDimensions = () => {
      setWidth(window.innerWidth);
  }
  useEffect(() => {
      window.addEventListener("resize", updateDimensions);
  }, [width]);
  
  //format
  const format_number= num=>{
    if(num<0) num=num*(-1)
    if (num < 1e3) return num;
    if (num >= 1e3 && num < 1e6) return +(num / 1e3).toFixed(1) + " K";
    if (num >= 1e6 && num < 1e9) return +(num / 1e6).toFixed(1) + " M";
    if (num >= 1e9 && num < 1e12) return +(num / 1e9).toFixed(1) + " B";
    if (num >= 1e12) return +(num / 1e12).toFixed(1) + " T";
  }
  // get id of chart
  const getchart= s=>{
    const string = s
    const breakpoint = "/"
    const splitted = string.split(breakpoint);
    return splitted[5]
  }
  return (
  <>
    <div className="App mb-5">
      <Navbar checkmenu={checkmenu} setcheckmenu={setcheckmenu} />
      <div className="market_place hidden mb-3 w-fit mx-auto lg:grid grid-cols-3 gap-12">
        <div className='Trendcoin_area'>
          <h1 className='text-sm text-black'>Trending Coin</h1>
          {
            coins?.slice(0, 3).map(coin=>{
              const {item:{coin_id,symbol,small,market_cap_rank,score}}=coin
              return (
                <Cointop key={coin_id} symbol={symbol} img={small} rank={market_cap_rank} score={score} />
              )
            }
            )
          }
        </div>
        <div className='highest'>
          <h1 className='text-sm text-black'>Top KL</h1>
            {
              allcoins?.slice(0, 3).map(coin=>{
                let mkl_24h =  coin.market_cap_change_24h
                mkl_24h=format_number(mkl_24h)
                return (
                  <Cointop key={coin.id} symbol={coin.symbol} img={coin.image} price_change={coin.price_change_percentage_24h} rank={mkl_24h}  />
                )
              }
              )
            }
        </div>
        <div className=''>
        <h1 className='text-sm text-black'>Top Ingrease</h1>
          {
            allcoins?.filter(percent => percent.price_change_percentage_24h > 0).slice(0, 3).map(coin=>{
              let mkl_24h =  coin.market_cap_change_24h
              mkl_24h=format_number(mkl_24h)
              return (
                <Cointop key={coin.id} symbol={coin.symbol} img={coin.image} price_change={coin.price_change_percentage_24h} rank={mkl_24h}  />
              )
            }
            )
          }
        </div>
      </div>
      <div className="search_area lg:mx-auto flex justify-between pl-5 mb-7  w-full lg:w-[60%] items-center">
          <h2 className='text-black text-xs lg:text-lg flex-grow'>All Currency</h2>
          <form action="">
            <input type="text" className='coin_input w-[80%] lg:w-full bg-slate-300 border-gray-900 outline-1 pl-3 py-1 text-black text-sm' onChange={handle_searchchange} placeholder="Search Currency"/>
          </form>
      </div>
      <div className="coin_tittle hidden mb-3 ml-60  w-[60%] lg:flex flex-row items-center justify-between">
              <p className='min-w-[9rem]'>OHLC</p>
              <p className='min-w-[18rem]'>Name</p>
              <p className='min-w-[6rem] text-center'>iconic</p>
              <p className='min-w-[13rem] text-center'>Price</p>
              <p className='min-w-[6.5rem] text-center'>Change</p>
              <p className='min-w-[6rem] text-center'>Market_cap</p>
              <p className='min-w-[12rem] text-center'>KL</p>
      </div>
      <div className='mobile_tittle w-[80%] sm:w-[50%] md:w-[34%] mx-auto lg:hidden flex mb-3 justify-between'>
        <p className=' text-center text-sm text-gray-500'>Name</p>
        <p className=' text-center text-sm text-gray-500'>Price/Change</p>
        <p className=' text-center text-sm text-gray-500'>Cap/KL</p>
      </div>
      <div className='flex items-start pl-5 lg:pl-60 flex-col sm:items-center md:items-center lg:items-start'>
        {
          currentitems.map(coin=>{
            let volume = coin.market_cap
            let mkl_24h =  coin.market_cap_change_24h
            volume=format_number(volume)
            mkl_24h=format_number(mkl_24h)
            // do chart
            const chart=getchart(coin.image)
            return(
              <Coin key={coin.id} id={coin.id}  chart={chart} image={coin.image}  name={coin.name} price={coin.current_price} volume={volume} symbol={coin.symbol} price_change={coin.price_change_percentage_24h} kl={mkl_24h}/>
            )
          }
          )
        }
       <ReactPaginate 
        nextLabel="next >"
        onPageChange={handle_pagginate}
        pageRangeDisplayed={2}
        marginPagesDisplayed={2}
        pageCount={pagecount}
        previousLabel="< previous"
        pageClassName="page-item"
        pageLinkClassName="page-link"
        previousClassName="page-item"
        previousLinkClassName="page-link"
        nextClassName="page-item"
        nextLinkClassName="page-link"
        breakLabel="..."
        breakClassName="page-item"
        breakLinkClassName="page-link"
        containerClassName="pagination"
        activeClassName="active"
        renderOnZeroPageCount={null}
        className='pagination flex'
       />
      </div>
      
    </div>
  </>
  );
}

export default App;
