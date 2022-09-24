import "./App.css";

import { useCallback, useEffect, useState } from "react";

import Autocomplete from "./components/Autocomplete/Autocomplete";

const BASE_URL = "https://restcountries.com/v3.1/all";

interface CountryProps {
  name: { common: string; official: string };
}

function App() {
  const [active, setActive] = useState<number>(0);
  const [countries, setCountries] = useState<string[]>([]);
  const [filteredList, setFilteredList] = useState<string[]>([]);
  const [showAutocomplete, setShowAutocomplete] = useState<boolean>(false);
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
      setShowAutocomplete(true);
      setSearchQuery(input);
    },
    [countries]
  );

  const handleClick = useCallback((clickedItem: string) => {
    setActive(0);
    setFilteredList([]);
    setShowAutocomplete(false);
    setSearchQuery(clickedItem);
  }, []);

  const handleKeyDown = useCallback(
    (event: React.KeyboardEvent) => {
      const { key } = event;

      if (key === "ArrowUp") {
        return active === 0 ? null : setActive(active - 1);
      }

      if (key === "ArrowDown") {
        return active - 1 === filteredList.length
          ? null
          : setActive(active + 1);
      }

      if (key === "Enter") {
        setActive(0);
        setShowAutocomplete(false);
        setSearchQuery(filteredList[active]);
      }
    },
    [active, filteredList]
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
          onKeyDown={handleKeyDown}
          value={searchQuery}
        />
        {showAutocomplete && searchQuery && (
          <Autocomplete
            active={active}
            filteredList={filteredList}
            onClick={handleClick}
          />
        )}
      </div>
    </div>
  );
}

export default App;
