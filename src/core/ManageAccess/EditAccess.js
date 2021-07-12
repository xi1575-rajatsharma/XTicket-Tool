import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  changeUserRole,
  cleanUpManageAccess,
  updateRole,
  updateUser,
  getAllRoles,
  getUserRole,
  showLoader,
} from "app/redux/actions/manageAccessActions";
import Loader from "core/Loader/Loader";
import * as styled from "./ManageAccess.styled";
function EditAccess() {
  const [valid, setValid] = useState(false);
  const commconState = useSelector((state) => state.common);
  const manageAccessState = useSelector((state) => state.manageAccess);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(cleanUpManageAccess("editAccess"));
    if (manageAccessState.editAccess.allRoles.length == 0) {
      dispatch(showLoader("editAccess"));
      dispatch(getAllRoles());
    }
  }, []);

  const changeEmployee = (e) => {
    dispatch(updateUser(e.target.value));
    let valid = false;
    if (e.target.value != "" && manageAccessState.editAccess.currentRole !== "")
      valid = true;
    setValid(valid);
    if (e.target.value != "") {
      dispatch(showLoader("editAccess"));
      dispatch(getUserRole(e.target.value));
    }
  };
  const changeRole = (e) => {
    let valid = false;
    if (e.target.value != "" && manageAccessState.editAccess.user != "")
      valid = true;
    setValid(valid);
    dispatch(updateRole(e.target.value));
  };
  const addRoleToUser = () => {
    if (
      manageAccessState.editAccess.currentRole != "" &&
      manageAccessState.editAccess.user != ""
    ) {
      dispatch(showLoader("editAccess"));
      dispatch(
        changeUserRole(
          manageAccessState.editAccess.user,
          manageAccessState.editAccess.currentRole
        )
      );
    }
  };
  return (
    <React.Fragment>
      <div className="row">
        <div className="mt-4 col-md-4 col-sm-8">
          <div className="form-group">
            <styled.label>Select Employee</styled.label>
            <styled.select
              className="form-control"
              onChange={changeEmployee}
              value={manageAccessState.editAccess.user}
            >
              <option value="">-- Select Employee --</option>
              {commconState.allAdminData.allAdminUsers.length
                ? commconState.allAdminData.allAdminUsers.map((user) => (
                    <option key={user.id} value={user.emailId}>
                      {user.name}
                    </option>
                  ))
                : null}
            </styled.select>
          </div>
          <div className="form-group">
            <styled.label>Select Role</styled.label>
            <styled.select
              className="form-control"
              onChange={changeRole}
              value={manageAccessState.editAccess.currentRole}
            >
              <option value="">-- Select Role --</option>
              {manageAccessState.editAccess.allRoles.map((role) => (
                <option key={role.id} value={role.role}>
                  {role.role}
                </option>
              ))}
            </styled.select>
          </div>
          <div className="form-group">
            <button
              type="button"
              disabled={!valid}
              className="btn btn-primary"
              onClick={addRoleToUser}
            >
              Add
            </button>
          </div>
        </div>
        {manageAccessState.editAccess.loading ? (
          <div className="align-self-start" style={{marginTop: "6rem"}}>
            <Loader height="33px" />
          </div>
        ) : null}
      </div>
      <div className="row">
        {manageAccessState.editAccess.error ? (
          <div className="mt-4 col">
            <div className="alert alert-danger" role="alert">
              {manageAccessState.editAccess.errorMessage}
            </div>
          </div>
        ) : null}
        {manageAccessState.editAccess.success ? (
          <div className="mt-4 col">
            <div className="alert alert-success" role="alert">
              {manageAccessState.editAccess.successMessage}
            </div>
          </div>
        ) : null}
      </div>
    </React.Fragment>
  );
}

export default EditAccess;
