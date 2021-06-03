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
