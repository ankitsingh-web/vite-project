import { useNavigate } from "react-router-dom";

function NotFound() {
  const navigate = useNavigate();
  return (
    <>
      <div className="w-full h-screen flex flex-col justify-center items-center bg-[#1A2238]">
        <h1 className="text-9xl font-extrabold text-white tracking-widest">
          404
        </h1>
        <div className="bg-black text-white px-2 text-sm rotate-12 absolute">
          Page Not Found
        </div>

        <button className="mt-5 relative inline-block font-medium text-[#FF6A3D] group active:text-yellow-500 focus:outline-none focus:ring">
          <span
            onClick={() => navigate(-1)}
            className="relative px-8 py-3 block border border-current bg-[#1A2238] rounded-lg"
          >
            Go back
          </span>
          {/* </a> */}
        </button>
      </div>
    </>
  );
}
export default NotFound;
