import React from "react";
import { Button, Modal } from "react-bootstrap";
import Select from "react-select";

const EmployeeDashBoardFilters = (props) => {
  return (
    <Modal
      show={props.show}
      onHide={props.handleClose}
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
              value={props.fromDate}
              onChange={(e) => props.setFromDate(e.target.value)}
            />
          </div>
          <div className="col-auto">
            <label className="form-label">To</label>
            <input
              className="form-control"
              type="date"
              value={props.toDate}
              onChange={(e) => props.setToDate(e.target.value)}
            />
          </div>
        </div>
        <div className="mb-3">
          <label className="form-label">select ticket status</label>
          <Select
            isMulti
            value={props.selectedStatus}
            options={props.allStatus}
            onChange={props.updateSelectedStatus}
          />
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={props.handleClose}>
          Close
        </Button>
        <Button
          variant="primary"
          onClick={props.filterTickets}
          disabled={!props.valid}
        >
          Filter
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default EmployeeDashBoardFilters;
