import * as React from "react";
import {
  Container,
  Grid,
  Paper,
} from "@mui/material";

import Copyright from "../../components/ui/Copyright";

import { useDispatch, useSelector } from "react-redux";
import { Navigate } from 'react-router-dom';

export default function Dashboard() {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const authData = JSON.parse(localStorage.getItem("auth"))

  if (!authData?.isStudent && !authData?.isSuperAdmin) return <Navigate replace to="/login" />;

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Grid container spacing={3}>
        <Grid item xs={12} md={8} lg={9}>
          <Paper
            sx={{
              p: 2,
              display: "flex",
              flexDirection: "column",
              height: 240,
            }}
          ></Paper>
        </Grid>
        <Grid item xs={12} md={4} lg={3}>
          <Paper
            sx={{
              p: 2,
              display: "flex",
              flexDirection: "column",
              height: 240,
            }}
          ></Paper>
        </Grid>
        <Grid item xs={12}>
          <Paper
            sx={{ p: 2, display: "flex", flexDirection: "column" }}
          ></Paper>
        </Grid>
      </Grid>
      <Copyright sx={{ pt: 4 }} />
    </Container>
  );
}
