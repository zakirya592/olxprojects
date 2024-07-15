import axios from "axios";
import {baseUrl} from "./config"

const NewRequest = axios.create({
  baseURL: baseUrl,
});

export default NewRequest;
