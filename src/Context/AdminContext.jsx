import { createContext, useContext, useState } from "react";

const AdminContext = createContext({
    stats: null,
    allBooks: null,
    setStats: (data) => { },
    setAllBooks: (data) => { },
})


export const AdminContextProvider = ({ children }) => {
    const [stats, setStats] = useState(null);
    const [allBooks, setAllBooks] = useState(null);

    return (
        <AdminContext.Provider value={{
            allBooks,
            stats,
            setStats,
            setAllBooks
        }}>
            {children}
        </AdminContext.Provider>
    )
}

const useAdmin = () => {
    return useContext(AdminContext);
}


export default useAdmin;