import { LoadingButton } from "@mui/lab";
import { Box, Card, Divider, Grid, InputLabel, Paper, MenuItem, Select, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, Typography, FormControl } from "@mui/material";
import { useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import membersApi from "../../services/apis/membersApi";
import toast from "react-hot-toast";
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { useEffect } from "react";
import TableSkeletonLoading from "../../components/ui/TableSkeletonLoading";
import { PdfDocument } from "../../components/ui/AdmitCard";
import { PDFDownloadLink } from "@react-pdf/renderer";
import { Downloading } from "@mui/icons-material";
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

  const [allSems, setAllSems] = useState([]);
  const [allExamTerms, setAllExamTerms] = useState([]);
  const { college } = useParams();

  const userData = useSelector((state) => state.account?.studentProfileData);
  const [allFormData, setAllFormData] = useState([]);

  const [admitLoading, setAdmitLoading] = useState(false);
  const [admitDetails, setAdmitDetails] = useState([]);
  const [cardId, setCardId] = useState(null);

  const renderOnce = useRef(true);

  useEffect(() => {
    console.log("userDataForm", userData);
    setStudentID(userData?.studentID);
    setName(userData?.user?.username);
    setMobile(userData?.user?.mobile);
    // setSemester(userData?.semester?.semester_code);
    setDepartment(userData?.department_id?.department_name ? userData?.department_id?.department_name : "")
  }, [userData])

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

  const getFormFilledUp = async (formData) => {
    setLoading(true);
    try {
      const data = await membersApi.studentExamForm(college, formData);

      if (data.status === 200) {
        setLoading(false);
        console.log(data);
        toast.success(`${data.message}`);
        // navigate("/dashboard");
        getFormData();
      }

      if (data.status === 400) {
        setLoading(false);
        console.log(data);
        toast.error(`${data.message}`);
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

  const getAllSems = async () => {
    // setLoading(true);
    try {
      const response = await membersApi.getSemesters(college);

      if (response.data) {
        // setLoading(false);
        console.log(response.data);
        setAllSems(response.data)
        // toast.success(`${data.message}`);
        // navigate("/dashboard");
      }
    } catch (error) {
      // setLoading(false);
      toast.error("Something Went Wrong");
      console.log(error);
    }
  };

  const getAllTerms = async () => {
    // setLoading(true);
    try {
      const response = await membersApi.getExamTerms(college);

      if (response.data) {
        // setLoading(false);
        console.log(response.data);
        setAllExamTerms(response.data)
        // toast.success(`${data.message}`);
        // navigate("/dashboard");
      }
    } catch (error) {
      // setLoading(false);
      toast.error("Something Went Wrong");
      console.log(error);
    }
  };

  useEffect(() => {
    if(renderOnce.current) {
      renderOnce.current = false;
      getAllSems();
      getAllTerms();
      getFormData();
    }
  }, [])

  const handleSubmit = () => {
    console.log("submitted");
    // event.preventDefault();
    // const data = new FormData(event.currentTarget);
    // console.log("exam form data", data);

    if (examType && examSession && feeAmount && feeRecieptNo && semester) {
        let formData = {
            examType,
            examSession: `${examSession.getFullYear()}`,
            feeAmount,
            feeRecieptNo,
            semester
        }
        getFormFilledUp(formData);
    }
  };

  const handleDownload = async (id) => {
    setCardId(id)
    setAdmitLoading(true);
    try {
      const response = await membersApi.getAdmitCard(college, id);

      if (response.data) {
        setAdmitLoading(false);
        console.log(response.data);
        setAdmitDetails(response.data);
      }
    } catch (error) {
      setAdmitLoading(false);
      toast.error("Something Went Wrong");
      console.log(error);
    }
  }

  let tableRowsContent = <TableSkeletonLoading rowPerPage={10} colPerPage={9}/>;

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
            let { id, exam_type, exam_session, fee_paid_amount, fee_reciept_ref_no, acknowledgement_status } = data;
            return (
              <TableRow
                key={`${fee_reciept_ref_no}`}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell>{exam_type.exam_type_name}</TableCell>
                <TableCell>{exam_session}</TableCell>
                <TableCell>{fee_paid_amount}</TableCell>
                <TableCell>{fee_reciept_ref_no}</TableCell>
                <TableCell>{acknowledgement_status}</TableCell>
                <TableCell>{data?.semester_id?.semester_code}</TableCell>
                <TableCell>{data?.department_id?.department_name}</TableCell>
                <TableCell>
                  {data?.department_id?.instructor?.username}
                </TableCell>
                <TableCell>
                  {acknowledgement_status === "Approved" ? (
                    <LoadingButton
                      variant="text"
                      loading={cardId === id && admitLoading ? true : false}
                      size="small"
                      onClick={() => handleDownload(id)}
                      // sx={{ mt: 3, mb: 2 }}
                      disabled={
                        acknowledgement_status !== "Approved" ? true : false
                      }
                    >
                      {admitDetails.length !== 0 && cardId === id ? (
                        <PDFDownloadLink
                          document={<PdfDocument data={admitDetails} />}
                          fileName="admitCard.pdf"
                          style={{
                            textDecoration: "none",
                            border: "none",
                          }}
                        >
                          {({ blob, url, loading, error }) =>
                            loading ? "Downloading..." : "Download"
                          }
                        </PDFDownloadLink>
                      ) : "Load Card"}
                    </LoadingButton>
                  ) : (
                    <LoadingButton
                      variant="text"
                      loading={cardId === id && admitLoading ? true : false}
                      size="small"
                      onClick={() => handleDownload(id)}
                      // sx={{ mt: 3, mb: 2 }}
                      disabled={
                        acknowledgement_status !== "Approved" ? true : false
                      }
                    >
                      Load Card
                    </LoadingButton>
                  )}
                </TableCell>
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
                disabled={studentID?.length !== 0 ? true : false}
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
                disabled={name?.length !== 0 ? true : false}
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
                disabled={mobile?.length !== 0 ? true : false}
                // type="number"
                onChange={(e) => setMobile(e.target.value)}
                fullWidth
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <FormControl fullWidth>
                <InputLabel>Semester</InputLabel>
                <Select
                  name="semester"
                  value={semester}
                  label="Semester"
                  onChange={(e) => setSemester(e.target.value)}
                  fullWidth
                >
                  {allSems?.map((data, index) => (
                    <MenuItem value={data.semester_code} key={`${data.semester_code}_${index}`}>
                      {data.semester_code}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={4}>
              <TextField
                required
                id="department"
                label="Department"
                name="department"
                value={department}
                disabled={department?.length !== 0 ? true : false}
                onChange={(e) => setDepartment(e.target.value)}
                fullWidth
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <FormControl fullWidth>
                <InputLabel id="exam-type-label">Exam Type</InputLabel>
                <Select
                  name="examType"
                  value={examType}
                  label="Exam Type"
                  onChange={(e) => setExamType(e.target.value)}
                  fullWidth
                >
                  {allExamTerms?.map((data, index) => (
                    <MenuItem value={data.exam_type_name} key={`${data.exam_type_name}_${index}`}>
                      {data.exam_type_name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item container alignItems="center" xs={12} sm={4}>
              <Grid item xs={12}>
                <DatePicker
                  views={["year"]}
                  label="Exam Session"
                  value={examSession}
                  name="examSession"
                  // disabled={examSession.length !== 0 ? true : false}
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
                <TableCell>Admit Card</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>{tableRowsContent}</TableBody>
          </Table>
        </TableContainer>
      </Card>
    </>
  );
}
