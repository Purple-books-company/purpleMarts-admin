import React, { useState, useEffect } from 'react';
import Nav from '../Nav';
import SpecificOrder from './SpecificOrder';
import { ColorOne, ColorThree, ColorTwo } from '../../styles/color.js';
import {But, Card} from '../../styles/styled.js';

import { FaTimes, FaCheck } from "react-icons/fa";

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
        <nav className="sticky-top pb-5" style={{backgroundColor:'white'}}>
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
                </nav>
                {orders.map((order) => {
                    return (
                        <>
                            <Card className="row">
                                <div className="col-2"></div>
                                <div className="col-8 mt-1">
                                    <div className="card text-center">
                                        <div className="card-header" style={{backgroundColor:ColorThree,color:ColorOne}}>
                                            <div className="row">

                                                <span className="col-md-4 purple-text">Order-ID <span style={{color:ColorOne}}>{order.orderId}</span></span>
                                                <span className="col-md-4 purple-text">Customer-ID <span style={{color:ColorOne}}>{order.customerId}</span></span>
                                                <span className="col-md-4 purple-text">No of products : <br/><span style={{color:ColorOne}}>{order.products.length}</span></span>
                                            </div>
                                        </div>
                                        <div className="card-body">
                                            <div className="row">
                                            <p className="card-title col-md-4">{order.customerName}</p>
                                            <p className="card-text col-md-4">Rs.3000</p>
                                            <p className="card-text col-md-4">{order.orderDate} </p>
                                            </div>
                                            
                                            
                                        </div>
                                        <div className="card-footer text-muted row" >
                                        {order.cod ? <p className="col" style={{color:ColorOne}}> COD: <FaCheck color='green' size='25'/></p> : <p className="col" style={{color:ColorOne}}> COD: <FaTimes  color='red' size='25'/></p>}
                                        <a href="/specific" className="btn btn-primary col" style={{backgroundColor:ColorTwo,maxWidth:'150px'}}>Show More</a>
                                            
                                        </div>
                                    </div>
                                </div>
                                <div className="col-2"></div>
                            </Card>
                        </>
                    )
                })}
            </div>
        </>
    )
}

export default OrdersView
