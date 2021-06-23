import { changeTicketAssignee } from "app/redux/actions/ticketListingActions";
import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
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
  });

  useEffect(() => {
    const convertedData = converDatatoDropDownData(
      [data],
      "assignedTo",
      "assignedToEmailId"
    );
    const selectedValue = {
      label: convertedData[0].label,
      value: convertedData[0].value,
    };
    mapChangesToState({ selectedValue });
  }, [data]);

  const changeAssignee = (assignee) => {
    dispatch(changeTicketAssignee(assignee, data.id));
    const newAssignee = { label: assignee.label, value: assignee.value };
    mapChangesToState({ selectedValue: newAssignee });
  };

  const mapChangesToState = (value) => setState({ ...state, ...value });
  return (
    <styled.ticketContainer
    // whileHover={{
    //   scale: 1.01,
    //   transition: { duration: 0.35 },
    // }}
    // whileTap={{ scale: 0.97, transition: { duration: 0.25 } }}
    >
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
          <DropDown
            id={data.id}
            isClearable={false}
            defaultValue={state.defaultAssignee}
            value={state.selectedValue}
            options={props.allAdminData}
            optionSelected={(assignee) => changeAssignee(assignee)}
            inputStyle={styled.customStyles}
          />
        </styled.assigneeContainer>
      </styled.bottomContainer>
    </styled.ticketContainer>
  );
};

export default Ticket;
