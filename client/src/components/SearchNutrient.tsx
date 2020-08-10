import React, { FunctionComponent} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Slider from '@material-ui/core/Slider';
import {Filter} from './Filter';

type SearchNutrientProps = {
  filter: Filter,
  updateMinMax: (min: number, max: number) => void
}

const useStyles = makeStyles({
  root: {
    width: 300,
  }
});

function valuetext(value:any) {
  return `${value} gm`;
}

export const SearchNutrient : FunctionComponent<SearchNutrientProps> = ({filter, updateMinMax}) => {

  const classes = useStyles();

  const handleChange = (event:any, newValue:any) => {
    updateMinMax(newValue[0], newValue[1]);
  };

  const formatValue = () => {
    if (filter.min === filter.max) {
      return `${filter.min} gms.`;
    }
    const plus = filter.max === 10 ? '+' : ''
    return `${filter.min} gms. upto ${filter.max}${plus} `;
  }

  return (
    <div className={classes.root}>
      <Typography id="range-slider" gutterBottom>
        {filter.title}: {formatValue()}
      </Typography>
      <Slider
        value={[filter.min, filter.max]}
        onChange={handleChange}
        valueLabelDisplay="auto"
        min={0}
        max={10}
        aria-labelledby="range-slider"
        getAriaValueText={valuetext}
      />
    </div>
  );
}
