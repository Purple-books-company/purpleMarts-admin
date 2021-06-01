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
        <ContainerColumn className='col-6'>
          <Card>Hello</Card>
        </ContainerColumn>
        <ContainerColumn className='col-6'>
          <ContainerRow half>
            <ContainerColumn className='col-6'>
              <Card>Hello</Card>
            </ContainerColumn>
            <ContainerColumn className='col-6'>
              <Card>Hello</Card>
            </ContainerColumn>
          </ContainerRow>

          <ContainerRow half>
            <ContainerColumn className='col-6'>
              <Card>Hello</Card>
            </ContainerColumn>
            <ContainerColumn className='col-6'>
              <Card>Hello</Card>
            </ContainerColumn>
          </ContainerRow>
        </ContainerColumn>
      </ContainerRow>
      <br />

      <ContainerRow>
        <ContainerColumn className='col-12'>
          <Card>Hello</Card>
        </ContainerColumn>
      </ContainerRow>
      <br />

      <ContainerRow>
        <ContainerColumn className='col-4'>
          <Card>Hello</Card>
        </ContainerColumn>
        <ContainerColumn className='col-4'>
          <Card>Hello</Card>
        </ContainerColumn>
        <ContainerColumn className='col-4'>
          <Card>Hello</Card>
        </ContainerColumn>
      </ContainerRow>
    </Container>
  );
}
export default AdminHome;
