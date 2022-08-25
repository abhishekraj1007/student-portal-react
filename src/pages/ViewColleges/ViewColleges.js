import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { Box, Card, IconButton, Paper, Typography } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
import superAdminApi from "../../services/apis/superAdminApi";
import TableSkeletonLoading from "../../components/ui/TableSkeletonLoading";
import DeleteCollegeModal from "./DeleteCollegeModal/DeleteCollegeModal";
import toast from "react-hot-toast";

export default function ViewColleges() {
  const [openDeleteModal, setDeleteModal] = useState(false);
  const [collegeID, setCollegeID] = useState(null);
  const [loading, setLoading] = useState(false);
  const [colleges, setColleges] = useState([]);

  const getAllColleges = async () => {
    setLoading(true);
    try {
      const data = await superAdminApi.getColleges();

      if (data) {
        setLoading(false);
        console.log(data);
        // setColleges(data);
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

  let tableRowsContent = <TableSkeletonLoading rowPerPage={10} />;

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
            let { id, name } = data;
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
                </TableCell>
                <TableCell>{id}</TableCell>
                <TableCell>{name}</TableCell>
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
        <Card sx={{ p: 2 }}>
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell>Action</TableCell>
                  <TableCell>ID</TableCell>
                  <TableCell>College Name</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {tableRowsContent}
              </TableBody>
            </Table>
          </TableContainer>
        </Card>
      </Box>

      {openDeleteModal && (
        <DeleteCollegeModal
          openDeleteModal={openDeleteModal}
          setDeleteModal={setDeleteModal}
          collegeID={collegeID}
        />
      )}
    </>
  );
}
