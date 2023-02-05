import React, { FC } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import Button from '@mui/material/Button';
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';

import { addAndRemoveFavorite } from '../../redux/actions';
import Favorite from './Favorite';
import { CountryType } from '../../types';
import { InitialStateType } from '../../redux/reducers';

interface PropsType {
  row: CountryType;
}

const MuiTableRow: FC<PropsType> = ({ row }) => {
  const dispatch = useDispatch();
  const theme = useTheme();
  const matchesMd = useMediaQuery(theme.breakpoints.down('md'));
  const favCountries = useSelector((state: InitialStateType) => state.favorite);

  const addFavoriteButton = (favoriteName: string) => {
    dispatch(addAndRemoveFavorite(favoriteName));
  };

  const converterPopulation = (labelValue: number | undefined) => {
    return Math.abs(Number(labelValue)) >= 1.0e9
      ? (Math.abs(Number(labelValue)) / 1.0e9).toFixed(2) + 'B'
      : Math.abs(Number(labelValue)) >= 1.0e6
      ? (Math.abs(Number(labelValue)) / 1.0e6).toFixed(2) + 'M'
      : Math.abs(Number(labelValue)) >= 1.0e3
      ? (Math.abs(Number(labelValue)) / 1.0e3).toFixed(2) + 'K'
      : Math.abs(Number(labelValue));
  };

  const navigate = useNavigate();
  return (
    <TableRow
      key={row.name}
      sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
    >
      <TableCell component='th' scope='row'>
        <img src={row.flag} alt='flag' width='80%' />
      </TableCell>
      <TableCell
        onClick={() => {
          navigate(`/${row.name}`);
        }}
        sx={{ fontSize: matchesMd ? '0.7em' : '1.2em', color: '#006618' }}
      >
        {row.name}
      </TableCell>
      {!matchesMd && <TableCell sx={{ fontSize: matchesMd ? '0.7em' : '1.2em' }}>
        {converterPopulation(row.population)}
      </TableCell>}
      {!matchesMd && <TableCell
        sx={{
          fontSize: matchesMd ? '0.7em' : '1.2em'
        }}
      >
        {row.region}
      </TableCell>}
      <TableCell align='right'>
        <Button onClick={() => addFavoriteButton(row.name)}>
          <Favorite row={row} favCountries={favCountries} />
        </Button>
      </TableCell>
    </TableRow>
  );
};

export default MuiTableRow;
