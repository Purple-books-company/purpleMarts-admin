import axios from 'axios';
// import { Token } from '../env';
const API = `http://purplemart.pythonanywhere.com`;
const allCategory = `/api/category/all/`;
const addSupplier = `/api/supplier/add/`;
const addCatagory = `/api/category/add/`;
const addProduct = `/api/product/add/`;
const allSupplier = `/api/supplier/all/`;
const Products = `/api/product/admin/subcategory/`;
const addSubCategory = `/api/category/sub/add/`;
const allSubCategory = `/api/category/sub/all/`;

const Token = process.env.REACT_APP_TOKEN;

async function ApiGetService(method) {
  let url = API;
  if (method === 'allCategory') {
    url = url + allCategory;
  } else {
    url += allSupplier;
  }
  console.log('getService');
  try {
    const res = await axios.get(url, {
      headers: {
        Authorization: Token,
      },
    });
    if (res.data.success) {
      console.log(res);
      return res.data.data;
    } else {
      console.log('error');
      console.log(res);
      return false;
    }
  } catch (err) {
    console.log(err);
    return null;
  }
}

async function ApiPostService(method, data) {
  let url = API;
  if (method === 'supplierAdd') {
    url += addSupplier;
  } else if (method === 'categoryAdd') {
    url += addCatagory;
  } else if (method === 'productAdd') {
    url += addProduct;
  } else if (method === 'subCategoryAdd') {
    url += addSubCategory;
  } else if (method === 'subCategoryAll') {
    url += allSubCategory;
  }
  else if(method==="Products"){
    url+=Products;
  }
  console.log(url);
  console.log(data);

  try {
    const res = await axios.post(url, data, {
      headers: {
        Authorization: Token,
      },
    });
    console.log(res);
    if (res.data.success) {
      if (method === 'Products' || method === 'subCategoryAll') {
        return res.data.data;
      }
      return true;
    } else {
      if (method === 'Products' || method === 'subCategoryAll') {
        return false;
      }
      console.log(res.data.err);
      return res.data.err;
    }
  } catch (error) {
    console.log(error);
    return null;
  }
}

export { ApiGetService, ApiPostService };
