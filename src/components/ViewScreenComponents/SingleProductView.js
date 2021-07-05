import { useState, useEffect } from "react";
import { ApiGetService } from "../../services/ApiServices";

const SingleProductView = () => {
  useEffect(() => {
    getProduct();
  }, []);

  async function getProduct() {
    let res = await ApiGetService("getSingleProduct");
    console.log(res);
  }

  return (
    <div>
      <h1>Product</h1>
    </div>
  );
};

export default SingleProductView;
