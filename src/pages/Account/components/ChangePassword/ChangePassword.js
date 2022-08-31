import { LoadingButton } from "@mui/lab";
import { Box, Card, Divider, TextField } from "@mui/material";
import { useState } from "react";
import toast from "react-hot-toast";
import collegeApi from "../../../../services/apis/collegeApi";
import { useNavigate } from 'react-router-dom';

export default function ChangePassword() {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const [oldPasswordError, setOldPassword] = useState(false);
  const [newPasswordError, setNewPassword] = useState(false);

  const changePassword = async (passwordData) => {
    setLoading(true);
    try {
      const data = await collegeApi.changeCollegePass(passwordData);

      if (data.message) {
        setLoading(false);
        console.log(data);
        toast.success(`${data.message}`);
        navigate("/dashboard");
      }

      if (data.error) {
        setLoading(false);
        console.log(data);
        toast.error("Not able to change password");
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
      oldPassword: data.get("oldPassword"),
      newPassword: data.get("newPassword"),
    });

    let oldPassword = data.get("oldPassword");
    let newPassword = data.get("newPassword");

    if(!oldPassword) {
      setOldPassword(true)
    } else {
      setOldPassword(false)
    }
    if(!newPassword) {
      setNewPassword(true)
    } else {
      setNewPassword(false)
    }

    if(oldPassword && newPassword) {
      let passwordData = {
        oldPassword,
        newPassword,
      };
      // calling Api
      changePassword(passwordData);
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
            id="oldPassword"
            label="Old Password"
            name="oldPassword"
            autoComplete="new-password"
            sx={{ mx: 2, my: 2 }}
            {...(oldPasswordError
              ? {
                  error: true,
                  helperText: "Old Password is Required",
                }
              : null)}
          />
          <TextField
            margin="normal"
            required
            id="newPassword"
            label="New Password"
            name="newPassword"
            sx={{ mx: 2, my: 2 }}
            {...(newPasswordError
              ? {
                  error: true,
                  helperText: "New Password is Required",
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
              {"Change"}
            </LoadingButton>
          </Box>
        </Box>
      </Box>
    </Card>
  );
}
