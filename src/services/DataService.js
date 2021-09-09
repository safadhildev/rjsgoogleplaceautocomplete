/* eslint-disable no-undef */
import axios from "axios";
const AUTOCOMPLETE_URL = process.env.REACT_APP_API_AUTOCOMPLETE_URL;
const GEOCODE_URL = process.env.REACT_APP_API_GEOCODE_URL;
const PLACE_URL = process.env.REACT_APP_API_PLACE_URL;
const API_KEY = process.env.REACT_APP_API_KEY;

export default class DataService {
  static async getPredictions(search) {
    try {
      axios.defaults.headers.common["X-Requested-with"] = "XMLHttpRequest";
      return axios.get(
        `https://cors-anywhere.herokuapp.com/${AUTOCOMPLETE_URL}?key=${API_KEY}`,
        {
          params: {
            input: search,
          },
        }
      );
    } catch (e) {
      return console.log("get places error", e);
    }
  }

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
