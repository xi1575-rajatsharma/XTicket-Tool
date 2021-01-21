import React, {useState, useRef, Component} from 'react';
import {LineChart, Line,PieChart, Pie,Tooltip, Sector, Cell,BarChart, Bar,XAxis, YAxis, CartesianGrid,Legend, ResponsiveContainer} from 'recharts';
import PieRating from "./PieRating";
import Ratings from './Ratings';
import SLAMissedByStatus from './SLAMissedByStatus';
import AverageEfficiency from './AverageEfficiency';
import StatusBarChart from './StatusBarChart'


export default class Reports extends Component {
    constructor(props){
        super(props);
        this.state= {
            currentSelect: "TicketStatus"
        }
    }

    updateState = (value) => this.setState({currentSelect: value});

    render() {
        const {SLAPie,
              ratings,
              missedByStatus,
              averageHours,
              status,
              slaMissedByDate} = this.props;
        return (
            <div className="reports-container">
           <div className="reports-container__top">
               <div className="reports-container__top--report" style={{flexGrow:2}}>
                    <div style={{ marginRight:20, textAlign:"center"}}>SLA's Achived Vs Missed</div>
                        <PieRating SLAPie= {SLAPie}/>
                </div>
                <div className="reports-container__top--report" style={{flexGrow:2}}>
                    <div style={{ marginRight:20, textAlign:"center"}}>Ratings</div>
                   { ratings ?  <Ratings ratings={ratings} /> : "hello" }
                </div>
                <div className="reports-container__top--report">
                    <div style={{ marginRight:20, textAlign:"center", marginBottom:"2rem"}}>Ratings</div>
                    <SLAMissedByStatus missedByStatus={missedByStatus} />
                </div>
                    <div className="reports-container__top--report">
                    <div className="reports-container__top--report-header" style={{textAlign:"left"}}>Your Efficiency</div>
                    <AverageEfficiency averageHours={averageHours} />
               </div>
           </div>
           <div className="reports-container__bottom">
                <div className="reports-container__bottom--header">
                    <div className="reports-container__bottom--header-headerBottomLine"></div>
                    <div className="reports-container__bottom--header-heading" ref={el => this.refs = el} onClick={() => this.updateState("TicketStatus")} >Current Ticket Status</div> 
                    <div className="reports-container__bottom--header-heading" onClick={() => this.updateState("SLA")}>Missed SLA Trend</div> 
                    <div className="reports-container__bottom--header-headerHighlighter" 
                        style={this.state.currentSelect === "TicketStatus" ?
                                {width: this.refs.offsetWidth, left: 0}:
                                {width: this.refs.offsetWidth - 10, left: this.refs.offsetWidth+ 10 }
                                }></div>
                </div>

                <div className={"reports-container__bottom--reports"}>
                { this.state.currentSelect === "TicketStatus"?
                <StatusBarChart status={status}/> :
                <ResponsiveContainer height="100%" width="70%">
                <LineChart
        width={500}
        height={300}
        data={slaMissedByDate}
        margin={{
          top: 5, right: 30, left: 20, bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Line type="monotone" dataKey="value" stroke="#8884d8" activeDot={{ r: 8 }} />
        {/* <Line type="monotone" dataKey="uv" stroke="#82ca9d" /> */}
      </LineChart>
      </ResponsiveContainer>
                }
                </div>
           </div>
        </div>
        )
    }
}

// const Reports = (props) => {
    
//     const heading1Ref = useRef(null);
//     const heading2Ref = useRef(null);

//     const handleLoad = () => console.log("hello");

    
//     return (
//         <div className="reports-container">
//            <div className="reports-container__top">
//                <div className="reports-container__top--report" style={{flexGrow:2}}>
//                     <div style={{ marginRight:20, textAlign:"center"}}>SLA's Achived Vs Missed</div>
//                         <PieRating SLAPie= {SLAPie}/>
//                 </div>
//                 <div className="reports-container__top--report" style={{flexGrow:2}}>
//                     <div style={{ marginRight:20, textAlign:"center"}}>Ratings</div>
//                     <Ratings ratings={ratings} />
//                 </div>
//                 <div className="reports-container__top--report">
//                     <div style={{ marginRight:20, textAlign:"center", marginBottom:"2rem"}}>Ratings</div>
//                     <SLAMissedByStatus missedByStatus={missedByStatus} />
//                 </div>
//                     <div className="reports-container__top--report">Hellllo
//                     <AverageEfficiency averageHours={averageHours} />
//                </div>
//            </div>
//            <div className="reports-container__bottom">
//                 <div className="reports-container__bottom--header">
//                     <div className="reports-container__bottom--header-headerBottomLine"></div>
//                     <div className="reports-container__bottom--header-heading" ref={heading1Ref}>Current Ticket Status</div>
//                     <div className="reports-container__bottom--header-heading" ref={heading2Ref}>SLA's Missed By Date</div> {console.log(heading1Ref.current)}
//                     <div className="reports-container__bottom--header-headerHighlighter" style={{width: heading1Ref.offsetWidth}}></div>
//                 </div>
//            </div>
//         </div>
//     )
// }

// export default Reports


// <BarChart
//                   width="90%"
//                   height={100}
//                   data={status}
//                   margin={{
//                     top: 5, right: 30, left: 20, bottom: 5,
//                   }}
//                 >
//         {/* <CartesianGrid strokeDasharray="10 10" /> */}
//         <XAxis dataKey="name"/>
//         <YAxis />
//         <Tooltip cursor={{width: 110,fill: '#99ffff'}} />
//         {/* <Legend /> */}
//         {/* <Bar dataKey="pv" fill="#8884d8" /> */}
//         <Bar dataKey="value" barSize={35}> {
//           status.map((entry,index) => {
//             switch(entry.name){
//               case "OPEN":
//               return <Cell width={40} fill= { "#ff8000"} />;
//               case "INPROGRESS":
//               return <Cell width={40} fill= { "#99cc00"} />;
//               case "AWATING":
//               return <Cell width={40} fill= { "#0000e6"} />;
//               case "REVIEW":
//               return <Cell width={40} fill= { "#220066"} />;
//               case "ESCALATED":
//               return <Cell width={40} fill= { "#ff3300"} />;
//               case "REOPENED":
//               return <Cell width={40} fill= { "#cc0052"} />;
//               case "CLOSED":
//               return <Cell width={40} fill= { "#5cd65c"} />;
//               case "RESOLVED":
//               return <Cell width={40} fill= { "#003300"} />;
//               default: 
//               return <Cell width={40} fill= { "#80ff80"} />;
//             }
//           })
//         } </Bar>
//       </BarChart>
