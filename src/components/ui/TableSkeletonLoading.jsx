import { Skeleton, TableCell, TableRow } from "@mui/material";

export default function TableSkeletonLoading({ rowPerPage, colPerPage }) {
  return (
    <>
      {Array.from(Array(rowPerPage).keys()).map((item, index) => (
        <TableRow hover key={`tableRow-${index}`}>
          {Array.from(Array(colPerPage).keys()).map((item, jndex) => (
            <TableCell
              // colSpan={visibleColumns.length}
              key={`Col-${jndex}-cell`}
            >
              <Skeleton
                animation="wave"
                sx={{ height: "22px", borderRadius: "4px" }}
              />
            </TableCell>
          ))}
        </TableRow>
      ))}
    </>
  );
}
