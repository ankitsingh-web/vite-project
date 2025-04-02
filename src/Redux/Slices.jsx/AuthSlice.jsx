import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { toast } from "react-hot-toast";
import axiosInstance from "../../Helpers/axiosinstance";
const initialState = {
  isLoggedIn: localStorage.getItem("isLoggedIn") || false,
  role: localStorage.getItem("role") || "",
  data:
    localStorage.getItem("data") != undefined
      ? localStorage.getItem("data")
      : {},
};

export const createAccount = createAsyncThunk("/auth/signup", async (data) => {
  try {
    const response = axiosInstance.post("user/register", data);
    toast.promise(response, {
      loading: "wating creating your account",
      success: (data) => {
        return data?.data?.message;
      },
      error: "failed to create account",
    });
    return (await response).data;
  } catch (error) {
    toast.error(error?.response?.data?.message);
  }
}); ///auth/signup -> fro unique identification

export const logout = createAsyncThunk("/auth/logout", async () => {
  try {
    const promise = axiosInstance.post("/user/logout");

    toast.promise(promise, {
      loading: "Wait, logout is in process...",
      success: (response) => {
        return response?.data?.message;
      },
      error: (error) => {
        return error?.response?.data?.message || "Failed to logout";
      },
    });

    // Await the promise to ensure proper flow
    const response = await promise;
    return response.data;
  } catch (error) {
    toast.error(error?.response?.data?.message || "Failed to logout");
    throw error; // Ensure that the error is properly thrown so createAsyncThunk can handle it
  }
});

//update profile

// export const updateProfile=createAsyncThunk("/user/update/profile",async(dat)=>{
//   try{
//     let response =await axiosInstance.put(`/user/update/${dat[0]}`,dat[1]);
//     toast.promise(response,{
//       loading:"wait profile update in progress...",
//       success:(data)=>{
//         return data?.data?.message;
//       },error:"failed to update profile"
//     });
//     response =await response;
//     return response.data;
//   }catch(error){
// toast.error(error?.response?.data?.message)
//   }
// });

export const forgetPassword = createAsyncThunk(
  "auth/forgetPassword",
  async (email) => {
    try {
      let res = axiosInstance.post("/user/reset", { email });

      await toast.promise(res, {
        loading: "Loading...",
        success: (data) => {
          return data?.data?.message;
        },
        error: "Failed to send verification email",
      });

      // getting response resolved here
      res = await res;
      return res.data;
    } catch (error) {
      toast.error(error?.response?.data?.message);
    }
  },
);

// function to reset the password
export const resetPassword = createAsyncThunk("/user/reset", async (data) => {
  try {
    let res = axiosInstance.post(`/user/reset/${data.resetToken}`, {
      password: data.password,
    });

    toast.promise(res, {
      loading: "Resetting...",
      success: (data) => {
        return data?.data?.message;
      },
      error: "Failed to reset password",
    });
    // getting response resolved here
    res = await res;
    return res.data;
  } catch (error) {
    toast.error(error?.response?.data?.message);
  }
});

export const updateProfile = createAsyncThunk(
  "/user/update/profile",
  async (dat) => {
    try {
      const responsePromise = axiosInstance.put(
        `/user/update/${dat[0]}`,
        dat[1],
      );

      // Handling the toast promise correctly
      const response = await toast.promise(
        responsePromise, // Passing the promise directly to toast.promise
        {
          loading: "Wait, profile update in progress...",
          success: (data) => {
            return data?.data?.message || "Profile updated successfully!";
          },
          error: (err) => {
            return err?.response?.data?.message || "Failed to update profile";
          },
        },
      );

      return response.data;
    } catch (error) {
      toast.error(
        error?.response?.data?.message || "An unexpected error occurred",
      );
      throw error;
    }
  },
);

export const getUserData = createAsyncThunk("/user/details", async () => {
  try {
    const response = await axiosInstance.get("/user/me");
    console.log(response.data);
    return (await response).data;
  } catch (error) {
    toast.error(error?.message);
  }
});

export const login = createAsyncThunk("/auth/login", async (data) => {
  try {
    const response = axiosInstance.post("user/login", data);
    toast.promise(response, {
      loading: "wating authentication is progress...",
      success: (data) => {
        return data?.data?.message;
      },
      error: "failed to login",
    });
    return (await response).data;
  } catch (error) {
    toast.error(error?.response?.data?.message);
  }
}); ///auth/signup -> fro unique identification

//change password
export const changePassword = createAsyncThunk(
  "/auth/changePassword",
  async (userPassword) => {
    try {
      let res = axiosInstance.post("/user/change-password", userPassword);

      await toast.promise(res, {
        loading: "Loading...",
        success: (data) => {
          return data?.data?.message;
        },
        error: "Failed to change password",
      });

      // getting response resolved here
      res = await res;
      return res.data;
    } catch (error) {
      toast.error(error?.response?.data?.message);
    }
  },
);
const authSlice = createSlice({
  name: "auth",
  initialState,
  reducer: {},
  extraReducers: (builder) => {
    builder
      .addCase(login.fulfilled, (state, action) => {
        localStorage.setItem("data", JSON.stringify(action?.payload?.user));
        localStorage.setItem("isLoggedIn", true);
        localStorage.setItem("role", action?.payload?.user?.role);
        state.isLoggedIn = true;
        state.data = action?.payload?.user;
        state.role = action?.payload?.user?.role;
      })
      .addCase(logout.fulfilled, (state) => {
        localStorage.clear();
        (state.data = {}), (state.isLoggedIn = false), (state.role = "");
      })
      .addCase(getUserData.fulfilled, (state, action) => {
        localStorage.setItem("data", JSON.stringify(action?.payload?.user));
        localStorage.setItem("isLoggedIn", true);
        localStorage.setItem("role", action?.payload?.user?.role);
        state.isLoggedIn = true;
        state.data = action?.payload?.user;
        state.role = action?.payload?.user?.role;
      });
  },
});
//export const {}=authSlice.actions;
export default authSlice.reducer;
