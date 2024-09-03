const AppReducer = (state, action) => {
  if (action.type === "SET_BESTSELLERS") {
    return { ...state, bestSellers: action.payload };
  } else if (action.type === "SET_BLOGS") {
    return { ...state, blogs: action.payload };
  }
  return { ...state };
};

export default AppReducer;
