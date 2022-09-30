import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { Box, Card, IconButton, Paper, Typography, Link } from "@mui/material";
import Breadcrumbs from '@mui/material/Breadcrumbs';
import DeleteIcon from "@mui/icons-material/Delete";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import superAdminApi from "../../services/apis/superAdminApi";
import TableSkeletonLoading from "../../components/ui/TableSkeletonLoading";
import DeleteCollegeModal from "./DeleteCollegeModal/DeleteCollegeModal";
import VisibilityIcon from '@mui/icons-material/Visibility';
import toast from "react-hot-toast";
import { BASE_API_URL } from "../../globalVariables";

export default function ViewColleges() {
  const navigate = useNavigate();
  const [openDeleteModal, setDeleteModal] = useState(false);
  const [collegeID, setCollegeID] = useState(null);
  const [loading, setLoading] = useState(false);
  const [colleges, setColleges] = useState([]);

  const getAllColleges = async () => {
    setLoading(true);
    try {
      const response = await superAdminApi.getColleges();

      if (response.data) {
        setLoading(false);
        console.log(response.data);
        setColleges(response.data);
        // navigate("/dashboard");
      }
    } catch (error) {
      setLoading(false);
      toast.error("Something Went Wrong");
      console.log(error);
    }
  };

  useEffect(() => {
    getAllColleges();
  }, []);

  const onDeleteHandler = (id) => {
    // navigate(`/style-product/${rowID}/edit`);
    setDeleteModal(true);
    setCollegeID(id);
  };

  const onViewHandler = (schema_name) => {
    navigate(`/colleges/${schema_name}`);
  };

  let tableRowsContent = <TableSkeletonLoading rowPerPage={10} colPerPage={9} />;

  if (!loading) {
    if (colleges.length === 0) {
      tableRowsContent = (
        <TableRow>
          <TableCell sx={{ textAlign: "center" }}>
            <Typography variant="subtitle1">No College found!</Typography>
          </TableCell>
        </TableRow>
      );
    } else {
      tableRowsContent = (
        <>
          {colleges?.map((data, index) => {
            let { id, name, image, email, username, schema_name, created_on, year_of_establishment, url, password } = data;
            return (
              <TableRow
                key={`${id}_${index}`}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell>
                  <IconButton
                    size="small"
                    onClick={() => onDeleteHandler(id)}
                    color="primary"
                  >
                    <DeleteIcon />
                  </IconButton>
                  <IconButton
                    size="small"
                    onClick={() => onViewHandler(schema_name)}
                    color="primary"
                  >
                    <VisibilityIcon />
                  </IconButton>
                </TableCell>
                <TableCell>{year_of_establishment}</TableCell>
                <TableCell>{name}</TableCell>
                <TableCell>{username}</TableCell>
                <TableCell>
                  <Link href={`http://${url}`} target="_blank">
                    {url}
                  </Link>
                </TableCell>
                <TableCell>{password}</TableCell>
                <TableCell>{email}</TableCell>
                <TableCell>{created_on}</TableCell>
                <TableCell>
                  <img
                    src={`${BASE_API_URL}/college/public${image}`}
                    height="40px"
                    width="40px"
                    alt="College Logo"
                  />
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
              Core
            </Link> */}
            {/* <Typography color="text.primary">Breadcrumbs</Typography> */}
          </Breadcrumbs>
        </Box>
        <Card sx={{ p: 2 }}>
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell>Action</TableCell>
                  <TableCell>Est.</TableCell>
                  <TableCell>College Name</TableCell>
                  <TableCell>User Name</TableCell>
                  <TableCell>College Url</TableCell>
                  <TableCell>Password</TableCell>
                  <TableCell>Email</TableCell>
                  <TableCell>Created On</TableCell>
                  <TableCell>Logo</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>{tableRowsContent}</TableBody>
            </Table>
          </TableContainer>
        </Card>
      </Box>

      {openDeleteModal && (
        <DeleteCollegeModal
          openDeleteModal={openDeleteModal}
          setDeleteModal={setDeleteModal}
          collegeID={collegeID}
          getAllColleges={getAllColleges}
        />
      )}
    </>
  );
}
