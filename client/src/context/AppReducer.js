export const reducers = (state, action) => {
  let { payload } = action;
  switch (action.type) {
    case "SET_REG_ADDRESS":
      console.log("is calling SET_REG_ADDRESS", payload);

      let str = payload.structured_formatting.secondary_text
        .split(",")
        .map((str) => str.trim());
      console.log("str", str);
      return {
        ...state,
        regAddress: { city: str[0], state: str[1], country: str[2] },
      };
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
