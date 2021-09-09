import axios from "axios";
const AUTOCOMPLETE_URL = process.env.REACT_APP_API_AUTOCOMPLETE_URL;
const API_KEY = process.env.REACT_APP_API_KEY;

export default class DataService {
  static DOMAIN = `${AUTOCOMPLETE_URL}?key=${API_KEY}`;

  static async getPlaces(search) {
    try {
      return axios({
        method: "get",
        url: `${this.DOMAIN}&input=${search}`,
        headers: {
          "Content-Type": "applicatino/json",
        },
      });
    } catch (e) {
      return console.log("get places error", e);
    }
  }
}
