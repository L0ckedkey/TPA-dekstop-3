import FundRequestController from "../controller/fundRequestController";
import { useState, useEffect } from "react";
import { db } from '../firebase-config';
import { addDoc, collection, doc, getDocs, updateDoc } from 'firebase/firestore';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { ViewEmployeeOnly } from "./viewEmployee";
import EmployeeController from "../controller/employeeController";
import PersonalLeaveController, { addPersonalLeave, setToAccepted, setToRejected } from "../controller/personalLeaveController";
import { hasFormSubmit } from "@testing-library/user-event/dist/utils";
import { hydrate } from "react-dom";
import PurchaseController, { chartDataPurchase, updateRealAmount } from "../controller/purchaseController";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';
import { LineChart, Line } from 'recharts';
import { render } from "@testing-library/react";

export function ViewPurchase() {
    const fundRequests = FundRequestController();
    const purchases = PurchaseController();

    let number = 0;
    return (
        <>
            <Table size variant="dark">
                <thead>
                    <tr>
                        <th>Number</th>
                        <th>Issued By</th>
                        <th>Requested Amount</th>
                        <th>Reason</th>
                        <th>Real Amount</th>
                        <th>Status</th>
                    </tr>
                </thead>
                {
                    fundRequests.map((fundRequest) => {

                        return (
                            // console.log({ employee.Name });
                            <tbody>
                                <tr>
                                    {
                                        purchases.map((purchase) => {

                                            if (fundRequest.id == purchase.FundRequestID && purchase.status == "Not Purchased") {
                                                number++;
                                                return (
                                                    <>
                                                        <td>{number}</td>
                                                        <td>{fundRequest.issuedBy}</td>
                                                        <td>{fundRequest.fund}</td>
                                                        <td>{fundRequest.reason}</td>
                                                        <td>{purchase.realAmount}</td>
                                                        <td className={`${purchase.status === "Not Purchased" ? 'pending' : 'activeaaa'}`}>{purchase.status}</td>
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
        </>
    );

}

export function UpdatePurchase() {
    const fundRequests = FundRequestController();
    const purchases = PurchaseController();

    const [reason, setNewReason] = useState('');

    let number = 0;
    return (
        <>
            <Table size variant="dark">
                <thead>
                    <tr>
                        <th>Number</th>
                        <th>Issued By</th>
                        <th>Requested Amount</th>
                        <th>Reason</th>
                        <th>Real Amount</th>
                        <th>Status</th>
                    </tr>
                </thead>
                {
                    fundRequests.map((fundRequest) => {

                        return (
                            // console.log({ employee.Name });
                            <>
                                {
                                    purchases.map((purchase) => {

                                        if (fundRequest.id == purchase.FundRequestID && purchase.status == "Not Purchased") {
                                            number++;
                                            return (
                                                <tbody>
                                                    <tr>
                                                        <td>{number}</td>
                                                        <td>{fundRequest.issuedBy}</td>
                                                        <td>{fundRequest.fund}</td>
                                                        <td>{fundRequest.reason}</td>
                                                        <td>
                                                            <Form.Control type="text" placeholder="" onChange={(event) => { setNewReason(event.target.value) }} />
                                                        </td>
                                                        <td className={`${purchase.status === "Not Purchased" ? 'pending' : 'activeaaa'}`}>{purchase.status}</td>
                                                        <td><Button variant="primary" type="submit" onClick={() => { updateRealAmount(purchase.id, reason) }}>
                                                            Update
                                                        </Button></td>
                                                    </tr>
                                                </tbody>
                                            )
                                        } else if (fundRequest.id == purchase.FundRequestID && purchase.status != "Not Purchased") {
                                            number++;
                                            return (
                                                <tbody>
                                                    <tr>
                                                        <td>{number}</td>
                                                        <td>{fundRequest.issuedBy}</td>
                                                        <td>{fundRequest.fund}</td>
                                                        <td>{fundRequest.reason}</td>
                                                        <td>{purchase.realAmount}</td>
                                                        <td className={`${purchase.status === "Not Purchased" ? 'pending' : 'activeaaa'}`}>{purchase.status}</td>
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


export function getPurchaseReport() {

    const data = chartDataPurchase();
    return (
        <>
            <UpdatePurchase />
            < LineChart width={800} height={400} data={data} >
                <Line type="monotone" dataKey="purchase" stroke="#00FF00" strokeWidth={4} />
                <CartesianGrid stroke="#CCC" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
            </LineChart >
        </>

    )

}