import { CountryType } from '../types';

import {
  Actions,
  FETCH_COUNTRIES_SUCCESS,
  FETCH_COUNTRIES_ERROR,
  FETCH_COUNTRY_SUCCESS,
  FETCH_COUNTRY_ERROR,
  SEARCH,
  FAVORITE_ADD_SUCCESS,
  EMPTY_SEARCH,
  ORDER_MANAGE
} from './actions';

export interface InitialStateType {
  countries: {
    data: CountryType[];
    error: Error | any;
  };
  country: {
    data: CountryType | null;
    error: Error | any;
  };
  searched: {
    data: CountryType[];
  };
  favorite: CountryType[];
  border: string[];
  orderStatus: string;
}

const initialState: InitialStateType = {
  countries: {
    data: [],
    error: null,
  },
  country: {
    data: null,
    error: null,
  },
  searched: {
    data: [],
  },
  favorite: [],
  border: [],
  orderStatus: 'asc',
};

const reducer = (state = initialState, action: Actions): InitialStateType => {

  switch (action.type) {
    case FETCH_COUNTRIES_SUCCESS:
      return {
        ...state,
        countries: { ...state.countries, data: action.payload },
      };
    case FETCH_COUNTRIES_ERROR:
      return {
        ...state,
        countries: {
          ...state.countries,
          error: action.payload,
        },
      };
    case FETCH_COUNTRY_SUCCESS:
      return {
        ...state,
        country: {
          ...state.country,
          data: action.payload,
        },
      };
    case FETCH_COUNTRY_ERROR:
      return {
        ...state,
        country: {
          ...state.country,
          error: action.payload,
        },
      };
    case SEARCH:
      const text = action.payload;
      const newData = state.countries?.data.filter((item: CountryType) => {
        if (text === '') {
          return item;
        } else if (item.name?.toLowerCase().startsWith(text?.toLowerCase())) {
          return item;
        }

        return false;
      });
   
      return {
        ...state,
        searched: {
          ...state.searched,
          data: newData,
        },
      };
    case EMPTY_SEARCH:
      return {
        ...state,
        searched: {
          data: [],
        },
      };
    case FAVORITE_ADD_SUCCESS:
      const countryName: string = action.payload;
      let isInList = state.favorite.some(
        (item: CountryType) => item.name === countryName
      );

      if (isInList) {
        const afterRemove = state.favorite.filter(
          (item: CountryType) => item.name !== countryName
        );
        return {
          ...state,
          favorite: afterRemove,
        };
      }

      const favoriteCountryObject = state.countries.data.filter(
        (item) => item.name === countryName
      );
      return {
        ...state,
        favorite: [...state.favorite, favoriteCountryObject[0]],
      };

    case ORDER_MANAGE:
      return {
        ...state,
        orderStatus: action.payload,
      };

    default:
      return state;
  }
};
export default reducer;
