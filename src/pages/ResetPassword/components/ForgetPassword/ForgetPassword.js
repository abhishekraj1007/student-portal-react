import { Avatar, Box, Container, Grid, InputLabel, TextField, Typography } from "@mui/material";
import LoadingButton from "@mui/lab/LoadingButton";
import VpnKeyIcon from '@mui/icons-material/VpnKey';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useState } from "react";
import { useParams, useNavigate } from "react-router";
import axios from "axios";
import membersApi from "../../../../services/apis/membersApi";
import toast from "react-hot-toast";
// import { Link } from "react-router-dom";

export default function ForgetPassword({setEmailStatus, setEmailID, setEmailRequestData}) {
    const [loading, setLoading] = useState(false);
    const { college } = useParams();
    const navigate = useNavigate();
    const backToLogin = () => {
        navigate(`/${college}/student/login`)
    }

    const getRequestEmail = async (email) => {
      setLoading(true);
      try {
        const response = await membersApi.requestPasswordReset(college, email);

        if(response.status === 200) {
          console.log(response);
          setEmailRequestData({ ...response })
          setLoading(false);
          setEmailStatus(true);
        }

        if(response.status === 400) {
          toast.error(`${response.error}`);
          setLoading(false);
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
        let email = data.get("email");
        // console.log({ email });
        setEmailID(email);

        if (email) {
          getRequestEmail(email)
        }

    }

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
            Forgot Password?
          </Typography>
          <Typography
            variant="subtitle2"
            sx={{ color: "rgb(126,133,145)", mt: 1, textAlign: "center" }}
          >
            No worries, we'll send you reset instructions.
          </Typography>
          <Box
            component="form"
            onSubmit={handleSubmit}
            noValidate
            sx={{ mt: 4, width: "100%" }}
          >
            <InputLabel sx={{ fontSize: "0.9rem" }}>Email</InputLabel>
            <TextField
              sx={{ mt: "0.5rem" }}
              required
              fullWidth
              id="email"
              placeholder="Enter your email"
              name="email"
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
              Send
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