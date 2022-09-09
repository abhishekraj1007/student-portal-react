import * as React from "react";
import {
  Avatar,
  TextField,
  FormControlLabel,
  Checkbox,
  Grid,
  Link,
  Box,
  Typography,
  Container,
} from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import LoadingButton from "@mui/lab/LoadingButton";

import toast from "react-hot-toast";
import { useNavigate, useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import { authActions } from "../../store/slices/authSlice";

import superAdminApi from "../../services/apis/superAdminApi";
import collegeApi from "../../services/apis/collegeApi";
import membersApi from "../../services/apis/membersApi";

import Copyright from "../../components/ui/Copyright";

export default function SignIn() {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();

  const [loading, setLoading] = React.useState(false);
  const [nameError, setNameError] = React.useState(false);
  const [passwordError, setPasswordError] = React.useState(false);

  const getSignIn = async (signInDeatils) => {
    setLoading(true);
    try {
      let userData = null;
      if(location.pathname === "/dav") {
        userData = await collegeApi.signIN(signInDeatils);
      } else if(location.pathname === "/dav/member") {
        userData = await membersApi.signIN(signInDeatils);
      } else {
        userData = await superAdminApi.signIN(signInDeatils);
      }

      if (userData.is_auth) {
        dispatch(
          authActions.updateLoginUser({
            isAuthenticated: userData.is_auth,
            userName: userData.username,
            isSuperAdmin: userData.is_superadmin ? userData.is_superadmin : "",
            isCollege: userData.is_college,
            isStudent: userData.is_student,
            userType: "",
          })
        );
        let obj = {
          userName: userData.username,
          access_token: userData.access_token,
        }
        if(userData.is_student) {
          localStorage.setItem(
            "member",
            JSON.stringify(obj)
          );
        }
        if(userData.is_superadmin) {
          localStorage.setItem(
            "admin",
            JSON.stringify(obj)
          );
        }
        
        setLoading(false);
        console.log(userData);
        // toast.success("Logged In Successfully");
        navigate("/dashboard");
      }

      // if(userData.user_type) {
      //   dispatch(
      //     authActions.updateLoginUser({
      //       isAuthenticated: userData.is_auth,
      //       userName: userData.username,
      //       isSuperAdmin: false,
      //       isCollege: false,
      //       userType: userData.user_type,
      //     })
      //   );

      //   setLoading(false);
      //   console.log(userData);
      //   toast.success("Logged In Successfully");
      //   navigate("/dashboard");
      // }

      if (userData.error) {
        setLoading(false);
        console.log(userData);
        toast.error("Username or Password does not match");
        // localStorage.setItem("access_token", `${userData.access_token}`);
      }

      if (userData.message) {
        setLoading(false);
        console.log(userData);
        toast.error(`${userData.message}`);
        // localStorage.setItem("access_token", `${userData.access_token}`);
      }
    } catch (error) {
      setLoading(false);
      toast.error(`${error.response.data.detail}`);
      console.log(error);
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log("data", data);
    let username = data.get("userName");
    let password = data.get("password");
    console.log({ username, password });
    if(!username) {
      setNameError(true)
    } else {
      setNameError(false)
    }
    if(!password) {
      setPasswordError(true)
    } else {
      setPasswordError(false)
    }

    if(username && password) {
      let signInDeatils = {
        username,
        password,
      };
      // calling Api
      getSignIn(signInDeatils);

    }
  };

  return (
    <Container component="main" maxWidth="xs">
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="userName"
            label="User Name"
            name="userName"
            autoComplete="userName"
            autoFocus
            {...(nameError
              ? {
                  error: true,
                  helperText: "Username is Required",
                }
              : null)}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            {...(passwordError
              ? {
                  error: true,
                  helperText: "Password is Required",
                }
              : null)}
          />
          <FormControlLabel
            control={
              <Checkbox value="remember" name="remember" color="primary" />
            }
            label="Remember me"
          />
          <LoadingButton
            type="submit"
            fullWidth
            variant="contained"
            loading={loading}
            sx={{ mt: 3, mb: 2 }}
          >
            Sign In
          </LoadingButton>
          <Grid container>
            <Grid item xs>
              <Link href="#" variant="body2">
                Forgot password?
              </Link>
            </Grid>
            {/* <Grid item>
                <Link href="#" variant="body2">
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid> */}
          </Grid>
        </Box>
      </Box>
      <Copyright sx={{ mt: 8, mb: 4 }} />
    </Container>
  );
}
