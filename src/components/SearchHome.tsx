import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import TextField from '@mui/material/TextField';

import { searchCountry, emptySearch, fetchCountries } from '../redux/actions';

interface InputType{
  inputText: string
  setInputText: (text:string)=>void
}

const SearchHome = ({inputText, setInputText}:InputType) => {
  const dispatch = useDispatch();

  const searchText = (e:any) => {
    e.preventDefault();
    setInputText(e.target.value);
  }

  useEffect(() => {
    if (inputText === "") {
      dispatch(emptySearch())
      dispatch(fetchCountries())
    } else {
      dispatch(searchCountry(inputText))
    }
  }, [dispatch, inputText])

  return (
    <div>
      <TextField id="outlined-basic" label="Search" variant="outlined" onChange={(e) => searchText(e)} />
    </div>
  );
};

export default SearchHome;
