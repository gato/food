import React, { FunctionComponent} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Slider from '@material-ui/core/Slider';
import {Filter} from './Filter';

type SearchNutrientProps = {
  filter: Filter,
  update: (filter:Filter) => void
}

const useStyles = makeStyles({
  root: {
    width: 300,
  },
});

function valuetext(value:any) {
  return `${value} gm`;
}

export const SearchNutrient : FunctionComponent<SearchNutrientProps> = ({filter, update}) => {

  const classes = useStyles();

  const handleChange = (event:any, newValue:any) => {
    update(Object.assign({}, filter, {min:newValue[0], max:newValue[1]}));
  };

  const formatValue = () => {
    if (filter.min === filter.max) {
      return `${filter.min} gms.`;
    }
    return `${filter.min} gms. upto ${filter.max} `;
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
