import { useState, useEffect } from "react";
import { ApiGetService } from "../../services/ApiServices";
import { ContainerColumn, ContainerRow, Card } from "../../styles/styled";
import Loader from "../Loader";

const SingleProductView = () => {
  const [product, setProduct] = useState(null);
  const [loader, setLoader] = useState(false);
  const [images, setImages] = useState([]);
  const [varient, setVarient] = useState([]);
  const [currentType, setCurrentType] = useState(null);

  useEffect(() => {
    getProduct();
  }, []);

  async function getProduct() {
    setLoader(true);
    let res = await ApiGetService("getSingleProduct");
    console.log(res);
    setProduct(res);
    setImages(res.varients[0].images);
    setVarient(res.varients);
    let tmp = Object.keys(res.type);
    tmp = tmp[0];
    setCurrentType({ key: tmp, value: res.type[tmp][0] });
    setLoader(false);
  }

  return (
    <ContainerColumn height="100%" className="col-md-12">
      {product === null ? (
        <Loader />
      ) : (
        <ContainerRow full>
          <ContainerColumn height="50%" className="col-md-3 mx-3 my-5">
            <div
              id="carouselExampleInterval"
              className="carousel slide w-100"
              data-ride="carousel"
            >
              <div className="carousel-inner">
                {images.map((image, index) => (
                  <div
                    className={`carousel-item ${index === 0 && "active"}`}
                    data-interval="2000"
                  >
                    <img
                      src={image.image}
                      className="d-block w-100"
                      alt="..."
                    />
                  </div>
                ))}
              </div>
              <a
                className="carousel-control-prev"
                href="#carouselExampleInterval"
                role="button"
                data-slide="prev"
              >
                <span
                  className="carousel-control-prev-icon bg-dark"
                  aria-hidden="true"
                ></span>
                <span className="sr-only">Previous</span>
              </a>
              <a
                className="carousel-control-next"
                href="#carouselExampleInterval"
                role="button"
                data-slide="next"
              >
                <span
                  className="carousel-control-next-icon bg-dark"
                  aria-hidden="true"
                ></span>
                <span className="sr-only">Next</span>
              </a>
            </div>
          </ContainerColumn>
          <ContainerColumn className="col-md-6">
            <Card nohover>
              {Object.keys(product.type).map((value, index) => (
                <>{value}</>
              ))}
              {currentType !== null &&
                product.type[currentType.key].map((typeValue, typeIndex) => (
                  // <p>{typeValue}</p>
                  <p>{currentType.value}</p>
                ))}
            </Card>
          </ContainerColumn>
        </ContainerRow>
      )}
    </ContainerColumn>
  );
};

export default SingleProductView;
