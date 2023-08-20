"use client";

import React, { useEffect } from "react";
import CoreReducer from "./reducer";
import { axiosIntance } from "@/app/client";
import Cookies from "js-cookie"
import { useRouter } from "next/navigation";
const getUser = () => {
  const user = typeof window !== "undefined" ? localStorage.getItem("user") : null;
  let parseUser = null;
  if(user){
    parseUser = JSON.parse(user)
  }
  return parseUser
}
type User = {
  data?: {
    name: string;
    lastName: string;
    avatar: string;
    bio:string;
    fallow?: number;
    blogs?:number;
    fallowers?: number;
    slug:string;
    social?:{
      facebook:string;
      instagram:string;
      twitter:string
    }
  };
  tokens?: {
    refresh_token?: string;
    access_token: string;
  };
};
export type State = {
  showLoginModal: boolean;
  showRegisterModal: boolean;
  user: User | null;
  infoModal: InfoModal | null;
};
interface InfoModal {
  status: "success" | "info" | "error";
  onAnimationEnd: null | (() => void);
  title: string;
  hasCancel: null | {
    title: string;
    cb: () => void;
  };
  hasSubmit: null | {
    title: string;
    cb: () => void;
  };
  message?: string;
}
type Props = {
  children: JSX.Element;
};
const initialState: State = {
  infoModal: null,
  showLoginModal: false,
  showRegisterModal: false,
  user: getUser(),
};

const CoreContext = React.createContext<[State, React.Dispatch<any>]>([
  initialState,
  () => {},
]);

export const CoreProvider: React.FC<Props> = (props) => {
  const [state, dispatch] = React.useReducer(CoreReducer, initialState);
  const value: [State, React.Dispatch<any>] = [state, dispatch];
  const router = useRouter()

  useEffect(() => {
    axiosIntance.interceptors.response.use(
      (response) => {
        if(response.status === 401){
          logout(dispatch)
          router.push("/")
        }
        return response;
      },
      async (error) => {
        // const deviceId = await getUniqueId();
        // console.log("error.response.data", error.response.data);
        return Promise.reject(error);
      }
    );
  }, []);

  useEffect(() => {
    axiosIntance.interceptors.request.use(
      function (config) {
        // Do something before request is sent
        const user = localStorage.getItem("user");
        let parseUser = null;
        if (user) {
          parseUser = JSON.parse(user);
          if (parseUser) {
            console.log("if user", parseUser);
            config.headers.Authorization = "Bearer" + " " + parseUser.token;
          } else {
            console.log("else user");
            delete config.headers.Authorization
            config.withCredentials = false

          }
        }
        return config;
      },
      function (error) {
        // Do something with request error
        return Promise.reject(error);
      }
    );
  }, []);

  return <CoreContext.Provider value={value} {...props} />;
};

export const useCore = () => {
  const context = React.useContext(CoreContext);
  if (!context) {
    throw new Error("useContext debe estar dentro del proveedor CoreContext");
  }

  return context;
};
export async function logout(dispatch: React.Dispatch<any>) {
  localStorage.removeItem("user");
  Cookies.remove('token')
  dispatch({
    type: "LOGOUT",
  });
}
export async function setUserData(dispatch: React.Dispatch<any>, data: any) {
  console.log("set user data")
  const user = localStorage.getItem("user");
 
  let parseUser;
  if (user) {
    parseUser = JSON.parse(user);
    localStorage.setItem("user", JSON.stringify({ ...parseUser, data }));
  } 
  dispatch({
    type: "SET_USER_DATA",
    payload: data,
  });
}

export async function setUserProfileData(dispatch: React.Dispatch<any>, profileData: any) {
  console.log("set user data")
  const user = localStorage.getItem("user");
 
  let parseUser;
  if (user) {
    parseUser = JSON.parse(user);
    localStorage.setItem("user", JSON.stringify({ ...parseUser, slug:profileData.slug, name: profileData.name, lastName:profileData.lastName, bio:profileData.bio}));
  } 
  dispatch({
    type: "SET_USER_PROFILE_DATA",
    payload: profileData,
  });
}

export async function setUserTokens(dispatch: React.Dispatch<any>, token: any) {
  const user = localStorage.getItem("user");
  Cookies.set('token', token)
  let parseUser;
  if (user) {
    parseUser = JSON.parse(user);
    localStorage.setItem("user", JSON.stringify({ ...parseUser, token }));
  } else {
    localStorage.setItem("user", JSON.stringify({ token }));

  }
  dispatch({
    type: "SET_USER_TOKENS",
    payload: token,
  });
}

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
