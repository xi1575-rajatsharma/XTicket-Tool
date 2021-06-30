import React, { useState } from "react";
import DropDown from "core/DropDown/DropDown";
import * as styled from "./EmployeeDashboard.styled";

const EmployeeDashboardBody = () => {
  const [state, setState] = useState({ selectedUser: null });

  const mapChangesToState = (value) => setState({ ...state, ...value });

  const setUser = (value) => {
    mapChangesToState({ selectedUser: value });
  };
  const allUsers = [
    { label: "Tushar Kaushik", value: "tushar.kaushik@xebia.com" },
    { label: "Amit Kumar", value: "amit.kumar2@xebia.com" },
  ];
  return (
    <styled.body>
      <styled.selectSubHeading>Select Employee</styled.selectSubHeading>
      <styled.dropDownContainer>
        <DropDown
          isClearable={false}
          value={state.selectedUser}
          options={allUsers}
          optionSelected={(user) => setUser(user)}
        />
      </styled.dropDownContainer>
    </styled.body>
  );
};

export default EmployeeDashboardBody;
