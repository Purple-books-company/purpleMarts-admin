import { useState, useEffect } from 'react';
import { ApiGetService } from '../../services/ApiServices';
import {
  ContainerColumn,
  ContainerRow,
  Card,
  ColorButton,
  TypeButton,
  Title,
  CenterAlign,
  LightColor,
} from '../../styles/styled';
import Loader from '../Loader';

const SingleProductView = () => {
  const [product, setProduct] = useState(null);

  const [images, setImages] = useState([]);
  const [varient, setVarient] = useState([]);
  const [currentVarient, setCurrentVarient] = useState(null);
  const [currentType, setCurrentType] = useState(null);

  useEffect(() => {
    getProduct();
  }, []);

  async function getProduct() {
    let res = await ApiGetService('getSingleProduct');
    console.log(res);
    setProduct(res);
    setImages(res.varients[0].images);
    setVarient(res.varients);
    let tmp = Object.keys(res.type);
    tmp = tmp[0];
    setCurrentType({ key: tmp, value: res.type[tmp][0] });
    for (let i = 0; i < res.varients.length; i++) {
      if (
        res.varients[i]['varientType'][0].value === tmp &&
        res.varients[i]['varientType'][1].value === res.type[tmp][0]
      ) {
        setCurrentVarient(res.varients[i]);
      }
    }
  }
  function handleTypeClick(e) {
    let key;
    let value;
    if (e.target.id === '0') {
      key = e.target.value;
      value = product.type[e.target.value][0];
      setCurrentType({
        key: key,
        value: value,
      });
      console.log(varient);
    } else {
      alert();
      key = currentType.key;
      value = e.target.value;
      setCurrentType({
        ...currentType,
        value: value,
      });
    }
    for (let i = 0; i < varient.length; i++) {
      if (
        varient[i]['varientType'][0].value === key &&
        varient[i]['varientType'][1].value === value
      ) {
        setImages(varient[i].images);
        setCurrentVarient(varient[i]);
        console.log(varient[i]);
      }
    }
  }

  return (
    <ContainerColumn height='100%' className='col-md-12'>
      {product === null || currentVarient == null ? (
        <Loader />
      ) : (
        <ContainerRow full>
          <ContainerColumn
            height='40%'
            className='col-md-6 col-sm-12 mx-3 my-5'
          >
            <div
              id='carouselExampleInterval'
              className='carousel slide w-100'
              data-ride='carousel'
            >
              {' '}
              <CenterAlign style={{ fontWeight: 'bolder', fontSize: '20px' }}>
                {currentType.key}-{currentType.value}
              </CenterAlign>
              <div className='carousel-inner'>
                {images.map((image, index) => (
                  <div
                    className={`carousel-item w-75 ${index === 0 && 'active'}`}
                    data-interval='2000'
                  >
                    <img
                      src={image.image}
                      className='d-block w-100 ml-4'
                      alt='...'
                    />
                  </div>
                ))}
              </div>
              <a
                className='carousel-control-prev'
                href='#carouselExampleInterval'
                role='button'
                data-slide='prev'
              >
                <span
                  className='carousel-control-prev-icon bg-dark'
                  aria-hidden='true'
                ></span>
                <span className='sr-only'>Previous</span>
              </a>
              <a
                className='carousel-control-next'
                href='#carouselExampleInterval'
                role='button'
                data-slide='next'
              >
                <span
                  className='carousel-control-next-icon bg-dark'
                  aria-hidden='true'
                ></span>
                <span className='sr-only'>Next</span>
              </a>
            </div>
          </ContainerColumn>
          <ContainerColumn height='75%' className='col-md-5 mt-5'>
            <Card nohover>
              <Title>{product.name}</Title>

              <table className='table  ' style={{ width: '80%' }}>
                <tbody>
                  <tr>
                    {' '}
                    <td>
                      <LightColor>originalPrice:</LightColor>

                      {currentVarient.originalPrice}
                    </td>
                    <td>
                      <LightColor>OfferPrice:</LightColor>

                      {currentVarient.offerPrice}
                    </td>
                    <td>
                      <LightColor>BuyingPrice:</LightColor>

                      {currentVarient.buyingPrice}
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <LightColor>Unit in stock</LightColor>

                      {currentVarient.unitInStock}
                    </td>
                    <td>
                      <LightColor>sub-Category</LightColor>

                      {product.subCategory}
                    </td>
                    <td>
                      <LightColor>unit weight</LightColor>

                      {product.unitWeight}
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <LightColor>supplier</LightColor>

                      {product.supplier}
                    </td>
                    <td>
                      <LightColor>quantity</LightColor>

                      {product.quantityPerUnit}
                    </td>
                  </tr>
                  <tr>
                    {Object.keys(product.type).map((value, index) => {
                      if (
                        product.typeKey.length > 0 &&
                        product.typeKey[0].toLowerCase() === 'colour'
                      )
                        return (
                          <td>
                            <ColorButton
                              id='0'
                              onClick={handleTypeClick}
                              color={value}
                              value={value}
                              active={currentType.key === value}
                            ></ColorButton>
                          </td>
                        );
                      else {
                        return (
                          <td>
                            <TypeButton
                              id='0'
                              onClick={handleTypeClick}
                              active={currentType.key === value}
                            >
                              {value}
                            </TypeButton>
                          </td>
                        );
                      }
                    })}
                  </tr>
                  <tr>
                    {currentType !== null &&
                      product.type[currentType.key].map(
                        (typeValue, typeIndex) => (
                          // <p>{typeValue}</p>
                          <td>
                            <TypeButton
                              id='1'
                              onClick={handleTypeClick}
                              value={typeValue}
                              active={currentType.value === typeValue}
                            >
                              {typeValue}
                            </TypeButton>
                          </td>
                        )
                      )}
                  </tr>
                </tbody>
              </table>
            </Card>
          </ContainerColumn>
        </ContainerRow>
      )}
    </ContainerColumn>
  );
};

export default SingleProductView;
