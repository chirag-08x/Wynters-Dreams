import Cookies from "js-cookie";

const userReducer = (state, action) => {
  if (action.type === "LOGIN_USER") {
    const token = action.payload.token;
    if (token) {
      Cookies.set("authToken", token);
    }
    delete action.payload.token;
    let user = action.payload;
    user.cart = []
    localStorage.setItem("user", JSON.stringify(user));
    return { user: action.payload, loading: false };
  } else if (action.type === "LOGOUT_USER") {
    Cookies.remove("authToken");
    localStorage.clear();
    return { user: null, loading: false };
  } else if (action.type === "GET_USER") {
    const authToken = Cookies.get("authToken");
    const user = JSON.parse(localStorage.getItem("user"));
    if (!authToken || !user || Object.keys(user).length === 0) {
      localStorage.clear();
      Cookies.remove("authToken");
      return { user: null };
    }
    return { user, loading: false };
  } else if (action.type === "UPDATE_USER_DETAILS") {
    localStorage.setItem("user", JSON.stringify(action.payload));
    return { user: action.payload };
  }
  else if (action.type === "SET_CART") {
    let user = state.user;
    if (user) {
      user.cart = action.payload;
      localStorage.setItem("user", JSON.stringify(user));
      return {
        user: { ...state.user, cart: action.payload }
      }
    }
    return { ...state };
  }
  else {
    return { ...state };
  }
};

export default userReducer;
