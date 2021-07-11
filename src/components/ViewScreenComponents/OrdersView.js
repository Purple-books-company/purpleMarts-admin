import React, { useState, useEffect } from 'react';
import Nav from '../Nav';
import SpecificOrder from './SpecificOrder';
import { ColorOne, ColorTwo } from '../../styles/color.js';
import {But} from '../../styles/styled.js';
function OrdersView() {


    let orders = [
        {
            customerId: "cus12345678910",
            customerName: "Reahaan Sheriff",
            customerEmail: "reahaan@gmail.com",
            orderId: "ord1111pppppppppp",
            orderDate: "01 May 2021 12:40 PM",
            orderStatus: "ordered",
            trackId: "track112287657",
            trackUrl: "aaabbaa.coms]qa",
            deliveryDate: "08 May 2021",
            cod: false,
            products: [
                {
                    productId: "prod1234567890",
                    productName: "Headphone",
                    buyingPrice: 1000,
                },
                {
                    productId: "prod1234567891",
                    productName: "charger",
                    buyingPrice: 2000,
                },
                {
                    productId: "prod1234567892",
                    productName: "mobile",
                    buyingPrice: 10000,
                }
            ],
            address: [
                {
                    street: "20 East Cemetry Road",
                    city: "chennai",
                    state: "Tamilnadu",
                    mobile: 9998877654
                }
            ]
        },
        {
            customerId: "cus12345678911",
            customerName: "Mohammed",
            customerEmail: "mohammed@gmail.com",
            orderId: "ord1111pppppppppq",
            orderDate: "01 June 2021 12:40 PM",
            orderStatus: "ordered",
            trackId: "track112287657",
            trackUrl: "aaabbaa.coms]qa",
            deliveryDate: "08 June 2021",
            cod: true,
            products: [
                {
                    productId: "prod1234567890",
                    productName: "Case",
                    buyingPrice: 1000,
                },
                {
                    productId: "prod1234567891",
                    productName: "Power bank",
                    buyingPrice: 2000,
                },
                {
                    productId: "prod1234567892",
                    productName: "laptop",
                    buyingPrice: 10000,
                },
                {
                    productId: "prod1234567892",
                    productName: "laptop",
                    buyingPrice: 10000,
                }
            ],
            address: [
                {
                    street: "10 Raman salai",
                    city: "chennai",
                    state: "Tamilnadu",
                    mobile: 9998877655
                }
            ]
        }
    ]

    return (
        <>
            <Nav />
            <div className="container">

                <div className="row my-4">

                    <div className="col-12">

                        <center>
                            <input type="text" style={{ width: '300px' }} />


                            <But>search</But>
                        </center>
                    </div>
                </div>
                <div className="row">
                    <div className="col-2"></div>

                    <div className="col-2">
                        <But style={{ width: '80px' }}>Orders</But>
                    </div>
                    <div className="col-2">
                        <But>Dispatched</But>
                    </div>
                    <div className="col-2">
                        <But>Delivered</But>
                    </div>
                    <div className="col-2">
                        <But>Cancelled</But>
                    </div>
                    <div className="col-2"></div>
                </div>
                {orders.map((order) => {
                    return (
                        <>
                            <div className="row">
                                <div className="col-2"></div>
                                <div className="col-8 mt-5">
                                    <div className="card text-center">
                                        <div className="card-header" style={{backgroundColor:ColorTwo,color:'white',fontSize:'large'}}>
                                            <div className="row">

                                                <span className="col-md-4">Order-ID {order.orderId}</span>
                                                <span className="col-md-4">Customer-ID {order.customerId}</span>
                                                <span className="col-md-4">No of products : {order.products.length}</span>
                                            </div>
                                        </div>
                                        <div className="card-body">
                                            <h5 className="card-title">Name - {order.customerName}</h5>
                                            <p className="card-text">Order Amount - Rs.3000</p>
                                            <p className="card-text">Order Date {order.orderDate} </p>
                                            <a href="/specific" className="btn btn-primary btn-block" style={{backgroundColor:ColorOne}}>Show More</a>
                                        </div>
                                        <div className="card-footer text-muted" >
                                            {order.cod ? <p style={{color:ColorOne}}> COD: TRUE</p> : <p style={{color:ColorOne}}> COD: FALSE</p>}
                                        </div>
                                    </div>
                                </div>
                                <div className="col-2"></div>
                            </div>
                        </>
                    )
                })}
            </div>
        </>
    )
}

export default OrdersView
