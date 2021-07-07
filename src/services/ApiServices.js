import axios from "axios";
// import { Token } from '../env';
const API = `http://purplemart.pythonanywhere.com`;
const Request = {
  allSupplier: `/api/supplier/all/`,
  supplierAdd: `/api/supplier/add/`,

  allCategory: `/api/category/all/`,
  categoryAdd: `/api/category/add`,

  product: `/api/admin/product/`,
  Products: `/api/product/admin/subcategory/`,

  getSingleProduct: `/api/product/get/893b73d0-ed3f-4ab3-b8fb-e9b5b8c97b21/`,
//bf5e9916-7dd6-434a-aa0f-acc5f06097c3
//a2f08dcf-b369-4bba-9ea4-f2380fd325c6
//c81ad187-72a0-4c84-b887-89e8f2195727
  subCategoryAdd: `/api/category/sub/add/`,
  subCategoryAll: `/api/category/sub/all/`,

  socialMedia: `/api/admin/meta/social/`,
  offerList: `/api/admin/meta/offerlist/`,
  offerProduct: `/api/admin/meta/offerproduct/`,

  advertisement: `/api/admin/meta/advertisement/`,
  category: `/api/admin/product/category/`,
  subCategory: `/api/admin/product/subcategory/`,
  supplierInfo: `/api/admin/user/personal_info/`,
  supplier: `/api/admin/user/supplier/`,
};

const Token = process.env.REACT_APP_TOKEN;

async function ApiGetService(method) {
  let url = API;
  url += Request[method];
  console.log("getService");
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
      console.log("error");
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
  url += Request[method];
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
      if (
        method === "Products" ||
        method === "subCategoryAll" ||
        method === "supplierInfo"
      ) {
        return res.data.data;
      }
      return true;
    } else {
      if (
        method === "Products" ||
        method === "subCategoryAll" ||
        method === "supplierInfo"
      ) {
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

async function ApiPutService(method, key, data) {
  let url = API;
  url += Request[method] + key + "/";
  console.log(url);

  try {
    let res = await axios.put(url, data, {
      headers: {
        Authorization: Token,
      },
    });
    console.log(res);

    if (res.data.success) {
      return true;
    }
    return false;
  } catch (error) {
    return null;
  }
}

async function ApiDeleteService(method, key) {
  let url = API;
  url += Request[method] + key + "/";
  console.log(url);

  try {
    let res = await axios.delete(url, {
      headers: {
        Authorization: Token,
      },
    });
    console.log(res);

    if (res.data.success) {
      return true;
    }
    return false;
  } catch (error) {
    return null;
  }
}

export { ApiGetService, ApiPostService, ApiPutService, ApiDeleteService };

// const allCategory = `/api/category/all/`;
// const addSupplier = `/api/supplier/add/`;
// const addCatagory = `/api/category/add/`;
// const addProduct = `/api/product/add/`;
// const allSupplier = `/api/supplier/all/`;
// const Products = `/api/product/admin/subcategory/`;
// const addSubCategory = `/api/category/sub/add/`;
// const allSubCategory = `/api/category/sub/all/`;
