import React from 'react';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { CountryType } from '../../types';

type FavType = {
  row: CountryType
  favCountries: CountryType[]
}

const Favorite = ({ row, favCountries }:FavType) => {
  const favLength = favCountries.length;
  const isFavCountry = favCountries.find(fav => fav.name === row.name)

  return (
    <div>
      <FavoriteIcon sx={{ color: (favLength > 0) ? isFavCountry ? 'red' : 'gray' : 'gray' }} />
    </div>
  )
}

export default Favorite