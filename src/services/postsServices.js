import axiosClient from "../utils/axiosClient";

export const getListPosts = async (page = 1, limit = 10) => {
  try {
    const res = await axiosClient.get("/posts", {
      params: { _page: page, _limit: limit },
    });
    return res?.data;
  } catch (error) {
    throw error;
  }
};
