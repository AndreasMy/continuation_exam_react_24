import { useState, useCallback } from "react";
import { fetchEndpoint } from "../API/apiServices";

export const useFetchList = (endpoint) => {
  const [list, setList] = useState([]);
  const [isLoading, setIslodaing] = useState(false);
  const [error, setError] = useState(null);

  const loadList = useCallback(async () => {
    setIslodaing(true);
    try {
      const data = await fetchEndpoint(endpoint);
      setList(data);
    } catch (error) {
      console.error(`Error fetching ${endpoint}`, error);
      setError(error);
    } finally {
      setIslodaing(false);
    }
  }, [endpoint]);

  return { list, loadList, isLoading, error };
};
