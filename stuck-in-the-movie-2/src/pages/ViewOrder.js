import { useState, useEffect } from "react";
import { db } from '../firebase-config';
import { addDoc, collection, getDocs } from 'firebase/firestore';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import FBOrderHeaderController, { addFBDetail, AddFBHeader, addFBHeader, addMembership, createMembership, DoneOrder, FBOrderDetailController, setToProcessed, setToReady, setVoucher } from "../controller/FBOrderController";
import EmployeeController from "../controller/employeeController";
import GetFood, { GetFoodOnly } from "./ViewFood";
import GetBeverage, { GetBeverageOnly } from "./ViewBeverage";
import FoodController from "../controller/foodController";
import BeverageController from "../controller/beverageController";
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import QRCode from "react-qr-code";
import { findDOMNode } from "react-dom";
import { ViewPromo } from "./ViewPromo";



export function ViewOrderOnly() {
    let number = 0;

    const FBHeaders = FBOrderHeaderController();
    const FBDetails = FBOrderDetailController();
    const employees = EmployeeController();

    return (
        <>
            <Table striped bordered hover size variant="dark">
                <thead>
                    <tr>
                        <th>Order ID</th>
                        <th>Customer Name</th>
                        <th>Employee Name</th>
                        <th>Order</th>
                        <th>Quantity</th>
                    </tr>
                </thead>

                {

                    FBHeaders.map((FBHeader) => {

                        number++;
                        return (
                            <>
                                {
                                    employees.map((employee) => {
                                        if (FBHeader.employeeID == employee.id) {
                                            console.log("haha")
                                            return (
                                                <>
                                                    {
                                                        FBDetails.map((FBDetail) => {
                                                            if (FBDetail.FBHeader == FBHeader.OrderID) {
                                                                return (
                                                                    <tbody>
                                                                        <tr>
                                                                            <td>{FBHeader.OrderID}</td>
                                                                            <td>{FBHeader.customerName}</td>
                                                                            <td>{employee.Name}</td>
                                                                            <td>{FBDetail.orderName}</td>
                                                                            <td>{FBDetail.quantity}</td>
                                                                        </tr>
                                                                    </tbody>
                                                                )
                                                            }

                                                        })
                                                    }
                                                </>
                                            )
                                        }
                                    })
                                }

                            </>
                        )
                    })
                }
            </Table>
        </>
    );
}
function refreshViewEmployee() {
    window.location = window.location.pathname;
}
export function ViewFBOrderStatus() {
    let number = 0;

    const FBHeaders = FBOrderHeaderController();
    const FBDetails = FBOrderDetailController();
    const employees = EmployeeController();

    const getInfo = event => {
        sessionStorage.setItem("Order ID", event.currentTarget.id)
        refreshViewEmployee();
    }

    if (sessionStorage.getItem("Order ID") == null) {
        return (
            <>
                <Table bordered hover size variant="dark">
                    <thead>
                        <tr>
                            <th>Order ID</th>
                            <th>Employee Name</th>
                            <th>Customer Name</th>
                            <th>Payment Method</th>
                            <th>QR</th>
                        </tr>
                    </thead>

                    {

                        FBHeaders.map((FBHeader) => {

                            number++;
                            return (
                                <>
                                    {
                                        employees.map((employee) => {
                                            if (FBHeader.employeeID == employee.id) {
                                                console.log("haha")
                                                return (
                                                    <tbody>
                                                        <tr>
                                                            <td><button id={FBHeader.OrderID} className="button-test" onClick={getInfo}>{FBHeader.OrderID}</button></td>
                                                            <td>{employee.Name}</td>
                                                            <td>{FBHeader.customerName}</td>
                                                            <td>{FBHeader.paymentMethod}</td>
                                                            <td>
                                                                <QRCode
                                                                    size={256}
                                                                    style={{ height: "auto", maxWidth: "80px", width: "80px" }}
                                                                    value={FBHeader.OrderID}
                                                                    viewBox={`0 0 256 256`}
                                                                />
                                                            </td>
                                                        </tr>
                                                    </tbody>
                                                )
                                            }
                                        })
                                    }

                                </>
                            )
                        })
                    }
                </Table>
            </>
        );
    } else {
        return (
            <>
                <Table bordered hover size variant="dark">
                    <thead>
                        <tr>
                            <th>Order ID</th>
                            <th>Employee Name</th>
                            <th>Customer Name</th>
                            <th>Payment Method</th>
                            <th>QR</th>
                        </tr>
                    </thead>

                    {

                        FBHeaders.map((FBHeader) => {

                            number++;
                            return (
                                <>
                                    {
                                        employees.map((employee) => {
                                            if (FBHeader.employeeID == employee.id) {
                                                console.log("haha")
                                                return (
                                                    <tbody>
                                                        <tr>
                                                            <td><button id={FBHeader.OrderID} className="button-test" onClick={getInfo}>{FBHeader.OrderID}</button></td>
                                                            <td>{employee.Name}</td>
                                                            <td>{FBHeader.customerName}</td>
                                                            <td>{FBHeader.paymentMethod}</td>
                                                            <td>
                                                                <QRCode
                                                                    size={256}
                                                                    style={{ height: "auto", maxWidth: "80px", width: "80px" }}
                                                                    value={FBHeader.OrderID}
                                                                    viewBox={`0 0 256 256`}
                                                                />
                                                            </td>
                                                        </tr>
                                                    </tbody>
                                                )
                                            }
                                        })
                                    }

                                </>
                            )
                        })
                    }
                </Table>

                <Table bordered hover size variant="dark">
                    <thead>
                        <tr>
                            <th>Order Name</th>
                            <th>Quantity</th>
                            <th>Status</th>
                        </tr>
                    </thead>

                    {
                        FBDetails.map((FBDetail) => {
                            if (sessionStorage.getItem("Order ID") == FBDetail.FBHeader) {
                                console.log("haha")
                                return (
                                    <tbody>
                                        <tr>
                                            <td>{FBDetail.orderName}</td>
                                            <td>{FBDetail.quantity}</td>
                                            <td className={`${FBDetail.status !== "Ready" ? 'pending' : 'activeaaa'}`}>{FBDetail.status}</td>
                                        </tr>
                                    </tbody>
                                )
                            }
                        })

                    }
                </Table>
            </>
        );
    }

}

