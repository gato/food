import React, {useState} from 'react';
import {SearchBox} from './components/searchBox'
import {Filter} from './components/Filter'
import {FoodTable} from './components/FoodTable'
import {Food} from './components/Food'
import './App.css';
import { Container, AppBar, Toolbar, Typography, Button, IconButton } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import MenuIcon from '@material-ui/icons/Menu';

const PROTEINS = {name:'Proteins', id:'prot', nutrient: 203};
const FAT = {name:'Fat', id:'fat', nutrient: 204};
const SUGAR = {name:'Sugar', id:'sugar', nutrient: 269};
const CARBS = {name:'Carbs', id:'carb', nutrient: 205};
const CALS = {name:'Calories', id:'cal', nutrient: 208};

const initialFilters:Array<Filter> = [
  { id: PROTEINS.id, title: PROTEINS.name , min:0, max:5 },
  { id: FAT.id, title: FAT.name , min:0, max:5 },
  { id: SUGAR.id, title: SUGAR.name , min:0, max:5 },
  { id: CARBS.id, title: CARBS.name , min:0, max:5 }
];

const initialFoodList: Array<Food> = []
const initialPagination = {
  pageSize: 4,
  totalCount: 0,
  currentPage: 0
};

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },  
  content: {
    flexGrow: 1,
    height: '100vh',
    overflow: 'auto',
  },
  container: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
  },
  paper: {
    padding: theme.spacing(2),
    display: 'flex',
    overflow: 'auto',
    flexDirection: 'column',
  },
}));


function App() {

  const classes = useStyles();

  const [filters, setFilters] = useState(initialFilters);
  const [foodList, setFoodList] = useState(initialFoodList);
  const [pagination, setPagination] = useState(initialPagination);

  const foodFromAPI = (f:any) => {
    return {
      name: f['name'], 
      calories: f['nutrients'][CALS.nutrient]['gm'], 
      proteins: f['nutrients'][PROTEINS.nutrient]['gm'], 
      fat: f['nutrients'][FAT.nutrient]['gm'], 
      carbs: f['nutrients'][CARBS.nutrient]['gm'], 
      sugar: f['nutrients'][SUGAR.nutrient]['gm'] 
    };
  };

  const fetchData = async (offset:number, size:number) => {
    // TODO: urlencoding is not needed because no free text data is sent
    // anyway we should always do it.
    let params = filters
      .filter((f) => f.min !== 0 || f.max !== 10)
      .map(f => `${f.id}=${f.min},${f.max}`);
    params = params.concat([`size=${size}`, `offset=${offset}`]);
    const res = await fetch(
      `/foods?${params.join('&')}`
    );
    const json = await res.json();

    setPagination( {
      pageSize: size,
      totalCount: parseInt(res.headers.get('total-food-count') || '0'),
      currentPage:  Math.floor(offset/size)
    });

    setFoodList(json.map((f:any) => foodFromAPI(f)));
  };

  const handleSearch = () => {
    fetchData(0, pagination.pageSize);
  }; 

  const handlePageChange = (event: React.MouseEvent<HTMLButtonElement> | null, newPage: number) => {
    fetchData(newPage * pagination.pageSize, pagination.pageSize);
  };

  const handlePageSizeChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    fetchData(0, parseInt(event.target.value, 10));
  };  

  let results = (<div/>)
  if (foodList !== initialFoodList) {
    results = (
      <FoodTable foodList={foodList} page={pagination.currentPage} pageSize={pagination.pageSize} totalCount={pagination.totalCount} onPageChange={handlePageChange} onPageSizeChange={handlePageSizeChange}/>
    )
  }

  return (
    <div className={classes.root}>
        <main className={classes.content}>
          <div className={classes.root}>
            <AppBar position="static">
              <Toolbar>
                <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
                  <MenuIcon />
                </IconButton>
                <Typography variant="h6" className={classes.title}>
                  Food Search
                </Typography>
                <Button color="inherit">Login</Button>
              </Toolbar>
            </AppBar>
          </div>          
          <Container maxWidth="lg" className={classes.container}>
            <SearchBox filters={filters} changeFilters={(newFilters: Array<Filter>) => setFilters(newFilters)} onSearch={handleSearch}/>
            <br/>
            {results}
          </Container>
        </main>
    </div>
  );
}

export default App;
