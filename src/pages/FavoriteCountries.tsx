import React from 'react'
import { useSelector } from 'react-redux';
import TableHome from '../components/table/TableHome';
import {InitialStateType} from '../redux/reducers'

const FavoriteCountries = () => {
    const favoriteCountryList = useSelector((state: InitialStateType) => state.favorite)

  return (
    <div style={{margin: '0em 1em 0em 1em'}}>
         <TableHome allCountries={favoriteCountryList}/> 
    </div>
  )
}

export default FavoriteCountries