export function ViewFBOrderReceipt() {
    let number = 0;
    let total = 0;
    const FBHeaders = FBOrderHeaderController();
    const FBDetails = FBOrderDetailController();
    const employees = EmployeeController();
    const foods = FoodController();

    const getInfoReceipt = (id, price) => {
        sessionStorage.setItem("Order ID", id)
        sessionStorage.setItem("Total", price)
        total = price
        console.log(total)
        refreshViewEmployee();
    }

    if (sessionStorage.getItem("Order ID") == null) {
        return (
            <>
                <Table bordered hover size variant="dark">
                    <thead>
                        <tr>
                            <th>Order ID</th>
                            <th>Employee Name</th>
                            <th>Customer Name</th>
                            <th>Payment Method</th>
                            <th>QR</th>
                        </tr>
                    </thead>

                    {

                        FBHeaders.map((FBHeader) => {

                            number++;
                            return (
                                <>
                                    {
                                        employees.map((employee) => {
                                            if (FBHeader.employeeID == employee.id) {
                                                console.log("haha")
                                                return (
                                                    <tbody>
                                                        <tr>
                                                            <td><button id={FBHeader.OrderID} className="button-test" onClick={() => getInfoReceipt(FBHeader.OrderID, FBHeader.total)}>{FBHeader.OrderID}</button></td>
                                                            <td>{employee.Name}</td>
                                                            <td>{FBHeader.customerName}</td>
                                                            <td>{FBHeader.paymentMethod}</td>
                                                            <td>
                                                                <QRCode
                                                                    size={256}
                                                                    style={{ height: "auto", maxWidth: "80px", width: "80px" }}
                                                                    value={FBHeader.OrderID}
                                                                    viewBox={`0 0 256 256`}
                                                                />
                                                            </td>
                                                        </tr>
                                                    </tbody>
                                                )
                                            }
                                        })
                                    }

                                </>
                            )
                        })
                    }
                </Table>
            </>
        );
    } else {
        return (
            <>
                <Table bordered hover size variant="dark">
                    <thead>
                        <tr>
                            <th>Order ID</th>
                            <th>Employee Name</th>
                            <th>Customer Name</th>
                            <th>Payment Method</th>
                            <th>QR</th>
                        </tr>
                    </thead>

                    {

                        FBHeaders.map((FBHeader) => {

                            number++;
                            return (
                                <>
                                    {
                                        employees.map((employee) => {
                                            if (FBHeader.employeeID == employee.id) {
                                                console.log("haha")
                                                return (
                                                    <tbody>
                                                        <tr>
                                                            <td><button className="button-test" onClick={() => getInfoReceipt(FBHeader.OrderID, FBHeader.total)}>{FBHeader.OrderID}</button></td>
                                                            <td>{employee.Name}</td>
                                                            <td>{FBHeader.customerName}</td>
                                                            <td>{FBHeader.paymentMethod}</td>
                                                            <td>
                                                                <QRCode
                                                                    size={256}
                                                                    style={{ height: "auto", maxWidth: "80px", width: "80px" }}
                                                                    value={FBHeader.OrderID}
                                                                    viewBox={`0 0 256 256`}
                                                                />
                                                            </td>
                                                        </tr>
                                                    </tbody>
                                                )
                                            }
                                        })
                                    }

                                </>
                            )
                        })
                    }
                </Table>

                <Table bordered hover size variant="dark">
                    <thead>
                        <tr>
                            <th>Order Name</th>
                            <th>Quantity</th>
                        </tr>
                    </thead>

                    {
                        FBDetails.map((FBDetail) => {
                            if (sessionStorage.getItem("Order ID") == FBDetail.FBHeader) {

                                return (
                                    <tbody>
                                        <tr>

                                            {
                                                foods.map((food) => {
                                                    if (FBDetail.orderName == food.FoodName) {

                                                        return (
                                                            <>
                                                                <td>{FBDetail.orderName}</td>
                                                                <td>{FBDetail.quantity}</td>
                                                            </>
                                                        )
                                                    }
                                                })
                                            }
                                        </tr>
                                    </tbody>


                                )

                            }
                        })

                    }
                    <tbody>
                        <tr>
                            <td>Total : {sessionStorage.getItem("Total")}</td>
                        </tr>
                    </tbody>
                </Table>
            </>
        );
    }

}





