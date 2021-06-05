import axios from 'axios';
import { Token } from '../env';
const API = `http://purplemart.pythonanywhere.com`;
const allCategory = `/api/category/all/`;
const addSupplier = `/api/supplier/add/`;
const addCatagory = `/api/category/add/`;
const addProduct =`/api/product/add/`
const allSupplier = `/api/supplier/all/`;

console.log(Token);

async function ApiGetService(method) {
  let url = API;
  if (method == 'allCategory') {
    url = url + allCategory;
  } else {
    url += allSupplier;
  }
  try {
    const res = await axios.get(url, {
      headers: {
        Authorization: Token,
      },
    });
    if (res.data.success) {
      return res.data.data;
    } else {
      return false;
    }
  } catch (err) {
    console.log(err);
    return null;
  }
}

async function ApiPostService(method, data) {
  let url = API;
  if (method == 'supplierAdd') {
    url += addSupplier;
  } else if (method == 'categoryAdd') {
    url += addCatagory;
  }
  else if(method=='productAdd'){
    url+=addProduct;
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
