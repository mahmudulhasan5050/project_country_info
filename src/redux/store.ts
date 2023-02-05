import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';

import reducer from './reducers';

export interface CurrenciesAndLanguageType{
    name: string
}

export interface CountryType{
        name: string,
        alpha3Code?: string,
        capital?: string,
        region?: string,
        population?: number,
        borders?: string[],
        nativeName?: string,
        currencies?: CurrenciesAndLanguageType[],
        languages?: CurrenciesAndLanguageType[],
        flag?: string,
        
    }
export interface InitialStateType{
    countries:{
        data: CountryType[]
        error: Error | any
    },
    country: {
        data: CountryType | null
        error: Error | any
    },
    searched: {
        data: CountryType[]
    },
    favorite: CountryType[],
    border: string[],
    orderStatus: string,
}
const initialState:InitialStateType = {
    countries: {
        data: [],
        error: null
    },
    country: {
        data: null,
        error: null
    },
    searched: {
        data: []
    },
    favorite: [],
    border: [],
    orderStatus: 'asc',
}


const storeFactory = () => {
    const favoriteList = localStorage.getItem('fabCountriesInLocalStorage');
    if (favoriteList) {
        initialState.favorite = JSON.parse(favoriteList)
    }

    const store = createStore(reducer, initialState, composeWithDevTools(applyMiddleware(thunk)));

    store.subscribe(() => {
        const currentState = store.getState();
        const favCountriesInStore = currentState.favorite;
        localStorage.setItem('fabCountriesInLocalStorage', JSON.stringify(favCountriesInStore))
    })

    return store
}


export default storeFactory;