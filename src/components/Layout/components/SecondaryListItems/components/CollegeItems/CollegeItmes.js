import * as React from "react";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import LogoutIcon from "@mui/icons-material/Logout";
import AddIcon from '@mui/icons-material/Add';
import SchoolIcon from '@mui/icons-material/School';

import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import { authActions } from "../../../../../../store/slices/authSlice";
import collegeApi from "../../../../../../services/apis/collegeApi";
import toast from "react-hot-toast";

export const CollegeItems = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      const data = await collegeApi.logout();

      if (data.message) {
        console.log(data);
        dispatch(authActions.logout());
        localStorage.removeItem('collegeAdmin')
        navigate("/dav")
        toast.success(`${data.message}`);
      }
    } catch (error) {
      toast.error("Something Went Wrong");
      console.log(error);
    }
  }

  return (
    <React.Fragment>
      {/* <ListSubheader component="div" inset>
          User
        </ListSubheader> */}
      <ListItemButton onClick={() => navigate("/register-member")}>
        <ListItemIcon>
          <AddIcon />
        </ListItemIcon>
        <ListItemText primary="Register Member" />
      </ListItemButton>
      {/* <ListItemButton onClick={() => navigate("/colleges")}>
        <ListItemIcon>
          <SchoolIcon />
        </ListItemIcon>
        <ListItemText primary="View Colleges" />
      </ListItemButton> */}

      <ListItemButton onClick={handleLogout}>
        <ListItemIcon>
          <LogoutIcon />
        </ListItemIcon>
        <ListItemText primary="Sign out" />
      </ListItemButton>
    </React.Fragment>
  );
};

export default CollegeItems;
