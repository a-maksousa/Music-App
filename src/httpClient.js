import axios from "axios";
class httpClient {
  get(url, params) {
    const axiosInstance = this.getInstance();
    return axiosInstance
      .get(url, { params })
      .then((resp) => {
        return resp;
      })
      .catch((resp) => {
        return Promise.reject(resp);
      });
  }

  getInstance = () => {
    const instance = axios.create({
      baseURL: process.env.REACT_APP_API_BASE_URL,
      headers: { "x-happi-key": `${process.env.REACT_APP_API_KEY}` },
    });
    return instance;
  };
}
const instance = new httpClient();
export default instance;
