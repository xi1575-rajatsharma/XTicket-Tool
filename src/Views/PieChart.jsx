import React from 'react';
import {Pie} from 'react-chartjs-2';

 const BarView=()=> {
    const state={
        chartData:{
            labels:['SLA Met','SLA Missed'],
            datasets:[{
                label:'Population',
                data:[3,9],
                backgroundColor:[`rgba(255,99,132,0.6)`,
                                  `rgba(54,162,235,0.6)`]
            }]
        }
    }

    return (
        <div>
             <Pie
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

export default BarView;