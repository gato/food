import React, { FunctionComponent} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Slider from '@material-ui/core/Slider';

type SearchNutrientProps = {
  title: string
  min: number
  max: number
  updateMinMax: any
}

const useStyles = makeStyles({
  root: {
    width: 300,
  },
});

function valuetext(value:any) {
  return `${value} gm`;
}

export const SearchNutrient : FunctionComponent<SearchNutrientProps> = ({title, min, max, updateMinMax}) => {

  const classes = useStyles();

  const handleChange = (event:any, newValue:any) => {
    updateMinMax(newValue[0], newValue[1]);
  };

  const formatValue = () => {
    if (min === max) {
      return `${min} gms.`;
    }
    return `${min} gms. upto ${max} `;
  }

  return (
    <div className={classes.root}>
      <Typography id="range-slider" gutterBottom>
        {title}: {formatValue()}
      </Typography>
      <Slider
        value={[min, max]}
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
