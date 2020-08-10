import React, {useState, useEffect} from 'react';
import {SearchBox} from './components/searchBox'
import './App.css';

const PROTEINS:string = 'Proteins';
const FAT:string = 'Fat';
const SUGAR:string = 'Sugar';
const CARBS:string = 'Carbs';

const initialFilters = [
  { id: PROTEINS, title: PROTEINS , min:0, max:10 },
  { id: FAT, title: FAT , min:0, max:10 },
  { id: SUGAR, title: SUGAR , min:0, max:10 },
  { id: CARBS, title: CARBS , min:0, max:10 }
]

function App() {

  let [filters, setFilters] = useState(initialFilters)

  useEffect(() => {
    console.log('APPS: filters have changed!');
  }, [filters]);

  return (
    <div>
      <SearchBox filters={filters} changeFilters={(newFilters: Array<any>) => setFilters(newFilters)}/>
    </div>
  );
}

export default App;
