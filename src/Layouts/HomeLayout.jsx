import { FiMenu } from "react-icons/fi";
import { Link, useNavigate } from "react-router-dom";
import { AiFillCloseCircle } from "react-icons/ai";
import Footer from "../Footer";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../Redux/Slices.jsx/AuthSlice";
function HomeLayout({ children }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const isLoggedIn = useSelector((state) => state?.auth?.isLoggedIn);
  const role = useSelector((state) => state?.auth?.role);

  function ChangeWidth() {
    const drawSide = document.getElementsByClassName("drawer-side")[0];
    console.log(drawSide);
    drawSide.style.width = "auto";
  }
  function hideDrawer() {
    const element = document.getElementsByClassName("drawer-toggle")[0];
    element.checked = false;

    const drawerSide = document.getElementsByClassName("drawer-side")[0];
    drawerSide.style.width = "0";
  }
  async function handleLogout(e) {
    e.preventDefault();
    const res = await dispatch(logout());
    if (res?.payload?.success) navigate("/");
  }
  return (
    <>
      <div className="bg-slate-800 min-h-[90vh]">
        <div className="drawer absolute left-0 z-50 w-fit">
          <input className="drawer-toggle" id="my-drawer" type="checkbox" />
          <div className=" drawer-content">
            <label htmlFor="my-drawer" className="cursor-pointer relative">
              <FiMenu
                size={"32px"}
                className="font-bold text-white m-4"
                onClick={ChangeWidth}
              />
            </label>
          </div>
          <div className="drawer-side w-0">
            <label htmlFor="my-drawer" className="drawer-overlay"></label>
            <ul className="menu p-4 w-48 sm:w-80 text-base-content  relative">
              <li className="w-fit absolute right-2 z-50">
                <button className="" onClick={hideDrawer}>
                  <AiFillCloseCircle size={"24px"} className="text-white" />
                </button>
              </li>
              <li>
                <Link className="text-white" to="/">
                  Home
                </Link>
              </li>
              {isLoggedIn && role === "ADMIN" && (
                <li className="text-white">
                  <Link to={"/admin/dashboard"}>Admin Dashboard</Link>
                </li>
              )}
              <li className="text-white">
                <Link to="/courses">All Courses</Link>
              </li>
              <li className="text-white">
                <Link to="/contact">Contact Us</Link>
              </li>
              <li className="text-white">
                <Link to="/about">About Us</Link>
              </li>

              {!isLoggedIn && (
                <li className="bottom-2 w-[40vh] text-white">
                  <div className="w-full flex items-center justify-center">
                    <button className="btn-primary px-4 py-1 font-semibold bg-blue-700 rounded-md w-full">
                      <Link to="/login">Login</Link>
                    </button>
                    <button className="btn-secondary text-white bg-pink-500 px-4 py-1 font-semibold rounded-md w-full">
                      <Link to="/signup">SignUp</Link>
                    </button>
                  </div>
                </li>
              )}

              {isLoggedIn && (
                <li className="bottom-2 w-[40vh]">
                  <div className="w-full flex items-center justify-center">
                    <button className="btn-primary px-4 py-1 font-semibold bg-blue-700 rounded-md w-full">
                      <Link to="/user/profile">profile</Link>
                    </button>
                    <button className="btn-secondary bg-pink-500 px-4 py-1 font-semibold rounded-md w-full">
                      <Link onClick={handleLogout}>Logout</Link>
                    </button>
                  </div>
                </li>
              )}
            </ul>
          </div>
        </div>
        {children}
        <Footer></Footer>
      </div>
    </>
  );
}
export default HomeLayout;
