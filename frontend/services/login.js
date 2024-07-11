import axios from "axios";

const baseLoginUrl = `/login`;
const baseRegisterUrl = `/register`;

const login = async (credentials) => {
  console.log("Sending login request with credentials:", credentials);
  const response = await axios.post(baseLoginUrl, credentials);
  return response.data;
};

const register = async (credentials) => {
  console.log("Sending register request with credentials:", credentials);
  const response = await axios.post(baseRegisterUrl, credentials);
  return response.data;
};

export default { login, register };
