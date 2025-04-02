import { configureStore } from "@reduxjs/toolkit";
import authSliceReducer from "./Slices.jsx/AuthSlice";
import courseSlice from "./Slices.jsx/CourseSlice";
import RazorpaySlice from "./Slices.jsx/RazorpaySlice";
import LectureSlice from "./Slices.jsx/LectureSlice";
import StatSlice from "./Slices.jsx/StatSlice";
const store = configureStore({
  reducer: {
    auth: authSliceReducer,
    course: courseSlice,
    razorpay: RazorpaySlice,
    lecture: LectureSlice,
    stat: StatSlice,
  },
  devTools: true,
});
export default store;
