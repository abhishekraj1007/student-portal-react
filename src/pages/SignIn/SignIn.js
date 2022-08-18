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
import { useNavigate } from "react-router-dom";

import superAdminApi from "../../services/apis/superAdminApi";
import Copyright from "../../components/ui/Copyright";

export default function SignIn() {
  const navigate = useNavigate();
  const [loading, setLoading] = React.useState(false);

  React.useEffect(() => {
    console.log("Loading...", loading);
  }, [loading]);

  const getSignIn = async (signInDeatils) => {
    setLoading(true);
    try {
      const userData = await superAdminApi.signIN(signInDeatils);

      if (userData.is_auth) {
        setLoading(false);
        console.log(userData);
        toast.success("Logged In Successfully");
        navigate("/dashboard");
        // localStorage.setItem("access_token", `${userData.access_token}`);
      }

      if (userData.error) {
        setLoading(false);
        console.log(userData);
        toast.error("Username or Password does not match");
        // localStorage.setItem("access_token", `${userData.access_token}`);
      }
    } catch (error) {
      setLoading(false);
      toast.error("Something Went Wrong");
      console.log(error);
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log("data", data);
    console.log({
      userName: data.get("userName"),
      password: data.get("password"),
      remember: data.get("remember"),
    });
    let user = data.get("userName");

    let signInDeatils = {
      username: data.get("userName"),
      password: data.get("password"),
    };
    // calling Api
    getSignIn(signInDeatils);
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
