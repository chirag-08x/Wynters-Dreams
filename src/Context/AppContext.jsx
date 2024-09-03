import { useContext, createContext, useReducer, useEffect } from "react";
import AppReducer from "../reducers/AppReducer";
import useFetch from "../Hooks/useFetch";

const AppContext = createContext();

const initialState = {
  bestSellers: {},
  blogs: [],
};

export const AppProvider = ({ children }) => {
  const [state, dispatch] = useReducer(AppReducer, initialState);
  const { loading: loadingBlogs, data: blogsData, error: err1 } = useFetch("/blog");
  const {
    loading: loading2,
    data: data2,
    error: err2,
  } = useFetch("/book/bestseller");

  const setBestSellers = () => {
    dispatch({
      type: "SET_BESTSELLERS",
      payload: { loading: loading2, data: data2, error: err2 },
    });
  };

  useEffect(() => {
    dispatch({
      type: "SET_BLOGS",
      payload: { loading: loadingBlogs, data: blogsData, error: err1 },
    });
  }, [loadingBlogs, blogsData, err1]);

  useEffect(() => {
    setBestSellers();
  }, [loading2, data2, err2]);

  return (
    <AppContext.Provider value={{ state, setBestSellers }}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => {
  return useContext(AppContext);
};
