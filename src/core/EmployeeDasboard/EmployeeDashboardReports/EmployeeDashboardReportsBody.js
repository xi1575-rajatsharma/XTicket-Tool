import React, { useState, useEffect } from "react";
import {
  converDatatoDropDownData,
  checkIfAllValuesAreZero,
} from "utils/Constants";
import { reportErrorText, noDataText } from "../EmployeeDashBoardUtils";
import PieWithPercent from "core/Reports/PieWithPercent";
import DropDown from "core/DropDown/DropDown";
import * as styled from "./EmployeeDasboardReports.styled";
import Loader from "core/Loader/Loader";
import ComponentError from "core/ComponentError/ComponentError";

const EmployeeDashboardReportsBody = (props) => {
  const [state, setState] = useState({
    areAllTicketStatusCountZero: false,
    areAllSlaZero: false,
  });
  useEffect(() => {
    if (
      props.ticketStatusCountData.ticketStatusCount &&
      props.ticketStatusCountData.ticketStatusCount.length
    ) {
      const areAllTicketStatusCountZero = checkIfAllValuesAreZero(
        props.ticketStatusCountData.ticketStatusCount,
        "value"
      );
      mapChangesToState({ areAllTicketStatusCountZero });
    }
  }, [props.ticketStatusCountData.ticketStatusCount]);

  useEffect(() => {
    if (props.employeeSlaInfo.slaInfo && props.employeeSlaInfo.slaInfo) {
      const areAllSlaZero = checkIfAllValuesAreZero(
        props.employeeSlaInfo.slaInfo,
        "value"
      );
      mapChangesToState({ areAllSlaZero });
    }
  }, [props.employeeSlaInfo.slaInfo]);

  const mapChangesToState = (value) => setState({ ...state, ...value });
  return (
    <styled.body>
      <styled.selectSubHeading>Select Employee</styled.selectSubHeading>
      <styled.dropDownContainer>
        <DropDown
          isClearable={false}
          value={props.selectedUser}
          options={converDatatoDropDownData(
            props.allAdminUsers,
            "name",
            "emailId"
          )}
          optionSelected={(user) => props.setUser(user)}
        />
      </styled.dropDownContainer>
      {props.selectedUser && (
        <styled.reportsContainer>
          <styled.pieChartContainer>
            <styled.pieChartHeader>Ticket Status Count</styled.pieChartHeader>
            {props.ticketStatusCountData.ticketStatusCountLoading ? (
              <Loader />
            ) : props.ticketStatusCountData.ticketStatusCountFailure ? (
              <ComponentError
                errorContainerStyles={styled.errorContainerStyles}
                paragraphStyles={styled.paragraphStyles}
                errorText={reportErrorText}
              />
            ) : (
              (!state.areAllTicketStatusCountZero && (
                <>
                  <PieWithPercent
                    data={props.ticketStatusCountData.ticketStatusCount}
                  />
                </>
              )) || (
                <styled.noDataContainer>
                  <styled.noDataText>{noDataText}</styled.noDataText>
                </styled.noDataContainer>
              )
            )}
          </styled.pieChartContainer>
          <styled.pieChartContainer>
            <styled.pieChartHeader>Employee Sla Info</styled.pieChartHeader>
            {props.employeeSlaInfo.slaInfoLoading ? (
              <Loader />
            ) : props.employeeSlaInfo.slaInfoFailure ? (
              <ComponentError
                errorContainerStyles={styled.errorContainerStyles}
                paragraphStyles={styled.paragraphStyles}
                errorText={reportErrorText}
              />
            ) : (
              (!state.areAllSlaZero && (
                <>
                  <PieWithPercent data={props.employeeSlaInfo.slaInfo} />
                </>
              )) || (
                <styled.noDataContainer>
                  <styled.noDataText>{noDataText}</styled.noDataText>
                </styled.noDataContainer>
              )
            )}
          </styled.pieChartContainer>
        </styled.reportsContainer>
      )}
    </styled.body>
  );
};

export default EmployeeDashboardReportsBody;
