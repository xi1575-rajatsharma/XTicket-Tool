import React from 'react'

const SelectedFilterView = (payload) => {
    const { display, onFromDateChange, onToDateChange } = payload
    return (
        <>
            {
                display === "Date" ?
                    <form>
                        <input type="date" onChange={(e) => onFromDateChange(e.currentTarget.value)} />
                        <input type="date" onChange={(e) => onToDateChange(e.currentTarget.value)} />
                    </form>
                    :
                    display === "Subject" ? <input type="text" placeholder="Search for subjects..." />
                        : display === "Name" ? <input type="text" placeholder="Filter by Employee Name.." /> : null
            }

        </>
    )
}
export default SelectedFilterView;