export function AddFBOrder() {
    const [OrderID, setNewOrderID] = useState('');
    const [CustomerName, setNewCustomerName] = useState('');
    const [date, setNewDate] = useState('');
    const [orderName, setNewOrderName] = useState('');
    const [quantity, setNewQuantity] = useState(0);
    const foods = FoodController();
    const beverages = BeverageController();
    const [paymentMethod, setNewPaymentMethod] = useState('null');
    const [email, setNewEmail] = useState('')
    const [gender, setNewGender] = useState('');
    const [DOB, setNewDOB] = useState('')
    const [membershipID, setNewMembershipID] = useState('')

    if (sessionStorage.getItem("FB Order") == null) {
        return (

            <div className="content">
                <div className="content-bottom-gapped">
                    <Form className="form-adjust">
                        <Form.Group className="mb-3" controlId="formBasicName">
                            <Form.Label className="white-color">Order ID</Form.Label>
                            <Form.Control type="text" placeholder="Enter date" onChange={(event) => { setNewOrderID(event.target.value) }} />
                            <Form.Text className="text-warning" >
                                Please input Order ID.
                            </Form.Text>
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label className="white-color">Customer Name</Form.Label>
                            <Form.Control type="text" placeholder="Enter image url" onChange={(event) => { setNewCustomerName(event.target.value) }} />
                            <Form.Text className="text-warning">
                                Please input Customer Name.
                            </Form.Text>
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label className="white-color">Payment Method</Form.Label>
                            <Form.Control placeholder={paymentMethod} disabled />
                        </Form.Group>
                        <Dropdown className="bottom-gap" >
                            <DropdownButton id="dropdown-basic-button" title="Payment Method" onSelect={(event) => { setNewPaymentMethod(event) }}>
                                <Dropdown.Item eventKey="Cash">Cash</Dropdown.Item>
                                <Dropdown.Item eventKey="Debit">Debit</Dropdown.Item>
                                <Dropdown.Item eventKey="Credit">Credit</Dropdown.Item>
                                <Dropdown.Item eventKey="QRIS">QRIS</Dropdown.Item>
                            </DropdownButton>
                        </Dropdown>
                        <Button variant="primary" onClick={() => AddFBHeader(OrderID, CustomerName, paymentMethod)}>
                            Add Order Header
                        </Button>
                    </Form >
                </div>
            </div >

        );
    } else if (sessionStorage.getItem("membership") == "yes") {

        return (
            <>
                <div className="content">
                    <div className="content-bottom-gapped">
                        <Form className="form-adjust">

                            <Form.Group className="mb-3" controlId="formBasicName">
                                <Form.Label className="white-color">Customer Name</Form.Label>
                                <Form.Control type="text" placeholder="Enter date" onChange={(event) => { setNewMembershipID(event.target.value) }} />
                                <Form.Text className="text-warning" >
                                    Please input Customer Name.
                                </Form.Text>
                            </Form.Group>

                            <Form.Group className="mb-3" controlId="formBasicName">
                                <Form.Label className="white-color">Customer Name</Form.Label>
                                <Form.Control type="text" placeholder="Enter date" onChange={(event) => { setNewCustomerName(event.target.value) }} />
                                <Form.Text className="text-warning" >
                                    Please input Customer Name.
                                </Form.Text>
                            </Form.Group>

                            <Form.Group className="mb-3" controlId="formBasicEmail">
                                <Form.Label className="white-color">Email</Form.Label>
                                <Form.Control type="text" placeholder="Enter image url" onChange={(event) => { setNewEmail(event.target.value) }} />
                                <Form.Text className="text-warning">
                                    Please input Email.
                                </Form.Text>
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="formBasicEmail">
                                <Form.Label className="white-color">Gender</Form.Label>
                                <Form.Control type="text" placeholder="Enter image url" onChange={(event) => { setNewGender(event.target.value) }} />
                                <Form.Text className="text-warning">
                                    Please input gender.
                                </Form.Text>
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="formBasicEmail">
                                <Form.Label className="white-color">DOB</Form.Label>
                                <Form.Control type="text" placeholder="Enter image url" onChange={(event) => { setNewDOB(event.target.value) }} />
                                <Form.Text className="text-warning">
                                    Please input DOB.
                                </Form.Text>
                            </Form.Group>


                        </Form >
                        <Button variant="primary" type="submit" onClick={() => createMembership(membershipID, CustomerName, email, gender, DOB)}>
                            Create Membership
                        </Button>

                    </div>
                </div >
            </>
        );
    } else {


        return (
            <>
                <GetFoodOnly />
                <GetBeverageOnly />
                <div className="content">
                    <div className="content-bottom-gapped">
                        <Form className="form-adjust">
                            <Form.Group className="mb-3" controlId="formBasicName">
                                <Form.Label className="white-color">Order Name</Form.Label>
                                <Form.Control type="text" placeholder="Enter date" onChange={(event) => { setNewOrderName(event.target.value) }} />
                                <Form.Text className="text-warning" >
                                    Please input Employee ID.
                                </Form.Text>
                            </Form.Group>

                            <Form.Group className="mb-3" controlId="formBasicEmail">
                                <Form.Label className="white-color">Quantity</Form.Label>
                                <Form.Control type="text" placeholder="Enter image url" onChange={(event) => { setNewQuantity(event.target.value) }} />
                                <Form.Text className="text-warning">
                                    Please input Human Resource ID.
                                </Form.Text>
                            </Form.Group>


                        </Form >

                        <Button variant="primary" type="submit" onClick={() => addFBDetail(orderName, quantity, foods, beverages)}>
                            Add Order Detail
                        </Button>
                        <Button variant="primary" type="submit" onClick={() => addMembership()}>
                            Add Membership
                        </Button>
                    </div>
                    <div>
                        <ScanVoucher />
                        <div className="content-bottom-gapped"></div>
                        <Button variant="primary" type="submit" onClick={() => DoneOrder()}>
                            Done Order
                        </Button>
                    </div>
                </div >

            </>
        );
    }


}
function ScanVoucher() {
    const [voucherID, setNewVoucherID] = useState('');
    if (sessionStorage.getItem("Membership ID") != null && sessionStorage.getItem("Voucher Used") == null) {
        return (
            <>
                <ViewPromo />
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label className="white-color">Voucher ID</Form.Label>
                    <Form.Control type="text" placeholder="Enter image url" onChange={(event) => { setNewVoucherID(event.target.value) }} />
                    <Form.Text className="text-warning">
                        Please input Voucher ID.
                    </Form.Text>
                </Form.Group>

                <Button variant="primary" type="submit" onClick={() => setVoucher(voucherID)}>
                    Add Voucher
                </Button>
            </>
        )
    }
}

