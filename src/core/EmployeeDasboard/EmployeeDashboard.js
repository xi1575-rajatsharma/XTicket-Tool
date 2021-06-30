import React from "react";
import * as styled from "./EmployeeDashboard.styled";
import EmployeeDashboardBody from "./EmployeeDashboardBody";
import EmployeeDashboardHeader from "./EmployeeDashboardHeader";

const EmployeeDashboard = () => {
  return (
    <styled.container>
      <EmployeeDashboardHeader />
      <EmployeeDashboardBody />
    </styled.container>
  );
};

export default EmployeeDashboard;
