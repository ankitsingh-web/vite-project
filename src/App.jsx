import { useState } from "react";
import Footer from "./Footer";

import { Routes, Route } from "react-router-dom";

import HomePage from "./Pages/HomePage";

import "./App.css";
import AboutUs from "./Pages/AboutUs";
import NotFound from "./Pages/NotFound";
import SignUp from "./Pages/SignUp";
import Login from "./Pages/Login";
import CourseList from "./Pages/Course/courseList";
import Contact from "./Pages/Contact";
import Denied from "./Pages/Denied";
import CourseDescription from "./Pages/Course/CourseDescription";
import Profile from "./Pages/User/profile";
import CreateCourse from "./Pages/Course/CreateCourse";
import RequireAuth from "./componenet/Auth/RequireAuth";
import EditProfile from "./Pages/User/EditProfile";
import Checkout from "./Pages/payment/Checkout";
import CheckoutSuccess from "./Pages/payment/CheckoutSuccess";
import CheckoutFail from "./Pages/payment/CheckoutFail";
import DisplayLectures from "./Pages/Dashboard/Displaylecture";
import AddLectures from "./Pages/Dashboard/AddLecture";
import AdminDashboard from "./Pages/Dashboard/AdminDashboard";
import ChangePassword from "./Pages/Password/ChangePassword";
import ForgetPassword from "./Pages/Password/ForgetPassword";
import ResetPassword from "./Pages/Password/ResetPassword";
function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<HomePage />}></Route>
        <Route path="/about" element={<AboutUs />}></Route>

        <Route path="/signup" element={<SignUp />}></Route>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/courses" element={<CourseList />}></Route>
        <Route path="/contact" element={<Contact />}></Route>
        <Route path="/denied" element={<Denied />}></Route>
        <Route
          path="/course/description"
          element={<CourseDescription />}
        ></Route>
        <Route path="/reset-password/:resetToken" element={<ResetPassword />} />
        <Route element={<RequireAuth allowedRoles={["ADMIN"]} />}>
          <Route path="/course/create" element={<CreateCourse />}></Route>
          <Route path="/course/addlecture" element={<AddLectures />}></Route>
          <Route path="/admin/dashboard" element={<AdminDashboard />}></Route>
        </Route>
        <Route element={<RequireAuth allowedRoles={["ADMIN", "USER"]} />}>
          <Route path="/user/profile" element={<Profile />} />
          <Route path="/user/editprofile" element={<EditProfile />} />
          <Route path="/changepassword" element={<ChangePassword />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/checkout/fail" element={<CheckoutFail />} />
          <Route path="/checkout/success" element={<CheckoutSuccess />} />
          <Route path="/course/displaylecture" element={<DisplayLectures />} />
        </Route>
        <Route path="/forgetpassword" element={<ForgetPassword />} />
        <Route path="*" element={<NotFound />}></Route>
      </Routes>
    </>
  );
}
export default App;
