import { TOKEN, USER_LOGIN } from "../../constants/config";
import {
  GET_USER_FAIL,
  GET_USER_SUCCESS,
  LOGIN_FAIL,
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGOUT,
  REGISTER_FAIL,
  REGISTER_REQUEST,
  REGISTER_SUCCESS,
  RESET_UPDATE,
  UPDATE_USER_CURRENT_FAIL,
  UPDATE_USER_CURRENT_REQUEST,
  UPDATE_USER_CURRENT_SUCCESS,
} from "../types/Auth";
const currentUser = localStorage.getItem(USER_LOGIN)
  ? JSON.parse(localStorage.getItem(USER_LOGIN))
  : null;

const stateDefault = {
  currentUser: currentUser,
  loadingLogin: false,
  errorLogin: null,

  responseRegister: null,
  loadingRegister: false,
  errorRegister: null,

  successUpdateUserCurrent: null,
  loadingUpdateUserCurrent: false,
  errorUpdateUserCurrent: null,

  successGetDetailUser: null,
  errorGetDetailUser: null,
};

export const AuthReducer = (state = stateDefault, action) => {
  switch (action.type) {
    case LOGIN_REQUEST: {
      return { ...state, loadingLogin: true, errorLogin: null }; // error: null trong trường error đang báo lỗi, nhấn đăng nhập lại thì cần reset lại không báo lỗi nữa
    }
    case LOGIN_SUCCESS: {
      const { data, token } = action;
      localStorage.setItem(USER_LOGIN, JSON.stringify(data, token));
      localStorage.setItem(TOKEN, token);
      return { ...state, currentUser: data, loadingLogin: false };
    }
    case LOGIN_FAIL: {
      return {
        ...state,
        errorLogin: action.payload.error,
        loadingLogin: false,
      };
    }
    case LOGOUT: {
      localStorage.removeItem(USER_LOGIN);
      return {
        ...state,
        currentUser: null,
        responseRegister: null,
      };
    }
    case REGISTER_REQUEST: {
      return { ...state, loadingRegister: true, errorRegister: null };
    }
    case REGISTER_SUCCESS: {
      return {
        ...state,
        responseRegister: action.payload.data,
        loadingRegister: false,
      };
    }
    case REGISTER_FAIL: {
      return {
        ...state,
        errorRegister: action.payload.error,
        loadingRegister: false,
      };
    }

    case UPDATE_USER_CURRENT_REQUEST: {
      return {
        ...state,
        loadingUpdateUserCurrent: true,
        errorUpdateUserCurrent: null,
        successUpdateUserCurrent: null,
      };
    }
    case UPDATE_USER_CURRENT_SUCCESS: {
      const { data, token, status } = action.payload;
      localStorage.setItem(USER_LOGIN, JSON.stringify(data, token));
      localStorage.setItem(TOKEN, token);
      return {
        ...state,
        loadingUpdateUserCurrent: false,
        successUpdateUserCurrent: status,
        errorUpdateUserCurrent: null,
        currentUser: data,
      };
    }
    case UPDATE_USER_CURRENT_FAIL: {
      return {
        ...state,
        loadingUpdateUserCurrent: false,
        errorUpdateUserCurrent: action.payload.error,
        successUpdateUserCurrent: null,
      };
    }
    case GET_USER_SUCCESS: {
      return {
        ...state,
        successGetDetailUser: action.payload.data,
      };
    }
    case GET_USER_FAIL: {
      return {
        ...state,
        errorGetDetailUser: action.payload.error,
      };
    }
    case RESET_UPDATE: {
      return {
        ...state,
        successUpdateUserCurrent: "",
        errorUpdateUserCurrent: null,

        successGetDetailUser: "",
      };
    }
    default:
      return { ...state };
  }
};
