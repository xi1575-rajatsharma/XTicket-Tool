import React from 'react'

const DMFormatter = ({ timestamp }) => {
    let ticketSLATime = new Date(timestamp);
    const dueOnDd = String(ticketSLATime.getDate()).padStart(2, '0');
    const dueOnMm = String(ticketSLATime.getMonth() + 1).padStart(2, '0');
    return `${dueOnDd}/${dueOnMm}`
}

export default DMFormatter