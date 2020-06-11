import React from 'react'
import BarView from '../Views/BarView';
import PieChart from '../Views/PieChart';
import PieRating from '../Views/PieRating';

const ReportView = (payload) => {
    const {BarHandler}=payload;
    return (
        <div class="report-container">
            <div class="chart-1"><PieRating /></div>
            <div class="chart-2"><PieChart /></div>
            <div class="chart-3"><BarView /></div>
      </div> 
    )
}

export default ReportView;