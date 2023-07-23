import { State } from ".";

export default function registerReducer(state:State, action:{type:string, payload:any}) {
    switch (action.type) {
  
      case 'SET_LOGIN_MODAL': {
        return {
          ...state,
          showLoginModal: action.payload,
        };
      }
      default:
        return state;
    }
  }
  