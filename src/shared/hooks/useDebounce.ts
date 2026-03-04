import { useEffect, useState } from "react";

/**
 * useDebounce
 * @param value - La valeur à observer
 * @param delay - Le délai en millisecondes avant d'appliquer la mise à jour
 * @returns La valeur après le délai
 */
export function useDebounce<T>(value: T, delay: number): T {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => setDebouncedValue(value), delay);

    return () => {
      clearTimeout(handler); // Nettoyage si la valeur change avant le délai
    };
  }, [value, delay]);

  return debouncedValue;
}
