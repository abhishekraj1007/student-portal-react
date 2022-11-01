import { LoadingButton } from "@mui/lab";
import { Box, Card, Divider, Grid, InputLabel, Paper, MenuItem, Select, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, Typography, FormControl } from "@mui/material";
import { useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import membersApi from "../../../../services/apis/membersApi";
import toast from "react-hot-toast";
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { useEffect } from "react";
import { accountActions } from "../../store/slice/accountSlice";

export default function EditProfile() {
  const dispatch = useDispatch();
  const { college } = useParams();
  const userData = useSelector((state) => state.account?.studentProfileData);
  const [loading, setLoading] = useState(false);

  const [studentNumber, setStudentNumber] = useState("");
  const [studentEmail, setStudentEmail] = useState("");
  const [fatherName, setFatherName] = useState("");
  const [fatherNumber, setFatherNumber] = useState("");
  const [motherName, setMotherName] = useState("");
  const [motherNumber, setMotherNumber] = useState("");
  const [guardianName, setGuardianName] = useState("");
  const [guardianNumber, setGuardianNumber] = useState("");

//   const renderOnce = useRef(true);

  useEffect(() => {
    console.log("userDataForm", userData);
    setStudentNumber(userData?.user?.mobile);
    setStudentEmail(userData?.user?.email);
    setFatherName(userData?.father_name);
    setFatherNumber(userData?.father_mobile_no);
    setMotherName(userData?.mother_name);
    setMotherNumber(userData?.mother_mobile_no);
    setGuardianName(userData?.local_guardian_name);
    setGuardianNumber(userData?.local_guardian_mobile_no);
  }, [userData])

  const editStudentProfileData = async (formData) => {
    setLoading(true);
    try {
      const data = await membersApi.editStudentProfile(college, formData);

      if (data) {
        console.log(data);
        dispatch(accountActions.updateStudentProfileData(data));
        setLoading(false);
        // navigate(`/${college}/student`);
      }
    } catch (error) {
      toast.error("Something Went Wrong");
      setLoading(false);
      console.log(error);
    }
  }

  const handleSubmit = () => {
    console.log("submitted");

    let formData = {
        id: userData?.id,
        mobile: studentNumber,
        email: studentEmail,
        father_name: fatherName,
        father_mobile_no: fatherNumber,
        mother_name: motherName,
        mother_mobile_no: motherNumber,
        local_guardian_name: guardianName,
        local_guardian_mobile_no: guardianNumber
    };
    editStudentProfileData(formData);

  };

  return (
      <Card elevation={6} sx={{ mx: 1, my: 1 }}>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            py: 0.5,
          }}
        >
          <Box sx={{ py: 1, px: 2 }}>
            <Typography variant="h5">{"Edit Profile"}</Typography>
          </Box>
          <Divider sx={{ mt: 1 }} />
          <Grid container padding={2} spacing={2}>
            <Grid item xs={12} sm={4}>
              <TextField
                required
                id="studentEmail"
                label="Student Email"
                value={studentEmail}
                name="studentEmail"
                type="email"
                onChange={(e) => setStudentEmail(e.target.value)}
                fullWidth
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <TextField
                required
                id="studentNumber"
                label="Student Number"
                value={studentNumber}
                name="studentNumber"
                onChange={(e) => setStudentNumber(e.target.value)}
                fullWidth
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <TextField
                required
                id="fatherName"
                label="Father's Name"
                name="fatherName"
                value={fatherName}
                onChange={(e) => setFatherName(e.target.value)}
                fullWidth
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <TextField
                required
                id="fatherNumber"
                label="Father's Number"
                name="fatherNumber"
                value={fatherNumber}
                // type="number"
                onChange={(e) => setFatherNumber(e.target.value)}
                fullWidth
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <TextField
                required
                id="motherName"
                label="Mother's Name"
                name="motherName"
                value={motherName}
                onChange={(e) => setMotherName(e.target.value)}
                fullWidth
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <TextField
                required
                id="motherNumber"
                label="Mother's Number"
                name="motherNumber"
                value={motherNumber}
                onChange={(e) => setMotherNumber(e.target.value)}
                fullWidth
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <TextField
                required
                id="guardianName"
                label="Guardian Name"
                name="guardianName"
                value={guardianName}
                onChange={(e) => setGuardianName(e.target.value)}
                fullWidth
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <TextField
                required
                id="guardianNumber"
                label="Guardian Number"
                name="guardianNumber"
                value={guardianNumber}
                onChange={(e) => setGuardianNumber(e.target.value)}
                fullWidth
              />
            </Grid>
          </Grid>
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
              onClick={handleSubmit}
              // sx={{ mt: 3, mb: 2 }}
            >
              submit
            </LoadingButton>
          </Box>
        </Box>
      </Card>
  );
}
