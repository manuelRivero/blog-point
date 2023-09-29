"use client";

import React, { useEffect, useMemo } from "react";
import CoreReducer from "./reducer";
import { axiosIntance } from "@/app/client";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import jwt_decode from "jwt-decode";
import axios from "axios";
import { User } from "@/app/data/user";
import { usePathname } from "next/navigation";

const getUser = () => {
  const user =
    typeof window !== "undefined" ? localStorage.getItem("user") : null;
  let parseUser = null;
  if (user) {
    parseUser = JSON.parse(user);
  }
  return parseUser;
};

export type State = {
  showLoginModal: boolean;
  loginRedirection: string;
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
  loginRedirection: "/",
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
  const router = useRouter();
  const pathName = usePathname();
  console.log("pathName", pathName);

  const responseInterceptor = useMemo(() => {
    return axiosIntance.interceptors.response.use(
      (response) => {
        console.log("axiosIntance.interceptors.response", response);
        if (response.status === 401) {
          logout(dispatch);
          router.push("/");
        }
        return response;
      },
      async (error: any) => {
        // const deviceId = await getUniqueId();
        console.log("axiosIntance.interceptors.error", error);

        if (error.response.status === 401) {
          setInfoModal(dispatch, {
            status: "error",
            title: "Tu sesión ha expirado",
            hasCancel: null,
            hasSubmit: {
              title: "Iniciar sesión",
              cb: () => {
                setInfoModal(dispatch, null);
                logout(dispatch);
                setLoginModal(dispatch, true);
                router.push("/");
              },
            },
            onAnimationEnd: null,
          });
        }
        console.log("error.response.data", error.response);
        return Promise.reject(error);
      }
    );
  }, []);

  const requestInterceptor = useMemo(() => {
    return axiosIntance.interceptors.request.use(
      (config) => {
        console.log("request on use memo", config.url);
        // Do something before request is sent
        const user = localStorage.getItem("user");
        let parseUser = null;
        const CancelToken = axios.CancelToken;
        console.log("user", user);
        if (user) {
          parseUser = JSON.parse(user);
          if (parseUser) {
            let decodedToken: any = jwt_decode(parseUser.token);
            let currentDate = new Date();
            if (decodedToken.exp * 1000 < currentDate.getTime()) {
              config = {
                ...config,
                cancelToken: new CancelToken((cancel) =>
                  cancel("Cancel repeated request")
                ),
              };
              logout(dispatch);
              setLoginRedirection(dispatch, pathName);
              setInfoModal(dispatch, {
                status: "error",
                title: "Tu sesión ha expirado",
                hasCancel: null,
                hasSubmit: {
                  title: "Iniciar sesión",
                  cb: () => {
                    setInfoModal(dispatch, null);
                    logout(dispatch);
                    setLoginModal(dispatch, true);
                    router.push("/");
                  },
                },
                onAnimationEnd: null,
              });
            } else {
              config.headers.Authorization = "Bearer" + " " + parseUser.token;
            }
          } else {
            delete config.headers.Authorization;
            config.withCredentials = false;
          }
        }
        return config;
      },
      function (error) {
        console.log("axiosIntance.interceptors.request error", error);
        // Do something with request error
        return Promise.reject(error);
      }
    );
  }, [state.user]);

  useEffect(() => {
    return () => {
      axiosIntance.interceptors.request.eject(requestInterceptor);
    };
  }, [state.user]);

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
  Cookies.remove("token");
  dispatch({
    type: "LOGOUT",
  });
}
export async function setUserData(dispatch: React.Dispatch<any>, data: any) {
  console.log("set user data");
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

export async function setUserProfileData(
  dispatch: React.Dispatch<any>,
  profileData: any
) {
  console.log("set user data");
  const user = localStorage.getItem("user");

  let parseUser;
  if (user) {
    parseUser = JSON.parse(user);
    localStorage.setItem(
      "user",
      JSON.stringify({
        ...parseUser,
        slug: profileData.slug,
        name: profileData.name,
        lastName: profileData.lastName,
        bio: profileData.bio,
      })
    );
  }
  dispatch({
    type: "SET_USER_PROFILE_DATA",
    payload: profileData,
  });
}

export async function setUserTokens(dispatch: React.Dispatch<any>, token: any) {
  const user = localStorage.getItem("user");
  Cookies.set("token", token);
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
export async function setLoginRedirection(
  dispatch: React.Dispatch<any>,
  path: string
) {
  dispatch({
    type: "SET_LOGIN_REDIRECTION",
    payload: path,
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
