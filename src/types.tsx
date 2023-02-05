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
