import "./App.css";

import { useCallback, useEffect, useState } from "react";

const BASE_URL = "https://restcountries.com/v3.1/all";

interface CountryProps {
  name: { common: string; official: string };
}

function App() {
  const [countries, setCountries] = useState<string[]>([]);
  const [filteredList, setFilteredList] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>("");

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

      setCountries(countryList);
    } catch (error) {
      console.error("Error getting countries", error);
    }
  }, []);

  useEffect(() => {
    getCountries();
  }, [getCountries]);

  const handleChange = useCallback(
    (event: React.FormEvent<HTMLInputElement>) => {
      const input = event.currentTarget.value;

      const newList = countries.filter(
        (country) => country.toLowerCase().indexOf(input.toLowerCase()) > -1
      );

      setFilteredList(newList);
      setSearchQuery(input);
    },
    [countries]
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
          value={searchQuery}
        />
        {filteredList.length && (
          <ul className="autocomplete">
            {filteredList.map((country, index) => {
              return <li key={index}>{country}</li>;
            })}
          </ul>
        )}
      </div>
    </div>
  );
}

export default App;
