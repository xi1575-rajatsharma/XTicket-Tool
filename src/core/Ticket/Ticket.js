import {
  changeTicketAssignee,
  closeErrorModalAction,
  startChangeAssigneeLoader,
} from "app/redux/actions/ticketListingActions";
import CommonModal from "core/CommomModal/CommonModal";
import Loader from "core/Loader/Loader";
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  capitalizeFirstLetter,
  getColorBasedOnStatus,
  getDateAndTime,
  returnBlankIfEmpty,
  truncateText,
} from "utils/Constants";
import DropDown from "../DropDown/DropDown";
import LabelValueContainer from "./LabelValueContainer";

import * as styled from "./Ticket.styled";

const Ticket = (props) => {
  const mapChangesToState = (value) => setState({ ...state, ...value });
  const dispatch = useDispatch();
  const ticketListState = useSelector(state => state.ticketList)
  const chanagableStatus = ["OPEN", "INPROGRESS", "REOPENED"]
  const { data } = props;
  const [state, setState] = useState({
    selectedValue: { label: data.assignedTo, value: data.assignedToEmailId },
    isLoading: false,
    isError: false,
    errorMessage: "",
    errorTitle: "",
  });
  useEffect(() => {
    mapChangesToState({
          isLoading: ticketListState.ticket.loading,
          isError: ticketListState.ticket.error,
          errorMessage: ticketListState.ticket.errorMessage,
          errorTitle: ticketListState.ticket.errorTitle,
        });
  }, [ticketListState.ticket])
  const changeAssignee = (assignee) => {
    dispatch(startChangeAssigneeLoader(data.id));
    mapChangesToState({ selectedValue: assignee });
    dispatch(changeTicketAssignee(assignee, data.id));
  };

  const closeErrorModal = () => {
    dispatch(closeErrorModalAction(data.id));
  };
  return (
    <styled.ticketContainer>
      <CommonModal
        show={state.isError}
        title={state.errorTitle}
        description={state.errorMessage}
        close={closeErrorModal}
      />
      <styled.topContainer>
        <styled.ticketIdAndStatusContainer>
          <styled.ticketId>{`#${returnBlankIfEmpty(data.id)}`}</styled.ticketId>
          <styled.ticketStatus color={getColorBasedOnStatus(data.status)}>
            {returnBlankIfEmpty(data.status)}
          </styled.ticketStatus>
        </styled.ticketIdAndStatusContainer>
        <styled.ticketSubjectAndDescriptionContainer
          onClick={() =>
            props.handleTicketClick && props.handleTicketClick(data)
          }
        >
          <styled.ticketSubject>
            {capitalizeFirstLetter(returnBlankIfEmpty(data.subject))}
          </styled.ticketSubject>
          <styled.ticketDescription>
            {capitalizeFirstLetter(
              truncateText(returnBlankIfEmpty(data.description), 110)
            )}
          </styled.ticketDescription>
        </styled.ticketSubjectAndDescriptionContainer>
      </styled.topContainer>
      <styled.bottomContainer>
        <LabelValueContainer label="Created By" value={data.name} />
        <LabelValueContainer label="Sub Issue" value={data.subIssue} />
        <LabelValueContainer
          label="Classification"
          value={data.classification}
        />
        <LabelValueContainer
          label="Created On"
          value={getDateAndTime(data.creationTime)}
        />
        <LabelValueContainer
          label="Due On"
          value={getDateAndTime(data.dueOn)}
        />
        <styled.assigneeContainer>
          {(state.isLoading) && ticketListState.ticket.currentTicket == data.id ? (
            <Loader />
          ) : (
            <DropDown
              id={data.id}
              isClearable={false}
              value={state.selectedValue}
              options={props.allAdminData}
              optionSelected={(assignee) => changeAssignee(assignee)}
              inputStyle={styled.customStyles}
              disabled={chanagableStatus.indexOf(data.status) >-1 ? false: true}
            />
          )}
        </styled.assigneeContainer>
      </styled.bottomContainer>
    </styled.ticketContainer>
  );
};

export default React.memo(Ticket);
