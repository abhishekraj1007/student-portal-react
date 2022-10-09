import * as React from "react";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import DashboardIcon from "@mui/icons-material/Dashboard";
import PersonIcon from '@mui/icons-material/Person';

import { useNavigate, useParams } from "react-router-dom";
import { Tooltip } from "@mui/material";
import { useEffect } from "react";

export const MainListItems = () => {
  const navigate = useNavigate();
  const { college } = useParams();

  // useEffect(() => {
  //   console.log("college mainListItem", college);
  // }, [])

  return (
    <React.Fragment>
      <ListItemButton
        onClick={() => {
          if (college) navigate(`/${college}/student`);
          if (!college) navigate("/");
        }}
      >
        <Tooltip title="Dashboard" placement="right">
          <ListItemIcon>
            <DashboardIcon />
          </ListItemIcon>
        </Tooltip>
        <ListItemText primary="Dashboard" />
      </ListItemButton>
      {college && (
        <ListItemButton onClick={() => navigate("account")}>
          <Tooltip title="Account" placement="right">
            <ListItemIcon>
              <PersonIcon />
            </ListItemIcon>
          </Tooltip>
          <ListItemText primary="Account" />
        </ListItemButton>
      )}
    </React.Fragment>
  );
};

export default MainListItems;
