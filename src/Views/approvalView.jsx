import React, { useEffect, useState } from 'react'
import icon from '../images/newIcon.png';
import { fetch } from '../modules/httpServices';
import { constants } from '../modules/constants';
import axios from 'axios'

const ApprovalView = (props) => {
    const [approvalStatus, setApprovalStatus] = useState("")
    const [approvalMessage, setApprovalMessage] = useState("")
    useEffect(() => {

        const url_string = window.location.href;
        const params = new URL(url_string)
        const ticketID = params.searchParams.get("ticketid")
        const approver = params.searchParams.get("approver")
        const token = params.searchParams.get("token")
        const options = {
            headers: { 'x-access-channel': "WEB" }
        }

        // fetch.post({
        //     url: `http://168.63.250.105/ticket-tool/v1/approval/${ticketID}?approver=${approver}&token=${token}`,
        //     callbackHandler: (response) => setApprovalStatus(response.error.response.status)
        // })
        axios.post(`${constants.SERVICE_URLS.APPROVAL_JOURNEY}/${ticketID}?approver=${approver}&token=${token}`)
            .then(res => { setApprovalStatus(res.status); setApprovalMessage(res.data.result.approvalStatus) })
            .catch(error => setApprovalStatus(error.response.status))
    }, [])
    return (
        <div className="approval">
            <div className="approval__ticket-info">
                <img src={icon} alt="New Icon" className="approval__icon" />
                {
                    approvalStatus === 409 ?
                        "Action already taken!" :
                        approvalStatus === 404 ?
                            "No approvals needed for the ticket" :
                            approvalStatus === 200 ?
                                "You " + approvalMessage + " the request" :
                                approvalStatus === "" ?
                                    "Loading.." :
                                    "Something went wrong..."
                }
                <br />

            </div>


        </div>
    )
}

export default ApprovalView
