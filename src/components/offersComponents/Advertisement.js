import { useEffect, useState } from "react";
import {
  CategoryData,
  getAllSubCategory,
  getSubCategoryDetail,
} from "../../services/AdminServices";
import {
  ContainerColumn,
  ContainerRow,
  RightAlign,
  Input,
  Submitbutton,
} from "../../styles/styled";
import Loader from "../Loader";
const Advertisement = () => {
  let initialState = {
    image: "",
    type: "Single",
    advType: "Category",
    description: "",
    advId: "",
  };

  const [form, setForm] = useState("category");
  const [categoryDetail, setCategoryDetail] = useState([]);
  const [subCategoryDetail, setSubCategoryDetail] = useState([]);
  const [loader, setLoader] = useState(false);
  const [isCategory, setIsCategory] = useState(true);
  const [detail, setDetail] = useState(initialState);

  useEffect(() => {
    getData();
  }, []);

  async function getData() {
    setLoader(true);
    let data = await CategoryData();
    setCategoryDetail(data);
    if (data.length > 0) getSubData(data[0].name);
    else setLoader(false);
  }

  async function handleCategoryChange(e) {
    getSubData(e.target.value);
    alert(isCategory);
    if (isCategory) {
      setDetail({ ...detail, advType: "Category", advId: e.target.value });
    }
  }

  function handleProductChange(e) {}

  function handleChange(e) {
    if (e.target.name === "Subcategory" && !isCategory) {
      setDetail({ ...detail, [e.target.name]: e.target.value });
    } else if (e.target.name !== "Subcategory") {
      if (e.target.name == "advId" && isCategory) return;
      setDetail({ ...detail, [e.target.name]: e.target.value });
    }
  }

  function handleSubmit(e) {
    e.preventDefault();

    let data = { ...detail };

    if (data.advType === "Category" && data.advId === "") {
      data.advId = categoryDetail[0].name;
    }

    if (data.advType === "SubCategory" && data.advId === "") {
      data.advId = subCategoryDetail[0].name;
    }

    console.log(data);
  }

  function handleRadio(e) {
    alert(e.target.value);
    if (e.target.value === "category" && !isCategory) {
      setDetail({ ...initialState, advType: "Category" });
      setIsCategory(true);
    }

    if (e.target.value === "subCategory" && isCategory) {
      setDetail({ ...initialState, advType: "SubCategory" });
      setIsCategory(false);
    }
  }

  async function getSubData(name) {
    setLoader(true);
    let subCat = getSubCategoryDetail(name);

    if (subCat === undefined || subCat === null) {
      await getAllSubCategory(name);
      subCat = getSubCategoryDetail(name);
    }
    setSubCategoryDetail(subCat);

    setLoader(false);
  }

  function handleClick(e) {
    setForm(e.target.value);
  }

  return (
    <>
      <hr style={{ width: "100%", color: "black", border: "0.5px dotted" }} />
      <ContainerRow dynamic>
        {loader && (
          <ContainerColumn className="col-md-12 mb-2">
            <Loader />
          </ContainerColumn>
        )}
        <ContainerColumn height="10%" className="col-md-6 col">
          <button
            type="radio"
            onClick={handleClick}
            name="chooseOffer"
            value="category"
            className={`btn btn-outline-primary ${
              form === "category" ? "btn-primary text-light" : ""
            }`}
          >
            Category
          </button>
        </ContainerColumn>
        <ContainerColumn height="10%" className="col-md-6 col ">
          <button
            type="radio"
            onClick={handleClick}
            name="chooseOffer"
            value="product"
            className={`btn btn-outline-secondary ${
              form === "product" ? "btn-secondary text-light" : ""
            }`}
          >
            Product
          </button>
        </ContainerColumn>
      </ContainerRow>

      <ContainerRow half>
        {/* <div style={{ display: `${form === "category" ? "" : "none"}` }}> */}
        {form === "category" && (
          <>
            <ContainerColumn className="col-md-6">
              <RightAlign>select Category</RightAlign>
              <select
                onChange={handleCategoryChange}
                name="category"
                className="form-control "
              >
                {categoryDetail.map((value, index) => (
                  <option value={value.name} key={`AdvertisementCat+${index}`}>
                    {value.name}
                  </option>
                ))}
              </select>
            </ContainerColumn>
            <ContainerColumn className="col col-md-6">
              <br />
              <br />
              <input
                type="radio"
                name="category"
                value="category"
                onClick={handleRadio}
              />
              <label className="mr-2" for="category">
                Category
              </label>
              {/* <br /> */}
              <input
                type="radio"
                name="category"
                value="subCategory"
                onClick={handleRadio}
              />
              <label for="subCategory">Sub-Category</label>
            </ContainerColumn>
            <ContainerColumn className="col-md-6 mt-2">
              <RightAlign>Select Sub-Category</RightAlign>
              <select
                name="advId"
                className="form-control"
                style={{ width: "100%" }}
                onChange={handleChange}
              >
                {subCategoryDetail.map((value, index) => (
                  <option value={value.name} key={`AdvertisementSub+${index}`}>
                    {value.name}
                  </option>
                ))}
              </select>
            </ContainerColumn>
            {/* </div> */}
          </>
        )}
        {/* <div style={{ display: `${form === "category" ? "none" : ""}` }}> */}
        {form === "product" && (
          <ContainerColumn className="col-md-6">
            <RightAlign>Select Product Id</RightAlign>
            <Input
              type="text"
              onChange={handleChange}
              placeholder="Product Id"
              name="advId"
              value={detail.advId}
              required
            />
          </ContainerColumn>
        )}
        {/* {isUpdate && (
                <button
                  className="btn btn-outline-danger mt-3"
                  style={{ height: "3%" }}
                  onClick={handleCancel}
                >
                  Cancel
                </button>
              )} */}
        {/* </div> */}

        <ContainerColumn className="col-md-6">
          <RightAlign>Description</RightAlign>
          <Input
            type="text"
            onChange={handleChange}
            placeholder="Description"
            name="description"
            value={detail.description}
            required
          />
        </ContainerColumn>

        <ContainerColumn className="col-md-6">
          <RightAlign>Select type</RightAlign>
          <select name="type" onChange={handleChange} className="form-control">
            <option value="Single">Single</option>
            <option value="Multiple">Multiple</option>
          </select>
        </ContainerColumn>

        <ContainerColumn className="col-md-6">
          <RightAlign>Image Url</RightAlign>
          <Input
            type="text"
            onChange={handleChange}
            name="image"
            value={detail.image}
            placeholder="image Url"
            required
          />
        </ContainerColumn>

        <Submitbutton type="submit" onClick={handleSubmit}>
          Post
        </Submitbutton>
      </ContainerRow>
    </>
  );
};

export default Advertisement;
