import axios from "axios";

async function ApiServices() {
  axios
    .get("http://purplemart.pythonanywhere.com/api/category/all/", {
      headers: {
        Authorization: "xx",
      },
    })
    .then((res) => {
      console.log(res);
    })
    .catch((err) => {
      console.log(err);
    });
}

export default ApiServices;
