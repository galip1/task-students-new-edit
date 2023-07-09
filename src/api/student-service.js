import axios from "axios";
import { settings } from "../helpers/settings";

const API_URL = settings.apiURL;

// get getUser
export const getStudents = () => {
  return axios.get(`${API_URL}/users`);
};

export const newStudent = ({ newStudentValues }) => {
  return axios.post(`${API_URL}/users/add`);
};
