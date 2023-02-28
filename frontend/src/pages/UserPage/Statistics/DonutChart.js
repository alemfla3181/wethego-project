import React, { useState } from 'react' ;
import Chart from "react-apexcharts";


export default function DonutChart( {monthday, workHours}) {


  // //도넛용 데이터 여기서 직접 만져줘야할 거같다.
  let totalWorking =0 ;   // 정규 근로 시간 합계
  let totalOvertime =0 ;  // 초과 근로 시간 합계

  for(let i = 0 ; i< monthday ; i++){
    // (가정) 기본적으로 workHours[i]["workHours"]는 항상 양수이다.
    if (workHours[i]["bfworkHours"] < 8) {
      totalWorking += workHours[i]["bfworkHours"]
    } else {
      totalOvertime += workHours[i]["afworkHours"]
    }
  }

  let list = [totalWorking, totalOvertime]

//도넛 차트 데이터 및 옵션

const donutData = {
  series: list,
  options: {
    dataLabels:{                  // 데이터 라벨 
      enabled: true,              //-// 라벨 보여줌 여부
      formatter: function(value) {                            //여기는 도넛 라벨에 걸린 숫자
        return Math.round(list.reduce((a,b)=>a+b)*value/100)  // reduce()로 배열 합계 구함.
      }
    },
    chart: {
      type: 'donut',
      animations: {
        enabled: true,
        easing: 'easeinout',
        speed: 1000,          // 밀리세컨즈 단위
        animateGradually: {
            enabled: true,
            delay: 150
        },
        dynamicAnimation: {
            enabled: true,
            speed: 350
        }
      }
    },
    legend: {
      position: 'bottom'
    },
    responsive: [{
      breakpoint: 480,
    }],
    plotOptions: {
      pie: {
        expendOnClick:false,       
        donut: {
          size: '65%',            // 도넛 크기
          labels: {               // 가운데 글씨 
            show: true,           //-// 보여줌 여부

            total: {              
              show: true,        // 도넛 가운데 타이틀 표시 여부
              showAlways: true,
              label: '총 급여',
              fontSize: '15px',
              fontFamily: 'Helvetica, Arial, sans-serif',
              fontWeight: 600,
              color: 'blue',
              formatter: function(value) {
                return Math.round(list.reduce((a,b)=>a+b))*100+"원" //여기에 최저임금 곱해주기
              }
            },

            value: {
              show: true,
              fontSize: '20px',
              fontFamily: 'Helvetica, Arial, sans-serif',
              fontWeight: 60,
              color: 'black',
              offsetY: 1,
              formatter: function(val) {return val+"시간"}
            },
          },
        }
      }
    },
    labels: ["소정 근로 시간", "초과 근무 시간"],
    title: {
      text: '이달 예상 급여',
      align: 'center'
    },
  },
}


  return (<>
    <Chart 
            options={donutData.options}
            series={donutData.series}
            type="donut" 
            width="100%"
            height="100%"
        />
  </>)
}
