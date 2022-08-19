import * as React from "react";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import LogoutIcon from "@mui/icons-material/Logout";

import { useDispatch } from "react-redux";
import { authActions } from "../../../../store/slices/authSlice";

export const SecondaryListItems = () => {
  const dispatch = useDispatch();
  const handleLogout = () => {
    dispatch(authActions.logout());
    localStorage.removeItem('access_token')
  }

  return (
    <React.Fragment>
      {/* <ListSubheader component="div" inset>
          User
        </ListSubheader> */}
      <ListItemButton onClick={handleLogout}>
        <ListItemIcon>
          <LogoutIcon />
        </ListItemIcon>
        <ListItemText primary="Sign out" />
      </ListItemButton>
    </React.Fragment>
  );
};

export default SecondaryListItems;
