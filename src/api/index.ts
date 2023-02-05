import axios from "axios";

const API = axios.create({baseURL:`https://${process.env.REACT_APP_URL}`});

export const getAllCountries = async() => await API.get('/all');
export const getSingleCountry = async(nameId:string) => await API.get(`/name/${nameId}`);
export const getCountryWithAlphaCode = async(alphaCode:string) => await API.get(`/alpha/${alphaCode}`)