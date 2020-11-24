import React from 'react'

const DepartmentFilter = (payload) => {
    const { departments, onDepartmentChange, departmentCount } = payload;
    return (
        departmentCount ? (
            <select name="department-select" className="department-select" onChange={(e) => onDepartmentChange(e.currentTarget.value)}>
                <optgroup label="Filter By Deparment">
                    <option value="All">All Departments </option>
                    {
                        departments.map(department => <option key={department.id} value={department.name}>{department.name}</option>)
                    }
                </optgroup>
                <optgroup label="Monthly Filters">
                    {departmentCount ? <option>--Select Month --</option> : null}
                    <option value="01">Jan</option>
                    <option value="02">Feb</option>
                    <option value="03">Mar</option>
                    <option value="04">Apr</option>
                    <option value="05">May</option>
                    <option value="06">Jun</option>
                    <option value="07">Jul</option>
                    <option value="08">Aug</option>
                    <option value="09">Sept</option>
                    <option value="10">Oct</option>
                    <option value="11">Nov</option>
                    <option value="12">Dec</option>
                </optgroup>
            </select>
        ) :
            <select name="department-select" className="department-select" onChange={(e) => onDepartmentChange(e.currentTarget.value)}>
                <optgroup label="Monthly Filters">
                    {departmentCount ? <option>--Select Month --</option> : null}
                    <option value="01">Jan</option>
                    <option value="02">Feb</option>
                    <option value="03">Mar</option>
                    <option value="04">Apr</option>
                    <option value="05">May</option>
                    <option value="06">Jun</option>
                    <option value="07">Jul</option>
                    <option value="08">Aug</option>
                    <option value="09">Sept</option>
                    <option value="10">Oct</option>
                    <option value="11">Nov</option>
                    <option value="12">Dec</option>
                </optgroup>
            </select>
    )
}

export default DepartmentFilter;
