import React, {useEffect } from 'react';
import { Grid, Typography } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';

import { fetchCountries } from '../redux/actions';
import TableHome from '../components/table/TableHome';


import { InitialStateType } from '../redux/reducers';
import { CountryType } from '../types';

const Home = () => {
  const dispatch = useDispatch();
 
  const searchCountries: CountryType[] = useSelector(
    (state: InitialStateType) => state.searched.data
  );
  const allCountries: CountryType[] = useSelector(
    (allState: InitialStateType) => allState.countries.data
  );
 
  useEffect(() => {
    dispatch(fetchCountries());
  }, [dispatch]);

  if (!allCountries) {
    return (
      <Grid
        container
        direction='column'
        alignItems='center'
        justifyContent='center'
      >
        loading
      </Grid>
    );
  }

  return (
    <Grid
      container
      direction='column'
      alignItems='center'
      justifyContent='center'
    >
      <Grid item sx={{marginBottom:'1em'}} >
        <Typography variant ='h5'>Country API App</Typography>
      </Grid>
      <Grid item sx={{margin: '0em 1em 0em 1em'}}>
        {(searchCountries.length === 0) ? (
          <TableHome allCountries={allCountries}/>
        ) : (
          <TableHome allCountries={searchCountries}/>
        )}
      </Grid>
    </Grid>
  );
};

export default Home;
