import { useNavigate } from "react-router-dom";

function Denied() {
  const navigate = useNavigate();
  return (
    <>
      <main className=" h-screen w-full flex flex-col justify-center items-center bg-[#1A2238]">
        <h1 className="text-9xl font-extrabold text-white tracking-widest">
          403
        </h1>
        <div className="bg-black text-white text-sm rounded rotate-12 absolute">
          Access denied
        </div>
        <button
          onClick={() => {
            navigate(-1);
          }}
          className="text-white mt-5"
        >
          <span className="block relative px-8 py-3 bg-[#1A2238] border border-current rounded-lg transition-all duration-300 ease-in-out">
            {" "}
            Go back
          </span>
        </button>
      </main>
    </>
  );
}
export default Denied;
