import * as React from "react";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import LogoutIcon from "@mui/icons-material/Logout";
import AddIcon from '@mui/icons-material/Add';

import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import { authActions } from "../../../../store/slices/authSlice";

export const SecondaryListItems = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(authActions.logout());
    localStorage.removeItem('access_token')
    navigate("/")
  }

  return (
    <React.Fragment>
      {/* <ListSubheader component="div" inset>
          User
        </ListSubheader> */}
      <ListItemButton onClick={() => navigate("/create-college")}>
        <ListItemIcon>
          <AddIcon />
        </ListItemIcon>
        <ListItemText primary="Create College" />
      </ListItemButton>

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
