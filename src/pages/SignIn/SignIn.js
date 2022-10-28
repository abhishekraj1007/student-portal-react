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
import { useNavigate, useLocation, useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { authActions } from "../../store/slices/authSlice";

import superAdminApi from "../../services/apis/superAdminApi";
import collegeApi from "../../services/apis/collegeApi";
import membersApi from "../../services/apis/membersApi";

import Copyright from "../../components/ui/Copyright";
import { accountActions } from "../Account/store/slice/accountSlice";
import { useEffect, useState, useRef } from "react";
import { BASE_API_URL } from "../../globalVariables";

export default function SignIn() {
  const navigate = useNavigate();
  const location = useLocation();
  const { college } = useParams();
  const dispatch = useDispatch();
  const renderOnce = useRef(true);

  const [loading, setLoading] = useState(false);
  const [nameError, setNameError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [colName, setColName] = useState("");
  const [logo, setLogo] = useState("")

  const getSignIn = async (signInDeatils) => {
    setLoading(true);
    try {
      let userData = null;
      if(location.pathname === `${college}/login`) {
        userData = await collegeApi.signIN(signInDeatils);
      } 
      if(location.pathname === `/${college}/student/login`) {
        userData = await membersApi.signIN(signInDeatils, college);
      }
      if(location.pathname === `/admin/login`) {
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
          isSuperAdmin: userData.is_superadmin,
          isStudent: userData.is_student,
        };

        localStorage.setItem("auth", JSON.stringify(obj));
        // if (userData.is_student) {
        //   localStorage.setItem("member", JSON.stringify(obj));
        // }
        // if (userData.is_superadmin) {
        //   localStorage.setItem("admin", JSON.stringify(obj));
        // }

        if (userData.is_student) {
          try {
            const data = await membersApi.studentProfile(college);

            if (data) {
              console.log(data);
              dispatch(accountActions.updateStudentProfileData(data));
              navigate(`/${college}/student`);
            }
          } catch (error) {
            toast.error("Something Went Wrong");
            console.log(error);
          }
        }

        setLoading(false);
        console.log(userData);
        // toast.success("Logged In Successfully");
        if (userData.is_superadmin) navigate(`/admin`);
      }

      // if(userData.user_type) {`
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

  const collegeLogo = async () => {
    try {
      const response = await membersApi.getCollegeLogo(college);

      if (response.data) {
        console.log(response.data);
        setColName(response.data.name);
        setLogo(response.data.image);
      }

    } catch (error) {
      toast.error("Something Went Wrong");
      console.log(error);
    }
  };

  useEffect(() => {
    if(location.pathname === `/${college}/student/login`) {
      if(renderOnce.current) {
        renderOnce.current = false;
        collegeLogo();
      }
    }
  }, [location])

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
    <>
      {colName !== "" && (
        <Box sx={{ textAlign: "center", mt: 3 }}>
          <Typography variant="h3">{colName}</Typography>
        </Box>
      )}
      <Container component="main" maxWidth="xs">
        <Box
          sx={{
            marginTop: 4,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          {logo !== "" ? (
            <Avatar
              src={`${BASE_API_URL}/college/public${logo}`}
              sx={{ width: 100, height: 100, m: 1 }}
            />
          ) : (
            <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
              <LockOutlinedIcon />
            </Avatar>
          )}
          <Typography component="h1" variant="h5">
            {location.pathname === `/${college}/student/login` && "Student"}
            {location.pathname === `/admin/login` && "Super Admin"}
          </Typography>
          <Box
            component="form"
            onSubmit={handleSubmit}
            noValidate
            sx={{ mt: 1 }}
          >
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
            {/* <FormControlLabel
              control={
                <Checkbox value="remember" name="remember" color="primary" />
              }
              label="Remember me"
            /> */}
            <LoadingButton
              type="submit"
              fullWidth
              variant="contained"
              loading={loading}
              sx={{ mt: 3, mb: 2 }}
            >
              Sign In
            </LoadingButton>
            {location.pathname === `/${college}/student/login` && (
              <Grid container>
                <Grid item xs>
                  <Link href={`/${college}/student/forget-password`} variant="body2">
                    Forgot password?
                  </Link>
                </Grid>
              </Grid>
            )}
          </Box>
        </Box>
        <Copyright sx={{ mt: 8, mb: 4 }} />
      </Container>
    </>
  );
}
