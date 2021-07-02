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
import { AnimatePresence } from "framer-motion";
import TicketPreview from "core/TicketPreview/TicketPreview";
import Pagination from "core/Pagination/Pagination";

const TicketListingByStatusPage = (props) => {
  const dispatch = useDispatch();
  const [state, setState] = useState({
    allAdminData: [],
    defaultAssignee: { label: "rajat", value: "Rajat" },
    currentAssignee: { label: "rajat", value: "Rajat" },
    isPreviewVisible: false,
    currentSelectedTicket: {},
    currentPageNumber: 1,
  });
  const mapChangesToState = (value) => {
    setState({ ...state, ...value });
  };

  const handleTicketClick = (currentSelectedTicket) => {
    if (!state.isPreviewVisible)
      mapChangesToState({ currentSelectedTicket, isPreviewVisible: true });
  };

  const closePreview = () => {
    mapChangesToState({ isPreviewVisible: false });
  };
  const increasePageCount = () => {
    mapChangesToState({ currentPageNumber: state.currentPageNumber + 1 });
  };
  const decreasePageCount = () => {
    mapChangesToState({ currentPageNumber: state.currentPageNumber - 1 });
  };
  const getPageTrackingInformation = () => {
    return (
      <styled.pageTracker>
        Page {state.currentPageNumber} of {props.ticketList.totalPages}
      </styled.pageTracker>
    );
  };
  useEffect(() => {
    const requestParams = {
      page: state.currentPageNumber - 1,
      limit: 15,
    };
    batch(() => {
      dispatch(actionCreators.resetGetTicketByStatus());
      dispatch(actionCreators.startGetTicketByStatusLoader());
      dispatch(
        actionCreators.getTicketByStatus(requestParams, props.selectedKey)
      );
    });
  }, [props.selectedKey, state.currentPageNumber]);

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
        <Pagination
          currentPage={state.currentPageNumber}
          maxPages={props.ticketList.totalPages}
          nextPage={increasePageCount}
          prevPage={decreasePageCount}
        />
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
        ) : (
          <>
            {getPageTrackingInformation()}
            {props.ticketList &&
            props.ticketList.ticketList &&
            props.ticketList.ticketList.length ? (
              props.ticketList.ticketList.map((ticketData) => {
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
            ) : (
              <styled.noTicketsContainer>
                <styled.noTicketsText>No Tickets Found</styled.noTicketsText>
              </styled.noTicketsContainer>
            )}
          </>
        )}
      </styled.container>
      <AnimatePresence>
        {state.isPreviewVisible ? (
          <TicketPreview
            data={state.currentSelectedTicket}
            closePreview={closePreview}
          />
        ) : null}
      </AnimatePresence>
    </>
  );
};

const mapStatetoProps = (state) => {
  return {
    common: state.common,
    ticketList: state.ticketList,
  };
};
export default connect(mapStatetoProps)(React.memo(TicketListingByStatusPage));
