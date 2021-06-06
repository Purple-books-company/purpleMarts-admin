import { useEffect, useState } from 'react';
import { CategoryData } from '../../services/AdminServices';
import { ColorOne } from '../../styles/color';
import {
  Card,
  CenterAlign,
  Container,
  ContainerColumn,
  ContainerRow,
  Imageview,
  LeftAlign,
} from '../../styles/styled';

function CatagoryView() {
  const [catagoryData, setCatagoryData] = useState([]);

  useEffect(() => {
    setCatagoryData(CategoryData());
  }, []);
  return (
    <Container>
      <ContainerRow full>
        {catagoryData.map((value, index) => (
          <ContainerColumn className='col-md-3' height='50%'>
            <Card deg='40' nohover>
              <Imageview
                src={value.image}
                width='50%'
                style={{ marginTop: '2%' }}
                alt='no image'
              />
              <CenterAlign style={{ color: ColorOne }}>
                {value.name}
                <br />
                <div
                  class='input-group mb-2 mr-sm-2'
                  style={{ maxWidth: '80%', marginLeft: '10%' }}
                >
                  <button
                    className='btn btn-danger form-control'
                    value={value.name}
                  >
                    delete
                  </button>
                  <button
                    className='btn btn-info form-control'
                    name='addImages'
                    value={value.name}
                  >
                    edit
                  </button>
                </div>
              </CenterAlign>
            </Card>
          </ContainerColumn>
        ))}
        ``
      </ContainerRow>
    </Container>
  );
}
export default CatagoryView;
