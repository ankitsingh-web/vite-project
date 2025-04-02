import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInstance from "../../Helpers/axiosinstance";
import toast from "react-hot-toast";
const initialState = {
  courseData: [],
};

export const getAllCourses = createAsyncThunk("/course/get", async () => {
  try {
    const response = axiosInstance.get("/course");

    // Wrap the promise with toast.promise
    const res = await toast.promise(response, {
      loading: "loading course data ...",
      success: "courses loaded successfully",
      error: "failed to get courses",
    });

    return res.data.courses;
  } catch (error) {
    toast.error(error?.response?.data?.message);
    throw error; // Re-throw the error to be handled by the createAsyncThunk rejection handler
  }
});

export const updateCourse = createAsyncThunk("/course/update", async (data) => {
  try {
    // creating the form data from user data
    const formData = new FormData();
    formData.append("title", data.title);
    formData.append("category", data.category);
    formData.append("createdBy", data.createdBy);
    formData.append("description", data.description);
    // backend is not allowing change of thumbnail
    // if (data.thumbnail) {
    //   formData.append("thumbnail", data.thumbnail);
    // }

    const res = axiosInstance.put(`/course/${data.id}`, {
      title: data.title,
      category: data.category,
      createdBy: data.createdBy,
      description: data.description,
    });

    toast.promise(res, {
      loading: "Updating the course...",
      success: "Course updated successfully",
      error: "Failed to update course",
    });

    const response = await res;
    return response.data;
  } catch (error) {
    console.log(error);
    toast.error(error?.response?.data?.message);
  }
});

// function to delete the course
export const deleteCourse = createAsyncThunk("/course/delete", async (id) => {
  try {
    const res = axiosInstance.delete(`course/${id}`);

    toast.promise(res, {
      loading: "Deleting the course...",
      success: "Courses deleted successfully",
      error: "Failed to delete course",
    });

    const response = await res;

    return response.data;
  } catch (error) {
    toast.error(error?.response?.data?.message);
  }
});

export const createNewCourse = createAsyncThunk(
  "/course/create",
  async (data) => {
    try {
      let formData = new FormData();
      formData.append("title", data?.tittle);
      formData.append("description", data?.description);
      formData.append("category", data?.category);
      formData.append("createdBy", data?.createdBy);
      formData.append("thumbnail", data?.thumbnail);
      const response = axiosInstance.post("/course", formData);
      toast.promise(response, {
        loading: "Creating new course",
        success: "Course created successfully",
        error: "Failed to crate course",
      });
      return (await response).data;
    } catch (error) {
      toast.error(error?.data?.message);
    }
  },
);

const courseSlice = createSlice({
  name: "course",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getAllCourses.fulfilled, (state, action) => {
      if (action.payload) {
        state.courseData = [...action.payload];
      }
    });
  },
});
export default courseSlice.reducer;
