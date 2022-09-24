import styles from "./Autocomplete.module.css";
import { useCallback } from "react";

interface AutocompleteProps {
  active: number;
  filteredList: string[];
  onClick: (clickedItem: string) => void;
}

function Autocomplete({ active, filteredList, onClick }: AutocompleteProps) {
  const handleClick = useCallback(
    (event: React.MouseEvent) => {
      onClick(event.currentTarget.innerHTML);
    },
    [onClick]
  );

  if (filteredList.length) {
    return (
      <ul className={styles.autocomplete}>
        {filteredList.map((suggestedQuery, index) => {
          let className;

          if (index === active) {
            className = styles.active;
          }

          return (
            <li
              className={className}
              key={`${suggestedQuery}_${index}`}
              onClick={handleClick}
            >
              {suggestedQuery}
            </li>
          );
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
