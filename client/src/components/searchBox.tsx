import React, { FunctionComponent } from 'react';
import Container from '@material-ui/core/Container';
import Button from '@material-ui/core/Button';
import {SearchNutrient} from './SearchNutrient'

type SearchBoxProps = {
  filters: Array<any>,
  changeFilters: any
};

export const SearchBox : FunctionComponent<SearchBoxProps> = ({filters, changeFilters}) => {

  const updateMinMax = (index:number , min:number , max:number) => {
    filters[index].max = max;
    filters[index].min = min;
    changeFilters([...filters]);
  }

  return (
    <Container maxWidth="sm">
      {filters.map( (f, i) => (<SearchNutrient key={i} title={f.title} min={f.min} max={f.max} updateMinMax={(min:number, max:number)=>updateMinMax(i, min, max)}/>))}       
      <Button variant="contained">Search</Button>
    </Container>
  );
}
