import React, { useState, useEffect } from 'react';
import Nav from '../Nav';
import '../../assets/a.css';
import { ColorOne, ColorTwo, ColorThree } from '../../styles/color.js';
import { FaTimes, FaCheck, FaDownload } from "react-icons/fa";
import { AiOutlineHome } from "react-icons/ai";
import { Card, CenterText } from '../../styles/styled';
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
            <div className="card text-center" style={{borderRadius:'20px'}}>
              <div className="card-header" style={{ backgroundColor: ColorTwo, color: 'white',borderTopLeftRadius:'20px',borderTopRightRadius:'20px' }}>
                <div className="row">
                  <span className="col-md-3">Order ID - orduioerieni</span>
                  <span className="col-md-3">User ID - 1234567890</span>
                  <span className="col-md-3">No of products : 4</span>
                  <a href="#" style={{ color: 'white' }} className="col-md-3"><FaDownload />Invoice</a>
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
                <hr />
                <span style={{ fontSize: 'large' }}>Delivery Charge Rs. 60</span><br />
                <span style={{ fontSize: 'large' }}>Total Rs. 3000</span>

              </div>

              {/* For Mobile View */}
              <div className="card-body d-block d-md-none" style={{ backgroundColor: ColorThree }}>
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

              </div>
              <div style={{ color: ColorOne, fontSize: 'medium', backgroundColor: ColorThree }}>
                <hr />
                <div className="row">
                  <div className="col text-dark font-weight-bold">
                    <label htmlFor="name">Name</label>
                  </div>
                  <div className="col">
                    <p>Mohammed Reahaan Sheriff I</p>
                  </div>
                </div>
                <div className="row">
                  <div className="col text-dark font-weight-bold">
                    <label htmlFor="street">street</label>
                  </div>
                  <div className="col">
                    <p>20 East Cemetry Road Oldwashermenpet</p>
                  </div>
                </div>
                <div className="row">
                  <div className="col text-dark font-weight-bold">
                    <label htmlFor="city">city</label>
                  </div>
                  <div className="col">
                    <p>ueiohdwNameuy</p>
                  </div>
                </div>
                <div className="row">
                  <div className="col text-dark font-weight-bold">
                    <label htmlFor="state">state</label>
                  </div>
                  <div className="col">
                    <p>ueiohdwNameuy</p>
                  </div>
                </div>

                <div className="row">
                  <div className="col text-dark font-weight-bold">
                    <label htmlFor="Mobile">mobile</label>
                  </div>
                  <div className="col">
                    <p>1111111111</p>
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

                    <p>08 July 2022</p>
                    <button style={{ backgroundColor: ColorTwo }}>Change Date</button>

                  </div>
                </div>
              </div>


              <div className="card-footer text-muted" >
                <p style={{ color: ColorOne, fontSize: 'large' }}>COD:< FaTimes size="25" color='red' /></p>
                <p className="text-center">Tracking ID</p>
                <p className="text-center"><strong style={{ color: ColorOne }}>ID7676877789</strong></p>
                <p className="text-center">Tracking URL</p>
                <center><a href="https://www.indiapost.gov.in/_layouts/15/dop.portal.tracking/trackconsignment.aspx" className="text-center pb-5" style={{ color: ColorOne, float: CenterText }}>https://www.indiapost.gov.in/_layouts/15/dop.portal.tracking/trackconsignment.aspx</a></center>
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
                    <input type="text" className="form-control" name="" id="" placeholder="Tracking ID" /><br/>
                    <input type="text" className="form-control" name="" id="" placeholder="Tracking URL" /><br/>
                    <input type="text" className="form-control" name="" id="" placeholder="Notification Title" /><br/>
                    <input type="text" className="form-control" name="" id="" placeholder="Notification Description" /><br/>
                    <label htmlFor="">Dispatched&nbsp;&nbsp;<input type="checkbox"  name="" id="" /></label>
                  </div>
                  <div className="modal-footer">
                    <button type="button" className="btn btn-primary" style={{ backgroundColor: ColorOne }}>Save changes</button>
                  </div>
                </div>
              </div>
            </div>
            <div className="row d-flex mr-3">

              <a href="#" data-toggle="modal" data-target="#exampleModal1" style={{ color: ColorOne }}>
                <AiOutlineHome size="40"/>
                <div className="d-flex">
                  <p className="font-weight-bold">Order<br />Delivery</p>
                </div>
              </a>

              <div className="modal fade" id="exampleModal1" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog" role="document">
                  <div className="modal-content">
                    <div className="modal-header">
                      <h5 className="modal-title" id="exampleModalLabel">Delivery</h5>
                      <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                      </button>
                    </div>
                    {/* If Delivery update*/}
                    <div className="modal-body">

                      <input type="text"  className="form-control" name="" id="" placeholder="Notification Title" /><br />
                      <input type="text" className="form-control"  name="" id="" placeholder="Notification Description" /><br />
                      <label htmlFor="">Delivered&nbsp;&nbsp;<input type="checkbox" name="" id="" /></label>
                    </div>
                    <div className="modal-footer">
                      <button type="button" className="btn btn-primary" style={{ backgroundColor: ColorOne }}>Save changes</button>
                    </div>
                  </div>
                </div>
              </div>


            </div>

          </div>
        </div>
      </div>
    </>
  )
}

export default SpecificOrder
