import React, { FunctionComponent} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Container from '@material-ui/core/Container';

import {Food} from './Food';

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});

type FoodTableProps = {
  foodList: Array<Food>
};

export const FoodTable : FunctionComponent<FoodTableProps> = ({foodList}) => {
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
    <Container maxWidth="lg">
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
      </TableContainer>
    </Container>
  ) ;
}