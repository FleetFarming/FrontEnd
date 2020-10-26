export const reducers = (state, action) => {
  let { payload } = action;
  switch (action.type) {
    case "IS_LOGGED_IN":
      return {
        ...state,
        isLoggedIn: payload.isLoggedIn,
        userId: payload.userId,
      };

    case "SIGNUP":
      return {
        ...state,
        signUpData: payload,
      };

    case "GET_PROFILE":
      return {
        ...state,
        profileData: { ...payload, address: { ...payload.address } },
      };

    case "IS_LOADING":
      return {
        ...state,
        isLoading: payload,
      };

    case "IS_ERROR":
      return {
        ...state,
        isError: payload,
      };
    default:
      return state;
  }
};
