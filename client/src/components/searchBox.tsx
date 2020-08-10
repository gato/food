import React, { FunctionComponent } from 'react';
import Container from '@material-ui/core/Container';
import Button from '@material-ui/core/Button';
import {SearchNutrient} from './SearchNutrient';
import {Filter} from './Filter';

type SearchBoxProps = {
  filters: Array<Filter>,
  changeFilters: (filters:Array<Filter>) => void, 
  onSearch: () => void
};

export const SearchBox : FunctionComponent<SearchBoxProps> = ({filters, changeFilters, onSearch}) => {

  const updateMinMax = (index:number , min:number, max:number) => {
    filters = [...filters]
    filters[index] = Object.assign({}, filters[index], {min:min, max:max});
    changeFilters(filters);
  }

  return (
    <Container maxWidth="md">
      {filters.map( (f, i) => (<SearchNutrient key={i} filter={f} updateMinMax={(min, max)=>updateMinMax(i, min, max)}/>))}       
      <Button variant="contained" onClick={onSearch}>Search</Button>
    </Container>
  );
}
