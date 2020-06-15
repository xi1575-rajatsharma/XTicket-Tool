import React from 'react'

const SelectedFilterView = (payload) => {
    const { display, onFromDateChange, onToDateChange, onDateSubmit, onInputSubmit, onInputChange } = payload
    return (
        <>
            {
                display === "Date" ?
                    <form onSubmit={onDateSubmit}>
                        <input type="date" onChange={(e) => onFromDateChange(e.currentTarget.value)} />
                        <span>To</span>
                        <input type="date" onChange={(e) => onToDateChange(e.currentTarget.value)} />
                        <input type="submit" value="Filter" />
                    </form>
                    :
                    display === "Subject" ?
                        <form onSubmit={(e) => { e.preventDefault(); onInputSubmit(e.target.id) }} id="Subject">
                            <input type="text" onChange={e => onInputChange({ filterString: e.currentTarget.value })} placeholder="Search for subjects..." />
                        </form>
                        : display === "Name" ? <form onSubmit={(e) => { e.preventDefault(); onInputSubmit(e.target.id) }} id="employeeName"> <input id="employeeInput" onChange={e => onInputChange({ filterString: e.currentTarget.value })} type="text" placeholder="Filter by Employee Name.." /> </form> : null
            }

        </>
    )
}
export default SelectedFilterView;