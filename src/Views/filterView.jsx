import React from 'react'


const FilterView = (payload) => {
    const { allStatus } = payload;

    return (
        <optgroup label="Filter by Status">
            {allStatus.map(status => <option className="status-filter" key={status.id} value={status.status} >{status.status}</option>)}</optgroup>
    )
}

export default FilterView;