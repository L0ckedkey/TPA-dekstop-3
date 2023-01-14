import { useState, useEffect } from "react";
import { db } from '../firebase-config';
import { addDoc, collection, getDocs } from 'firebase/firestore';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import MovieController, { addMovie } from "../controller/movieController";
import MovieProducersController, { addMovieProducers } from "../controller/movieProducersController";
import EmployeeController from "../controller/employeeController";
import { ViewMovieOnly } from "./ViewMovie";
import AdvertisingPartnerController, { addAdvertisingPartner } from "../controller/advertisingPartnerController";
import FundRequestController, { addFundRequest, setToAcceptedAccounting, setToAcceptedManager, setToRejectedAccounting, setToRejectedManager } from "../controller/fundRequestController";

const monthNames = ["January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
];

let getInfo = async (id) => {
    sessionStorage.setItem("Fund Request ID", id)
}

let ViewDetail = () => {
    const movieProducers = FundRequestController();
    const employees = EmployeeController();
    let number = 0;

    if (sessionStorage.getItem("Fund Request ID") != null) {
        return (
            <>
                <Table bordered hover size variant="dark">
                    <thead>
                        <tr>
                            <th>Number</th>
                            <th>Fund Request ID</th>
                            <th>Employee Name</th>
                            <th>Position</th>
                            <th>Fund</th>
                            <th>Reason</th>
                            <th>Request Date</th>
                            <th>Manager Status</th>
                            <th>Accounting Status</th>
                            <th>Status</th>
                        </tr>
                    </thead>

                    {

                        movieProducers.map((fundRequest) => {
                            number++;
                            if (sessionStorage.getItem("Fund Request ID") == fundRequest.id) {
                                return (
                                    < tbody >
                                        <tr>
                                            {
                                                employees.map((employee) => {

                                                    if (fundRequest.issuedBy == JSON.parse(sessionStorage.getItem("Login data")).position && fundRequest.employeeID == employee.id) {
                                                        return (
                                                            <>
                                                                <td>{number}</td>
                                                                <td>{fundRequest.id}</td>
                                                                <td>{employee.Name}</td>
                                                                <td>{employee.position}</td>
                                                                <td>{fundRequest.fund}</td>
                                                                <td>{fundRequest.reason}</td>
                                                                <td>{fundRequest.date}</td>
                                                                <td className={`${fundRequest.managerStatus === "Pending" ? 'pending' : fundRequest.managerStatus === "Approved" ? 'activeaaa' : 'inactiveaaa'}`}>{fundRequest.managerStatus}</td>
                                                                <td className={`${fundRequest.accountingStatus === "Pending" ? 'pending' : fundRequest.accountingStatus === "Approved" ? 'activeaaa' : 'inactiveaaa'}`}>{fundRequest.accountingStatus}</td>
                                                                <td className={`${fundRequest.status === "Pending" ? 'pending' : fundRequest.status === "Approved" ? 'activeaaa' : 'inactiveaaa'}`}>{fundRequest.status}</td>
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
                </Table>
            </>
        );
    }

}

export function ViewFundRequest() {
    let number = 0;

    const movieProducers = FundRequestController();
    const employees = EmployeeController();

    return (
        <>
            <Table bordered hover size variant="dark">
                <thead>
                    <tr>
                        <th>Number</th>
                        <th>Fund Request ID</th>
                        <th>Employee Name</th>
                        <th>Position</th>
                        <th>Request Date</th>
                        <th>Manager Status</th>
                        <th>Accounting Status</th>
                        <th>Status</th>
                    </tr>
                </thead>

                {

                    movieProducers.map((fundRequest) => {
                        number++;
                        return (
                            < tbody >
                                <tr>
                                    {
                                        employees.map((employee) => {

                                            if (fundRequest.issuedBy == JSON.parse(sessionStorage.getItem("Login data")).position && fundRequest.employeeID == employee.id) {
                                                return (
                                                    <>
                                                        <td>{number}</td>
                                                        <td><button className="button-test" onClick={getInfo(fundRequest.id)}>{fundRequest.id}</button></td>
                                                        <td>{employee.Name}</td>
                                                        <td>{employee.position}</td>
                                                        <td>{fundRequest.date}</td>
                                                        <td className={`${fundRequest.managerStatus === "Pending" ? 'pending' : fundRequest.managerStatus === "Approved" ? 'activeaaa' : 'inactiveaaa'}`}>{fundRequest.managerStatus}</td>
                                                        <td className={`${fundRequest.accountingStatus === "Pending" ? 'pending' : fundRequest.accountingStatus === "Approved" ? 'activeaaa' : 'inactiveaaa'}`}>{fundRequest.accountingStatus}</td>
                                                        <td className={`${fundRequest.status === "Pending" ? 'pending' : fundRequest.status === "Approved" ? 'activeaaa' : 'inactiveaaa'}`}>{fundRequest.status}</td>
                                                    </>
                                                )
                                            }
                                        })
                                    }
                                </tr>
                            </tbody>
                        )


                    })
                }
            </Table>
            <ViewDetail />
            <AddFundRequest />
        </>
    );
}

export function UpdateFundRequestAccounting() {
    let number = 0;

    const movieProducers = FundRequestController();
    const employees = EmployeeController();

    return (
        <>
            <Table bordered hover size variant="dark">
                <thead>
                    <tr>
                        <th>Number</th>
                        <th>Employee Name</th>
                        <th>Position</th>
                        <th>Fund</th>
                        <th>Reason</th>
                        <th>Request Date</th>
                        <th>Manager Status</th>
                        <th>Accounting Status</th>
                        <th>Status</th>
                    </tr>
                </thead>

                {

                    movieProducers.map((fundRequest) => {
                        number++;
                        if (fundRequest.accountingStatus == "Pending") {
                            return (
                                < tbody >
                                    <tr>
                                        {
                                            employees.map((employee) => {

                                                if (fundRequest.employeeID == employee.id) {
                                                    return (
                                                        <>
                                                            <td>{number}</td>
                                                            <td>{employee.Name}</td>
                                                            <td>{employee.position}</td>
                                                            <td>{fundRequest.fund}</td>
                                                            <td>{fundRequest.reason}</td>
                                                            <td>{fundRequest.date}</td>
                                                            <td className={`${fundRequest.managerStatus === "Pending" ? 'pending' : fundRequest.managerStatus === "Approved" ? 'activeaaa' : 'inactiveaaa'}`}>{fundRequest.managerStatus}</td>
                                                            <td className={`${fundRequest.accountingStatus === "Pending" ? 'pending' : fundRequest.accountingStatus === "Approved" ? 'activeaaa' : 'inactiveaaa'}`}>{fundRequest.accountingStatus}</td>
                                                            <td className={`${fundRequest.status === "Pending" ? 'pending' : fundRequest.status === "Approved" ? 'activeaaa' : 'inactiveaaa'}`}>{fundRequest.status}</td>
                                                            <td>
                                                                <Button className="" variant="success" type="submit" onClick={() => { setToAcceptedAccounting(fundRequest.id, "Approved", fundRequest.managerStatus, fundRequest.fund) }}>
                                                                    Accept
                                                                </Button>
                                                            </td>

                                                            <td>
                                                                <Button variant="danger" type="submit" onClick={() => { setToRejectedAccounting(fundRequest.id, "Rejected", fundRequest.managerStatus, fundRequest.status) }}>
                                                                    Reject
                                                                </Button>
                                                            </td>
                                                        </>
                                                    )
                                                }
                                            })
                                        }
                                    </tr>
                                </tbody>
                            )
                        } else {
                            return (
                                < tbody >
                                    <tr>
                                        {
                                            employees.map((employee) => {
                                                if (fundRequest.employeeID == employee.id) {
                                                    return (
                                                        <>
                                                            <td>{number}</td>
                                                            <td>{employee.Name}</td>
                                                            <td>{employee.position}</td>
                                                            <td>{fundRequest.fund}</td>
                                                            <td>{fundRequest.reason}</td>
                                                            <td>{fundRequest.date}</td>
                                                            <td className={`${fundRequest.managerStatus === "Pending" ? 'pending' : fundRequest.managerStatus === "Approved" ? 'activeaaa' : 'inactiveaaa'}`}>{fundRequest.managerStatus}</td>
                                                            <td className={`${fundRequest.accountingStatus === "Pending" ? 'pending' : fundRequest.accountingStatus === "Approved" ? 'activeaaa' : 'inactiveaaa'}`}>{fundRequest.accountingStatus}</td>
                                                            <td className={`${fundRequest.status === "Pending" ? 'pending' : fundRequest.status === "Approved" ? 'activeaaa' : 'inactiveaaa'}`}>{fundRequest.status}</td>
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
            </Table>
        </>
    );
}

export function UpdateFundRequestManager() {
    let number = 0;

    const movieProducers = FundRequestController();
    const employees = EmployeeController();

    return (
        <>
            <Table bordered hover size variant="dark">
                <thead>
                    <tr>
                        <th>Number</th>
                        <th>Employee Name</th>
                        <th>Position</th>
                        <th>Fund</th>
                        <th>Reason</th>
                        <th>Request Date</th>
                        <th>Manager Status</th>
                        <th>Accounting Status</th>
                        <th>Status</th>
                    </tr>
                </thead>

                {

                    movieProducers.map((fundRequest) => {
                        number++;
                        if (fundRequest.managerStatus == "Pending") {
                            return (
                                < tbody >
                                    <tr>
                                        {
                                            employees.map((employee) => {

                                                if (fundRequest.employeeID == employee.id) {
                                                    return (
                                                        <>
                                                            <td>{number}</td>
                                                            <td>{employee.Name}</td>
                                                            <td>{employee.position}</td>
                                                            <td>{fundRequest.fund}</td>
                                                            <td>{fundRequest.reason}</td>
                                                            <td>{fundRequest.date}</td>
                                                            <td className={`${fundRequest.managerStatus === "Pending" ? 'pending' : fundRequest.managerStatus === "Approved" ? 'activeaaa' : 'inactiveaaa'}`}>{fundRequest.managerStatus}</td>
                                                            <td className={`${fundRequest.accountingStatus === "Pending" ? 'pending' : fundRequest.accountingStatus === "Approved" ? 'activeaaa' : 'inactiveaaa'}`}>{fundRequest.accountingStatus}</td>
                                                            <td className={`${fundRequest.status === "Pending" ? 'pending' : fundRequest.status === "Approved" ? 'activeaaa' : 'inactiveaaa'}`}>{fundRequest.status}</td>
                                                            <td>
                                                                <Button className="" variant="success" type="submit" onClick={() => { setToAcceptedManager(fundRequest.id, fundRequest.accountingStatus, "Approved", fundRequest.fund, fundRequest.date) }}>
                                                                    Accept
                                                                </Button>
                                                            </td>

                                                            <td>
                                                                <Button variant="danger" type="submit" onClick={() => { setToRejectedManager(fundRequest.id, fundRequest.managerStatus, "Rejected") }}>
                                                                    Reject
                                                                </Button>
                                                            </td>
                                                        </>
                                                    )
                                                }
                                            })
                                        }
                                    </tr>
                                </tbody>
                            )
                        } else {
                            return (
                                < tbody >
                                    <tr>
                                        {
                                            employees.map((employee) => {
                                                if (fundRequest.employeeID == employee.id) {
                                                    return (
                                                        <>
                                                            <td>{number}</td>
                                                            <td>{employee.Name}</td>
                                                            <td>{employee.position}</td>
                                                            <td>{fundRequest.fund}</td>
                                                            <td>{fundRequest.reason}</td>
                                                            <td>{fundRequest.date}</td>
                                                            <td className={`${fundRequest.managerStatus === "Pending" ? 'pending' : fundRequest.managerStatus === "Approved" ? 'activeaaa' : 'inactiveaaa'}`}>{fundRequest.managerStatus}</td>
                                                            <td className={`${fundRequest.accountingStatus === "Pending" ? 'pending' : fundRequest.accountingStatus === "Approved" ? 'activeaaa' : 'inactiveaaa'}`}>{fundRequest.accountingStatus}</td>
                                                            <td className={`${fundRequest.status === "Pending" ? 'pending' : fundRequest.status === "Approved" ? 'activeaaa' : 'inactiveaaa'}`}>{fundRequest.status}</td>
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
            </Table>
        </>
    );
}

export function AddFundRequest() {
    const [fund, setNewFund] = useState('');
    const [reason, setNewReason] = useState('');

    let employeeInfo = JSON.parse(sessionStorage.getItem("Login data"))

    const datee = new Date();
    let day = datee.getDate();
    let month = monthNames[datee.getMonth()];
    let year = datee.getFullYear();

    let fullDate = day + " " + month + " " + year;
    console.log(fullDate);


    return (
        <>
            <div className="content">

                <div className="content-bottom-gapped">
                    <Form className="form-adjust">
                        <Form.Group className="mb-3" controlId="formBasicName">
                            <Form.Label className="white-color">Fund</Form.Label>
                            <Form.Control type="text" onChange={(event) => { setNewFund(event.target.value) }} />
                            <Form.Text className="text-warning" >
                                Please input fund.
                            </Form.Text>
                        </Form.Group>
                    </Form >

                </div>
                <div className="content-bottom-gapped">
                    <Form>
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label className="white-color">Reason</Form.Label>
                            <Form.Control type="text" onChange={(event) => { setNewReason(event.target.value) }} />
                            <Form.Text className="text-warning">
                                Please input reason.
                            </Form.Text>
                        </Form.Group>
                        <Button variant="primary" type="submit" onClick={() => { addFundRequest(fullDate, fund, reason, employeeInfo.position) }}>
                            Add Fund Request
                        </Button>

                    </Form >
                </div>
            </div >
        </>
    );
}