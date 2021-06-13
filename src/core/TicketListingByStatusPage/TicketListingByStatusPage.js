import React, { useEffect } from "react";
import { capitalizeFirstLetter } from "../../utils/Constants";
import Loader from "../Loader/Loader";
import * as actionCreators from "../../app/redux/actions/ticketListingActions";
import * as styled from "./TicketListingByStatusPage.styled";
import { useDispatch } from "react-redux";

const TicketListingByStatusPage = (props) => {
  const dispatch = useDispatch();
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
  }, []);
  return (
    <styled.container>
      <styled.header>
        <styled.heading>
          {capitalizeFirstLetter(props.selectedKey)} Tickets
        </styled.heading>
      </styled.header>
      {/* <Loader /> */}
      <styled.ticketContainer>
        <styled.topContainer>
          <styled.ticketIdAndStatusContainer>
            <styled.ticketId>#7377</styled.ticketId>
            <styled.ticketStatus>Open</styled.ticketStatus>
          </styled.ticketIdAndStatusContainer>
          <styled.ticketSubjectAndDescriptionContainer>
            <styled.ticketSubject>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam,
              quasi.
            </styled.ticketSubject>
            <styled.ticketDescription>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Vitae
              eveniet consequuntur fuga, officia illum necessitatibus!
            </styled.ticketDescription>
          </styled.ticketSubjectAndDescriptionContainer>
        </styled.topContainer>
        <styled.bottomContainer></styled.bottomContainer>
      </styled.ticketContainer>
    </styled.container>
  );
};

export default TicketListingByStatusPage;
