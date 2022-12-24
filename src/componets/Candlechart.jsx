import axios from 'axios';
import React,{useState, useEffect,useRef} from 'react'
import ApexCharts from 'apexcharts'
import Chart from "react-apexcharts";
const Candlechart = ({id}) => {
  const candles_URL=`https://api.coingecko.com/api/v3/coins/${id}/ohlc?vs_currency=usd&days=30`
  const [candles,setcandles]= useState([]);
  useEffect(() => {
    const request_test= axios.get(candles_URL)
    axios.all([request_test]).then(axios.spread((...res) => {
    // .then( res=>{
      setcandles(res[0].data)
    })).catch(error=>alert('something went wrong'))
  },[]);
  let item=[]
  candles?.map(cand=>{
    const items={
      x: new Date(cand[0]),
      y: [cand[1],cand[2], cand[3], cand[4]]
    };
   item.push(items)
  })
  const state = {
    series: [
      {
        name: 'OHLC',
        type: 'candlestick',
        data: item
      },
    ],
    options: {
      chart: {
        type: 'candlestick',
        height: 350,
      },
      title: {
        text: 'CandleStick Chart',
        align: 'left'
      },
      stroke: {
        width: 1
      },
      xaxis: {
        type: 'datetime',
        lines: {
            show: true
        }
      },
      yaxis: [
        {
          tooltip: {
            enabled: true
          },
          lines: {
              show: true
          },
          axisTicks: {
            show: true,
          },
          axisBorder: {
            show: true,
            color: '#008FFB'
          },
          labels: {
            style: {
              colors: '#008FFB',
            }
          },
        },
      ],
      grid: {
        show: true,
        borderColor: '#90A4AE',
        strokeDashArray: 0,
        position: 'back',
        xaxis: {
            lines: {
                show: true
            }
        },   
        yaxis: {
            lines: {
                show: true
            },
            
        }
      },   
    
    },
    
  }
  return (
    <div className='absolute z-30 border-solid border-[1px] border-slate-400 bg-white hidden group-hover:block top-4 left-20 rounded-lg py-2'>
    <Chart options={state.options} series={state.series} type='line' height={350} width={800} />
    </div>
  )
}

export default Candlechart