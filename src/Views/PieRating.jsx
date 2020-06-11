import React from 'react';
import {Doughnut} from 'react-chartjs-2';

 const PieRating=()=> {
    const state={
        chartData:{
            labels:['1 rating','2 rating', '3 rating','4 rating','5 rating'],
            datasets:[{
                label:'Population',
                data:[1,2,3,4,5],
                backgroundColor:[`rgba(255,206,86,0.6)`,
                                 `rgba(75,192,192,0.6)`,
                                 `rgba(153,102,255,0.6)`,
                                 `rgba(255,159,64,0.6)`,
                                `rgba(255,99,132,0.6)`]
            }]
        }
    }

    return (
        <div>
             <Doughnut
                data={state.chartData}
                option={{
                    title:{
                        display:true,
                        text:'Asdf gfjehf wbdhd',
                        fontSize:25
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

export default PieRating;