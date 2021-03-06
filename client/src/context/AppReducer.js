export const reducers = (state, action) => {
  let { payload } = action;
  switch (action.type) {
    case "SET_REG_ADDRESS":
      let str = payload.structured_formatting.secondary_text
        .split(",")
        .map((str) => str.trim());
      console.log("str", str);
      return {
        ...state,
        regAddress: {
          city: str[0],
          state: str[1],
          country: str[2],
          lat: payload.lat,
          lng: payload.lng,
        },
      };
    case "VIEW_OTHER_USER":
      return {
        ...state,
        otherUserInfo: payload,
      }
    case "SET_CUR_MAP_DATA":
      return {
        ...state,
        currMapData: payload,
      }
    case "GET_MAP_DATA":
      return {
        ...state,
        initialMapData: payload,
      }
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
