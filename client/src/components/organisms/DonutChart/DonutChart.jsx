import React from 'react'
import { Bar, Doughnut, Line } from 'react-chartjs-2'
import {Chart as ChartJS} from 'chart.js/auto'
import style from './DonutChart.module.css'

export default function DonutChart({chartData}) {
    const state = {
        labels: ['May', 'June', 'July', 'August'],
        datasets: [
          {
            label: 'Sales',
            backgroundColor: '#5f27cd',
            borderColor: 'rgba(0,0,0,1)',
            borderWidth: 2,
            data: [3, 10, 5, 19]
          }
        ]
      }
  return (
    <div className={style.globalContainer}>
    <Line
      data={state}
      className={style.chart}
      options={{
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

