"use client";

import React, { useEffect } from "react";

import CoreReducer from "./reducer";

type User = {
  data: {
    names: string;
    lastname: string;
    avatar: string;
  };
  tokens: {
    refresh_token: string;
    access_token: string;
  };
};
export type State = {
  showLoginModal: boolean;
  showRegisterModal:boolean;
  user: User | null;
  infoModal: InfoModal | null;
};
interface InfoModal {
  status: "success" | "info" | "error";
  onAnimationEnd: null | (()=>void);
  title: string;
  hasCancel: null | {
    title: string;
    cb: () => void;
  };
  hasSubmit: null | {
    title: string;
    cb: () => void;
  };
}
type Props = {
  children: JSX.Element;
};
const initialState: State = {
  infoModal: null,
  showLoginModal: false,
  showRegisterModal:false,
  user: null,
};

const CoreContext = React.createContext<[State, React.Dispatch<any>]>([
  initialState,
  () => {},
]);

export const CoreProvider: React.FC<Props> = (props) => {
  const [state, dispatch] = React.useReducer(CoreReducer, initialState);
  const value: [State, React.Dispatch<any>] = [state, dispatch];

  //   useEffect(() => {
  //     axios.interceptors.response.use(
  //       response => {
  //         return response;
  //       },
  //       async error => {
  //         // const deviceId = await getUniqueId();
  //         console.log('error.response.data', error.response.data);
  //         Sentry.captureMessage(
  //           `request error: ${JSON.stringify({
  //             url: error.response.config.url,
  //             api: error.response.config.baseURL,
  //             error: error.response.data,
  //             data: error.response.data,
  //             errorMetaData: _.pick(state, ['front', 'shift', 'selectedMeters']),
  //           })}`,
  //         );
  //         return Promise.reject(error);
  //       },
  //     );
  //   }, [state]);

  return <CoreContext.Provider value={value} {...props} />;
};

export const useCore = () => {
  const context = React.useContext(CoreContext);
  if (!context) {
    throw new Error("useContext debe estar dentro del proveedor CoreContext");
  }

  return context;
};

export async function setLoginModal(
  dispatch: React.Dispatch<any>,
  status: any
) {
  dispatch({
    type: "SET_LOGIN_MODAL",
    payload: status,
  });
}

export async function setRegisterModal(
  dispatch: React.Dispatch<any>,
  status: any
) {
  dispatch({
    type: "SET_REGISTER_MODAL",
    payload: status,
  });
}

export async function setInfoModal(dispatch: React.Dispatch<any>, data: any) {
  dispatch({
    type: "SET_INFO_MODAL",
    payload: data,
  });
}
