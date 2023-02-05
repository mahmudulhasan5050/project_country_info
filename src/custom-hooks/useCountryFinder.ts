import {useState, useEffect} from 'react';
import * as api from '../api/index';

const useCountryFinder = (borders:string[] | undefined) => {
    const [countryAlphaCode, setCountryAlpahCode] = useState<string[]>([]);

    useEffect(()=>{
        setCountryAlpahCode([]);
        borders?.map((alpha:string) =>{
         return api.getCountryWithAlphaCode(alpha).then(res => {
                   setCountryAlpahCode((countryAlphaCode)=>[...countryAlphaCode, res.data.name])
               })
       })
    },[borders])
    return countryAlphaCode;
}

export default useCountryFinder