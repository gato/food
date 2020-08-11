import React, { FunctionComponent } from 'react';
import {Grid, Button, Paper} from '@material-ui/core/';
import { makeStyles } from '@material-ui/core/styles';
import {SearchNutrient} from './SearchNutrient';
import {Filter} from './Filter';

type SearchBoxProps = {
  filters: Array<Filter>,
  changeFilters: (filters:Array<Filter>) => void, 
  onSearch: () => void
};

const useStyles = makeStyles((theme) => ({
  paper: {
    padding: theme.spacing(3),
    display: 'flex',
    overflow: 'auto',
    flexDirection: 'column',
  },
  search: {
    float: 'right',
  },
}));

export const SearchBox : FunctionComponent<SearchBoxProps> = ({filters, changeFilters, onSearch}) => {

  const classes = useStyles();
  
  const updateMinMax = (index:number , min:number, max:number) => {
    filters = [...filters]
    filters[index] = Object.assign({}, filters[index], {min:min, max:max});
    changeFilters(filters);
  }

  return (
    <Paper className={classes.paper}>
      <Grid container spacing={3}>
        {filters.map( (f, i) => (
          <Grid key={i} item xs={12} md={6} lg={6}>
              <SearchNutrient filter={f} updateMinMax={(min, max)=>updateMinMax(i, min, max)}/>
          </Grid>
        ))}
        <Grid item xl={11} lg={10} md={9} sm={8} xs={8}/>
        <Grid item xl={1} lg={2} md={3} sm={4} xs={4}>
          <Button className={classes.search} variant="contained" onClick={onSearch}>Search</Button>
        </Grid>
      </Grid>
    </Paper>
  );
}
