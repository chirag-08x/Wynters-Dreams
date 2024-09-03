import {
  useEffect,
  createContext,
  useContext,
  useReducer,
  useState,
  useMemo,
} from "react";
import userReducer from "../reducers/UserReducer";
import Cookies from "js-cookie";
import axios from "axios";
import { baseURL } from "../api/api";

const UserContext = createContext();

const initialState = {
  user: null,
  loading: true,
};

export const UserProvider = ({ children }) => {
  const [state, dispatch] = useReducer(userReducer, initialState);
  const [cartState, setCartState] = useState(null);
  // const [cookie, setcookie] = useState(second)
  const [cookie, setCookie] = useState(Cookies.get("authToken"));

  const getUser = () => {
    dispatch({ type: "GET_USER" });
  };

  const loginUser = (user) => {
    setCookie(user.token);
    dispatch({ type: "LOGIN_USER", payload: user });
  };
  const updateUserDetails = (user) => {
    if (user.token) {
      setCookie(user.token);
    }
    dispatch({ type: "UPDATE_USER_DETAILS", payload: user });
  };
  const setCart = (cart) => {
    setCartState(cart);
    dispatch({ type: "SET_CART", payload: cart });
  };
  const logoutUser = () => {
    dispatch({ type: "LOGOUT_USER" });
    window.location.href = "/login";
  };

  const axiosInstance = useMemo(() => {
    const axiosIns = axios.create({
      baseURL: baseURL,
      headers: cookie
        ? {
            Authorization: `Bearer ${cookie}`,
          }
        : {},
    });
    axiosIns.interceptors.response.use(
      (response) => response,
      (error) => {
        if (error.response && error.response.status === 401) {
          window.location.href = "/login";
        }
        return Promise.reject(error);
      }
    );
    return axiosIns;
  }, [cookie]);

  // const verifySession = async () => {
  //   try {
  //     const { data } = await axiosInstance.get("/auth/verify-session");
  //     setCookie(data.token);
  //     loginUser(data);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  // useEffect(() => {
  //   verifySession();
  // }, []);

  useEffect(() => {
    if (!state?.user) {
      getUser();
    }
    if (state.user && !cartState) {
      axiosInstance
        .get("/cart")
        .then((res) => {
          setCart(res.data);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [state.user]);

  return (
    <UserContext.Provider
      value={{
        state,
        loginUser,
        logoutUser,
        updateUserDetails,
        setCart,
        // verifySession,
        cartState: cartState,
        axiosInstance,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const useUserContext = () => {
  return useContext(UserContext);
};
