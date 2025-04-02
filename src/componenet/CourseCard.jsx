import { useNavigate } from "react-router-dom";

function CourseCard({ data }) {
  const navigate = useNavigate();

  return (
    <>
      <div
        onClick={() => navigate("/course/description", { state: { ...data } })}
        className="text-white w-[22rem] h-[430px] shadow-lg rounded-lg cursor-pointer group overflow-hidden bg-zinc-700"
      >
        <div className="overflow-hidden">
          <img
            src={data?.thumbnail?.secure_url}
            alt="Course thumbnail"
            className="h-48 rounded-tl-lg group-hover:scale-[1.2] transition-all duration-200 ease-in-out"
          />
          <div className="p-10 text-white space-y-1">
            <h2 className="text-xl font-bold text-yellow-500 line-clamp-2 ">
              {data?.title}
            </h2>
            <p className="line-clamp-2">{data?.description}</p>
            <p className="font-semibold">
              <span className="text-yellow-500 font-bold">Category :</span>
              {data?.category}
            </p>

            <p className="font-semibold">
              <span className="text-yellow-500 font-bold">Total lectures:</span>
              {data?.numberOfLecture}
            </p>

            <p className="font-semibold">
              <span className="text-yellow-500 font-bold">Instructer :</span>
              {data?.createdBy}
            </p>

            {/* <div
        onClick={}>

        </div> */}
          </div>
        </div>
      </div>
    </>
  );
}
export default CourseCard;
