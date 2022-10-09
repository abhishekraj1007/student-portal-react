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
import { useNavigate, useParams } from "react-router-dom";

import { authActions } from "../../../../../../store/slices/authSlice";
import collegeApi from "../../../../../../services/apis/collegeApi";
import toast from "react-hot-toast";
import { Tooltip } from "@mui/material";
import membersApi from "../../../../../../services/apis/membersApi";

export const StudentItems = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { college } = useParams();

  const handleLogout = async () => {
    try {
      const data = await membersApi.logout(college);

      if (data.msg) {
        console.log(data);
        dispatch(authActions.logout());
        localStorage.removeItem('auth');
        navigate(`/${college}/student/login`);
        toast.success(`${data.msg}`);
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
        <Tooltip title="Courses" placement="right">
          <ListItemIcon>
            <CollectionsBookmarkIcon />
          </ListItemIcon>
        </Tooltip>
        <ListItemText primary="Courses" />
      </ListItemButton>
      <ListItemButton onClick={() => navigate("exam-form")}>
        <Tooltip title="Exams" placement="right">
          <ListItemIcon>
            <ImportContactsIcon />
          </ListItemIcon>
        </Tooltip>
        <ListItemText primary="Exams" />
      </ListItemButton>
      <ListItemButton onClick={() => navigate("exam-result")}>
        <Tooltip title="Result" placement="right">
          <ListItemIcon>
            <ImportContactsIcon />
          </ListItemIcon>
        </Tooltip>
        <ListItemText primary="Result" />
      </ListItemButton>

      <ListItemButton onClick={handleLogout}>
        <Tooltip title="Sign out" placement="right">
          <ListItemIcon>
            <LogoutIcon />
          </ListItemIcon>
        </Tooltip>
        <ListItemText primary="Sign out" />
      </ListItemButton>
    </React.Fragment>
  );
};

export default StudentItems;
