import { useDispatch, useSelector } from "react-redux";
import { getAllCourses } from "../../Redux/Slices.jsx/CourseSlice";
import { useEffect } from "react";
import HomeLayout from "../../Layouts/HomeLayout";
import CourseCard from "../../componenet/CourseCard";

function CourseList() {
  const dispatch = useDispatch();

  async function loadCourses() {
    await dispatch(getAllCourses());
  }
  useEffect(() => {
    loadCourses();
  }, []);
  const { courseData } = useSelector((state) => state.course);
  //console.log(courseData)
  return (
    <>
      <HomeLayout>
        <div className="min-h-[90vh] pt-12 pl-20 flex flex-col flex-wrap gap-10 text-white">
          <h1 className="text-center text-3xl font-semibold">
            Explore the courses made by{" "}
            <span className="font-bold text-yellow-500">Industry Experts</span>
          </h1>
          <div className="mb-10 flex flex-wrap gap-14">
            {courseData?.map((element) => {
              return <CourseCard key={element._id} data={element} />;
            })}
          </div>
        </div>
      </HomeLayout>
    </>
  );
}
export default CourseList;
