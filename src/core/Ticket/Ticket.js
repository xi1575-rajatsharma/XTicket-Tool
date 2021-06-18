import { changeTicketAssignee } from "app/redux/actions/ticketListingActions";
import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import {
  capitalizeFirstLetter,
  getDateAndTime,
  returnBlankIfEmpty,
  truncateText
} from "utils/Constants";
import DropDown from "../DropDown/DropDown";
import LabelValueContainer from "./LabelValueContainer";
import styles from "./Ticket.css";
import * as styled from "./Ticket.styled";

const Ticket = (props) => {
  const dispatch = useDispatch();
  const { data } = props;
  const [state, setState] = useState({ defaultValue: {}, selectedValue: {} });

  useEffect(()=> {
    let copyState = {...state};
    copyState.defaultValue = {label: data.label, value: data.value};
    setState(copyState);
  }, [data])

  const changeAssignee = (assignee, ticketId) => {
    dispatch(changeTicketAssignee(assignee, ticketId))
  }
  return (
    <styled.ticketContainer>
      <styled.topContainer>
        <styled.ticketIdAndStatusContainer>
          <styled.ticketId>{`#${returnBlankIfEmpty(data.id)}`}</styled.ticketId>
          <styled.ticketStatus>
            {returnBlankIfEmpty(data.status)}
          </styled.ticketStatus>
        </styled.ticketIdAndStatusContainer>
        <styled.ticketSubjectAndDescriptionContainer>
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
          <DropDown
            id={data.id}
            isClearable={true}
            defaultValue={state.defaultAssignee}
            value={state.defaultValue}
            options={props.allAdminData}
            optionSelected={(assignee, ticketId) => changeAssignee(assignee, ticketId)}
            inputStyle={styled.customStyles}
          />
        </styled.assigneeContainer>
      </styled.bottomContainer>
    </styled.ticketContainer>
  );
};

export default Ticket;
