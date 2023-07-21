import axios from "axios";
import { settings } from "../helpers/settings";

const API_URL = settings.apiURL;

// get getUser
export const getStudents = () => {
  return axios.get(`${API_URL}/users`);
};

export const getAllUserByPage = (
  limit = 100,
  skip = 0,
  select = "id,image,firstName,lastName,email,phone,domain,company"
) => {
  return axios.get(
    `${API_URL}/users?limit=${limit}&skip=${skip}&select=${select}`
  );
};

export const getUserById = (id) => {
  return axios.get(`${API_URL}/users/${id}`);
};

///new student
export const postUser = (newUser) => {
  return axios.post(`${API_URL}/users/add`, newUser);
};

//delete
export const deleteUserById = (id) => {
  return axios.delete(`${API_URL}/users/${id}`);
};

///update
export const updateUserById = (updateUser, id) => {
  return axios.put(`${API_URL}/users/${id}`, updateUser);
};
