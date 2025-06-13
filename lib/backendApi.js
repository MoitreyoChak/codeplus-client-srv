import axios from "axios";

const questionApi = axios.create({
  baseURL: process.env.NEXT_PUBLIC_QUESTION_SERVICE_URL || "http://localhost:5001/code/question",
  timeout: 5000,
  headers: {
    "Content-Type": "application/json"
  }
});
const submissionApi = axios.create({
  baseURL: process.env.NEXT_PUBLIC_QUESTION_SERVICE_URL || "http://localhost:5001/code/submission",
  timeout: 5000,
  headers: {
    "Content-Type": "application/json"
  }
});
const userApi = axios.create({
  baseURL: process.env.NEXT_PUBLIC_USER_SERVICE_URL || "http://localhost:5000/user",
  timeout: 5000,
  headers: {
    "Content-Type": "application/json"
  }
});

export { questionApi, submissionApi, userApi };
