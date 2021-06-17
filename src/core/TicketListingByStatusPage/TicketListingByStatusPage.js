import React, { useState, useEffect } from "react";
import {
  capitalizeFirstLetter,
  converDatatoDropDownData,
  getOnlyLabelValuePair,
} from "../../utils/Constants";
import DropDown from "../DropDown/DropDown";
import Loader from "../Loader/Loader";
import * as actionCreators from "../../app/redux/actions/ticketListingActions";
import * as styled from "./TicketListingByStatusPage.styled";
import { useDispatch, connect } from "react-redux";
import Ticket from "../Ticket/Ticket";

const TicketListingByStatusPage = (props) => {
  const dispatch = useDispatch();
  const [state, setState] = useState({
    allTickets: [],
    allAdminData: [],
    defaultAssignee: { label: "rajat", value: "Rajat" },
    currentAssignee: { label: "rajat", value: "Rajat" },
  });
  useEffect(() => {
    const requestParams = {
      page: 0,
      limit: 1000,
    };
    dispatch(actionCreators.resetGetTicketByStatus());
    dispatch(actionCreators.startGetTicketByStatusLoader());
    dispatch(
      actionCreators.getTicketByStatus(requestParams, props.selectedKey)
    );
  }, [dispatch, props.selectedKey]);

  useEffect(() => {
    if (
      props.ticketList &&
      props.ticketList.ticketList &&
      props.ticketList.ticketList.length
    ) {
      const allTickets = converDatatoDropDownData(
        props.ticketList.ticketList,
        "assignedTo",
        "assignedToEmailId"
      );

      // const assigneeDropDown = getOnlyLabelValuePair(allTickets);
      mapChangesToState({ allTickets });
    }
  }, [props.ticketList]);

  useEffect(() => {
    if (
      props.common.allAdminData &&
      props.common.allAdminData.allAdminUsers &&
      props.common.allAdminData.allAdminUsers.length
    ) {
      const allAdminData = getOnlyLabelValuePair(
        converDatatoDropDownData(
          props.common.allAdminData.allAdminUsers,
          "name",
          "emailId"
        )
      );
      mapChangesToState({ allAdminData });
    }
  }, [props.common.allAdminData]);

  const mapChangesToState = (value) => setState({ ...state, ...value });

  return (
    <>
      <styled.header>
        <styled.heading>
          {capitalizeFirstLetter(props.selectedKey)} Tickets
        </styled.heading>
      </styled.header>
      <styled.container>
        <Loader />
        {state.allTickets &&
        Array.isArray(state.allTickets) &&
        state.allTickets.length
          ? state.allTickets.map((ticketData) => {
              return (
                <Ticket
                  allAdminData={state.allAdminData}
                  data={ticketData}
                  key={ticketData.id}
                />
              );
            })
          : null}
      </styled.container>
    </>
  );
};

const mapStatetoProps = (state) => {
  return {
    common: state.common,
    ticketList: state.ticketList,
  };
};
export default connect(mapStatetoProps)(TicketListingByStatusPage);
