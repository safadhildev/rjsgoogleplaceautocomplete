const API_URL = process.env.REACT_APP_API_URL;
const API_KEY = process.env.REACT_APP_API_KEY;

export default class DataService {
  static DOMAIN = `${API_URL}?key=${API_KEY}`;

  static async getData(url, data) {
    try {
      //   const headers = {
      //     Authorization: `Bearer ${await AuthService.getAccessToken()}`,
      //     'x-api-key': `${API_KEY}`,
      //   };
      const _url = this.DOMAIN + url;
      if (data) {
        return fetch(_url, {
          method: "GET",
          body: JSON.stringify(data),
          //   headers,
        });
      }
      return fetch(_url, {
        method: "GET",
        // headers,
      });
    } catch (e) {
      return console.log("get data error", e);
    }
  }
}
