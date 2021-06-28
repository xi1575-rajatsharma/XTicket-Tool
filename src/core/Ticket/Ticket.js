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
  converDatatoDropDownData,
  getColorBasedOnStatus,
  getDateAndTime,
  returnBlankIfEmpty,
  truncateText,
} from "utils/Constants";
import DropDown from "../DropDown/DropDown";
import LabelValueContainer from "./LabelValueContainer";

import * as styled from "./Ticket.styled";

const Ticket = (props) => {
  const dispatch = useDispatch();
  const { data } = props;
  const [state, setState] = useState({
    selectedValue: {},
    isLoading: false,
    isError: false,
    errorMessage: "",
  });
  const reducerstate = useSelector((state) => {
    return state.ticketList;
  });
  useEffect(() => {
    mapChangesToState({
      selectedValue: { label: data.label, value: data.value },
      isLoading: reducerstate.changeAssigneeLoading,
      isError: reducerstate.changeAssigneeError,
      errorMessage: reducerstate.changeAssigneeErrorMsg,
    });
  }, [reducerstate, data]);
  const changeAssignee = (assignee) => {
    dispatch(startChangeAssigneeLoader(data.id));
    dispatch(changeTicketAssignee(assignee, data.id));
    // const newAssignee = {label: assignee.label, value: assignee.value}
    // mapChangesToState({selectedValue: newAssignee})
  };

  const mapChangesToState = (value) => setState({ ...state, ...value });
  const closeErrorModal = () => {
    // let currentTicket = reducerstate.ticketList.find(ticket => ticket.id == reducerstate.currentTicket)
    // const oldAssignee = {label: currentTicket.assignedTo, value: currentTicket.assignedToEmailId}
    // mapChangesToState({selectedValue: oldAssignee})
    // console.log('curr--', currentTicket);
    // console.log('close modal', state, data)
    // mapChangesToState({selectedVslue: {label: data.label, value: data.value}})
    dispatch(closeErrorModalAction());
  };
  return (
    <styled.ticketContainer>
      <CommonModal
        show={state.isError}
        title="Error"
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
          onClick={() => props.handleTicketClick(data)}
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
          {state.isLoading && data.id == reducerstate.currentTicket ? (
            <Loader />
          ) : (
            <DropDown
              id={data.id}
              isClearable={false}
              value={state.selectedValue}
              options={props.allAdminData}
              optionSelected={(assignee) => changeAssignee(assignee)}
              inputStyle={styled.customStyles}
            />
          )}
        </styled.assigneeContainer>
      </styled.bottomContainer>
    </styled.ticketContainer>
  );
};

export default React.memo(Ticket);
