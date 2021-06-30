import React, { useState } from 'react'
import AddUser from './AddUser'
import EditAccess from './EditAccess'

function ManageAccess() {
    const [view, setView] = useState("addUser")
    return (
        <div className="container" style={{margin:0, padding: "1.5rem 2.5rem"}}>
            <div className="row justify-content-start">
                <h2>ADD/EDIT ACCESS</h2>
            </div>
            <nav className="navbar navbar-expand-sm navbar-dark bg-dark">
                <div className="container-fluid">
                    <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
                    <div className="navbar-nav">
                        <span className={`nav-link ${view === "addUser"?"active":""}`}
                         style={{cursor:'pointer', fontSize: '1.3rem'}}
                         onClick={()=> setView("addUser")}>
                            Add User
                        </span>
                        <span className={`nav-link ${view === "editAccess"?"active":""}`}
                         onClick={()=> setView("editAccess")}
                         style={{cursor: 'pointer', fontSize: '1.3rem'}}>
                            Edit Access
                        </span>
                    </div>
                    </div>
                </div>
            </nav>
            {view === "addUser" ? (<AddUser />) :( <EditAccess />) }
        </div>
    )
}

export default ManageAccess
