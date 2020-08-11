import React, { FunctionComponent} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TablePagination from '@material-ui/core/TablePagination';
import Paper from '@material-ui/core/Paper';

import {Food} from './Food';

const useStyles = makeStyles({
  table: {
    minWidth: 400,
  },
});

type FoodTableProps = {
  foodList: Array<Food>
  page: number, 
  pageSize: number,
  totalCount: number,
  onPageChange: (event: React.MouseEvent<HTMLButtonElement> | null, newPage: number) => void,
  onPageSizeChange: (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => void
};

export const FoodTable : FunctionComponent<FoodTableProps> = ({foodList, page, pageSize, totalCount, onPageChange, onPageSizeChange }) => {
  const classes = useStyles();
  let body = (<TableBody><i>Food no Found</i> </TableBody>);
  if (foodList.length !== 0) {
    body = (<TableBody>{
      foodList.map((food) => (
        <TableRow key={food.name}>
          <TableCell component="th" scope="food">
            {food.name}
          </TableCell>
          <TableCell align="right">{food.calories}</TableCell>
          <TableCell align="right">{food.proteins}</TableCell>
          <TableCell align="right">{food.fat}</TableCell>
          <TableCell align="right">{food.sugar}</TableCell>                
          <TableCell align="right">{food.carbs}</TableCell>
        </TableRow>
      ))}
      </TableBody>);
  }
  return (
      <TableContainer component={Paper}>
        <Table className={classes.table} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Food</TableCell>
              <TableCell align="right">Calories</TableCell>
              <TableCell align="right">Protein&nbsp;(g)</TableCell>
              <TableCell align="right">Fat&nbsp;(g)</TableCell>
              <TableCell align="right">Sugar&nbsp;(g)</TableCell>
              <TableCell align="right">Carbs&nbsp;(g)</TableCell>
            </TableRow>
          </TableHead>
          {body}
        </Table>
        <TablePagination
          rowsPerPageOptions={[4, 8, 12, 16]}
          component="div"
          count={totalCount}
          rowsPerPage={pageSize}
          page={page}
          onChangePage={onPageChange}
          onChangeRowsPerPage={onPageSizeChange}
        />        
      </TableContainer>
  ) ;
}