import React, { useState, useEffect } from 'react';
import Nav from '../Nav';
import '../../assets/a.css';
import { ColorOne, ColorTwo, ColorThree } from '../../styles/color.js';
import { FaTimes, FaCheck, FaDownload } from "react-icons/fa";
import { AiOutlineHome } from "react-icons/ai";
import { Card, CenterText } from '../../styles/styled';
import ProductEditScreen from '../../screens/ProductEditScreen';
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useParams,
  // Redirect,
} from "react-router-dom";
function SpecificOrder({orders,addUrl}) {

  // const [startDate, setStartDate] = useState(new Date());


  const style = {
    backgroundColor: "purple",
    borderRadius: "25px"
  }
  const progress = {
    backgroundColor: "green"
  }

  const {id} = useParams();

  const [tid, setTid] = useState("");
  const [url, setUrl] = useState("");
  const [date, setDate] = useState("13 July 2021");
  const [dis, setDis] = useState(false);
  const onDispatch = (e) =>{
    e.preventDefault();
    if(!tid || !url){
      alert("Empty fields not allowed");
    }
    else{
      alert('added');
      setDis(true);
    }
  }

  const deliveryDate = (e) =>{
    e.preventDefault();
    if(!date){
      alert("Empty fields not allowed");
    }else{
      alert('added');
    }
  }

  return (

    <>
    
      <Nav />
      <div className="container">
      {orders.filter(order => order.orderId == id).map(filteredOrder => (
        <div className="row">
          <div className="col-1"></div>
          <div className="col-10 mt-5">
            <div className="card text-center" style={{borderRadius:'20px'}}>
              <div className="card-header" style={{ backgroundColor: ColorTwo, color: 'white',borderTopLeftRadius:'20px',borderTopRightRadius:'20px' }}>
                <div className="row">
                  <span className="col-md-3">Order ID -{id}</span>
                  <span className="col-md-3">User ID - {filteredOrder.customerId}</span>
                  <span className="col-md-3">No of products : {filteredOrder.products.length}</span>
                  <Link to={"/invoice/"+filteredOrder.orderId} style={{ color: 'white' }} className="col-md-3"><FaDownload />Invoice</Link>
                </div>
              </div>
              <div className="card-body d-none d-md-block" style={{ backgroundColor: ColorThree }}>
                <table className="table borderless">
                  <thead>
                    <tr>
                      <th scope="col">Product ID</th>
                      <th scope="col">Product Name</th>
                      <th scope="col">Quantity</th>
                      <th scope="col">Product Price</th>
                    </tr>
                  </thead>
                  <tbody style={{ color: ColorOne }}>
                    {filteredOrder.products.map((product) =>{

                    return(
                    <tr>
                      <td scope="row">{product.productId}</td>
                      <td>{product.productName}</td>
                      <td>{product.quantity}</td>
                      <td>{product.buyingPrice*product.quantity}</td>
                    </tr>
                    )
                    })}
                    {/* <tr>
                      <td scope="row">211111111111111</td>
                      <td>Jacob</td>
                      <td>Thornton</td>
                      <td>@fat</td>
                    </tr>
                    <tr>
                      <td scope="row">657875676566553</td>
                      <td>Larry</td>
                      <td>the Bird</td>
                      <td>@twitter</td>
                    </tr> */}
                  </tbody>
                </table>
                <hr />
                {/* const data = [
    {title : "One",prix:100},
    {title : "Two",prix:200},
    {title : "Three",prix:300}
  ]
  const total = filteredOrder.products.
  console.log((data.reduce((a,v) =>  a = a + v.prix , 0 ))) */}
                <span style={{ fontSize: 'large' }}>Delivery Charge Rs. 60</span><br />
                <span style={{ fontSize: 'large' }}>Total Rs. {filteredOrder.products.reduce((a,v) => a = a+(v.buyingPrice)*(v.quantity) , 0)+60}</span>

              </div>

              {/* For Mobile View */}
              <div className="card-body d-block d-md-none" style={{ backgroundColor: ColorThree }}>
                <div className="col">
                  <h6 className="font-weight-bold">Product ID</h6>
                  <h6 className="font-weight-bold">Product Name</h6>
                  <h6 className="font-weight-bold">Product price</h6>
                  <hr />
                  {filteredOrder.products.map((product) =>{

return(
  <>
                  <p>{product.productId}</p>
                  <p>{product.productName}</p>
                  <p>{product.buyingPrice}</p>
                  <hr />
                  </>
)
                  })}
                  

                </div>
                      {/* <h5 className="card-title">Name - Reahaan</h5>
                    <p className="card-text">Order Amount Rs.3000</p>
                    <p className="card-text">Order Date 08-07-2021 </p>
                    <a href="#" className="btn btn-primary btn-block">Show More</a> */}
                <span style={{ fontSize: 'large' }}>Delivery Charge Rs. 60</span><br />
                <span style={{ fontSize: 'large' }}>Total Rs. {filteredOrder.products.reduce((a,v) => a = a+(v.buyingPrice)*(v.quantity) , 0)+60}</span>

              </div>
              <div style={{ color: ColorOne, fontSize: 'medium', backgroundColor: ColorThree }}>
                <hr />
                {filteredOrder.address.map((address) =>{

return(
  <>
                <div className="row">
                  <div className="col text-dark font-weight-bold">
                    <label htmlFor="name">Name</label>
                  </div>
                  <div className="col">
                    <p>{filteredOrder.customerName}</p>
                  </div>
                </div>
                <div className="row">
                  <div className="col text-dark font-weight-bold">
                    <label htmlFor="street">street</label>
                  </div>
                  <div className="col">
                    <p>{address.street}</p>
                  </div>
                </div>
                <div className="row">
                  <div className="col text-dark font-weight-bold">
                    <label htmlFor="city">city</label>
                  </div>
                  <div className="col">
                    <p>{address.city}</p>
                  </div>
                </div>
                <div className="row">
                  <div className="col text-dark font-weight-bold">
                    <label htmlFor="state">state</label>
                  </div>
                  <div className="col">
                    <p>{address.state}</p>
                  </div>
                </div>

                <div className="row">
                  <div className="col text-dark font-weight-bold">
                    <label htmlFor="Mobile">mobile</label>
                  </div>
                  <div className="col">
                    <p>{address.mobile}</p>
                  </div>
                </div>
                <div className="row">
                  <div className="col text-dark font-weight-bold">
                    <label htmlFor="order">Order Date and time</label>
                  </div>
                  <div className="col">
                    <p>01 July 2022 09:21 AM</p>
                  </div>
                </div>
                <div className="row">
                  <div className="col text-dark font-weight-bold">
                    <label htmlFor="date">estimate delivery</label>
                  </div>
                  <div className="col">

                    <p>{date}</p>
                    {/* <DatePicker selected={startDate} onChange={(date) => setStartDate(date)} /> */}
                    <button  data-toggle="modal" data-target="#exampleModal2" style={{ backgroundColor: ColorTwo,borderRadius:"20px" }}>Change Date</button>

                  </div>
                  {/* Delivery Date update Modal */}
                  <div className="modal fade" id="exampleModal2" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
              <div className="modal-dialog" role="document">
                <div className="modal-content">
                  <div className="modal-header">
                    <h5 className="modal-title" id="exampleModalLabel2">Change Delivery Date</h5>
                    <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                      <span aria-hidden="true">&times;</span>
                    </button>
                  </div>
                  {/* Delivery Date Update form*/}
                  <div className="modal-body">
                    <form onSubmit={deliveryDate}>
                    <input type="date" className="form-control" name="" value={date} onChange={(e)=>setDate(e.target.value)} id="" placeholder="Change Date" /><br/>
                    <input type="submit" name="" id="" className="float-right" style={{ backgroundColor: ColorOne,color:"white" }}/>
                    </form>
                  </div>
                  
                </div>
              </div>
            </div>
                </div>
                </>
                )
      })}
              </div>


              <div className="card-footer text-muted" >
                <p style={{ color: ColorOne, fontSize: 'large' }}>COD:< FaTimes size="25" color='red' /></p>
                <p className="text-center">Tracking ID</p>
                <p className="text-center"><strong style={{ color: ColorOne }}>{tid}</strong></p>
                <p className="text-center">Tracking URL</p>
                <center><a href={url} className="text-center pb-5" style={{ color: ColorOne, float: CenterText }}>{url}</a></center>
              </div>
            </div>
          </div>
          <div className="col-1"></div>
          <div className="row d-flex justify-content-center col-12 mb-0">
            <div className="col-12">
              <ul id="progressbar" className="text-center">

                {/* If Ordered */}
{!dis?<>
                <li className="active step0"></li>
                      <li className="step0"></li>
                       <li className="step0"></li> 

                       </>
                       
                :
                <>
                <li className="active step0"></li>
                <li className="active step0"></li>
                <li className="step0"></li>
                </>
               
}
                {/* If delivered */}
                {/* <li className="active step0"></li>
                <li className="active step0"></li>
                <li className="active step0"></li> */}
              </ul>
            </div>
          </div>

          <div className="row justify-content-between tops my-0 col-md-12">



            <div className="row d-flex ml-4 text-center align-center" >
              <a>
                <img className="icon" src="https://i.imgur.com/u1AzR7w.png" />
                <div className="d-flex">
                  <p className="font-weight-bold">Order<br />Status</p>
                </div>
              </a>
            </div>
            <div className="row d-flex ml-3">
              <a href="#" data-toggle="modal" data-target="#exampleModal" style={{ color: ColorOne }}>
                <img className="icon" src="https://i.imgur.com/TkPm63y.png" />
                <div className="d-flex">
                  <p className="font-weight-bold">Order<br />Dispatch</p>
                </div>
              </a>
            </div>
            {/* Dispatch Modal */}
            <div className="modal fade" id="exampleModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
              <div className="modal-dialog" role="document">
                <div className="modal-content">
                  <div className="modal-header">
                    <h5 className="modal-title" id="exampleModalLabel">Dispatch</h5>
                    <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                      <span aria-hidden="true">&times;</span>
                    </button>
                  </div>
                  {/* If Dispatch update*/}
                  <div className="modal-body">
                    <form onSubmit={onDispatch}>
                    <input type="text" className="form-control" name="" value={tid} onChange={(e)=>setTid(e.target.value)} id="" placeholder="Tracking ID" /><br/>
                    <input type="text" className="form-control" name="" id="" value={url} onChange={(e)=>setUrl(e.target.value)} placeholder="Tracking URL" /><br/>
                    <input type="text" className="form-control" name="" id="" placeholder="Notification Title" /><br/>
                    <input type="text" className="form-control" name="" id="" placeholder="Notification Description" /><br/>
                    {/* <label htmlFor="">Dispatched&nbsp;&nbsp;<input type="checkbox"  name="" id="" /></label><br /> */}
                    <input type="submit" name="" id="" className="float-right" style={{ backgroundColor: ColorOne,color:"white" }}/>
                    </form>
                  </div>
                </div>
              </div>
            </div>
            <div className="row d-flex mr-3">

              <a href="#" data-toggle="modal" data-target="#exampleModal1" style={{ color: ColorOne }}>
                <span className="d-none d-md-block"><AiOutlineHome size="38"/></span>
                <span className="d-block d-md-none"><AiOutlineHome size="20"/></span>
                <div className="d-flex">
                  <p className="font-weight-bold">Order<br />Delivery</p>
                </div>
              </a>
                {/* Delivery Modal */}
              <div className="modal fade" id="exampleModal1" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog" role="document">
                  <div className="modal-content">
                    <div className="modal-header">
                      <h5 className="modal-title" id="exampleModalLabel1">Delivery</h5>
                      <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                      </button>
                    </div>
                    {/* If Delivery update*/}
                    <div className="modal-body">
                    <form>
                      <input type="text"  className="form-control" name="" id="" placeholder="Notification Title" /><br />
                      <input type="text" className="form-control"  name="" id="" placeholder="Notification Description" /><br />
                      {/* <label htmlFor="">Delivered&nbsp;&nbsp;<input type="checkbox" name="" id="" /></label><br /> */}
                      <input type="submit" name="" id="" className="float-right" style={{ backgroundColor: ColorOne,color:"white" }}/>
                    </form>
                    </div>
                    
                  </div>
                </div>
              </div>


            </div>

          </div>
        </div>
        ))}
      </div>
    </>
  )
}

export default SpecificOrder
