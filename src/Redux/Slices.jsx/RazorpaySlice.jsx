import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInstance from "../../Helpers/axiosinstance";
import toast from "react-hot-toast";
const initialState = {
  key: "",
  subscription_id: "",
  isPaymentverified: false,
  allpayment: [],
  finalMonths: {},
  monthlySalesRecord: [],
};

export const getRazorpayId = createAsyncThunk("/razorpay/getId", async () => {
  try {
    const response = await axiosInstance.get("/payments/razorpay-key");

    //console.log("jsoijdcc");
    return response.data;
  } catch (error) {
    toast.error("failed to load data");
  }
});
export const purchaseCourseBundle = createAsyncThunk(
  "/purchaseCourse",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post("/payments/subscribe");
      //console.log("response ->",response)
      return response.data;
    } catch (error) {
      const errorMessage =
        error?.response?.data?.message || "Failed to load purchase";
      toast.error(errorMessage);

      // Return the error for proper rejection handling
      return rejectWithValue(errorMessage);
    }
  }
);
export const verifyUserPayment = createAsyncThunk(
  "/payments/verify",
  async (data) => {
    try {
      const response = await axiosInstance.post("/payments/verify", {
        razorPay_payment_id: data.razorPay_payment_id,
        razorPay_subscription_id: data.razorPay_subscription_id,
        razorPay_signature: data.razorPay_signature,
      });
      return response.data;
    } catch (error) {
      toast.error(error?.response?.data?.message || "some error occured");
    }
  }
);

// export const getPaymentRecord = createAsyncThunk(
//   "/payments/record",
//   async () => {
//     try {
//       const response = await axiosInstance.get("/payments?count=100");
//       toast.promise(response, {
//         loading: "getting the payment records",
//         success: (data) => {
//           return data?.response?.data?.message;
//         },
//         error: "failed to get payment records",
//       });
//       return (await response).data;
//     } catch (error) {
//       toast.error("operation failed", error);
//     }
//   }
// );

export const getPaymentRecord = createAsyncThunk(
  "/payments/record",
  async () => {
    try {
      const response = await axiosInstance.get("/payments?count=100");

      // Wrap the response in the toast.promise after it resolves
      toast.promise(
        Promise.resolve(response), // Pass a resolved promise
        {
          loading: "Getting the payment records...",
          success: (data) => {
            return data?.data?.message; // Assuming success message is in data.response
          },
          error: "Failed to get payment records",
        }
      );

      return response.data;
    } catch (error) {
      toast.error("Operation failed");
      throw error; // Ensure the error is thrown so that createAsyncThunk can handle it
    }
  }
);

export const cancelCourseBundle = createAsyncThunk(
  "/payments/cancel",
  async () => {
    try {
      const response = await axiosInstance.post("/payments/unsubscribe");
      toast.promise(response, {
        loading: "unsubscribing the bundle",
        success: (data) => {
          return data?.response?.data?.message;
        },
        error: "failed to unsubsribe",
      });
      return (await response).data;
    } catch (error) {
      toast.error(error?.response?.data?.message);
    }
  }
);

const razorpaySlice = createSlice({
  name: "razorpay",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getRazorpayId.fulfilled, (state, action) => {
        state.key = action?.payload?.key;
        console.log(action);
      })
      .addCase(purchaseCourseBundle.fulfilled, (state, action) => {
        state.subscription_id = action?.payload?.subscription_id;
      })
      .addCase(verifyUserPayment.fulfilled, (state, action) => {
        toast.success(action?.payload?.message);
        state.isPaymentverified = action?.payload?.success;
      })
      .addCase(verifyUserPayment.rejected, (state, action) => {
        toast.success(action?.payload?.message);
        state.isPaymentverified = action?.payload?.success;
      })
      .addCase(getPaymentRecord.fulfilled, (state, action) => {
        toast.success(action?.payload?.message);
        state.allpayment = action?.payload?.allpayment;
        state.finalMonths = action?.payload?.finalMonths;
        state.monthlySalesRecord = action?.payload?.monthlySalesRecord;
      });
  },
});
export default razorpaySlice.reducer;
