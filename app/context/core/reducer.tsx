import { State } from ".";

export default function registerReducer(
  state: State,
  action: { type: string; payload: any }
) {
  switch (action.type) {
    case "LOGOUT": {
      return {
        ...state,
        user: null,
      };
    }
    case "SET_USER_PROFILE_DATA": {
      return {
        ...state,
        user: { ...state.user,  data:{...state.user?.data, ...action.payload} },
      };
    }
    case "SET_USER_TOKENS": {
      return {
        ...state,
        user: { data: state.user?.data, tokens: { access_token: action.payload.token, refresh_token: action.payload.refreshToken  } },
      };
    }
    case "SET_USER_DATA": {
      console.log("user data reducer")
      return {
        ...state,
        user: { ...state.user, data: action.payload },
      };
    }
    case "SET_REGISTER_MODAL": {
      return {
        ...state,
        showLoginModal: false,
        showRegisterModal: true,
      };
    }
    case "SET_LOGIN_REDIRECTION": {
      return {
        ...state,
        loginRedirection: action.payload
      };
    }

    case "SET_LOGIN_MODAL": {
      return {
        ...state,
        showRegisterModal: false,
        showLoginModal: action.payload,
      };
    }
    case "SET_INFO_MODAL": {
      return {
        ...state,
        infoModal: action.payload,
      };
    }
    default:
      return state;
  }
}
