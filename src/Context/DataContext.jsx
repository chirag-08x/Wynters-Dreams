import { useContext, useState } from "react";
import { createContext } from "react";

export const DataContext = createContext({
  books: null,
  bookDetails: {},
  setBooks: (data) => {},
  addBookDetails: (bookId, details) => {},
  pages: {},
  addPages: (bookId, pages) => {},
  imageCache: {},
  cache: (src) => {},
  resetState: () => {},
  setVouchers: () => {},
  vouchers: null,
});

export const DataContextProvider = ({ children }) => {
  const [books, setBooks] = useState(null);
  const [bookDetails, setBookDetails] = useState({});
  const [pages, setPages] = useState({});
  const [imageCache, setImageCache] = useState({});
  const [vouchers, setVouchers] = useState(null);

  const resetState = () => {
    setBooks(null);
    setBookDetails({});
    setPages({});
    setImageCache({});
  };

  const addBookDetails = (bookId, details) => {
    setBookDetails((prev) => {
      prev[bookId] = details;
      return JSON.parse(JSON.stringify(prev));
    });
  };

  const addPages = (bookId, pages) => {
    setPages((prev) => {
      prev[bookId] = pages;
      return JSON.parse(JSON.stringify(prev));
    });
  };

  const cache = (url, src) => {
    setImageCache((prev) => {
      prev[url] = src;
      return JSON.parse(JSON.stringify(prev));
    });
  };

  return (
    <DataContext.Provider
      value={{
        books,
        setBooks,
        bookDetails,
        addBookDetails,
        addPages,
        pages,
        cache,
        imageCache,
        resetState,
        setVouchers,
        vouchers,
      }}
    >
      {children}
    </DataContext.Provider>
  );
};

const useData = () => useContext(DataContext);

export default useData;
