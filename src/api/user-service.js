import axios from "axios";
import { settings } from "../helpers/settings";

const API_URL = settings.apiURL;

// get getUser
export const getUsers = () => {
  return axios.get(`${API_URL}/users`);
};
