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
  let stateUser = null;
  if (user) {
    parseUser = JSON.parse(user);
    stateUser = {
      data: parseUser.data,
      tokens: {
        access_token: parseUser.token,
        refresh_token: parseUser.refreshToken,
      },
    };
  }
  return stateUser;
};

export type State = {
  showLoginModal: boolean;
  loginRedirection: string;
  showRegisterModal: boolean;
  user: User | null;
  infoModal: InfoModal | null;
  deviceToken: string | null;
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
  deviceToken: null
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
        if (response.status && response.status === 401) {
          logout(dispatch);
          router.push("/");
        }
        return response;
      },
      async (error: any) => {
        // const deviceId = await getUniqueId();
        console.log("axiosIntance.interceptors.error", error);

        if (error.response.status && error.response.status === 401) {
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const requestInterceptor = useMemo(() => {
    return axiosIntance.interceptors.request.use(
      async (config) => {
        console.log("request on use memo", config.headers.Authorization);
        // Do something before request is sent
        let parseUser = null;
        const CancelToken = axios.CancelToken;
        console.log("user state", state.user);
        if (state.user) {
          parseUser = state.user;
          if (parseUser) {
            let decodedToken: any = jwt_decode(parseUser.tokens?.access_token);
            let currentDate = new Date();
            console.log(
              "decode exp",
              decodedToken.exp * 1000 < currentDate.getTime()
            );
            if (decodedToken.exp * 1000 < currentDate.getTime()) {
              console.log("entro al if, cancela peticiòn");
              config = {
                ...config,
                cancelToken: new CancelToken((cancel) =>
                  cancel("Cancel repeated request")
                ),
              };
              console.log("entro al refresh", parseUser);
              try {
                const response = await axios.post(
                  "http://localhost:4000/api/auth/refresh-token",
                  {
                    user: { id: parseUser.data._id },
                    refreshToken: parseUser.tokens?.refresh_token,
                  }
                );
                console.log("response", response);
                setUserTokens(dispatch, {
                  token: response.data.token,
                  refreshToken: response.data.refreshToken,
                });
                config.headers.Authorization =
                  "Bearer" + " " + response.data.token;
                config.cancelToken = undefined;

                return config;
              } catch (error) {
                console.log(error, "error response");

                delete config.headers.Authorization;
                config.withCredentials = false;

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
              }
            } else {
              const localStoregeUser = getUser();
              config.headers.Authorization =
                "Bearer" + " " + localStoregeUser?.tokens?.access_token;
            }
          }
          // else {
          //   delete config.headers.Authorization;
          //   config.withCredentials = false;
          // }
        }
        return config;
      },
      function (error) {
        console.log("axiosIntance.interceptors.request error", error);
        // Do something with request error
        return Promise.reject(error);
      }
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state.user]);

  useEffect(() => {
    return () => {
      axiosIntance.interceptors.request.eject(requestInterceptor);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
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

export async function setUserTokens(dispatch: React.Dispatch<any>, data: any) {
  const user = localStorage.getItem("user");
  Cookies.set("token", data.token);
  let parseUser;
  if (user) {
    parseUser = JSON.parse(user);
    localStorage.setItem(
      "user",
      JSON.stringify({
        ...parseUser,
        token: data.token,
        refreshToken: data.refreshToken,
      })
    );
  } else {
    localStorage.setItem(
      "user",
      JSON.stringify({ token: data.token, refreshToken: data.refreshToken })
    );
  }
  dispatch({
    type: "SET_USER_TOKENS",
    payload: data,
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

export async function setDeviceToken(
  dispatch: React.Dispatch<any>,
  deviceToken: any
) {
  dispatch({
    type: "SET_DEVICE_TOKEN",
    payload: deviceToken,
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
