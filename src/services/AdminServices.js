import { ApiGetService } from './ApiServices';

export const ExcelSchema = {
  productName: {
    prop: 'productName',
    type: String,
    required: true,
  },
  brandName: {
    prop: 'brandName',
    type: String,
    required: true,
  },
  // 'COURSE' is not a real Excel file column name,
  // it can be any string — it's just for code readability.
  ourPrice: {
    prop: 'ourPrice',
    type: Number,
    required: true,
  },
  originalPrice: {
    prop: 'originalPrice',
    required: true,
    type: Number,
  },
  originalUrl: {
    prop: 'originalUrl',
    type: String,
    required: true,
  },
  imageUrl1: {
    prop: 'imageUrl1',
    type: String,
    required: true,
  },
  imageUrl2: {
    prop: 'imageUrl2',
    type: String,
    required: true,
  },
  imageUrl3: {
    prop: 'imageUrl3',
    type: String,
    required: true,
  },
};

let Catagoryarray = [];
let Supplierarray = [];

// async function getAllData() {
//   await getAllCategory();
//   await getAllSupplier();
//   await getAllProduct();
// }

export async function getAllCategory() {
  let res = await ApiGetService('allCategory');
  if (res) {
    Catagoryarray = res;
    console.log(Catagoryarray);
  } else console.log('error');
}

export async function getAllSupplier() {
  let res = await ApiGetService('allSupplier');
  if (res) {
    Supplierarray = res;
    console.log(res);
  } else console.log('error');
}
function CategoryData() {
  console.log(Catagoryarray);
  return Catagoryarray;
}
function SupplierData() {
  return Supplierarray;
}

export async function getAllProduct() {}
export { CategoryData, SupplierData };
