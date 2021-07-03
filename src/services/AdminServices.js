import { ApiGetService, ApiPostService } from './ApiServices';

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
let SubcategoryObject = {};
let Offerarray = [];

// async function getAllData() {
//   await getAllCategory();
//   await getAllSupplier();
//   await getAllProduct();
// }

export async function getAllCategory() {
  let res = await ApiGetService('allCategory');
  if (res) {
    Catagoryarray = res;
    // console.log(Catagoryarray);
  } else console.log('error');
}

export async function getAllSupplier() {
  let res = await ApiGetService('supplier');
  if (res) {
    Supplierarray = res;
    console.log(res);
  } else console.log('error');
}
async function CategoryData() {
  // console.log(Catagoryarray);
  if (Catagoryarray.length === 0) {
    await getAllCategory();
  }
  return Catagoryarray;
}
async function SupplierData() {
  if (Supplierarray.length === 0) {
    await getAllSupplier();
  }
  return Supplierarray;
}
export async function getAllOffers() {
  let res = await ApiGetService('offerList');
  if (res === null || res === false) {
    alert('error occured');
  } else {
    Offerarray = res;
  }
}
export async function OfferData() {
  if (Offerarray.length === 0) {
    await getAllOffers();
  }

  return Offerarray;
}
export async function getAllSubCategory(category) {
  let data = { category };
  let res = await ApiPostService('subCategoryAll', data);
  if (res === null) {
    alert('some error occured');
  }
  if (res === false) {
    alert('server responding error');
  }
  if (res.length > 0) {
    // if (
    //   !SubcategoryObject[category] ||
    //   SubcategoryObject[category].length === 0 ||
    //   SubcategoryObject[category] === undefined
    // ) {
    //   let tempData = [];
    //   for (let i in res) {
    //     tempData.push(res[i]);
    //   }
    //   SubcategoryObject[category] = tempData;
    // }
    SubcategoryObject[category] = res;
  }
}
function getSubCategoryDetail(category) {
  return SubcategoryObject[category];
}

export async function getAllProduct() {}
export { CategoryData, SupplierData, getSubCategoryDetail };
