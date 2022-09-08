import React, { useEffect } from 'react'
import {useSelector} from "react-redux"
import { Bar, Doughnut, Line } from 'react-chartjs-2'
import {Chart as ChartJS} from 'chart.js/auto'
import style from './DonutChart.module.css'
import { useDispatch } from 'react-redux'
import { getAllBoughts } from '../../../redux/actions/productActions'

export default function DonutChart({chartData}) {
  const { boughts } = useSelector((state) => state.product);
  let dispatch = useDispatch()
  useEffect(()=>{
    dispatch(getAllBoughts())
  },[dispatch])
  console.log('Boughts from donutChart', boughts);
  
    const state = {
        labels: ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'],
        datasets: [
          {
            label: 'Sales',
            backgroundColor: '#5f27cd',
            borderColor: 'rgba(0,0,0,1)',
            borderWidth: 2,
            data: [0,0,0,0,0,0,0,0,boughts.length,0,0,0]
          }
        ]
      }
  return (
    <div className={style.globalContainer}>
    <Line
      data={state}
      className={style.chart}
      options={{
        scales: {
          x: {
            max: 100,
            min: 0
          },
          y: {
            max: boughts.length>10?boughts.length:10,
            min: 0
          }
      },
        title:{
          display:true,
          text:'Average Sales per month',
          fontSize:30
        },
        legend:{
          display:true,
          position:'right'
        }
      }}
    />
  </div>
  )
}