export function UpdateOrderStatus() {
    let number = 0;

    const FBHeaders = FBOrderHeaderController();
    const FBDetails = FBOrderDetailController();

    return (
        <>
            <Table size variant="dark">
                <thead>
                    <tr>
                        <th>Order ID</th>
                        <th>Order</th>
                        <th>Quantity</th>
                        <th>Status</th>
                    </tr>
                </thead>
                {

                    FBHeaders.map((FBHeader) => {

                        number++;
                        return (
                            <>
                                {
                                    FBDetails.map((FBDetail) => {
                                        if (FBDetail.FBHeader == FBHeader.OrderID) {
                                            if (FBDetail.status == "Ordered") {
                                                return (
                                                    <tbody>
                                                        <tr>
                                                            <td>{FBHeader.OrderID}</td>
                                                            <td>{FBDetail.orderName}</td>
                                                            <td>{FBDetail.quantity}</td>
                                                            <td className={`${FBDetail.status !== "Ready" ? 'pending' : 'activeaaa'}`}>{FBDetail.status}</td>
                                                            <td><Button className="" variant="success" type="submit" onClick={() => { setToProcessed(FBDetail.id, "Processed") }}>
                                                                Processed
                                                            </Button></td>
                                                        </tr>
                                                    </tbody>
                                                )
                                            }

                                        } else if (FBDetail.status == "Processed") {
                                            return (
                                                <tbody>
                                                    <tr>
                                                        <td>{FBHeader.OrderID}</td>
                                                        <td>{FBDetail.orderName}</td>
                                                        <td>{FBDetail.quantity}</td>
                                                        <td className={`${FBDetail.status !== "Ready" ? 'pending' : 'activeaaa'}`}>{FBDetail.status}</td>
                                                        <td><Button className="" variant="success" type="submit" onClick={() => { setToReady(FBDetail.id, "Ready") }}>
                                                            Ready
                                                        </Button></td>
                                                    </tr>
                                                </tbody>
                                            )
                                        }

                                    })
                                }
                            </>
                        )
                    })
                }
            </Table>
        </>
    );
}