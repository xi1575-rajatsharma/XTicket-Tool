import React, { Component } from 'react'
import ReportView from '../Views/reportView';
import {Bar} from 'react-chartjs-2';

 class ReportPage extends Component {
     constructor(props){
          super(props);
          this.state={
              chartData:{
                  labels:['Resolved','Pending','Springfield','lowell','cambridge','New Bedford'],
                  datasets:[{
                      label:'Population',
                      data:[2,3,4,5,6,9],
                      backgroundColor:[`rgba(255,99,132,0.6)`,
                                        `rgba(54,162,235,0.6)`,
                                        `rgba(255,206,86,0.6)`,
                                        `rgba(75,192,192,0.6)`,
                                        `rgba(153,102,255,0.6)`,
                                        `rgba(255,159,64,0.6)`,
                                         `rgba(255,99,132,0.6)`]
                  }]
              }
          }
     }


    render() {
        return (
            <>
            <ReportView />
            </>
        )
    }
}


export default ReportPage;