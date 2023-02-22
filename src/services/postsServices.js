import axiosClient from "../utils/axiosClient";

export const deletePostItem = async (id) => {
  try {
    const res = await axiosClient.delete(`/students/${id}`);
    return res?.data;
  } catch (error) {
    throw error;
  }
};

export const addPostItem = async (id) => {
  try {
    const res = await axiosClient.post(`/students`, {
      name: "Nguyễn Văn A",
      age: 22,
      gender: "male",
    });
    return res?.data;
  } catch (error) {
    throw error;
  }
};

export const updatePostItem = async (id) => {
  try {
    const res = await axiosClient.patch(`/students/${id}`, {
      name: "Nguyễn Văn A",
      age: 22,
      gender: "male",
    });
    return res?.data;
  } catch (error) {
    throw error;
  }
};

export const getListPosts = async (queryKey) => {
  try {
    const res = await axiosClient.get("/students", {
      params: { _page: queryKey[1], _limit: 3 },
    });
    return res?.data;
  } catch (error) {
    throw error;
  }
};

export const getListPostsInfinite = async (pageParam = 1, age) => {
  const ageObj = age !== "All" ? { age } : {};
  try {
    const res = await axiosClient.get("/students", {
      params: { _page: pageParam, _limit: 3, ...ageObj },
    });
    return res.data;
  } catch (error) {
    throw error;
  }
};
