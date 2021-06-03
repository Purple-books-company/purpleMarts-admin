import CardTest from '../components/CardTest';
import {
  Heading,
  Card,
  Container,
  ContainerRow,
  ContainerColumn,
} from '../styles/styled';
function AdminHome() {
  return (
    <Container>
      <ContainerRow>
        <ContainerColumn className='col-md-6'>
          <Card deg='45'>Hello</Card>
        </ContainerColumn>
        <ContainerColumn className='col-md-6'>
          <ContainerRow half>
            <ContainerColumn className='col-md-6'>
              <Card deg='-45'>Hello</Card>
             
            </ContainerColumn>
            <ContainerColumn className='col-md-6'>
              <Card deg='-65'>Hello</Card>
            </ContainerColumn>
          </ContainerRow>

          <ContainerRow half>
            <ContainerColumn className='col-md-6'>
              <Card deg='55'>Hello</Card>
            </ContainerColumn>
            <ContainerColumn className='col-md-6'>
              <Card deg='100'>Hello</Card>
            </ContainerColumn>
          </ContainerRow>
        </ContainerColumn>
      </ContainerRow>
      <br />

      <ContainerRow>
        <ContainerColumn className='col-md-12'>
          <Card deg='-33'>Hello</Card>
        </ContainerColumn>
      </ContainerRow>
      <br />

      <ContainerRow>
        <ContainerColumn className='col-md-4'>
          <Card deg='-70'>Hello</Card>
        </ContainerColumn>
        <ContainerColumn className='col-md-4'>
          <Card deg='-45'>Hello</Card>
        </ContainerColumn>
        <ContainerColumn className='col-md-4'>
          <Card deg='40'>Hello</Card>
        </ContainerColumn>
      </ContainerRow>
    </Container>
  );
}
export default AdminHome;
