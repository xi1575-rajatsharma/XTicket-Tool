import React from 'react'
import PieRating from './pieRating';
import PieChart from './pieChart';
import BarChart from './barView'
// import BarView from '../Views/BarView';
// import PieChart from '../Views/PieChart';



const ReportView = (payload) => {
    const { BarHandler } = payload;
    return (
        <div class="report-container">
            <div class="chart-1">< PieRating /></div>
            <div class="chart-2">< PieChart /></div>
            <div class="chart-3">< BarChart /> </div>
            <div class="chart-4">Chart-4</div>
        </div>
    )
}

export default ReportView;