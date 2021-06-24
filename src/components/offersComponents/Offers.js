import {
  ContainerColumn,
  Input,
  Formlable,
  Title,
  Imageview,
  ContainerRow,
  Submitbutton,
  LeftAlign,
} from "../../styles/styled";
const Offers = () => {
  return (
    <>
      <Title>OFFER PAGE</Title>

      <ContainerRow dynamic>
        <ContainerColumn className="col-md-6" height="10%">
          <Formlable>Offer Name</Formlable>
          <Input type="text" name="offer" />
          <Submitbutton>POST</Submitbutton>
        </ContainerColumn>

        <ContainerColumn className="col-md-6" height="10%">
          <LeftAlign>Choose Offer to delete</LeftAlign>
          <select className="form-control mb-2">
            <option>hell</option>
          </select>

          <button className="btn btn-danger">delete</button>
        </ContainerColumn>
      </ContainerRow>
    </>
  );
};

export default Offers;
