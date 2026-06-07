import { useCallback, useEffect, useRef } from "react";

export function useDebounce(
  searchFn: (searchText: string) => void,
  delay: number
) {
  const timerId = useRef<number | null>(null);

  const executeDebouncedSearch = useCallback(
    (searchText: string) => {
      if (timerId.current) {
        clearTimeout(timerId.current);
      }

      timerId.current = setTimeout(() => {
        searchFn(searchText);
      }, delay);
    },
    [searchFn, delay]
  );

  useEffect(() => {
    return () => {
      if (timerId.current) {
        clearTimeout(timerId.current);
      }
    };
  }, []);

  return executeDebouncedSearch;
}
