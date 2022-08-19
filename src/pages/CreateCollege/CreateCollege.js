import { LoadingButton } from "@mui/lab";
import { Box, Card, Divider, TextField } from "@mui/material";
import { useState } from "react";
import superAdminApi from "../../services/apis/superAdminApi";
import toast from "react-hot-toast";

export default function CreateCollege() {
  const [loading, setLoading] = useState(false);

  const createColleges = async (collegeData) => {
    setLoading(true);
    try {
      const data = await superAdminApi.createCollege(collegeData);

      if (data.msg) {
        setLoading(false);
        console.log(data);
        toast.success("College created Successfully");
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

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log("college data", data);

    console.log({
      collegeName: data.get("collegeName"),
      userName: data.get("userName"),
      email: data.get("email"),
      password: data.get("password"),
    });

    let collegeData = {
      collegeName: data.get("collegeName"),
      username: data.get("userName"),
      email: data.get("email"),
      password: data.get("password"),
    };

    // calling Api
    createColleges(collegeData);
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
            id="collegeName"
            label="College Name"
            name="collegeName"
            sx={{ mx: 2, my: 2 }}
          />
          <TextField
            margin="normal"
            required
            id="userName"
            label="User Name"
            name="userName"
            autoComplete="new-password"
            sx={{ mx: 2, my: 2 }}
          />
          <TextField
            margin="normal"
            required
            id="email"
            label="Email"
            name="email"
            type="email"
            sx={{ mx: 2, my: 2 }}
          />
          <TextField
            margin="normal"
            required
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="new-password"
            sx={{ mx: 2, my: 2 }}
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
              Create
            </LoadingButton>
          </Box>
        </Box>
      </Box>
    </Card>
  );
}
