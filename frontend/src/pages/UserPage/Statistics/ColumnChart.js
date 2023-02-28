import React from 'react' ;
import Chart from "react-apexcharts";


export default function ColumnChart( { monthday, workHours=[] } ) {


// monthday : 해당 월 날수
// workHours : 조회된 유저의 해당 월 날별 근로시간 수


let days=[];
let working=[];   // 정규 근로 시간
let lack=[]       // 미달 근로 시간
let overtime=[];  // 초과 근로 시간

if(monthday == workHours.length){
  for(let i = 0 ; i<monthday ; i++){
    days.push(`${i+1}일`)

    // (가정) 기본적으로 workHours[i]["workHours"]는 항상 양수이다.
    if (workHours[i]["bfworkHours"] < 8) {
      
      working.push(workHours[i]["bfworkHours"])
      lack.push(8-workHours[i]["bfworkHours"])
      overtime.push(0)

    } else {
      working.push(8)
      lack.push(0)
      overtime.push(workHours[i]["afworkHours"])
    }
    
  }
}


let list = [{
    name: '정규 근로 시간',      
    data: working          // 일짜별 근로 시간
  },{
    name: '근로 미달 시간',   
    data: lack             // 일짜별 근로 미달 시간
  },{
    name: '초과 근무 시간',    
    data: overtime         // 일짜별 초과 근로 시간
  }
]

//도넛 차트 데이터 및 옵션
//

const colomnData = {
  series: list,
  options: {

    colors:['#267EC3', '#B2A69C', '#26E7A6'],
    dataLabels:{                  // 데이터 라벨 
      enabled: true,              //-// 라벨 보여줌 여부
    },

    grid:{
      show: true,

    },

    yaxis:{                   //  y축 설정
      show: true,
      min: 0,
      max: 16,
      tickAmount:4,           // max-min 등분 수
    },

    chart: {
      type: 'donut',
      stacked: true,
      toolbar:{               // 오른쪽 상단 툴바
        show:false,
          tools:{
            download:false
            }
        },
      animations: {           // 에니메이션 설정
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
    legend: {             // 밑에 골라보기
      show:true,
      position: 'bottom',
      onItemClick: {
        toggleDataSeries: false
      },
    },
    responsive: [{
      breakpoint: 480,
    }],
    plotOptions: {
      bar: {
        horizontal: false,
        dataLabels: {
        position: 'bottom'
        }
      }
    },
    labels: days, 
    title: {
      text: '날짜별 근로시간',
      align: 'center'
    },
  },
}


  return (<>
      <Chart 
            options={colomnData.options}
            series={colomnData.series}
            type="bar" 
            width="100%"
            height="100%"
        />
  </>)
}
