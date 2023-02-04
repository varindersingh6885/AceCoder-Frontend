import React from "react";
import {Link} from 'react-router-dom'
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableHead from "@material-ui/core/TableHead";
import TableCell from "@material-ui/core/TableCell";
import TableRow from "@material-ui/core/TableRow";
import Grid from "@material-ui/core/Grid";
import TablePagination from "@material-ui/core/TablePagination";

const useStyles2 = makeStyles({
  table: {
    width: "100%",
  },
  tableMain: {
    backgroundColor: "#757575",
    color: "white",
  },
  tableBody: {
    backgroundColor: "#eeeeee",
  },
  link : {
    textDecoration : 'none'
  }
});

const HomeTable = ({ questions }) => {
  const classes = useStyles2();
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  // eslint-disable-next-line no-unused-vars

  const emptyRows =
    rowsPerPage -
    Math.min(
      rowsPerPage,
      questions ? questions.length - page * rowsPerPage : rowsPerPage
    );

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };
  const rowsPerPageOptions = [10, 15, 25];
  return (
    <Grid container item xs={12} lg={9}>
      <Grid item xs={12}>
        <Table className={classes.table} aria-label="custom pagination table">
          <TableHead>
            <TableRow className={classes.tableMain}>
              <TableCell style={{ width: "160" }}>Title</TableCell>
              <TableCell style={{ width: "60px" }} align="right">
                Tags
              </TableCell>
              <TableCell style={{ width: "60px" }} align="right">
                Difficulty
              </TableCell>
              <TableCell style={{ width: "60px" }} align="right">
                Submissions
              </TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {questions &&
              (rowsPerPage > 0
                ? questions.slice(
                    page * rowsPerPage,
                    page * rowsPerPage + rowsPerPage
                  )
                : questions
              ).map((question, index) => (
                <TableRow key={index} className={classes.tableBody}>
                  <TableCell
                    style={{ width: "160px" }}
                    component="th"
                    scope="row"
                  >
                    <Link className={classes.link} to={`/problem/${question.searchTitle}`} >{question.title}</Link>
                    
                  </TableCell>
                  <TableCell style={{ width: "60px" }} align="center">
                    {question.tag}
                  </TableCell>
                  <TableCell style={{ width: "60px" }} align="right">
                    {(question.difficulty).toUpperCase()}
                  </TableCell>
                  <TableCell style={{ width: "60px" }} align="right">
                    {question.submission}
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </Grid>
      <Grid item sm={12}>
        <TablePagination
          component="div"
          count={questions ? questions.length : 0}
          page={page}
          onChangePage={handleChangePage}
          rowsPerPage={rowsPerPage}
          rowsPerPageOptions={rowsPerPageOptions}
          onChangeRowsPerPage={handleChangeRowsPerPage}
        />
      </Grid>
    </Grid>
  );
};
export default HomeTable;
