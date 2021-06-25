import { useEffect, useState } from "react";
import { version } from "react-dom";
import {
  CategoryData,
  getAllSubCategory,
  getSubCategoryDetail,
} from "../../services/AdminServices";
import {
  ContainerColumn,

  ContainerRow,

  RightAlign,
} from "../../styles/styled";
import Loader from "../Loader";
const Advertisement = () => {
  const [form, setForm] = useState("singleSub");
  const [categoryDetail, setCategoryDetail] = useState([]);
  const [subCategoryDetail, setSubCategoryDetail] = useState([]);
  const [loader, setLoader] = useState(false);
  const [selectedCat, setSelectedCat] = useState("");
  const [selectedSub, setSelectedSub] = useState([]);
  const [subAdd, setSubAdd] = useState("");

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
    setSelectedCat(e.target.value);
    setSelectedSub([]);
    getSubData(e.target.value);
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
            value="singleSub"
            className={`btn btn-outline-primary ${
              form === "singleSub" ? "btn-primary text-light" : ""
            }`}
          >
            Single Sub-Category
          </button>
        </ContainerColumn>
        <ContainerColumn height="10%" className="col-md-6 col ">
          <button
            type="radio"
            onClick={handleClick}
            name="chooseOffer"
            value="multiple"
            className={`btn btn-outline-secondary ${
              form === "multiple" ? "btn-secondary text-light" : ""
            }`}
          >
            Multiple Sub-Categories
          </button>
        </ContainerColumn>
      </ContainerRow>
      <ContainerRow half>
        <ContainerColumn className="col-md-6 mt-2">
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
        <ContainerColumn className="col-md-6">
          <RightAlign>select Category</RightAlign>
          <form class="form-inline m-2 mt-4">
            <div
              class="form-group"
              style={{ width: form === "singleSub" ? "100%" : "80%" }}
            >
              <select
                name="Subcategory"
                className="form-control"
                style={{ width: "100%" }}
              >
                {subCategoryDetail.map((value, index) => (
                  <option value={value.name} key={`AdvertisementSub+${index}`}>
                    {value.name}
                  </option>
                ))}
              </select>
            </div>
            <div class="form-group" style={{ width: "20%" }}>
              {form === "multiple" && (
                <button className="btn btn-outline-success ml-1">+</button>
              )}
            </div>
          </form>
        </ContainerColumn>
      </ContainerRow>
    </>
  );
};

export default Advertisement;
