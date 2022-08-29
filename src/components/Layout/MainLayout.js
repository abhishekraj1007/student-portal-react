import { useEffect, useRef, useState } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
// import { styled } from '@mui/material/styles';
// import DashboardNavbar from './navigation/';
// import Sidebar from './navigation/Sidebar';
// import Navbar from './navigation/NavBar';
// import LegalBar from './LegalBar';

import * as React from "react";
import { styled } from "@mui/material/styles";
import {
  Box,
  Toolbar,
  List,
  Typography,
  Divider,
  IconButton,
  Badge,
} from "@mui/material";
import MuiDrawer from "@mui/material/Drawer";
import MuiAppBar from "@mui/material/AppBar";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import NotificationsIcon from "@mui/icons-material/Notifications";

import { MainListItems, SecondaryListItems } from "./components";
// import Copyright from "../../components/ui/Copyright";

import { useDispatch, useSelector } from "react-redux";
// import { Navigate } from 'react-router-dom';

const drawerWidth = 240;

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  "& .MuiDrawer-paper": {
    position: "relative",
    whiteSpace: "nowrap",
    width: drawerWidth,
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
    boxSizing: "border-box",
    ...(!open && {
      overflowX: "hidden",
      transition: theme.transitions.create("width", {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
      width: theme.spacing(7),
      [theme.breakpoints.up("sm")]: {
        width: theme.spacing(9),
      },
    }),
  },
}));

const MainLayout = () => {
  const location = useLocation();
//   const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const layoutContentRef = useRef(null);

  const [open, setOpen] = React.useState(true);
  const loginUserName = useSelector((state) => state.auth.loginUserName)

  const toggleDrawer = () => {
    setOpen(!open);
  };

  useEffect(() => {
    if (layoutContentRef.current) {
      layoutContentRef.current.scrollTop = 0;
    }
  }, [location.pathname]);

//   const toggleSideBarHandler = () => {
//     setIsSidebarOpen((prepValue) => !prepValue);
//   };

  return (
    <Box sx={{ display: "flex" }}>
      <AppBar position="absolute" open={open}>
        <Toolbar
          sx={{
            pr: "24px", // keep right padding when drawer closed
          }}
        >
          <IconButton
            edge="start"
            color="inherit"
            aria-label="open drawer"
            onClick={toggleDrawer}
            sx={{
              marginRight: "36px",
              ...(open && { display: "none" }),
            }}
          >
            <MenuIcon />
          </IconButton>
          <Typography
            component="h1"
            variant="h6"
            color="inherit"
            noWrap
            sx={{ flexGrow: 1 }}
          >
            {`Welcome, ${loginUserName}`}
          </Typography>
          <IconButton color="inherit">
            <Badge badgeContent={0} color="secondary">
              <NotificationsIcon />
            </Badge>
          </IconButton>
        </Toolbar>
      </AppBar>
      <Drawer variant="permanent" open={open}>
        <Toolbar
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "flex-end",
            px: [1],
          }}
        >
          <IconButton onClick={toggleDrawer}>
            <ChevronLeftIcon />
          </IconButton>
        </Toolbar>
        <Divider />
        <List component="nav">
          <MainListItems />
          <Divider sx={{ my: 1 }} />
          <SecondaryListItems />
        </List>
      </Drawer>
      <Box
        component="main"
        sx={{
          backgroundColor: (theme) =>
            theme.palette.mode === "light"
              ? theme.palette.grey[100]
              : theme.palette.grey[900],
          flexGrow: 1,
          height: "100vh",
          overflow: "auto",
        }}
        ref={layoutContentRef}
      >
        <Toolbar />
        <Outlet />

      </Box>
    </Box>
  );
};

export default MainLayout;