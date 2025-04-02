import { useState } from "react";
import HomeLayout from "../Layouts/HomeLayout";
import { BsPersonCircle } from "react-icons/bs";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { toast } from "react-hot-toast";
import { login } from "../Redux/Slices.jsx/AuthSlice";
function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });
  async function onLogin(event) {
    event.preventDefault();
    if (!loginData.email || !loginData.password) {
      toast.error("please fill all the details");
      return;
    }

    const formData = new FormData();
    formData.append("email", loginData.email);
    formData.append("password", loginData.password);
    //dispatch create account action
    const response = await dispatch(login(loginData));
    if (response?.payload?.success) navigate("/");
    setLoginData({
      email: "",
      password: "",
    });
  }

  function handleUserInput(e) {
    const { name, value } = e.target;
    setLoginData({
      ...loginData,
      [name]: value,
    });
  }

  return (
    <>
      <HomeLayout>
        <div className="flex items-center justify-center h-[100vh]">
          <form
            noValidate
            onSubmit={onLogin}
            className=" flex flex-col justify-center rounded-lg p-4 text-white w-96 shadow-[0_0_10px_black]"
          >
            <h1 className="text-center text-2xl font-bold">Login Page</h1>

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
                value={loginData.email}
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
                value={loginData.password}
                className="bg-transparent px-2 py-1 border"
              />
            </div>

            <button
              type="submit"
              className="hover:bg-yellow-500 bg-yellow-600 transition-all ease-in-out duration-200 rounded-sm py-2 font-semibold text-lg cursor-pointer mt-2"
            >
              Login
            </button>

            <Link to={"/forgetpassword"}>
              <p className="text-center link text-accent cursor-pointer">
                Forget Password
              </p>
            </Link>

            <p className="text-center">
              Do not have an account ?{" "}
              <Link to="/signup" className=" cursor-pointer text-accent">
                SignUp
              </Link>{" "}
            </p>
          </form>
        </div>
      </HomeLayout>
    </>
  );
}
export default Login;
