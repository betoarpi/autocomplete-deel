import styles from "./Autocomplete.module.css";

interface AutocompleteProps {
  filteredList: string[];
}

function Autocomplete({ filteredList }: AutocompleteProps) {
  if (filteredList.length) {
    return (
      <ul className={styles.autocomplete}>
        {filteredList.map((suggestedQuery, index) => {
          return <li key={`${suggestedQuery}_${index}`}>{suggestedQuery}</li>;
        })}
      </ul>
    );
  } else {
    return (
      <div className={styles.emptySearch}>
        <span>Not found. Please try another term.</span>
      </div>
    );
  }
}

export default Autocomplete;
