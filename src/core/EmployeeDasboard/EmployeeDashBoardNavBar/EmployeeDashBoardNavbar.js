import React from "react";
import { navItems } from "../EmployeeDashBoardUtils";
import { colors } from "app/themes/variables";
import * as styled from "../EmployeeDashboard.styled";

const EmployeeDashBoardNavbar = (props) => {
  const onClick = (key) => {
    props.mapChangesToState({ selectedNavItem: key });
  };
  return (
    <styled.nav>
      {navItems.map((item) => (
        <styled.navItem
          color={props.selectedNavItem === item.key && colors.xenieBlue}
          key={item.key}
          onClick={() => onClick(item.key)}
        >
          {item.name}
        </styled.navItem>
      ))}
    </styled.nav>
  );
};

export default EmployeeDashBoardNavbar;
