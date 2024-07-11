import axios from "axios";
const baseUrl = "/api/users";

const getAll = async () => {
  const response = await axios.get(baseUrl);
  return response.data;
};
const getAllUserFragrances = async (userId) => {
  const response = await axios.get(`${baseUrl}/${userId}/fragrances`);
  return response.data;
};

export default { getAll, getAllUserFragrances };
