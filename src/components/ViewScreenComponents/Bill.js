
import React from 'react'
import logo1 from '../../assets/logo/logo.png';


import html2pdf from 'html2pdf.js';
function Bill() {
    const printDocument = () => {
        const input = document.getElementById('print');
        html2pdf()
            .from(input)
            .save();

    }
    const border = {
        border: 'none'
    }

    return (
        <>
            <center><button onClick={printDocument}>download</button></center>
            <div id="print" style={{ paddingLeft: "30px", marginTop: "0" }}>
                <div className="container" style={{ lineHeight: "0.5em" }}>

                    <div className="row">
                        <div className="col-4"><h3 className="mt-5">INVOICE</h3></div>
                        <div className="col-6"><img src={logo1} width="180px" height="190px" alt="" style={{ float: "right", marginTop: "0", paddingTop: "0" }} /></div>
                    </div>



                    <div className="row" style={{ marginTop: "0" }}>
                        <div className="col-4">
                            <p><strong>Invoice No</strong></p>
                            <p>Pay 123456789</p>
                        </div>



                        <div className="col-4">
                            <p><strong>Order Date</strong></p>
                            <p>July 21 2020</p>


                        </div>

                        <div className="col-4">
                            <p><strong>Due Date</strong></p>
                            <p>July 30 2020</p>

                        </div>
                    </div>
                    <div className="row" style={{ marginTop: "10px" }}>
                        <div className="col-6">
                            <h5><strong>From</strong></h5>
                            <h6 style={{ marginLeft: "25px" }}><strong>Purple Books</strong></h6>
                            <p style={{ marginLeft: "25px" }}>S.K Pearl</p>
                            <p style={{ marginLeft: "25px" }}>S2, No 10 and 11 Sri Raman Salai</p>
                            <p style={{ marginLeft: "25px" }}>Ponniammammedu</p>
                            <p style={{ marginLeft: "25px" }}>Chennai- 600110</p>
                            <p style={{ marginLeft: "25px" }}>Tamil Nadu, India</p>
                            <p style={{ marginLeft: "25px" }}>purplebookspvt.ltd@gmail.com</p>
                            <p style={{ marginLeft: "25px" }}>9500015736</p>
                        </div>

                        <div className="col-6">
                        <h5><strong>To</strong></h5>
                            <h6 style={{ marginLeft: "25px" }}><strong>Purple Books</strong></h6>
                            <p style={{ marginLeft: "25px" }}>S.K Pearl</p>
                            <p style={{ marginLeft: "25px" }}>S2, No 10 and 11 Sri Raman Salai</p>
                            <p style={{ marginLeft: "25px" }}>Ponniammammedu</p>
                            <p style={{ marginLeft: "25px" }}>Chennai- 600110</p>
                            <p style={{ marginLeft: "25px" }}>Tamil Nadu, India</p>
                            <p style={{ marginLeft: "25px" }}>purplebookspvt.ltd@gmail.com</p>
                            <p style={{ marginLeft: "25px" }}>9500015736</p>
                        </div>
                    </div>
                    <table class="table mt-5 pr-5">
                        <thead>
                            <tr>
                                <th scope="col" style={{border:"none"}}></th>
                                <th scope="col" style={{border:"none"}}>Item Name</th>
                                <th scope="col" style={{border:"none"}}>Quantity</th>
                                <th scope="col" style={{border:"none"}}>Rate</th>
                                <th scope="col" style={{border:"none"}}>Discount</th>
                                <th scope="col" style={{border:"none"}}>Price</th>
                                <th scope="col" style={{border:"none"}}></th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <th scope="row" style={{border:"none"}}>1</th>
                                <td style={{border:"none"}}>ikigai</td>
                                <td style={{border:"none"}}>2</td>
                                <td style={{border:"none"}}>Rs. 499</td>
                                <td style={{border:"none"}}>Rs. 199</td>
                                <td style={{border:"none"}}>Rs. 299</td>
                            </tr>
                            <tr>
                                <th scope="row" style={{border:"none"}}>1</th>
                                <td style={{border:"none"}}>Ikigai</td>
                                <td style={{border:"none"}}>2</td>
                                <td style={{border:"none"}}>Rs. 499</td>
                                <td style={{border:"none"}}>Rs. 199</td>
                                <td style={{border:"none"}}>Rs. 299</td>
                            </tr>
                            <tr>
                                <th scope="row" style={{border:"none"}}>1</th>
                                <td style={{border:"none"}}>Ikigai</td>
                                <td style={{border:"none"}}>2</td>
                                <td style={{border:"none"}}>Rs. 499</td>
                                <td style={{border:"none"}}>Rs. 199</td>
                                <td style={{border:"none"}}>Rs. 299</td>
                            </tr>
                            <tr>
                                <th scope="row" style={{border:"none"}}>1</th>
                                <td style={{border:"none"}}>Ikigai</td>
                                <td style={{border:"none"}}>2</td>
                                <td style={{border:"none"}}>Rs. 499</td>
                                <td style={{border:"none"}}>Rs. 199</td>
                                <td style={{border:"none"}}>Rs. 299</td>
                            </tr>
                        </tbody>
                    </table>
                    <div style={{marginLeft:"410px"}}>
                        <div className="row">
                            <div className="col-6">
                                <p>Sub Total</p>
                                </div>
                                <div className="col-6">
                                <p>Rs 1000</p>
                                </div>
                            
                        </div>
                        <div className="row">
                            <div className="col-6">
                                <p>Delivery Charges</p>
                                </div>
                                <div className="col-6">
                                <p>Rs 100</p>
                                </div>
                            
                        </div>
                        <div className="row">
                        <strong><hr style={{border:"1px solid black",width:"270px",float:"left"}} /></strong>
                        </div>
                        <div className="row">
                            <div className="col-6">
                                <p>Total</p>
                                </div>
                                <div className="col-6">
                                <p>Rs 10000</p>
                                </div>
                            
                        </div>
                        
                    </div>
                    <footer className="mt-5"><p>For any enquiry,reach out via email at purplebookspvt.ltd@gmail.com or call us on +91 8667034067</p></footer>

                </div>
            </div>
        </>
    )
}

export default Bill
