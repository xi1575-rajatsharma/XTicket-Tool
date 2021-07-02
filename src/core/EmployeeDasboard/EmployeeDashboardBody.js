import React, { useState, useEffect } from "react";
import DropDown from "core/DropDown/DropDown";
import * as styled from "./EmployeeDashboard.styled";
import { useDispatch, useSelector } from "react-redux";
import { converDatatoDropDownData, getOnlyLabelValuePair } from "utils/Constants";
import { Button, Modal } from 'react-bootstrap';
import Select from 'react-select';
import { getUserTickets, showLoader, resetData } from "app/redux/actions/employeeDashboardActions";
import Loader from "core/Loader/Loader";
import Ticket from "core/Ticket/Ticket";

const EmployeeDashboardBody = () => {
  const [state, setState] = useState({
      selectedUser: null,
      allUsers: [],
      allStatus: [],
      selectedStatus: [],
      currentSelectedTicket: {},
      isPreviewVisible: false
    });
  const [show, setShow] = useState(false);
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const [valid, setValid] = useState(false);
  const dispatch = useDispatch()

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const mapChangesToState = (value) => setState({ ...state, ...value });
  const commonState = useSelector(state => state.common)
  const dashboardState = useSelector(state => state.employeeDashBoard)
  const handleTicketClick = (currentSelectedTicket) => {
    if (!state.isPreviewVisible)
      mapChangesToState({ currentSelectedTicket, isPreviewVisible: true });
  };
  useEffect(() => {
    dispatch(resetData())
    if (
      commonState.allAdminData &&
      commonState.allAdminData.allAdminUsers &&
      commonState.allAdminData.allAdminUsers.length
    ) {
      const allUsers = getOnlyLabelValuePair(
        converDatatoDropDownData(
          commonState.allAdminData.allAdminUsers,
          "name",
          "emailId"
        )
      );
      const allStatus = getOnlyLabelValuePair(
        converDatatoDropDownData(
          commonState.allStatusData.allStatus,
          "status",
          "id"
        )
      );
      mapChangesToState({ allUsers, allStatus });
    }
  }, [commonState.allAdminData]);

  const setUser = (user) => {
    mapChangesToState({ selectedUser: user });
    let todayDate = new Date().toISOString().slice(0, 10);
    let startDate = fromDate || todayDate;
    dispatch(showLoader())
    if(user.value){
      setValid(true)
      dispatch(getUserTickets(user.value, startDate, toDate, state.selectedStatus))
    }
  };

  const updateSelectedStatus = (status) => {
    mapChangesToState({ selectedStatus: status });
  }

  const filterTickets = () => {
    let todayDate = new Date().toISOString().slice(0, 10);
    let startDate = fromDate || todayDate;
    if(state.selectedUser && state.selectedUser.value){
      setShow(false)
      dispatch(showLoader())
      dispatch(getUserTickets(state.selectedUser.value, startDate, toDate, state.selectedStatus))
    }
  }
  
  return (
    <styled.body>
      <styled.selectSubHeading>Select Employee</styled.selectSubHeading>
      <styled.dropDownContainer>
        <DropDown
          isClearable={false}
          value={state.selectedUser}
          options={state.allUsers}
          optionSelected={(user) => setUser(user)}
        />
      </styled.dropDownContainer>

      <styled.filterContainer>
        <Button variant="light" onClick={handleShow}>
          Filter
        </Button>
        
      </styled.filterContainer>

      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Filter Users</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <div className="row g-2 mb-3">
          <div className="col-auto">
            <label className="form-label">From</label>
            <input
              className="form-control"
              type="date" 
              value={fromDate}
              onChange={e => setFromDate(e.target.value)}
            />
          </div>
          <div className="col-auto">
            <label className="form-label">To</label>
            <input 
              className="form-control" 
              type="date"
              value={toDate}
              onChange={e => setToDate(e.target.value)}
              />
          </div>
        </div>
        <div className="mb-3">
        <label className="form-label">select ticket status</label>
        <Select
          isMulti
          value={state.selectedStatus}
          options={state.allStatus}
          onChange={updateSelectedStatus}
        />

        </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={filterTickets} disabled={!valid}>Filter</Button>
        </Modal.Footer>
      </Modal>
      <styled.ticketContainer>
      {dashboardState.loading ? (<styled.loaderContainer><Loader /></styled.loaderContainer>):
      (dashboardState.error) ? (
      <div className="card text-center">
        <div className="card-body">
        <blockquote className="blockquote mb-0 text-danger">{dashboardState.errorMessage}</blockquote>
        </div>
      </div>
      ):
        dashboardState.tickets.length ? 
          dashboardState.tickets.map(ticket => (
            <Ticket
                    allAdminData={state.allUsers}
                    data={ticket}
                    key={ticket.id}
                    mapChangesToState={mapChangesToState}
                    handleTicketClick={handleTicketClick}
                  />
          )): 
          <div className="card text-center">
            <div className="card-body">
              <h4 className="card-title">No Tickets</h4>
            </div>
          </div>
      }
      
      </styled.ticketContainer>
    </styled.body>
  );
};

export default EmployeeDashboardBody;
