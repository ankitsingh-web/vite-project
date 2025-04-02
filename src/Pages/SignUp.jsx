import { useState } from "react";
import HomeLayout from "../Layouts/HomeLayout";
import { BsPersonCircle } from "react-icons/bs";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { toast } from "react-hot-toast";
import { createAccount } from "../Redux/Slices.jsx/AuthSlice";
function SignUp() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [previewImage, setPreviewImage] = useState("");
  const [signupData, setSignupData] = useState({
    fullName: "",
    email: "",
    password: "",
    avatar: "",
  });
  async function createNewAccount(event) {
    event.preventDefault();
    if (
      !signupData.email ||
      !signupData.password ||
      !signupData.fullName ||
      !signupData.avatar
    ) {
      toast.error("please fill all the details");
      return;
    }
    if (signupData.fullName.length < 5) {
      toast.error("Name should at be at least 5 charecter");
    }
    if (
      !signupData.email.match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
      )
    ) {
      toast.error("Invalid email id");
      return;
    }
    if (
      !signupData.password.match(
        /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/,
      )
    ) {
      toast.error("password should be atleast 6 charecter");
      return;
    }
    const formData = new FormData();
    formData.append("fullName", signupData.fullName);
    formData.append("email", signupData.email);
    formData.append("avatar", signupData.avatar);
    formData.append("password", signupData.password);
    //dispatch create account action
    const response = await dispatch(createAccount(formData));
    if (response?.payload?.success) navigate("/");
    setSignupData({
      fullName: "",
      email: "",
      password: "",
      avatar: "",
    });
    setPreviewImage("");
  }
  function handleUserInput(e) {
    const { name, value } = e.target;
    setSignupData({
      ...signupData,
      [name]: value,
    });
  }
  function getImage(event) {
    event.preventDefault();
    const uploadedImage = event.target.files[0];
    setSignupData({
      ...signupData,
      avatar: uploadedImage,
    });
    const fileReader = new FileReader();
    fileReader.readAsDataURL(uploadedImage);
    fileReader.addEventListener("load", function () {
      //console.log(this.result)
      setPreviewImage(this.result);
    });
  }

  return (
    <>
      <HomeLayout>
        <div className="flex items-center justify-center h-[100vh]">
          <form
            noValidate
            onSubmit={createNewAccount}
            className=" flex flex-col justify-center rounded-lg p-4 text-white w-96 shadow-[0_0_10px_black]"
          >
            <h1 className="text-center text-2xl font-bold">
              Registration Page
            </h1>

            <label htmlFor="image_uploads" className=" cursor-pointer">
              {previewImage ? (
                <img
                  className=" w-24 m-auto h-24 rounded-full"
                  src={previewImage}
                />
              ) : (
                <BsPersonCircle className=" w-24 m-auto h-24 rounded-full" />
              )}
            </label>
            <input
              onChange={getImage}
              type="file"
              id="image_uploads"
              className=" hidden"
              accept=".jpg, .png, .jpeg, .svg"
              name="image_uploads"
            />

            <div className="flex flex-col gap-2">
              <label htmlFor="fullName" className="font-semibold">
                FullName
              </label>
              <input
                type="name"
                required
                name="fullName"
                id="name"
                placeholder="Enter your fullName..."
                onChange={handleUserInput}
                value={signupData.fullName}
                className="bg-transparent px-2 py-1 border"
              />
            </div>

            <div className="flex flex-col gap-2">
              <label htmlFor="email" className="font-semibold">
                Email
              </label>
              <input
                type="email"
                required
                name="email"
                id="email"
                placeholder="Enter your email..."
                onChange={handleUserInput}
                value={signupData.email}
                className="bg-transparent px-2 py-1 border"
              />
            </div>
            <div className="flex flex-col gap-2">
              <label htmlFor="password" className="font-semibold">
                Password
              </label>
              <input
                type="password"
                required
                name="password"
                id="password"
                placeholder="Enter your password..."
                onChange={handleUserInput}
                value={signupData.password}
                className="bg-transparent px-2 py-1 border"
              />
            </div>

            <button
              type="submit"
              className="hover:bg-yellow-500 bg-yellow-600 transition-all ease-in-out duration-200 rounded-sm py-2 font-semibold text-lg cursor-pointer mt-2"
            >
              Create account
            </button>
            <p className="text-center">
              Aleredy have an account ?{" "}
              <Link to="/login" className=" cursor-pointer text-accent">
                Login
              </Link>{" "}
            </p>
          </form>
        </div>
      </HomeLayout>
    </>
  );
}
export default SignUp;
