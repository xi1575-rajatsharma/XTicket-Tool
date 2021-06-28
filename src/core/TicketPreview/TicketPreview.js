import React, { useEffect } from "react";
import { useDispatch, connect } from "react-redux";
import * as actionCreators from "app/redux/actions/ticketDetailActions";
import { getDifferenceInDays } from "utils/Constants";

import * as styled from "./TicketPreview.styled";
import TicketPreviewBody from "./TicketPreviewBody";
import TicketPreviewHeader from "./TicketPreviewHeader";

const TicketPreview = (props) => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(actionCreators.resetAllReplies());
    dispatch(actionCreators.startAllRepliesLoader());
    dispatch(actionCreators.getAllReplies(props.data.id));
  }, [dispatch, props.data.id]);
  const getDayDifference = () => {
    return getDifferenceInDays(
      props.data.responseDueOn,
      props.data.creationTime
    );
  };
  const status = props.data.status;

  return (
    <styled.container {...styled.motionProps}>
      <TicketPreviewHeader
        status={status}
        getDayDifference={getDayDifference}
        name={props.data.name}
        closePreview={props.closePreview}
      />
      <TicketPreviewBody
        data={props.data}
        conversations={props.conversations}
      />
    </styled.container>
  );
};

const mapStatetoProps = (state) => {
  return {
    conversations: state.ticketDetails.conversations,
  };
};
export default connect(mapStatetoProps)(React.memo(TicketPreview));
