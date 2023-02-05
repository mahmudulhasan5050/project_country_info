import { Dispatch } from 'redux';

import * as api from '../api/index';
import { CountryType } from '../types';

export const FETCH_COUNTRIES_SUCCESS = 'FETCH_COUNTRIES_SUCCESS';
export const FETCH_COUNTRIES_ERROR = 'FETCH_COUNTRIES_ERROR';
export const FETCH_COUNTRY_SUCCESS = 'FETCH_COUNTRY_SUCCESS';
export const FETCH_COUNTRY_ERROR = 'FETCH_COUNTRY_ERROR';
export const SEARCH = 'SEARCH';
export const EMPTY_SEARCH = 'EMPTY_SEARCH';
export const FAVORITE_ADD_SUCCESS = 'FAVORITE_ADD_SUCCESS';
export const ORDER_MANAGE = 'ORDER_MANAGE';

export const fetchCountries = () => {
  return async (dispatch: Dispatch) => {
    try {
      const response = await api.getAllCountries().then((res) => {
        return res.data;
      });
      dispatch(fetchAllCountries(response));
    } catch (error) {
      dispatch(allCountriesError(error as Error));
    }
  };
};
const fetchAllCountries = (
  data: CountryType[]
): GenericAction<typeof FETCH_COUNTRIES_SUCCESS, CountryType[]> => {
  return { type: FETCH_COUNTRIES_SUCCESS, payload: data };
};
const allCountriesError = (
  err: Error
): GenericAction<typeof FETCH_COUNTRIES_ERROR, Error> => {
  return { type: FETCH_COUNTRIES_ERROR, payload: err };
};

export const fetchCountry = (name: string) => {
  return async (dispatch: Dispatch) => {
    try {
      const response = await api.getSingleCountry(name).then((res) => {
        return res.data[0];
      });
      dispatch(fetchOneCountry(response));
    } catch (error: any) {
      console.log(error);
      dispatch(countryError(error));
    }
  };
};

export const fetchOneCountry = (
  data: CountryType
): GenericAction<typeof FETCH_COUNTRY_SUCCESS, CountryType> => {
  return { type: FETCH_COUNTRY_SUCCESS, payload: data };
};
export const countryError = (
  err: any
): GenericAction<typeof FETCH_COUNTRY_ERROR, Error> => {
  return { type: FETCH_COUNTRY_ERROR, payload: err };
};

export const searchCountry = function (
  inputText: string
): GenericAction<typeof SEARCH, string> {
  return {
    type: SEARCH,
    payload: inputText,
  };
};

export const addAndRemoveFavorite = (
  countryName: string
): GenericAction<typeof FAVORITE_ADD_SUCCESS, string> => {
  return {
    type: FAVORITE_ADD_SUCCESS,
    payload: countryName,
  };
};

export const emptySearch = (): GenericAction<typeof EMPTY_SEARCH> => {
  return {
    type: EMPTY_SEARCH,
  };
};

export const orderManage = (order:string): GenericAction<typeof ORDER_MANAGE, string> => {
  return {
    type: ORDER_MANAGE,
   payload: order,
  }
}

type GenericAction<T, K = undefined> = K extends undefined
  ? { type: T }
  : {
      type: T;
      payload: K;
    };

export type Actions =
  | ReturnType<typeof fetchAllCountries>
  | ReturnType<typeof allCountriesError>
  | ReturnType<typeof fetchOneCountry>
  | ReturnType<typeof countryError>
  | ReturnType<typeof searchCountry>
  | ReturnType<typeof addAndRemoveFavorite>
  | ReturnType<typeof emptySearch>
  | ReturnType<typeof orderManage>


