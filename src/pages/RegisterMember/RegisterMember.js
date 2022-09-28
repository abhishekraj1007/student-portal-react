import { LoadingButton } from "@mui/lab";
import { Box, Card, Divider, TextField } from "@mui/material";
import { useState } from "react";
import toast from "react-hot-toast";
import collegeApi from "../../services/apis/collegeApi";

export default function RegisterMember() {
  const [loading, setLoading] = useState(false);
  const EMAIL_REGEX = /\S+@\S+\.\S+/;

  const [usernameError, setUsernameError] = useState(false);
  const [emailError, setEmailError] = useState(false);
  const [invalidEmail, setInvalidEmail] = useState(false);

  const validateRegex = (value, regex) => {
    const re = new RegExp(regex);
    return re.test(value);
  };

  const createMember = async (registerData) => {
    setLoading(true);
    try {
      const data = await collegeApi.registerMember(registerData);

      if (data.message) {
        setLoading(false);
        console.log(data);
        toast.success(`${data.message}`);
        // navigate("/dashboard");
      }

      if (data.error) {
        setLoading(false);
        console.log(data);
        toast.error("Not able to register member");
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
    console.log("college data", data);

    console.log({
      userName: data.get("userName"),
      email: data.get("email"),
    });

    let username = data.get("userName");
    let email = data.get("email");

    if(!username) {
      setUsernameError(true)
    } else {
      setUsernameError(false)
    }
    if(!email) {
      setEmailError(true)
    } else {
      setEmailError(false)
    }

    if (validateRegex(email, EMAIL_REGEX)) {
      setInvalidEmail(false);
    } else {
      setInvalidEmail(true);
    }

    if(username && email && !invalidEmail) {
      let registerData = {
        username,
        email,
      };
      // calling Api
      createMember(registerData);
    }

  };

  return (
    <Card elevation={6} sx={{ mx: 4, my: 4 }}>
      <Box
        sx={{
          display: "flex",
          //   px: 1.5,
          py: 0.5,
        }}
      >
        <Box
          component="form"
          onSubmit={handleSubmit}
          noValidate
          sx={{ display: "flex", flexDirection: "column", width: "100%" }}
        >
          <TextField
            margin="normal"
            required
            id="userName"
            label="User Name"
            name="userName"
            autoComplete="new-password"
            sx={{ mx: 2, my: 2 }}
            {...(usernameError
              ? {
                  error: true,
                  helperText: "Username is Required",
                }
              : null)}
          />
          <TextField
            margin="normal"
            required
            id="email"
            label="Email"
            name="email"
            type="email"
            sx={{ mx: 2, my: 2 }}
            {...(emailError
              ? {
                  error: true,
                  helperText: "Email is Required",
                }
              : null)}
            {...(!emailError && invalidEmail
              ? {
                  error: true,
                  helperText: "Invalid Email",
                }
              : null)}
          />
          <Divider sx={{ mt: 1 }} />
          <Box
            sx={{
              display: "flex",
              justifyContent: "flex-end",
              py: 1,
              px: 2,
              alignItems: "center",
            }}
          >
            <LoadingButton
              type="submit"
              variant="outlined"
              loading={loading}
              // sx={{ mt: 3, mb: 2 }}
            >
              {"Register"}
            </LoadingButton>
          </Box>
        </Box>
      </Box>
    </Card>
  );
}
