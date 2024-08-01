"use client";

import React, { useEffect, useMemo, useRef } from "react";
import CoreReducer from "./reducer";
import { axiosIntance, axiosAuthIntance } from "@/app/client";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import { User } from "@/app/data/user";
import { usePathname } from "next/navigation";
import { Notification } from "@/app/data/notifications";
import { getNotifications } from "@/app/client/notifications";

const getUser = () => {
  const user =
    typeof window !== "undefined" ? localStorage.getItem("user") : null;
  const notificationEnabled =
    typeof window !== "undefined"
      ? localStorage.getItem("historial-medico-has-notifications-enable")
      : null;
  let parseUser = null;
  let stateUser = null;
  if (user) {
    parseUser = JSON.parse(user);
    stateUser = {
      data: parseUser.data,
      tokens: {
        access_token: parseUser.tokens.token,
        refresh_token: parseUser.tokens.refreshToken,
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
  notificationsData: Notification[];
  notificationsMetaData: any;
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
  notificationsMetaData: null,
  notificationsData: [],
  loginRedirection: "/",
  infoModal: null,
  showLoginModal: false,
  showRegisterModal: false,
  user: getUser(),
  deviceToken: null,
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
  const responseInterceptor = useRef<any>();

  useEffect(() => {
    const handleLogout = async () => {

      setInfoModal(dispatch, {
        status: "error",
        title: "Tu sesión ha expirado",
        hasCancel: null,
        hasSubmit: {
          title: "Iniciar sesión",
          cb: async () => {
            setInfoModal(dispatch, null);
            setLoginModal(dispatch, true);
            router.push("/");
            router.refresh();
            logout(dispatch);
          },
        },
        onAnimationEnd: null,
      });
    };
    const handleRefresh = async (user: User) => {
      let tokens: any = {};
      try {
        const response = await axiosAuthIntance.post("/auth/refresh-token", {
          user: { id: user.data?._id },
          refreshToken: user.tokens?.refresh_token,
        });
        tokens = {
          token: response.data.token,
          refreshToken: response.data.refreshToken,
        };
        setUserTokens(dispatch, {
          token: response.data.token,
          refreshToken: response.data.refreshToken,
        });
      } catch (error) {
        handleLogout();
      }
      return tokens;
    };
    responseInterceptor.current = axiosIntance.interceptors.response.use(
      async (response) => {
        return response;
      },
      async (error: any) => {
        const originalRequest = error.config;
        if (
          error.response &&
          error.response.status === 401 &&
          !originalRequest._retry
        ) {
          originalRequest._retry = true;
          try {
            const newToken = await handleRefresh(state.user);
            axiosIntance.defaults.headers.Authorization = `Bearer ${newToken.token}`;
            return axiosIntance(originalRequest);
          } catch (refreshError) {
            console.error(
              "Error refreshing token during response:",
              refreshError
            );
            await handleLogout();
            return Promise.reject(refreshError);
          }
        }
        if (error.response && error.response.status === 403) {
          handleLogout();
        }

        return Promise.reject(error);
      }
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state.user, dispatch, router]);

  useEffect(() => {
    return () => {
      axiosIntance.interceptors.request.eject(responseInterceptor.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state.user]);

  useEffect(() => {
    const getData = async () => {
      const { data } = await getNotifications(0, 10);

      setNotificationsData(
        dispatch,
        data.notifications[0].data.map((e: any) => ({
          type: e.type,
          redirectSlug: e.redirectSlug,
          body: e.body,
          title: e.title,
        }))
      );
      setNotificationsMetaData(dispatch, data.notifications[0].metadata[0]);
    };
    if (
      state.user &&
      state.user.tokens &&
      state.notificationsData.length === 0
    ) {
      getData();
    }
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

export async function setNotificationsData(
  dispatch: React.Dispatch<any>,
  data: any
) {
  dispatch({
    type: "SET_NOTIFICATIONS_DATA",
    payload: data,
  });
}

export async function setNotificationsMetaData(
  dispatch: React.Dispatch<any>,
  data: any
) {
  dispatch({
    type: "SET_NOTIFICATIONS_METADATA",
    payload: data,
  });
}

export async function logout(dispatch: React.Dispatch<any>) {
  localStorage.removeItem("user");
  Cookies.remove("token");
  dispatch({
    type: "LOGOUT",
  });
}
export async function setNotificationsEnabled(dispatch: React.Dispatch<any>) {
  dispatch({
    type: "SET_NOTIFICATION_ENABLED",
  });
}
export async function setUserData(dispatch: React.Dispatch<any>, data: any) {
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
  const user = localStorage.getItem("user");

  let parseUser;
  if (user) {
    parseUser = JSON.parse(user);
    localStorage.setItem(
      "user",
      JSON.stringify({
        ...parseUser,
        data: {
          ...parseUser.data,
          slug: profileData.slug,
          name: profileData.name,
          lastName: profileData.lastName,
          bio: profileData.bio,
        },
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
        tokens: {
          token: data.token,
          refreshToken: data.refreshToken,
        },
      })
    );
  } else {
    localStorage.setItem(
      "user",
      JSON.stringify({
        tokens: { token: data.token, refreshToken: data.refreshToken },
      })
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
  const user = localStorage.getItem("user");
  if (user) {
    const parseUser = JSON.parse(user);
    localStorage.setItem(
      "user",
      JSON.stringify({
        ...parseUser,
        tokens: {
          ...parseUser.tokens,
          device_token: deviceToken,
        },
      })
    );
    localStorage.setItem(
      "historial-medico-has-notifications-enable",
      JSON.stringify(true)
    );
  }
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

export async function setNotification(
  dispatch: React.Dispatch<any>,
  data: any
) {
  dispatch({
    type: "SET_NOTIFICATION",
    payload: data,
  });
}
