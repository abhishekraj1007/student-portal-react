import { LoadingButton } from "@mui/lab";
import { Box, Button, Card, Divider, Grid, Input, TextField, Avatar, Stack, Typography } from "@mui/material";
import { useState } from "react";
import superAdminApi from "../../services/apis/superAdminApi";
import toast from "react-hot-toast";

export default function CreateCollege() {
  const [loading, setLoading] = useState(false);
  const EMAIL_REGEX = /\S+@\S+\.\S+/;

  const [collegePath, setCollegePath] = useState("");
  const [collegeName, setCollegeName] = useState("");
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [yearOfEst, setYearOfEst] = useState("");
  const [picture, setPicture] = useState({});

  const [collegePathErr, setCollegePathErr] = useState(false);
  const [collegenameError, setCollegenameError] = useState(false);
  const [usernameError, setUsernameError] = useState(false);
  const [emailError, setEmailError] = useState(false);
  const [yearOfEstErr, setYearOfEstErr] = useState(false);

  const [invalidEmail, setInvalidEmail] = useState(false);

  const validateRegex = (value, regex) => {
    const re = new RegExp(regex);
    return re.test(value);
  };

  const createColleges = async (collegeData) => {
    setLoading(true);
    try {
      const data = await superAdminApi.createCollege(collegeData);

      if (data.msg) {
        setLoading(false);
        console.log(data);
        toast.error(`${data.msg}`);
        // navigate("/dashboard");
      }

      if (data.error) {
        setLoading(false);
        console.log(data);
        toast.error("Not able to create college");
        // localStorage.setItem("access_token", `${userData.access_token}`);
      }
    } catch (error) {
      setLoading(false);
      toast.error("Something Went Wrong");
      console.log(error);
    }
  };

  const uploadPicture = (e) => {
    setPicture({
      /* contains the preview, if you want to show the picture to the user*/
      picturePreview: URL.createObjectURL(e.target.files[0]),
      /* this contains the file we want to send */
      pictureAsFile: e.target.files[0],
    });
  };


  const handleSubmit = () => {
    // event.preventDefault();
    // const data = new FormData(event.currentTarget);
    // console.log("college data", data);

    // if(!password) {
    //   setPasswordError(true)
    // } else {
    //   setPasswordError(false)
    // }
    // calling Api
    console.log("++++",picture?.pictureAsFile)
    let collegeData = {
      collegeName,
      userName,
      email,
      collegePath,
      yearOfEst,
      image: picture?.pictureAsFile
    }
    createColleges(collegeData);
  };

  return (
    <Card elevation={6} sx={{ mx: 4, my: 4 }}>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          //   px: 1.5,
          py: 0.5,
        }}
      >
        <Grid container spacing={2} padding={2}>
          <Grid item xs={12}>
            <Box sx={{ display: "flex", justifyContent: "center" }}>
              <Avatar
                src={picture?.picturePreview}
                alt="College Logo"
                sx={{ width: 100, height: 100 }}
              />
            </Box>
          </Grid>
          <Grid item xs={12}>
            <TextField
              required
              id="collegeName"
              label="College Name"
              name="collegeName"
              value={collegeName}
              onChange={(e) => setCollegeName(e.target.value)}
              fullWidth
              {...(collegenameError
                ? {
                    error: true,
                    helperText: "College Name is Required",
                  }
                : null)}
            />
          </Grid>
          <Grid item container spacing={2} xs={12}>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                id="userName"
                label="User Name"
                name="userName"
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
                fullWidth
                {...(usernameError
                  ? {
                      error: true,
                      helperText: "Username is Required",
                    }
                  : null)}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                id="email"
                label="Email"
                name="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                fullWidth
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
            </Grid>
          </Grid>
          <Grid item container spacing={2} xs={12}>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                id="collegePath"
                label="College Path"
                name="collegePath"
                value={collegePath}
                onChange={(e) => setCollegePath(e.target.value)}
                fullWidth
                {...(collegePathErr
                  ? {
                      error: true,
                      helperText: "College Path is Required",
                    }
                  : null)}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                id="yearOfEst"
                label="Year Of Establishment"
                name="yearOfEst"
                value={yearOfEst}
                onChange={(e) => setYearOfEst(e.target.value)}
                fullWidth
                {...(yearOfEstErr
                  ? {
                      error: true,
                      helperText: "Year Of Establishment is Required",
                    }
                  : null)}
              />
            </Grid>
          </Grid>
          <Grid item xs={12} sm={6}>
            <input
              accept="image/*"
              style={{ display: "none" }}
              id="raised-button-file"
              multiple
              type="file"
              onChange={uploadPicture}
            />
            <label htmlFor="raised-button-file">
              <Button
                variant="contained"
                component="span"
              >
                Upload a Logo
              </Button>
            </label>
          </Grid>
        </Grid>
        <Divider />
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
            onClick={handleSubmit}
          >
            Create
          </LoadingButton>
        </Box>
      </Box>
    </Card>
  );
}
