import React from 'react';
import valid from '../images/validating-ticket.png';


function AddTicket(payload) {
    const { onChangeHandler, onSubmitHandler, all_locations, all_departments, all_classifications, selectedDepartment } = payload;

    const selectMapper = (mapValues) => {

        return (
            mapValues ? mapValues.map((option) => {
                return (
                    <option value={option.id} key={option.id}>{option.name}</option>)
            }) : null
        )

    }
    return (
        <div className="add-tickets-bottom-wrapper">
            <div className="add-ticket-heading-wrapper">
                <div className="add-ticket-icon-wrapper">
                    <img src={valid} alt="nothing much here" />
                </div>
                <div className="add-ticket-text-wrapper">
                    <h1>Add Ticket</h1>
                    <select id="template-selector">
                        <option>  Choose ticket template </option>
                    </select>
                </div>
            </div>


            <div className="add-ticket-form-wrapper">
                <form onSubmit={onSubmitHandler}>
                    <div className="ticket-information-text-wrapper">
                        <span> Ticket Information</span>
                    </div>

                    <div className="contact-email-wrapper">
                        <div className="label-wrapper">
                            <label className="red-text">Contact</label>
                            <label> Email</label>
                        </div>
                        <div className="input-wrapper">
                            <select id="contact-select">
                                <option defaultValue="none" >-None-</option>
                            </select>

                            <select id="email-select">
                                <option defaultValue="none" >-None-</option>
                            </select>
                        </div>

                    </div>

                    <div className="location-phone-wrapper">
                        <div className="label-wrapper extra-phone">
                            <label className="red-text"> Location</label>
                            <label> Phone</label>
                        </div>
                        <div className="input-wrapper">
                            <select id="selectedLocation" onChange={onChangeHandler}>
                                <option value="none">-None-</option>
                                {selectMapper(all_locations)}


                            </select>

                            <select id="phone-select">
                                <option defaultValue="none" >-None-</option>
                            </select>
                        </div>

                    </div>

                    <div className="department-sub-issue-wrapper">
                        <div className="label-wrapper extra-issue">
                            <label className="red-text"> Department</label>
                            <label className="red-text"> Sub Issue</label>
                        </div>

                        <div className="input-wrapper">
                            <select id="selectedDepartment" onChange={onChangeHandler}>
                                <option >-None-</option>
                                {all_departments ?
                                    Object.values(all_departments).map((value) => {
                                        return (
                                            value.map((department) => {
                                                return (
                                                    <option key={department.id} value={department.id}>{department.name}</option>
                                                )
                                            }
                                            )
                                        )
                                    })
                                    : null}
                            </select>

                            <select id="selectedSubIsuue" onChange={onChangeHandler}>
                                <option defaultValue="none" >-None-</option>
                                {all_departments ?
                                    Object.values(all_departments).map((value) => {
                                        return (
                                            value.map((department) => {
                                                return (
                                                    department.id === parseInt(selectedDepartment) ? department.subIssues.map((subIssue) => {
                                                        return (
                                                            <option key={subIssue.id} value={subIssue.id}>{subIssue.name}</option>
                                                        )
                                                    }) : null
                                                )
                                            }
                                            )
                                        )
                                    })
                                    : null}
                            </select>
                        </div>


                    </div>

                    <div className="subject-wrapper">
                        <div className="label-wrapper">
                            <label>Subject</label>
                        </div>

                        <div className="input-wrapper">
                            <input type="text" id="subject" onChange={onChangeHandler} />
                        </div>
                    </div>

                    <div className="classification-priority-wrapper">
                        <div className="label-wrapper extra-priority" >
                            <label> Classification</label>
                            <label> Priority</label>
                        </div>

                        <div className="input-wrapper">
                            <select id="selectedClassification" onChange={onChangeHandler}>
                                <option defaultValue="none" >-None-</option>
                                {selectMapper(all_classifications)}
                            </select>

                            <select id="priority-select">
                                <option defaultValue="none" >-None-</option>
                            </select>
                        </div>
                    </div>

                    <div className="description-wrapper">
                        <div className="label-wrapper">
                            <label> Description</label>
                        </div>

                        <div className="input-wrapper">
                            <input type="text" id="description" onChange={onChangeHandler} />
                        </div>
                    </div>

                    <div className="status-owner-wrapper">
                        <div className="label-wrapper extra-owner">
                            <label className="red-text"> Status</label>
                            <label> Ticket Owner</label>
                        </div>

                        <div className="input-wrapper">
                            <select id="status-select">
                                <option defaultValue="none" >-None-</option>
                            </select>

                            <select id="owner-select">
                                <option defaultValue="none" >-None-</option>
                            </select>
                        </div>
                    </div>
                    <div className="button-wrapper">
                        <input type="submit" value="Submit" />
                        {/* <button id="cancel">Cancel</button> */}
                    </div>
                </form>
            </div>

        </div>
    )
}

export default AddTicket;