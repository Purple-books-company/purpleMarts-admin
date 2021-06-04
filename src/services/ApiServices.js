import axios from 'axios';

async function ApiServices() {
  axios
    .get('http://purplemart.pythonanywhere.com/api/category/all/', {
      headers: {
        Authorization: 'Token 4f2e899d0f4d1096c8e415a8326e6cdc98a5787c',
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
