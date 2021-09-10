/* eslint-disable no-undef */
import axios from "axios";
const GEOCODE_URL = process.env.REACT_APP_API_GEOCODE_URL;
const API_KEY = process.env.REACT_APP_API_KEY;

export default class DataService {
  static async getLocationById(id) {
    axios.defaults.headers.common["X-Requested-with"] = "XMLHttpRequest";
    try {
      return axios.get(
        `https://cors-anywhere.herokuapp.com/${GEOCODE_URL}?key=${API_KEY}`,
        {
          params: {
            place_id: id,
          },
        }
      );
    } catch (err) {
      return console.log("get place by location :: ", err);
    }
  }
}
