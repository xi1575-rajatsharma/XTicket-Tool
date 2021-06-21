import React, { useState, useEffect } from "react";
import {
  capitalizeFirstLetter,
  converDatatoDropDownData,
  getOnlyLabelValuePair,
} from "../../utils/Constants";
import { errorText } from "../../app/utils/TicketListingNavigationUtils";
import ComponentError from "core/ComponentError/ComponentError";
import Loader from "../Loader/Loader";
import * as actionCreators from "../../app/redux/actions/ticketListingActions";
import * as styled from "./TicketListingByStatusPage.styled";
import * as GlobalStyled from "../../app/themes/GlobalStyles";
import { useDispatch, connect, batch } from "react-redux";
import Ticket from "../Ticket/Ticket";
import TicketPreview from "core/TicketPreview/TicketPreview";

const TicketListingByStatusPage = (props) => {
  const dispatch = useDispatch();
  const [state, setState] = useState({
    allTickets: [],
    allAdminData: [],
    defaultAssignee: { label: "rajat", value: "Rajat" },
    currentAssignee: { label: "rajat", value: "Rajat" },
    isPreviewVisible: false,
    currentSelectedTicket: {},
  });
  const mapChangesToState = (value) => {
    setState({ ...state, ...value });
  };

  const handleTicketClick = (currentSelectedTicket) => {
    const isPreviewVisible = !state.isPreviewVisible;
    mapChangesToState({ currentSelectedTicket, isPreviewVisible });
  };

  useEffect(() => {
    const requestParams = {
      page: 0,
      limit: 1000,
    };
    batch(() => {
      dispatch(actionCreators.resetGetTicketByStatus());
      dispatch(actionCreators.startGetTicketByStatusLoader());
      dispatch(
        actionCreators.getTicketByStatus(requestParams, props.selectedKey)
      );
    });
  }, [props.selectedKey]);

  useEffect(() => {
    if (
      props.ticketList &&
      props.ticketList.ticketList &&
      props.ticketList.ticketList.length
    ) {
      const allTickets = props.ticketList.ticketList;
      mapChangesToState({ allTickets });
    }
  }, [props.ticketList, props.ticketList.ticketList]);

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

  const { ticketListFailure, ticketListLoading } = props.ticketList;
  return (
    <>
      <styled.header>
        <styled.heading>
          {capitalizeFirstLetter(props.selectedKey)} Tickets
        </styled.heading>
      </styled.header>
      <styled.container>
        {ticketListLoading ? (
          <GlobalStyled.loaderContainer height={"65vh"}>
            <Loader height={"60px"} loadingText={"Fetching Tickets..."} />
          </GlobalStyled.loaderContainer>
        ) : ticketListFailure ? (
          <ComponentError
            errorContainerStyles={styled.errorContainerStyles}
            paragraphStyles={styled.paragraphStyles}
            errorText={errorText}
          />
        ) : state.allTickets &&
          Array.isArray(state.allTickets) &&
          state.allTickets.length ? (
          state.allTickets.map((ticketData) => {
            return (
              <Ticket
                allAdminData={state.allAdminData}
                data={ticketData}
                key={ticketData.id}
                mapChangesToState={mapChangesToState}
                handleTicketClick={handleTicketClick}
              />
            );
          })
        ) : null}

        {/* {console.log(currentTicketData)} */}
      </styled.container>
      {state.isPreviewVisible ? (
        <TicketPreview data={state.currentSelectedTicket} />
      ) : null}
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
