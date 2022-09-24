import "./App.css";

import { useCallback, useEffect, useState } from "react";

const BASE_URL = "https://restcountries.com/v3.1/all";

interface CountryProps {
  name: { common: string; official: string };
}

function App() {
  const [value, setValue] = useState<string>("");
  const [countriesList, setCountriesList] = useState<string[]>([]);

  const getCountries = useCallback(async () => {
    const options = {
      method: "GET",
    };

    try {
      const response = await fetch(BASE_URL, options);
      const data = await response.json();

      const countryList = data.map(
        (country: CountryProps) => country.name.common
      );

      setCountriesList(countryList);
    } catch (error) {
      console.error("Error getting countries", error);
    }
  }, []);

  useEffect(() => {
    getCountries();
  }, [getCountries]);

  const handleChange = useCallback(
    (event: React.FormEvent<HTMLInputElement>) => {
      console.log({ event });
    },
    []
  );

  return (
    <div className="App">
      <h1>Rob Arroyo's Autocomplete</h1>

      <div className="autocomplete-container">
        <input
          id="search-input"
          name="search"
          type="search"
          onChange={handleChange}
          value={value}
        />
      </div>
    </div>
  );
}

export default App;
