import React, { useEffect, useState } from 'react';
import SearchText from './SearchText';

import { searchCountry, emptySearch, fetchCountries } from '../redux/actions';
import { useDispatch } from 'react-redux';


const SearchBar = () => {
  const [inputText, setInputText] = useState("");
  const dispatch = useDispatch();


  useEffect(() => {
    if (inputText === '') {
      dispatch(emptySearch());
      dispatch(fetchCountries());
    } else {
      dispatch(searchCountry(inputText));
    }
  }, [dispatch, inputText]);

  return (
    <SearchText inputText = {inputText} setInputText = {setInputText}/>
  );
};

export default SearchBar;
