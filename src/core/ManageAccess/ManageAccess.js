import React, { useState } from "react";
import * as styled from "./ManageAccess.styled";
import { colors } from "app/themes/variables";
import { navItems } from "./ManageAccessUtils";
import AddUser from "./AddUser";
import EditAccess from "./EditAccess";
import DisableUser from "./DisableUser";

function ManageAccess() {
  const [view, setView] = useState("addUser");
  return (
    <styled.container>
      <styled.header>
        <styled.heading>Manage Access</styled.heading>
      </styled.header>
      <styled.body>
        <styled.nav>
          {navItems.map((item) => (
            <styled.navItem
              color={view === item.key ? colors.xenieBlue : null}
              key={item.key}
              onClick={() => setView(item.key)}
            >
              {item.name}
            </styled.navItem>
          ))}
        </styled.nav>
        {view === "addUser" && <AddUser />}
        {view === "editAccess" && <EditAccess />}
        {view === "disableUser" && <DisableUser />}
      </styled.body>
    </styled.container>
  );
}

export default ManageAccess;
