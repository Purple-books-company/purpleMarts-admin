import React, { useState, useEffect } from 'react';
import Nav from '../Nav';
import '../../assets/a.css';
import { ColorOne, ColorTwo } from '../../styles/color.js';

function SpecificOrder() {
  const style = {
    backgroundColor: "purple",
    borderRadius: "25px"
  }
  const progress = {
    backgroundColor: "green"
  }
  const dispatched = true;
  return (
    <>
      <Nav />
      <div className="container">

        <div className="row">
          <div className="col-1"></div>
          <div className="col-10 mt-5">
            <div className="card text-center">
              <div className="card-header" style={{backgroundColor:ColorTwo,color:'white',fontSize:'large'}}>
                <div className="row">
                  <span className="col-md-3">Order ID - orduioerieni</span>
                  <span className="col-md-3">User ID - 1234567890</span>
                  <span className="col-md-3">No of products : 4</span>
                  <a href="#" style={{color:'white'}} className="col-md-3">Invoice</a>
                </div>
              </div>
              <div className="card-body d-none d-md-block">
                <table class="table borderless">
                  <thead>
                    <tr>
                      <th scope="col">Product ID</th>
                      <th scope="col">Product Name</th>
                      <th scope="col">Quantity</th>
                      <th scope="col">Product Price</th>
                    </tr>
                  </thead>
                  <tbody  style={{color:ColorOne,fontSize:'large'}}>
                    <tr>
                      <td scope="row">111111111111111111212</td>
                      <td>fbtytrbvghureytttyyyyyyyyyyyyyyyyyyyyyyyy</td>
                      <td>4</td>
                      <td>2222</td>
                    </tr>
                    <tr>
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
                    </tr>
                  </tbody>
                </table>
                <span style={{fontSize:'large'}}>Delivery Charge Rs. 60</span><br />
                <span style={{fontSize:'large'}}>Total Rs. 3000</span>
                <hr />
              </div>

              {/* For Mobile View */}
              <div className="card-body d-block d-md-none">
                <div className="col">
                  <h6>Product ID</h6>
                  <h6>Product Name</h6>
                  <h6>Product price</h6>
                  <hr />
                  <p>123456766666666</p>
                  <p>mmmmmmmmmmmmmmmmmmmmmmmm</p>
                  <p>300</p>
                  <hr />
                  <p>123456766666666</p>
                  <p>mmmmmmmmmmmmmmmmmmmmmmmm</p>
                  <p>300</p>
                  <hr />
                  <p>123456766666666</p>
                  <p>mmmmmmmmmmmmmmmmmmmmmmmm</p>
                  <p>300</p>
                  <hr />
                  <p>123456766666666</p>
                  <p>mmmmmmmmmmmmmmmmmmmmmmmm</p>
                  <p>300</p>
                  <hr />

                </div>
                {/* <h5 className="card-title">Name - Reahaan</h5>
            <p className="card-text">Order Amount Rs.3000</p>
            <p className="card-text">Order Date 08-07-2021 </p>
            <a href="#" className="btn btn-primary btn-block">Show More</a> */}
                <span>Delivery Charge Rs. 60</span><br />
                <span>Total Rs. 3000</span>
                <hr />
              </div>
              <div style={{color:ColorOne,fontSize:'large',fontWeight:'bold'}}>
              <div className="row">
                <div className="col">
                  <label htmlFor="name">Name</label>
                </div>
                <div className="col">
                  <p>Mohammed Reahaan Sheriff I</p>
                </div>
              </div>
              <div className="row">
                <div className="col">
                  <label htmlFor="street">street</label>
                </div>
                <div className="col">
                  <p>20 East Cemetry Road Oldwashermenpet</p>
                </div>
              </div>
              <div className="row">
                <div className="col">
                  <label htmlFor="city">city</label>
                </div>
                <div className="col">
                  <p>ueiohdwNameuy</p>
                </div>
              </div>
              <div className="row">
                <div className="col">
                  <label htmlFor="state">state</label>
                </div>
                <div className="col">
                  <p>ueiohdwNameuy</p>
                </div>
              </div>

              <div className="row">
                <div className="col">
                  <label htmlFor="Mobile">mobile</label>
                </div>
                <div className="col">
                  <p>1111111111</p>
                </div>
              </div>
              <div className="row">
                <div className="col">
                  <label htmlFor="order">Order Date and time</label>
                </div>
                <div className="col">
                  <p>01 July 2022 09:21 AM</p>
                </div>
              </div>
              <div className="row">
                <div className="col">
                  <label htmlFor="date">estimate delivery</label>
                </div>
                <div className="col">

                  <p>08 July 2022</p>
                  <button style={{backgroundColor:ColorTwo}}>Change Date</button>

                </div>
              </div>
              </div>


              <div className="card-footer text-muted" >
               <p style={{color:ColorOne,fontSize:'large'}}>COD: False</p>
              </div>
            </div>
          </div>
          <div className="col-1"></div>
          <div className="row d-flex justify-content-center col-12 mb-0">
            <div className="col-12">
              <ul id="progressbar" className="text-center">

                {/* If Ordered */}
                {/* <li className="active step0"></li>
                      <li className="step0"></li>
                       <li className="step0"></li>  */}

                {/* If dispatched */}
                <li className="active step0"></li>
                         <li className="active step0"></li>
                        <li className="step0"></li>

                {/* If delivered */}
                {/* <li className="active step0"></li>
                <li className="active step0"></li>
                <li className="active step0"></li> */}
              </ul>
            </div>
          </div>

          <div className="row justify-content-between tops my-0 col-md-12">

            <div className="row d-flex ml-4 text-center align-center" >
              <a >
                <img className="icon" src="https://i.imgur.com/u1AzR7w.png" />
                <div className="d-flex">
                  <p className="font-weight-bold">Order<br />Status</p>
                </div>
              </a>
            </div>
            <div className="row d-flex ml-3">
              <a onclick="openDispatch()">
                <img className="icon" src="https://i.imgur.com/TkPm63y.png" />
                <div className="d-flex">
                  <p className="font-weight-bold">Order<br />Dispatch</p>
                </div>
              </a>
            </div>
            <div className="row d-flex mr-3">

              <a onclick="openDelivery()">
                <img className="icon ml-1" src="https://i.imgur.com/HdsziHP.png" />
                <div className="d-flex">
                  <p className="font-weight-bold">Order<br />Delivery</p>
                </div>
              </a>



            </div>

          </div>
        </div>
      </div>
    </>
  )
}

export default SpecificOrder
