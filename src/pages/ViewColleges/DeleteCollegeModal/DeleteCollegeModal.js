import React from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  Divider,
  Paper,
  Stack,
  TextField,
  IconButton,
  Box,
} from "@mui/material";
import LoadingButton from "@mui/lab/LoadingButton";
import { useState, useEffect } from "react";
import superAdminApi from "../../../services/apis/superAdminApi";
import toast from "react-hot-toast";


const DeleteCollegeModal = ({ openDeleteModal, setDeleteModal, collegeID, getAllColleges }) => {
  const [loading, setLoading] = useState(false);

  const handleDelete =  async () => {
    setLoading(true);
    try {
      const data = await superAdminApi.deleteColleges({ id: collegeID });

      if (data) {
        setLoading(false);
        console.log(data);
        toast.success(`${data.msg}`);
        setDeleteModal(false);
        getAllColleges();
      }

    } catch (error) {
      setLoading(false);
      toast.error("Something Went Wrong");
      console.log(error);
    }
  }

  return (
    <>
      <Dialog open={openDeleteModal} fullWidth maxWidth="sm">
        <DialogTitle>{"Delete College"}</DialogTitle>

        <Grid item xs={12} sm={12} md={12} lg={12}>
          <Divider />
        </Grid>

        <DialogContent>
          <Grid item xs={12} sm={12} md={12} lg={12}>
            <Box>
                {"Are you sure you want to delete the college"}
            </Box>
          </Grid>
        </DialogContent>

        <Grid item xs={12} sm={12} md={12} lg={12}>
          <Divider />
        </Grid>

        <DialogActions>
          <Button variant="text" onClick={() => setDeleteModal(false)}>
            {"Close"}
          </Button>

          <LoadingButton
            variant="text"
            color="error"
            loading={loading}
            onClick={handleDelete}
            // sx={{ mt: 3, mb: 2 }}
          >
            {"Delete"}
          </LoadingButton>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default DeleteCollegeModal;
