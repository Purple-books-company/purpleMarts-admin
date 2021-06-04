import axios from 'axios';
import { Token } from '../env';
const API = `http://purplemart.pythonanywhere.com`;
const allCategory = `/api/category/all/`;
const addSupplier = `/api/supplier/add/`;
const addCatagory = `/api/category/add/`;
const allSupplier = `/api/supplier/all/`;

console.log(Token);

async function ApiGetService(method) {
  let url = API;
  if (method == 'allCategory') {
    url = url + allCategory;
  } else {
    url += allSupplier;
  }

  axios
    .get(url, {
      headers: {
        Authorization: Token,
      },
    })
    .then((res) => {
      console.log(res);
    })
    .catch((err) => {
      console.log(err);
    });
}

async function ApiPostService(method, data) {
  let url = API;
  if (method == 'supplierAdd') {
    url += addSupplier;
  } else if (method == 'categoryAdd') {
    url += addCatagory;
  }
  console.log(data);
  try {
    const res = await axios.post(url, data, {
      headers: {
        Authorization: Token,
      },
    });

    console.log(res);
    if (res.data.success) {
      alert(res.data.description);

      return true;
    } else {
      console.log(res.data.err);
      return res.data.err;
    }
  } catch (error) {
    console.log(error);
    return null;
  }
}

export { ApiGetService, ApiPostService };
