import { Avatar, Box, Button, Container, Grid, InputLabel, TextField, Typography } from "@mui/material";
import LoadingButton from "@mui/lab/LoadingButton";
import EmailIcon from '@mui/icons-material/Email';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useState } from "react";
import { useParams, useNavigate } from "react-router";
import toast from "react-hot-toast";
import membersApi from "../../../../services/apis/membersApi";
// import { Link } from "react-router-dom";

export default function CheckEmail({ emailID, setNewPasswordStatus, setEmailRequestData }) {
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

    const handleSubmit = () => {
        setNewPasswordStatus(true);
    }

    const handleResend = () => {
      let email = emailID;
      if (email) {
        getRequestEmail(email);
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
            <EmailIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Check you email
          </Typography>
          <Typography
            variant="subtitle2"
            sx={{ color: "rgb(126,133,145)", mt: 1, textAlign: "center" }}
          >
            We send a password reset link to
          </Typography>
          <Typography
            variant="subtitle2"
            sx={{
              color: "rgb(126,133,145)",
              mt: 1,
              fontWeight: "600",
              textAlign: "center",
            }}
          >
            {emailID}
          </Typography>
          <Box sx={{ width: "100%" }}>
            <LoadingButton
              fullWidth
              variant="contained"
              loading={loading}
              sx={{ mt: 3, mb: 2, textTransform: "none" }}
              onClick={handleSubmit}
            >
              Continue
            </LoadingButton>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <Box component="span">
                    <Typography
                      variant="subtitle2"
                      sx={{ color: "rgb(126,133,145)", mt: 1 }}
                    >
                      Didn't receive the email?
                    </Typography>
                  </Box>
                  <Box component="span" sx={{ ml: 1 }}>
                    <Typography
                      variant="subtitle2"
                      sx={{
                        color: "#3f50b5",
                        mt: 1,
                        cursor: "pointer",
                        fontWeight: "600",
                      }}
                      onClick={handleResend}
                    >
                      Click to resend
                    </Typography>
                  </Box>
                </Box>
              </Grid>
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