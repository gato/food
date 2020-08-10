import React, { FunctionComponent, useEffect, useState } from 'react';
// import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Button from '@material-ui/core/Button';
import {SearchNutrient} from './SearchNutrient'

type SearchBoxProps = {
  filters: Array<any>,
  changeFilters: any
};

export const SearchBox : FunctionComponent<SearchBoxProps> = ({filters, changeFilters}) => {

  let [_filters, setFilters] = useState(filters)

  const updateMinMax = (index:number , min:number , max:number) => {
    _filters[index].max = max;
    _filters[index].min = min;
    setFilters([..._filters]);
  }

  useEffect(() => {
    changeFilters(_filters);
    console.log('SearchBox: filters have changed!');
  }, [filters, _filters, changeFilters]);

  return (
    <Container maxWidth="sm">
      {filters.map( (f, i) => (<SearchNutrient key={i} title={f.title} min={f.min} max={f.max} updateMinMax={(min:number, max:number)=>updateMinMax(i, min, max)}/>))}       
      <Button variant="contained">Search</Button>
    </Container>
  );
}
