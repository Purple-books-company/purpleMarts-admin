import { useState } from 'react';
import { useEffect } from 'react';
import { AiFillDelete, AiFillInfoCircle } from 'react-icons/ai';
import { Link } from 'react-router-dom';
import { ApiPostService } from '../../services/ApiServices';
import {
  Card,
  CenterAlign,
  Container,
  ContainerColumn,
  ContainerRow,
  Imageview,
  NavLink,
} from '../../styles/styled';

function ProductView() {
  const [productDetail, setProductDetail] = useState([]);
  useEffect(() => {
    getDetail();
  }, []);
  async function getDetail() {
    let res = await ApiPostService('allProducts', null);

    if (res && res.length > 0) setProductDetail(res);
    else {
      alert(res);
    }
  }

  return (
    <>
      {productDetail.map((value, index) => (
        <ContainerColumn height='45%' className='col-md-3'>
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
              colors:{value.varients.size.length}
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
                  className='btn btn-info form-control'
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
    </>
  );
}

export default ProductView;
