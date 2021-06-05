import {
  Card,
  Container,
  ContainerColumn,
  ContainerRow,
  MarginText,
  Submitbutton,
  Title,
} from '../../styles/styled';
import { FcAddDatabase } from 'react-icons/fc';
import { FaCubes, FaUsers } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { ColorTwo } from '../../styles/color';

function AssetComponents({ catCount, supCount }) {
  return (
    <Container>
      <Card deg='45'>
        <ContainerRow full>
          <ContainerColumn className='col-3'>
            <MarginText>
              <b>NEW</b>
              <br />
              <Link>
                <FcAddDatabase
                  style={{ width: '50%', height: '20%', marginTop: '15%' }}
                />
              </Link>
            </MarginText>
          </ContainerColumn>
          <ContainerColumn className='col-3'>
            <MarginText>
              <FaCubes style={{ width: '30%', height: '10%' }} />

              <br />
              <h1>{catCount}</h1>

              <Link style={{ textDecoration: 'none', color: ColorTwo }}>
                Show Category
              </Link>
            </MarginText>
          </ContainerColumn>
          <ContainerColumn className='col-3'>
            <MarginText>
              <FaUsers style={{ width: '30%', height: '10%' }} />
              <br />
              <h1>{supCount}</h1>

              <Link style={{ textDecoration: 'none', color: ColorTwo }}>
                Show Suppliers
              </Link>
            </MarginText>
          </ContainerColumn>
          <ContainerColumn className='col-3'>
            <MarginText>hell</MarginText>
          </ContainerColumn>
        </ContainerRow>
      </Card>
    </Container>
  );
}
export default AssetComponents;
