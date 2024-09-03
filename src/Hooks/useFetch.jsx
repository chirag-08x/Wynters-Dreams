import { useEffect, useState } from "react";
import { useUserContext } from "../Context/UserContext";
const useFetch = (url, controlled) => {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);

  const { axiosInstance } = useUserContext();

  const fetchData = async (newUrl) => {
    try {
      const { data } = await axiosInstance.get(newUrl || url);
      setData(data);
      return data;
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
    return null;
  };

  useEffect(() => {
    if (!controlled) {
      fetchData();
    }
  }, [url, controlled]);

  return { loading, data, error, fetchData };
};

export default useFetch;
