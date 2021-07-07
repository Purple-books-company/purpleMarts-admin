import { useState } from "react";
import { useEffect } from "react";
import { AiFillDelete, AiFillInfoCircle } from "react-icons/ai";

import { Link } from "react-router-dom";
import {
  CategoryData,
  getAllSubCategory,
  getSubCategoryDetail,
  OfferData,
} from "../../services/AdminServices";
import { ApiPostService } from "../../services/ApiServices";
import { ColorOne, ColorTwo } from "../../styles/color";
import {
  Card,
  CenterAlign,
  ContainerColumn,
  Imageview,
  ContainerRow,
  Title,
  // Input,
  // Submitbutton,
} from "../../styles/styled";
import Nodata from "../Nodata";
import SingleProductView from "./SingleProductView";
import Loader from "../Loader";

function ProductView() {
  let initialLoader = { product: false, page: false };
  const [productDetail, setProductDetail] = useState([]);
  const [categoryList, setCategoryList] = useState([]);
  const [subCategoryDetail, setSubCategoryDetail] = useState([]);
  const [loader, setLoader] = useState(initialLoader);
  const [offerList, setOfferList] = useState([]);
  const [offerId, Addtooffer] = useState("");
  const [chooseOffer, setChooseOffer] = useState("");
  const [isListProduct, setIsListProduct] = useState("");

  useEffect(() => {
    getData();
  }, []);

  async function getData() {
    let Loader = { ...initialLoader };
    Loader.page = true;

    setLoader(Loader);
    let offers = await OfferData();
    setOfferList(offers);
    let categoryDetail = await CategoryData();
    console.log(categoryDetail.length);
    setCategoryList(categoryDetail);
    let subCat = await getSubCategoryDetail(categoryDetail[0].name);
    //need to optimize this!!
    if (subCat === undefined || subCat === null) {
      await getAllSubCategory(categoryDetail[0].name);
      subCat = getSubCategoryDetail(categoryDetail[0].name);
    }

    setSubCategoryDetail(subCat);
    setLoader({ ...initialLoader });
    getDetail(subCat[0].name);
  }
  async function handleChange(e) {
    let Loader = { ...initialLoader };
    Loader.product = true;
    setLoader(Loader);

    let subCat = await getSubCategoryDetail(e.target.value);

    setSubCategoryDetail(subCat);
    setLoader({ ...initialLoader });
    getDetail(subCat[0].name);
  }
  async function handleRadio(e) {
    if (e.target.name === "chooseOffer") {
      setChooseOffer(e.target.value);
      return;
    }
    getDetail(e.target.value);
  }
  async function getDetail(cat) {
    let data = {
      subCategory: cat,
      page: 1,
    };
    let res = await ApiPostService("Products", data);

    if (res && res.length > 0) {
      console.log(res);
      setProductDetail(res);
    } else {
      alert("no products found");
    }
  }
  async function handleAddOffer(e) {
    Addtooffer(e.target.value);
    if (chooseOffer === "") {
      alert("no offer chosen");
      Addtooffer("");
      return;
    }
    let data = {
      product: e.target.value,
      offerName: chooseOffer,
    };
    let res = await ApiPostService("offerProduct", data);
    if (res !== true) {
      alert("some error");
    }
    if (res === true) {
      alert("success");
    }
    Addtooffer("");
  }
  // function handleImageClick(index) {
  //   console.log(index);
  //   document.getElementById('changeVarient' + index).innerHTML = `hello`;
  // }

  return (
    <>
      {loader.page ? (
        <Loader />
      ) : (
        <ContainerRow full>
          <ContainerColumn
            className="col-md-2 col-sm-12 fixed-top sticky-top p-2"
            id="productSide-Nav"
            height={window.innerWidth > 500 ? "100%" : "auto"}
            style={{ backgroundColor: ColorTwo }}
          >
            <Link to="/" className="col-md-12 col-3  text-light ">
              BACK TO HOME
            </Link>
            <select
              name="category"
              className="form-control m-2 ml-4 mt-4 "
              style={{
                border: "1px solid " + ColorTwo,

                width: "85%",
              }}
              onChange={handleChange}
            >
              {categoryList.map((value, index) => (
                <option value={value.name} key={value.name}>
                  {value.name}
                </option>
              ))}
            </select>
            <ContainerRow dynamic style={{ margin: "3%", marginLeft: "10%" }}>
              {subCategoryDetail.map((value, index) => (
                <div
                  className="form-check form-switch col-md-12 col-4   mb-3 rounded"
                  style={{ color: ColorOne }}
                  key={index + "check"}
                >
                  <input
                    type="radio"
                    className="form-check-input"
                    name="subcat"
                    value={value.name}
                    onChange={handleRadio}
                    id={"radioInput" + index}
                    checked={
                      productDetail.length > 0 &&
                      productDetail[0].subCategory === value.name
                    }
                  />
                  <label
                    className="form-check-label text-light "
                    htmlFor={"radioInput" + index}
                  >
                    {value.name}
                  </label>
                </div>
              ))}
            </ContainerRow>
            <ContainerRow dynamic className="row ml-1  mb-2 sticky">
              <Title className="col-12">Add to offer</Title>
              <br />
              {offerList.map((value, index) => (
                <ContainerColumn className="col-md-12 col mt-2  text-light">
                  <input
                    type="radio"
                    name="chooseOffer"
                    onClick={handleRadio}
                    value={value.id}
                  />
                  {value.offerName}
                </ContainerColumn>
              ))}
            </ContainerRow>
          </ContainerColumn>
          {loader.product ? (
            <ContainerColumn height="100%" className="col-md-9 col-sm-12">
              <Loader />
            </ContainerColumn>
          ) : (
            <>
              <ContainerColumn
                height="100%"
                className="col-md-9 ml-2 col-sm-12"
              >
                {productDetail.length === 0 && <Nodata />}
                {isListProduct.length > 0 && (
                  <div style={{ textAlign: "center" }}>
                    <SingleProductView id={isListProduct} />
                    <button
                      className="btn btn-danger"
                      onClick={() => setIsListProduct("")}
                    >
                      X CLOSE
                    </button>
                  </div>
                )}

                <ContainerRow dynamic>
                  <button
                    id="myScrollBtn"
                    onClick={() =>
                      window.scrollTo({
                        top: 20,

                        behavior: "smooth",
                      })
                    }
                    title="Go to top"
                  >
                    {" "}
                    top
                  </button>
                  {productDetail.map((value, index) => (
                    <ContainerColumn key={index} className="col-md-3">
                      <Card nohover>
                        <div
                          // onClick={() => handleImageClick(index)}
                          style={{
                            minHeight: "50px",
                            backgroundColor: "white",
                            maxHeight: "50px",
                          }}
                        >
                          <p
                            style={{
                              minHeight: "30px",
                              fontSize: "11px",
                              // fontWeight: 'bold',
                              maxHeight: "50px",
                              backgroundColor: ColorOne,
                              color: "white",
                            }}
                          >
                            {value.name}
                          </p>
                          <br />
                        </div>
                        <ContainerRow dynamic>
                          <ContainerColumn className="col-md-12 col-12 mb-2 ">
                            <div
                              className="col-md-12 col-12"
                              id={"changeVarient" + index}
                            >
                              <Imageview
                                src={value.image}
                                width="90%"
                                height="150px"
                                onClick={() => setIsListProduct(value.id)}
                                style={{ marginTop: "2%", maxHeight: "130px" }}
                                // alternate="no image"
                              />
                            </div>

                            <button
                              class="btn btn-outline-primary mt-4"
                              type="button"
                              value={value.id}
                              onClick={handleAddOffer}
                            >
                              <span
                                className={
                                  offerId === value.id &&
                                  "spinner-border spinner-border-sm"
                                }
                                role="status"
                                aria-hidden="true"
                              ></span>

                              {offerId !== value.id && "Add-to-offer"}
                            </button>

                            <CenterAlign dark>
                              <br />
                              <button
                                className="btn btn-outline-danger mr-2 "
                                value={value.name}
                              >
                                <AiFillDelete size="18" />
                                {"  "}
                                Delete
                              </button>
                              <Link
                                to={{
                                  pathname: "/editproduct",
                                  state: { product: value },
                                }}
                                className="btn purple "
                                name="addImages"
                                value={value}
                              >
                                <AiFillInfoCircle size="18" />
                                Edit
                              </Link>
                              <br />
                            </CenterAlign>
                          </ContainerColumn>
                        </ContainerRow>
                      </Card>
                    </ContainerColumn>
                  ))}
                </ContainerRow>
              </ContainerColumn>
            </>
          )}
        </ContainerRow>
      )}
    </>
  );
}

export default ProductView;
// <p className='collapse' id={'showdata' + index}>
//   <a
//     href={'#showdata' + index}
//     // className="ml-2"
//     className='text-danger'
//     style={{
//       textAlign: 'right',
//       marginLeft: '60%',
//     }}
//     data-toggle='collapse'
//   >
//     X
//   </a>
//   OurPrice:{value.offerPrice}
//   OriginalPrice:{value.originalPrice}
// </p>;
// <a
//   href={'#showdata' + index}
//   // data-bs-toggle='collapse'

//   // aria-controls='collapseExample'
//   // className="ml-2"

//   data-toggle='collapse'
// >
//   <AiFillCaretDown />
// </a>;
