import axios from "axios";

const baseUrl = "/api/fragrances";

let token = null;

const setToken = (newToken) => {
  token = `Bearer ${newToken}`;
};

const getAll = async () => {
  const response = await axios.get(baseUrl);
  return response.data;
};

const create = async (formData) => {
  const config = {
    headers: {
      Authorization: token,
      "Content-Type": "multipart/form-data",
    },
  };

  const response = await axios.post(`${baseUrl}`, formData, config);
  return response.data;
};

const update = async (id, newObject) => {
  const config = {
    headers: { Authorization: token },
  };

  const response = await axios.put(`${baseUrl}/${id}`, newObject, config);
  return response.data;
};

const like = async (review, user) => {
  const config = {
    headers: { Authorization: token },
  };

  const updatedReview = {
    ...review,
    likes: review.likes + 1,
    user: user.id,
  };

  const response = await axios.put(
    `${baseUrl}/${review.id}`,
    updatedReview,
    config
  );
  return response.data;
};

const remove = async (id) => {
  const config = {
    headers: { Authorization: token },
  };

  const response = await axios.delete(`${baseUrl}/${id}`, config);
  return response.data;
};

const comment = async (fragranceId, reviewId, newObject) => {
  const config = {
    headers: { Authorization: token },
  };

  const response = await axios.post(
    `${baseUrl}/${fragranceId}/reviews/${reviewId}/comments`,
    newObject,
    config
  );
  return response.data;
};
export default { getAll, create, update, remove, setToken, comment, like };
