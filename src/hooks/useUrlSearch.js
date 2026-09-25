import { useCallback } from "react";
import { useSearchParams } from "react-router-dom";

export function useUrlSearch(parameter = "search") {
  const [searchParams, setSearchParams] = useSearchParams();
  const value = searchParams.get(parameter) || "";

  const setValue = useCallback((nextValue) => {
    setSearchParams((current) => {
      const next = new URLSearchParams(current);
      if (nextValue) next.set(parameter, nextValue);
      else next.delete(parameter);
      return next;
    }, { replace: true });
  }, [parameter, setSearchParams]);

  return [value, setValue];
}
