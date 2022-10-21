import { Avatar, Box, Container, Grid, InputLabel, TextField, Typography } from "@mui/material";
import LoadingButton from "@mui/lab/LoadingButton";
import VpnKeyIcon from '@mui/icons-material/VpnKey';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useState } from "react";
import { useParams, useNavigate } from "react-router";
import membersApi from "../../../../services/apis/membersApi";
import toast from "react-hot-toast";
// import { Link } from "react-router-dom";

export default function NewPassword({ setPassword, emailRequestData, setResetSuccessful }) {
    const [loading, setLoading] = useState(false);
    const { college } = useParams();
    const navigate = useNavigate();
    const backToLogin = () => {
      if(!loading) navigate(`/${college}/student/login`)
    }

    const getPasswordReset = async (password) => {
      setLoading(true);
      const resetData = {
        password,
        token: emailRequestData.token,
        uidb64: emailRequestData.uid
      }
      try {
        const response = await membersApi.resetPassword(college, resetData);

        if(response.success) {
          console.log(response);
          setLoading(false);
          setResetSuccessful(true)
        }
      } catch (error) {
        setLoading(false);
        toast.error("Something Went Wrong");
        console.log(error);
      }
    }

    const handleSubmit = (event) => {
      event.preventDefault();
      const data = new FormData(event.currentTarget);

      // console.log("data", data);
      let password = data.get("password");
      let confirmPassword = data.get("confirmPassword");
      // console.log({ email });
    //   setEmailID(email);

      if (password && confirmPassword) {
        if (password === confirmPassword) {
          getPasswordReset(password);
          setPassword(password)
        }
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
            <VpnKeyIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Set new password
          </Typography>
          <Typography
            variant="subtitle2"
            sx={{ color: "rgb(126,133,145)", mt: 1, textAlign: "center" }}
          >
            Your new password must be different to previously used passwords.
          </Typography>
          <Box
            component="form"
            onSubmit={handleSubmit}
            noValidate
            sx={{ mt: 4, width: "100%" }}
          >
            <InputLabel sx={{ fontSize: "0.9rem" }}>Password</InputLabel>
            <TextField
              sx={{ mt: "0.5rem" }}
              required
              fullWidth
              id="password"
              name="password"
              autoComplete="email"
              autoFocus
              type="password"
            />
            <InputLabel sx={{ fontSize: "0.9rem", mt: 3, }}>Confirm password</InputLabel>
            <TextField
              sx={{ mt: "0.5rem" }}
              required
              fullWidth
              id="confirmPassword"
              name="confirmPassword"
              autoComplete="email"
              autoFocus
            />
            <LoadingButton
              type="submit"
              fullWidth
              variant="contained"
              loading={loading}
              sx={{ mt: 3, mb: 2, textTransform: "none" }}
            >
              Reset password
            </LoadingButton>
            <Grid container>
              <Grid
                item
                xs={12}
                sx={{
                  fontSize: "0.8rem",
                  fontWeight: "500",
                  lineHeight: "1.57",
                  letterSpacing: "0.00714em",
                  color: "rgb(126,133,145)",
                }}
              >
                <Box
                  component="span"
                  sx={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "center",
                    alignItems: "center",
                    cursor: "pointer",
                  }}
                  onClick={backToLogin}
                >
                  <ArrowBackIcon /> Back to log in
                </Box>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    );
}