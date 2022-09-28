import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { Box, Card, IconButton, Paper, Typography, Link } from "@mui/material";
import Breadcrumbs from '@mui/material/Breadcrumbs';
// import DeleteIcon from "@mui/icons-material/Delete";
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import superAdminApi from "../../../../services/apis/superAdminApi";
import TableSkeletonLoading from "../../../../components/ui/TableSkeletonLoading";
// import DeleteCollegeModal from "./DeleteCollegeModal/DeleteCollegeModal";
// import VisibilityIcon from '@mui/icons-material/Visibility';
import toast from "react-hot-toast";
// import { BASE_API_URL } from "../../globalVariables";

export default function CollegeSchema() {
//   const navigate = useNavigate();
  const { schema_name } = useParams();

//   const [openDeleteModal, setDeleteModal] = useState(false);
//   const [collegeID, setCollegeID] = useState(null);
  const [loading, setLoading] = useState(false);
  const [college, setCollege] = useState([]);

  const getAllMembers= async () => {
    setLoading(true);
    try {
      const response = await superAdminApi.getCollegeMembers({ college_name: schema_name });

      if (response.data) {
        setLoading(false);
        console.log(response.data);
        setCollege(response.data);
        // navigate("/dashboard");
      }
    } catch (error) {
      setLoading(false);
      toast.error("Something Went Wrong");
      console.log(error);
    }
  };

  useEffect(() => {
    getAllMembers();
  }, []);

  let tableRowsContent = <TableSkeletonLoading rowPerPage={10} colPerPage={5} />;

  if (!loading) {
    if (college.length === 0) {
      tableRowsContent = (
        <TableRow>
          <TableCell sx={{ textAlign: "center" }}>
            <Typography variant="subtitle1">No Member found!</Typography>
          </TableCell>
        </TableRow>
      );
    } else {
      tableRowsContent = (
        <>
          {college?.map((data, index) => {
            let { username, first_name, last_name, email, mobile, is_staff, is_admin, is_student, } = data;
            return (
              <TableRow
                key={`${username}_${index}`}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell>{`${first_name} ${last_name}`}</TableCell>
                <TableCell>{username}</TableCell>
                <TableCell>{email}</TableCell>
                <TableCell>{mobile}</TableCell>
                {is_staff && <TableCell>{`${is_admin && is_staff ? "Admin" : "Staff"}`}</TableCell>}
                {is_admin && !is_staff && <TableCell>{"Admin"}</TableCell>}
                {is_student && <TableCell>{"Student"}</TableCell>}
              </TableRow>
            );
          })}
        </>
      );
    }
  }

  return (
    <>
      <Box sx={{ m: 2 }}>
        <Box sx={{ mb: 2 }}>
          <Breadcrumbs>
            <Link underline="hover" color="inherit" href="/colleges">
              Colleges
            </Link>
            {/* <Link
              underline="hover"
              color="inherit"
              href="/material-ui/getting-started/installation/"
            >
              {schema_name}
            </Link> */}
            <Typography color="text.primary">{schema_name}</Typography>
          </Breadcrumbs>
        </Box>
        <Card sx={{ p: 2 }}>
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell>Full Name</TableCell>
                  <TableCell>User Name</TableCell>
                  <TableCell>Email</TableCell>
                  <TableCell>Mobile</TableCell>
                  <TableCell>User Type</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>{tableRowsContent}</TableBody>
            </Table>
          </TableContainer>
        </Card>
      </Box>
    </>
  );
}
