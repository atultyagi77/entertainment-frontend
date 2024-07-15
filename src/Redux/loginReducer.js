import axios from "axios";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import Cookies from "js-cookie";

// post request to user login 
export const userLoginDetailsReducer = createAsyncThunk(
  "sendUserDetailsToBackend",
  async (loginData) => {
    try {
      const options = {
        method: "POST",
        url: `https://entertainment-backend-axzp.onrender.com/api/login`,
        headers: {
          accept: "application/json",
        },
        data: loginData,
      };
      const userLoginDetails = await axios(options);
      if (userLoginDetails.status === 200) {
        return userLoginDetails.data;
      }
    } catch (error) {
      console.log(error);
    }
  }
);

// post request to create new User
export const userSignupDetailsReducer = createAsyncThunk(
  "createNewUserDataSendToBackend",
  async (userData) => {
    try {
      const options = {
        method: "POST",
        url: `https://entertainment-backend-axzp.onrender.com/api/register`,
        headers: {
          accept: "application/json",
        },
        data: userData,
      };
      const newUserDetails = await axios(options);
      if (newUserDetails.status === 201) {
        return newUserDetails.data;
      }
    } catch (error) {
      console.log(error);
    }
  }
);

const initialState = {
  loginType: "",
  loggedUserDetails: {
    status: "",
  },
  loading: false,
  newUserResponse: {
    status: "",
  },
};

const loginUserSlice = createSlice({
  name: "UserLoginDetails",
  initialState,
  reducers: {
    // set user details login with google
    setLoggedUserData: (state, action) => {
      state.loginType = "google";
      state.loggedUserDetails = action.payload;
      localStorage.setItem("user", JSON.stringify(action.payload));
    },
  },
  // handle data from async function and set cookies 
  extraReducers: (builder) => {
    builder
      .addCase(userLoginDetailsReducer.fulfilled, (state, action) => {
        // set cookies and loged user details in localstorage
        if (action.payload && action.payload.token) {
          Cookies.set("loginCookies", action.payload.token, { expires: 30 });
          localStorage.setItem("user", JSON.stringify(action.payload));
          return {
            ...state,
            loggedUserDetails: {
              ...action.payload,
              status: 200 // or whatever value you want to set
            },
            loading: false,
            loginType: "database"
          };
        } 
      })
      .addCase(userLoginDetailsReducer.pending, (state) => {
        state.loading = true;
      })
      .addCase(userLoginDetailsReducer.rejected, (state) => {
        state.loading = false;
      })
      .addCase(userSignupDetailsReducer.fulfilled, (state, action) => {
        state.newUserResponse = {
          ...action.payload,
          status: 201,
        };
        state.loading = false;
      })
      .addCase(userSignupDetailsReducer.pending, (state) => {
        state.newUserResponse = {
          ...state.newUserResponse,
          status: 404,
        };
        state.loading = true;
      })
      .addCase(userSignupDetailsReducer.rejected, (state) => {
        state.newUserResponse = {
          ...state.newUserResponse,
          status: 401,
        };
        state.loading = false;
      });
  },
});

export const { setLoggedUserData } = loginUserSlice.actions;
export default loginUserSlice.reducer;
