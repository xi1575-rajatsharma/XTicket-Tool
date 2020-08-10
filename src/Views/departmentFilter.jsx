import React from 'react'

const DepartmentFilter = (payload) => {
    const { departments, onDepartmentChange } = payload;
    return (
        <select name="department-select" className="department-select" onChange={(e) => onDepartmentChange(e.currentTarget.value)}>
            <option value="All">All</option>
            {
                departments.map(department => <option key={department.id} value={department.name}>{department.name}</option>)
            }
        </select>
    )
}

export default DepartmentFilter;
