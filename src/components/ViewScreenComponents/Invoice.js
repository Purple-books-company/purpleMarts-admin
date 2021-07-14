import React from 'react'
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    useParams,
    // Redirect,
  } from "react-router-dom";
function Invoice({orders}) {
    const invoiceId='invoice12345678';
    const {id} = useParams();
    const printDocument = () =>{
    const input = document.getElementById('divToPrint');
    html2canvas(input)
      .then((canvas) => {
        const imgData = canvas.toDataURL('image/png');
        const pdf = new jsPDF();
        pdf.addImage(imgData, 'JPEG', 0, 0);
        // pdf.output('dataurlnewwindow');
        pdf.save("download.pdf");
      })
    ;
    }
    return (
        <>
        <h1>Assalamualaikum</h1>
        <button onClick={printDocument}>download</button>
        <div id="divToPrint">
            
             {orders.filter(order => order.orderId == id).map(filteredOrder => (
    <table>
        <tr>
            <td>
                <p style={{fontSize:"25px",paddingTop: "40px"}}>INVOICE</p>
            </td>
        </tr>
        <tr>
            <td colspan="9">
                <table style={{fontSize: "12px"}}>
                    <tr>
                        <td colspan="1" style={{color:"grey"}}>Invoice No#
                        </td>
                        <td colspan="5"style={{textAlign: "left"}}>
                            <h3>{invoiceId}</h3>
                        </td>
                    </tr>
                    <tr>
                        <td colspan="1"style={{color:"grey"}}>Invoice Date
                        </td>
                        <td colspan="5" style={{textAlign: "left"}}>
                            <h3>{filteredOrder.orderDate}</h3>
                        </td>
                    </tr>
                    <tr>
                        <td colspan="1" style={{color:"grey"}}>Due Date
                        </td>
                        <td colspan="5" style={{textAlign: "left"}}>
                            <h3>{filteredOrder.deliveryDate}</h3>
                        </td>
                    </tr>
                </table>
            </td>
            <td colspan="3">
                <table>
                    <tr>
                        <td><img height="80" src='https://drive.google.com/thumbnail?id=1H9jddQXwNw14nD4xY5iqP6NdftlyQsPH' alt="Card image cap" /></td>
                    </tr>
                </table>
            </td>
        </tr>
        <tr>
            <td colspan="6">
                <table style={{fontSize: "12px"}}>
                    <tr>
                        <td style={{paddingTop:"20px"}}>
                            <h2>From</h2>
                        </td>
                    </tr>
                    <tr>
                        <td style={{marginLeft: "15px"}}>
                            <h4>Purple Marts</h4>
                        </td>
                    </tr>
                    <tr>
                        <td style={{marginLeft: "15px"}}>New No. 20 old No 19/2 East Cemetery road OldWashermenpet,</td>
                    </tr>
                    <tr>
                        <td style={{marginLeft: "15px"}}>Chennai-600021,</td>
                    </tr>
                    <tr>
                        <td style={{marginLeft: "15px"}}>Tamil nadu, India</td>
                    </tr>
                    <tr>
                        <td style={{marginLeft: "15px"}}><strong>E-mail:</strong>&nbsp;&nbsp;&nbsp;purplebookspvt.ltd@gmail.com</td>
                    </tr>
                    <tr>
                        <td style={{marginLeft: "15px"}}><strong>Phone no:</strong>&nbsp;&nbsp;&nbsp;+91&nbsp;86670-34067</td>
                    </tr>
                </table>
            </td>
            <td colspan="6">
                <table style={{fontSize: "12px"}}>
                    <tr>
                        <td style={{paddingTop:"20px"}}>
                            <h2>To</h2>
                        </td>
                    </tr>
                    <tr>
                        <td style={{marginLeft: "15px"}}>
                            <h4>{filteredOrder.customerName}</h4>
                        </td>
                    </tr>
                    {filteredOrder.address.map((address) =>{

return(
  <>
                    <tr>
                        <td style={{marginLeft: "15px"}}>{address.street}</td>
                    </tr>
                    <tr>
                        <td style={{marginLeft: "15px"}}>{address.city}-{address.pinCode}</td>
                    </tr>
                    <tr>
                        <td style={{marginLeft: "15px"}}>{address.state}, India</td>
                    </tr>
                    <tr>
                        <td style={{marginLeft: "15px"}}><strong>E-mail:</strong>&nbsp;&nbsp;&nbsp; {address.email}</td>
                    </tr>
                    <tr>
                        <td style={{marginLeft: "15px"}}><strong>Phone no:</strong>&nbsp;&nbsp;&nbsp;{address.mobile}</td>
                    </tr>
                    </>
)
})}
                </table>
            </td>
        </tr>
        <thead style={{fontSize: "12px"}}>
            <td colspan="1"></td>
            <th colspan="7" style={{paddingTop:"15px",textAlign: "left"}}>
                Item Name
            </th>
            <th colspan="1" style={{paddingTop:"15px"}}>
                Quantity
            </th>
            <th colspan="1" style={{paddingTop:"15px"}}>
                Rate
            </th>
            <th colspan="1" style={{paddingTop:"15px"}}>
                Discount
            </th>
            <th colspan="1" style={{paddingTop:"15px"}}>
                Price
            </th>
        </thead>
        
        
        
        {/* {% for x in books %} */}
        <tr style={{fontSize:" 11px"}}>
            <td colspan="1"> 
                {/* {{x.count}} */}
            </td>
            <td colspan="7"> 
                {/* {{x.title}} */}
            </td>
            <td colspan="1" style={{textAlign: "center"}}>
                1
            </td>
            <td colspan="1" style={{textAlign: "center;"}}>
                {/* Rs.{{x.original}} */}
            </td>
            <td colspan="1" style={{textAlign: "center"}}> 
                {/* Rs.{{x.discount}} */}
             </td>
            <td colspan="1" style={{textAlign: "center"}}> 
                {/* Rs.{{x.price}} */}
            </td>
        </tr> 
        {/* {% endfor%} */}
        
        <tr style={{paddingTop:"10px", fontSize: "10px"}}>
            <td colspan="9"> 
                {/* Invoice total (in words) : {{amt_word}} */}
            </td>
            <td colspan="2">
                <p style={{}}>Sub Total</p>
            </td>
            <td colspan="1">
                <p style={{textAlign: 'center'}}><span>Rs. {filteredOrder.products.reduce((a,v) => a = a+(v.buyingPrice)*(v.quantity) , 0)}</span></p>
            </td>
        </tr>
        <tr style={{fontSize: '10px'}}>
            <td colspan="9">
                
            </td>
            <td colspan="2">
                <p style={{borderBottom: "1.5px solid black;"}}>Delivery Charges </p>
            </td>
            <td colspan="1">
                <p style={{borderBottom: "1.5px solid black", borderBottomStyle:"20px", textAlign: "center"}}>Rs.60</p>
            </td>
        </tr>
        <tr style={{fontSize:"13px"}}>
            <td colspan="9">

            </td>
            <td colspan="2">
                <p>Total </p>
            </td>
            <td colspan="1">
                <p style={{padding:"5px",textAlign: "center",fontWeight:"bold"}}><span>Rs. {filteredOrder.products.reduce((a,v) => a = a+(v.buyingPrice)*(v.quantity) , 0)+60}</span></p>
            </td>

        </tr>
        <tr style={{paddingTop: "15px"}}>
            <td colspan="12">
                <p style={{textAlign: "center", fontSize: '11px'}}>For any enquiry, reach out via email at purplebookspvt.ltd@gmail.com or call us on +91 86670-34067</p>
            </td>
        </tr>
    </table> 
    ))}

        </div> 
        </>
    )
}

export default Invoice
