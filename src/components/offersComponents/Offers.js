import { useEffect, useState } from "react";
import { ApiPostService,ApiGetService, ApiDeleteService } from "../../services/ApiServices";
import Loader from "../Loader";
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
function Offers(){

const[offerName,setOffer] =useState("");
const [deleteOffer ,setDelete] =useState("");
const[offerData,setOfferData]=useState([]);
const [loader,setLoader]=useState(false);
useEffect(()=>{
  getOffers();

},[])
async function getOffers(){
   setLoader(true);
   let res = await ApiGetService("offerList");
  if (res === null || res === false) alert("Error occured");
    else {
      if (res.length > 0) {
        setOfferData(res);
        setDelete(res[0].id);
      } else {
        setOfferData([]);
      }
    }


    setLoader(false);
   
}
async function handleSubmit(e){
e.preventDefault();
setLoader(true);
let res = await ApiPostService("offerList",{offerName});
  if (res === null) {
      alert("Error occured");
    } else if (res === true) {
      alert("success");
     setOffer("");
     getOffers();
    } else {
      alert("Improper details");
    }

    setLoader(false);

  
}
async function handleDelete(){
  if(!window.confirm("are you sure to delete")){
    return;
  }
  setLoader(true);
  let res = await ApiDeleteService("offerList",deleteOffer);
   if (res === null) {
      alert("Error occured");
    } else if (res === true) {
      alert("success");
      getOffers();
    } else {
      alert("Improper details");
    }

    setLoader(false);
  
}

  return (
    <>
    {loader?<Loader />:<>
      <Title>OFFER PAGE</Title>

      <ContainerRow dynamic>
        <ContainerColumn className="col-md-6" height="10%">
          <Formlable>Offer Name</Formlable>
          <Input type="text" name="offer" value={offerName} onChange={(e)=>setOffer(e.target.value)} />
          <Submitbutton  onClick={handleSubmit}>POST</Submitbutton>
        </ContainerColumn>

        <ContainerColumn className="col-md-6" height="10%">
          <LeftAlign>Choose Offer to delete</LeftAlign>
          <select className="form-control mb-2" onChange={(e)=>setDelete(e.target.value)}>
          {offerData.map((value,index)=><option value={value.id} key={index}>{value.offerName}</option>)}
          </select>

          <button className="btn btn-danger mb-2" onClick={handleDelete}>delete</button>
        </ContainerColumn>
        {/* <table class="table">
          <tr>
 <th scope="col">offername</th>
           <th scope="col">Delete?</th>
          </tr>
          {offerData.map((value,index)=>
          <tr key={index}>
            <td>{value.offerName}</td>
            <td><button className="btn btn-outline-danger">delete</button></td>
          </tr>)}
         
        </table> */}
      </ContainerRow>
      </>
    }
    </>
  );
};

export default Offers;
