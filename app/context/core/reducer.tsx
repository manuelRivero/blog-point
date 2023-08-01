import { State } from ".";

export default function registerReducer(state:State, action:{type:string, payload:any}) {
    switch (action.type) {

      
      case 'SET_REGISTER_MODAL': {
        return {
          ...state,
          showLoginModal: false,
          showRegisterModal: true
        };
      }
  
      case 'SET_LOGIN_MODAL': {
        return {
          ...state,
          showRegisterModal: false,
          showLoginModal: action.payload,
        };
      }
      case 'SET_INFO_MODAL': {
        return {
          ...state,
          infoModal: action.payload,
        };
      }
      default:
        return state;
    }
  }
  