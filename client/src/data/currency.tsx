import { countries } from "./countries";
import { useContext } from "react";
import { apiURL, UserContext } from "../App";
const countryToCurrency = require("country-to-currency");

const currencyOfCountry = (countryName: string) => {
    const [validCountry] = countries.filter(
        (element) => element.label === countryName
    );
    return countryToCurrency[validCountry.code];
};

const GetCurrency = (): string => {
    const userContext = useContext(UserContext);
    return currencyOfCountry(userContext.country);
};

export { currencyOfCountry, GetCurrency };
