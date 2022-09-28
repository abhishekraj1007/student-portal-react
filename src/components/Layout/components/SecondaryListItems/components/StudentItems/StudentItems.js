import * as React from "react";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import LogoutIcon from "@mui/icons-material/Logout";
import AddIcon from '@mui/icons-material/Add';
import SchoolIcon from '@mui/icons-material/School';
import CollectionsBookmarkIcon from '@mui/icons-material/CollectionsBookmark';
import ImportContactsIcon from '@mui/icons-material/ImportContacts';

import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import { authActions } from "../../../../../../store/slices/authSlice";
import collegeApi from "../../../../../../services/apis/collegeApi";
import toast from "react-hot-toast";

export const StudentItems = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      const data = await collegeApi.logout();

      if (data.message) {
        console.log(data);
        dispatch(authActions.logout());
        localStorage.removeItem('auth')
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
      <ListItemButton onClick={() => navigate("courses")}>
        <ListItemIcon>
          <CollectionsBookmarkIcon />
        </ListItemIcon>
        <ListItemText primary="Courses" />
      </ListItemButton>
      <ListItemButton onClick={() => navigate("exam-form")}>
        <ListItemIcon>
          <ImportContactsIcon />
        </ListItemIcon>
        <ListItemText primary="Exams" />
      </ListItemButton>
      {/* <ListItemButton onClick={() => navigate("/colleges")}>
        <ListItemIcon>
          <SchoolIcon />
        </ListItemIcon>
        <ListItemText primary="View Colleges" />
      </ListItemButton> */}

      {/* <ListItemButton onClick={handleLogout}>
        <ListItemIcon>
          <LogoutIcon />
        </ListItemIcon>
        <ListItemText primary="Sign out" />
      </ListItemButton> */}
    </React.Fragment>
  );
};

export default StudentItems;
