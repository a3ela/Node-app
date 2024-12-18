import axios from "axios";
const baseUrl = "https://node-app-qtky.onrender.com/api/notes";

const getAll = () => {
  const request = axios.get(baseUrl);
  return request.then((Response) => Response.data);
};

const create = (newObject) => {
  const request = axios.post(baseUrl, newObject);
  return request.then((Response) => Response.data);
};

const update = (id, newObject) => {
  const request = axios.put(`${baseUrl}/${id}`, newObject);
  return request.then((Response) => Response.data);
};

export default {
  getAll,
  create,
  update,
};
