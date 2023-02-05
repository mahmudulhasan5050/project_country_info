import React, { FC} from 'react';
import TableBody from '@mui/material/TableBody';
import { useSelector } from 'react-redux';

import MuiTableRow from './MuiTableRow';
import { CountryType } from '../../types';
import { InitialStateType } from '../../redux/reducers';

interface PropsType {
  allCountries: CountryType[];
  page: number;
  rowsPerPage: number;
}

const MuiTableBody: FC<PropsType> = ({ allCountries, page, rowsPerPage }) => {
  const countryOrder = useSelector(
    (state: InitialStateType) => state.orderStatus
  );

  const sortedCountry =
    countryOrder === 'desc'
      ? allCountries.sort((a, b) => {
          if (a.name < b.name) {
            return 1;
          } else if (a.name > b.name) {
            return -1;
          } else {
            return 0;
          }
        })
        :
        allCountries.sort((a, b) => {
            if (a.name > b.name) {
              return 1;
            } else if (a.name < b.name) {
              return -1;
            } else {
              return 0;
            }
          });
  return (
    <TableBody>
      {sortedCountry && sortedCountry
        .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
        .map((row) => (
          <MuiTableRow key={row.name} row={row} />
        ))}
    </TableBody>
  );
};

export default MuiTableBody;
