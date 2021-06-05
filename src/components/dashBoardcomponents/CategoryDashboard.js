import { FaCubes } from 'react-icons/fa';
import {
  Card,
  Container,
  ContainerColumn,
  ContainerRow,
  LeftAlign,
  Title,
} from '../../styles/styled';
function CategoryDashboard({ Number }) {
  return (
    <Card deg='-29'>
      <ContainerRow full>
        <ContainerColumn height='100%' className='col-8'>
          <p style={{ marginTop: '10%' }}>
            catagories available:<b>{Number}</b>
            <br />
          </p>
        </ContainerColumn>
        <ContainerColumn height='100%' className='col-4'>
          <FaCubes style={{ width: '80%', height: '60%', margin: '10%' }} />
        </ContainerColumn>
      </ContainerRow>
    </Card>
  );
}
export default CategoryDashboard;
