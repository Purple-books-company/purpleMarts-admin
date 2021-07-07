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
  ErrorText,
  SuccessText
  
} from '../../styles/styled';
import {ColorOne} from '../../styles/color'
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
    console.log(tmp);
    if (tmp.length === 0 || tmp[0]==="null") {
     
      if(res.varients.length===0){
        setVarient(res);
      }
      setCurrentVarient(res.varients[0]);
      return;
    }
    tmp = tmp[0];
    let value = res.type[tmp].length > 0 ? res.type[tmp][0] : '';
    setCurrentType({ key: tmp, value:value });
    for (let i = 0; i < res.varients.length; i++) {
      if (
        res.varients[i]['varientType'][0].value === tmp &&(res.typeKey.length === 1 ||
        res.varients[i]['varientType'][1].value === res.type[tmp][0])
      ) {
        setCurrentVarient(res.varients[i]);
      }
    }
  }
  function handleTypeClick(e) {
    window.scrollTo({
  top: 10,

  behavior: 'smooth'
});
    let key;
    let value;
    console.log(e.target.value);
    console.log(product.type[e.target.value])
    if (e.target.id === '0') {
      key = e.target.value;
      value = product.type[e.target.value][0] || '';
      setCurrentType({
        key: key,
        value: value,
      });
      console.log(varient);
    } else {
    
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
        (product.typeKey.length === 1 ||
          varient[i]['varientType'][1].value === value)
      ) {
        setImages(varient[i].images);
        setCurrentVarient(varient[i]);
        console.log(varient[i]);
      }
    }
  }

  return (
    <ContainerColumn height='100%' className='col-md-12'  >
      {product === null || currentVarient === null ? (
        <Loader />
      ) : (
        <ContainerRow full style={{marginTop:"40px"}}>
          <ContainerColumn
            height='40%'
            className='col-md-5 col-sm-12 mb-5  '
          >
            <div
              id='carouselExampleInterval'
              className='carousel slide w-100 p-5 ml-4  '
              data-ride='carousel'
            >
              {' '}
              <CenterAlign style={{ fontWeight: 'bolder', fontSize: '20px' }}>
                {currentType &&currentType.key+" "+currentType.value}
              </CenterAlign>
              <div className='carousel-inner'>
                {images.map((image, index) => (
                  <div
                    className={`carousel-item w-100 ml-6 ${
                      index === 0 && 'active'
                    }`}
                    data-interval='2000'
                  >
                    <img
                      src={image.image}
                      className='d-block w-75'
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
          <ContainerColumn height='65%' className='col-md-7
          '>
            <Card nohover  style={{paddingBottom:"10px"}} >
              <Title style={{backgroundColor:ColorOne,color:"white"}}>{product.name}</Title>

              <table className='table  table-borderless table-sm mt-2 ' style={{ width: '80%' }}>
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

                      {currentVarient.unitInStock===0?<ErrorText>no stock</ErrorText>:<SuccessText>available-{currentVarient.unitInStock}</SuccessText>}
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
                    <td>
                      <LightColor>
                        Our profit
                      </LightColor>
                     {currentVarient.offerPrice-currentVarient.buyingPrice>0?<SuccessText>{currentVarient.offerPrice-currentVarient.buyingPrice}</SuccessText>:<ErrorText>{currentVarient.offerPrice-currentVarient.buyingPrice}</ErrorText>}
                    </td>
                  </tr>
                  </tbody>
                  
                  </table>
                  <Title>VARIENTS</Title>
                  <table class="table table-borderless w-auto mb-5"  style={{minWidth:"30%",width:"auto"}}>
                  
                 
                    <tbody>
                  <tr>
            
                    {currentType && Object.keys(product.type).map((value, index) => {
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
                              value={value}
                            >
                              {value==="null"?"No varients":value}
                            </TypeButton>
                          </td>
                        );
                      }
                    })}
                  </tr>
                  <tr>
                    {currentType !== null &&
                      product.typeKey.length > 1 &&
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
              <button className="btn btn-info">EDIT PRODUCT</button>
            </Card>
          </ContainerColumn>
        </ContainerRow>
      )}
    </ContainerColumn>
  );
};

export default SingleProductView;
