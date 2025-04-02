import HomeLayout from "../Layouts/HomeLayout";
import { Link, useNavigate } from "react-router-dom";
import HomePageImage from "../assets/Images/coputer1.webp";
import { useDispatch, useSelector } from "react-redux";
HomeLayout;
function HomePage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  //for checking is user is loggedin
  const isLoggedIn = useSelector((state) => state?.auth?.isLoggedIn);
  return (
    <>
      <HomeLayout>
        <div className=" pt-20 text-white flex items-center justify-center gap-10 mx-16 h-[90vh]">
          <div className=" w-1/2 space-y-6">
            <h1 className="text-5xl font-semibold">
              Find out Best{" "}
              <span className="font-bold text-yellow-600">Online Courses</span>
            </h1>
            <p className="text-xl text-gray-200">
              We have a large library of courses taught by highly skilled and
              quilified faculties at effortable price.
            </p>

            <div className=" space-x-6">
              <Link to="/courses">
                <button className="bg-yellow-500 px-5 py-3 rounded-md font-semibold text-lg cursor-pointer hover:bg-yellow-700 transition-all ease-in-out duration-300">
                  Explore Courses
                </button>
              </Link>

              <Link to="/contact">
                <button className="border border-yellow-500 px-5 py-3 rounded-md font-semibold text-lg cursor-pointer hover:bg-yellow-700 transition-all ease-in-out duration-300">
                  Contact Us
                </button>
              </Link>
            </div>
          </div>
          <div className="w-1/2 flex items-center justify-center">
            <img
              className="border-0 rounded-3xl"
              src={HomePageImage}
              alt="homepage image"
            />
          </div>
        </div>
      </HomeLayout>
    </>
  );
}
export default HomePage;
