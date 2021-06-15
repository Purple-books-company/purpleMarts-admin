import { useState } from 'react';
import { useEffect } from 'react';
import { AiFillDelete, AiFillInfoCircle } from 'react-icons/ai';
import { Link } from 'react-router-dom';
import { ApiPostService } from '../../services/ApiServices';
import {
  Card,
  CenterAlign,
  ContainerColumn,
  Imageview,
  ContainerRow,
} from '../../styles/styled';
import Nodata from '../Nodata';

function ProductView() {
  const [productDetail, setProductDetail] = useState([]);
  useEffect(() => {
    getDetail();
  }, []);
  async function getDetail() {
    let res = await ApiPostService('allProducts', null);

    if (res && res.length > 0) {
      console.log(res);
      setProductDetail(res);
    } else {
      alert("no products found");
    }
  }

  return (
    <>
      <ContainerRow full>
        {productDetail.length==0 && <Nodata />}
        {productDetail.map((value, index) => (
          <ContainerColumn height='45%' key={index} className='col-md-3'>
            <Card deg='65' single>
              <Imageview
                src={value.images[0].image}
                width='50%'
                style={{ marginTop: '2%' }}
                // alternate="no image"
              />
              <CenterAlign dark>
                <b>{value.name}</b>
                <br />
                sizes:{value.varients.size.length}
                <br />
                colors:{value.varients.color.length}
                <div
                  className='input-group mb-2 mr-sm-2'
                  style={{
                    maxWidth: '80%',
                    marginLeft: '10%',
                    textAlign: 'center',
                  }}
                >
                  <button
                    className='btn btn-danger mr-2 form-control'
                    value={value.name}
                  >
                    <AiFillDelete size='18' />
                    {'  '}
                    Delete
                  </button>
                  <Link
                    to={{ pathname: '/editproduct', state: { product: value } }}
                    className='btn purple form-control'
                    name='addImages'
                    value={value}
                  >
                    <AiFillInfoCircle size='18' />
                    {'  '}View
                  </Link>
                </div>
              </CenterAlign>
            </Card>
          </ContainerColumn>
        ))}
      </ContainerRow>
    </>
  );
}

export default ProductView;
