import React from 'react'


const FilterView = (payload) => {
    const { allStatus } = payload;
    return (
        allStatus.map(status => <option key={status.id} value={status.status} >{status.status}</option>)
    )
}

export default FilterView;