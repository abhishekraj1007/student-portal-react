import { Skeleton, TableCell, TableRow } from "@mui/material";

export default function TableSkeletonLoading({ rowPerPage }) {
  return (
    <>
      {Array.from(Array(rowPerPage).keys()).map((item, index) => (
        <TableRow hover key={`tableRow-${index}`}>
          <TableCell
            // colSpan={visibleColumns.length}
            key={`Row-${index}-cell`}
          >
            <Skeleton
              animation="wave"
              sx={{ height: "22px", borderRadius: "4px" }}
            />
          </TableCell>
        </TableRow>
      ))}
    </>
  );
}
