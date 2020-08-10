import React, {useState, useEffect} from 'react';
import {SearchBox} from './components/searchBox'
import {Filter} from './components/Filter'
import {FoodTable} from './components/FoodTable'
import {Food} from './components/Food'
import './App.css';

const PROTEINS = {name:'Proteins', id:'prot', nutrient: 203};
const FAT = {name:'Fat', id:'fat', nutrient: 204};
const SUGAR = {name:'Sugar', id:'sugar', nutrient: 269};
const CARBS = {name:'Carbs', id:'carb', nutrient: 205};
const CALS = {name:'Calories', id:'cal', nutrient: 208};


const initialFilters:Array<Filter> = [
  { id: PROTEINS.id, title: PROTEINS.name , min:0, max:10 },
  { id: FAT.id, title: FAT.name , min:0, max:10 },
  { id: SUGAR.id, title: SUGAR.name , min:0, max:10 },
  { id: CARBS.id, title: CARBS.name , min:0, max:10 }
];

const initialFoodList: Array<Food> = []

function App() {

  let [filters, setFilters] = useState(initialFilters)
  let [foodList, setFoodList] = useState(initialFoodList)

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

  const fetchData = async () => {
    // TODO: urlencoding is not needed because no free text data is sent
    // anyway we should always do it.
    let params = filters
      .filter((f) => f.min !== 0 || f.max !== 10)
      .map(f => `${f.id}=${f.min},${f.max}`);
    params = params.concat('size=10')
    console.log(params)
    const res = await fetch(
      `/foods?${params.join('&')}`
    );

    const json = await res.json();
    console.log(json);
    setFoodList(json.map((f:any) => foodFromAPI(f)));
  };

  const handleSearch = () => {
    fetchData();
  }; 

  let results = (<div><br/>press search to retrieve food</div>)
  if (foodList !== initialFoodList) {
    results = (<FoodTable foodList={foodList}/>)
  }

  return (
    <div>
      <SearchBox filters={filters} changeFilters={(newFilters: Array<Filter>) => setFilters(newFilters)} onSearch={handleSearch}/>
      <br/><br/>
      {results}
    </div>
  );
}

export default App;
