import axios from "axios";
import {
  USER_REGISTER_FAIL,
  USER_REGISTER_REQUEST,
  USER_REGISTER_SUCCESS,
  USER_LOGIN_FAIL,
  USER_LOGIN_REQUEST,
  USER_LOGIN_SUCCESS,
  USER_LOGIN_RESET,
} from "../constants/userConstants";

const register = (user) => async (dispatch) => {
  dispatch({
    type: USER_REGISTER_REQUEST,
  });
  try {
    const { data } = await axios.post("https://acecoder-backend.onrender.com/user/register", user);

    dispatch({
      type: USER_REGISTER_SUCCESS,
      payload: data,
    });
    localStorage.setItem("userInfo",JSON.stringify(data))
    dispatch({
      type: USER_LOGIN_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: USER_REGISTER_FAIL,
      payload: error.response.data
    });
  }
};

const login = (user) => async (dispatch) => {
  try {
    dispatch({
      type: USER_LOGIN_REQUEST,
    });
    const { data } = await axios.post("https://acecoder-backend.onrender.com/user/login", user);
    dispatch({
      type: USER_LOGIN_SUCCESS,
      payload: data,
    });
    localStorage.setItem("userInfo",JSON.stringify(data))
  } catch (error) {
    dispatch({
        type : USER_LOGIN_FAIL,
        payload : error.response.data
    })
  }
};

export const logout = () => dispatch => {
    dispatch({
        type : USER_LOGIN_RESET
    })
    localStorage.removeItem("userInfo")
}

export { register, login };
