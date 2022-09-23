import { LoadingButton } from "@mui/lab";
import { Box, Card, Divider, Grid, InputLabel, Paper, MenuItem, Select, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, Typography } from "@mui/material";
import { useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import membersApi from "../../services/apis/membersApi";
import toast from "react-hot-toast";
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { useEffect } from "react";
import TableSkeletonLoading from "../../components/ui/TableSkeletonLoading";
// studentID, name, mobile no, current semester, department
export default function Exams() {
  const [loading, setLoading] = useState(false);
  const [studentID, setStudentID] = useState("");
  const [name, setName] = useState("");
  const [mobile, setMobile] = useState("");
  const [semester, setSemester] = useState("");
  const [department, setDepartment] = useState("");
  const [examType, setExamType] = useState("");
  const [examSession, setExamSession] = useState(new Date());
  const [feeAmount, setFeeAmount] = useState("");
  const [feeRecieptNo, setFeeRecieptNo] = useState("");
  const { college } = useParams();

  const userData = useSelector((state) => state.account?.studentProfileData);
  const [allFormData, setAllFormData] = useState([]);

  useEffect(() => {
    console.log("userDataForm", userData);
    setStudentID(userData?.studentID);
    setName(userData?.user?.username);
    setMobile(userData?.user?.mobile);
    setSemester(userData?.semester?.semester_code);
    setDepartment(userData?.department_id?.department_name)
  }, [userData])

  const getFormFilledUp = async (formData) => {
    setLoading(true);
    try {
      const data = await membersApi.studentExamForm(college, formData);

      if (data.message) {
        setLoading(false);
        console.log(data);
        toast.success(`${data.message}`);
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

  const getFormData = async () => {
    setLoading(true);
    try {
      const response = await membersApi.studentExamFormData(college);

      if (response.data) {
        setLoading(false);
        console.log(response);
        setAllFormData(response.data);
        // toast.success(`${response.message}`);
        // navigate("/dashboard");
      }

      if (response.error) {
        setLoading(false);
        console.log(response);
        toast.error("Not able to create college");
        // localStorage.setItem("access_token", `${userData.access_token}`);
      }
    } catch (error) {
      setLoading(false);
      toast.error("Something Went Wrong");
      console.log(error);
    }
  };

  useEffect(() => {
    getFormData();
  }, [])

  const handleSubmit = () => {
    console.log("submitted");
    // event.preventDefault();
    // const data = new FormData(event.currentTarget);
    // console.log("exam form data", data);

    // console.log({
    //   studentID: data.get("collegeName"),
    //   name: data.get("userName"),
    //   mobile: data.get("email"),
    //   semester: data.get("semester"),
    //   department: data.get("department"),
    //   examType: data.get("examType"),
    //   examSession: data.get("examSession"),
    //   feeAmount: data.get("feeAmount"),
    //   feeRecieptNo: data.get("feeRecieptNo"),
    // });

    // let collegeName = data.get("collegeName");
    // let username = data.get("userName");
    // let email = data.get("email");
    // let password = data.get("password");
    // console.log("dataaa", `${examSession.getFullYear()}`)
    if (examType && examSession && feeAmount && feeRecieptNo) {
        let formData = {
            examType,
            examSession: `${examSession.getFullYear()}`,
            feeAmount,
            feeRecieptNo
        }
        getFormFilledUp(formData);
    }
  };

  let tableRowsContent = <TableSkeletonLoading rowPerPage={10} />;

  if (!loading) {
    if (allFormData.length === 0) {
      tableRowsContent = (
        <TableRow>
          <TableCell sx={{ textAlign: "center" }}>
            <Typography variant="subtitle1">No Form found!</Typography>
          </TableCell>
        </TableRow>
      );
    } else {
      tableRowsContent = (
        <>
          {allFormData?.map((data) => {
            let { exam_type, exam_session, fee_paid_amount, fee_reciept_ref_no, acknowledgement_status } = data;
            return (
              <TableRow
                key={`${fee_reciept_ref_no}`}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell>{exam_type}</TableCell>
                <TableCell>{exam_session}</TableCell>
                <TableCell>{fee_paid_amount}</TableCell>
                <TableCell>{fee_reciept_ref_no}</TableCell>
                <TableCell>{acknowledgement_status}</TableCell>
                <TableCell>{data.semester_id.semester_code}</TableCell>
                <TableCell>{data.department_id.department_name}</TableCell>
                <TableCell>{data?.department_id?.instructor?.username}</TableCell>
              </TableRow>
            );
          })}
        </>
      );
    }
  }

  return (
    <>
      <Card elevation={6} sx={{ mx: 4, my: 4 }}>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            py: 0.5,
          }}
        >
          <Box sx={{ py: 1, px: 2 }}>
            <Typography variant="h5">{"Exam Form"}</Typography>
          </Box>
          <Divider sx={{ mt: 1 }} />
          <Grid container padding={2} spacing={2}>
            <Grid item xs={12} sm={4}>
              <TextField
                required
                id="studentID"
                label="Student ID"
                value={studentID}
                name="studentID"
                onChange={(e) => setStudentID(e.target.value)}
                fullWidth
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <TextField
                required
                id="name"
                label="Name"
                name="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                fullWidth
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <TextField
                required
                id="mobile"
                label="Mobile"
                name="mobile"
                value={mobile}
                type="number"
                onChange={(e) => setMobile(e.target.value)}
                fullWidth
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <TextField
                required
                id="semester"
                label="Semester"
                name="semester"
                value={semester}
                onChange={(e) => setSemester(e.target.value)}
                fullWidth
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <TextField
                required
                id="department"
                label="Department"
                name="department"
                value={department}
                onChange={(e) => setDepartment(e.target.value)}
                fullWidth
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <Select
                id="examType"
                value={examType}
                label="Exam Type"
                placeholder="Exam Type"
                onChange={(e) => setExamType(e.target.value)}
                fullWidth
              >
                <MenuItem value={"MID_SEM"}>MID_SEM</MenuItem>
                <MenuItem value={"FINAL_SEM"}>FINAL_SEM</MenuItem>
              </Select>
            </Grid>
            <Grid item container alignItems="center" xs={12} sm={4}>
              <Grid item xs={12}>
                <DatePicker
                  views={["year"]}
                  label="Exam Session"
                  value={examSession}
                  name="examSession"
                  onChange={(newValue) => {
                    setExamSession(newValue);
                  }}
                  renderInput={(params) => (
                    <TextField {...params} helperText={null} fullWidth />
                  )}
                />
              </Grid>
            </Grid>
            <Grid item xs={12} sm={4}>
              <TextField
                required
                id="feeAmount"
                label="Fee Amount"
                name="feeAmount"
                value={feeAmount}
                onChange={(e) => setFeeAmount(e.target.value)}
                fullWidth
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <TextField
                required
                id="feeRecieptNo"
                label="Fee Reciept No"
                name="feeRecieptNo"
                value={feeRecieptNo}
                onChange={(e) => setFeeRecieptNo(e.target.value)}
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

      <Card elevation={6} sx={{ mx: 4, my: 4 }}>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>Exam Type</TableCell>
                <TableCell>Exam Session</TableCell>
                <TableCell>Paid Amount</TableCell>
                <TableCell>Reciept Ref No</TableCell>
                <TableCell>Acknowledgement Status</TableCell>
                <TableCell>Semester Code</TableCell>
                <TableCell>Department Name</TableCell>
                <TableCell>Instructor</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>{tableRowsContent}</TableBody>
          </Table>
        </TableContainer>
      </Card>
    </>
  );
}