import { Avatar, Box, Button, Container, Typography } from "@mui/material";
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import { useParams, useNavigate } from "react-router";

export default function ResetSuccessful() {
    const { college } = useParams();
    const navigate = useNavigate();
    const backToLogin = () => {
     navigate(`/${college}/student/login`)
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
          <Avatar sx={{ m: 1, bgcolor: "success.main" }}>
            <CheckCircleOutlineIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Password reset
          </Typography>
          <Typography
            variant="subtitle2"
            sx={{ color: "rgb(126,133,145)", mt: 1, textAlign: "center" }}
          >
            Your Password has been successfully reset.
          </Typography>
          <Box sx={{ width: "100%" }}>
            <Button
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2, textTransform: "none" }}
              onClick={backToLogin}
            >
              Back to log in
            </Button>
          </Box>
        </Box>
      </Container>
    );
}