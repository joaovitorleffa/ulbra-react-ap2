import axios from "axios";

const api = axios.create({
  baseURL: "https://vinicius.pro.br/daoo/rest/index.php",
});

export default api;
