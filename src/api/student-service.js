import axios from "axios";
import { settings } from "../helpers/settings";

const API_URL = settings.apiURL;

// get getUser
export const getStudents = () => {
  return axios.get(`${API_URL}/users`);
};

///new student
export const newStudent = ({ newStudentValues }) => {
  return axios.post(`${API_URL}/users/add`, newStudentValues);
};

//delete
export const deleteStudent = (id) => {
  return axios.delete(`${API_URL}/users/${id}`);
};

///update
export const updateStudent = (id, updateSt) => {
  return axios.put(`${API_URL}/users/${id}`, updateSt);
};
