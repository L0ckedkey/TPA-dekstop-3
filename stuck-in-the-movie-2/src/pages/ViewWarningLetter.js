
import { useState, useEffect, useRef } from "react";
import { db } from '../firebase-config';
import { addDoc, collection, doc, getDocs, updateDoc } from 'firebase/firestore';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { ViewEmployeeOnly } from "./viewEmployee";
import EmployeeController from "../controller/employeeController";
import WarningLetterController, { addWarningLetter, chartWarningLetterPurchase, getTotalResignationLetter, getTotalWarningLetter, setToAccepted, setToRejected, totalRevenue } from "../controller/warningLetterController";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';
import { LineChart, Line } from 'recharts';
import { render } from "@testing-library/react";

export function UpdateWarningLetter() {
    let number = 0;

    const employees = EmployeeController();
    const warningLetters = WarningLetterController();


    return (
        <>
            <Table size variant="dark">
                <thead>
                    <tr>
                        <th>Number</th>
                        <th>Employee Name</th>
                        <th>Date</th>
                        <th>Reason</th>
                        <th>Status</th>
                    </tr>
                </thead>
                {
                    warningLetters.map((warningLetter) => {

                        return (
                            // console.log({ employee.Name });
                            <tbody>
                                <tr>
                                    {
                                        employees.map((employee) => {

                                            if (warningLetter.status === "Pending" && warningLetter.employeeID == employee.id) {
                                                number++;
                                                return (
                                                    <>
                                                        <td> {number}</td>
                                                        <td>{employee.Name}</td>
                                                        <td>{warningLetter.date}</td>
                                                        <td>{warningLetter.reason}</td>
                                                        <td className={`${warningLetter.status === "Pending" ? 'pending' : warningLetter.status === "Approved" ? 'activeaaa' : 'inactiveaaa'}`}>{warningLetter.status}</td>
                                                        <td><Button className="" variant="success" type="submit" onClick={() => { setToAccepted(warningLetter.id, "Approved", employee.id, employee.warningLetter) }}>
                                                            Accept
                                                        </Button></td>

                                                        <td><Button variant="danger" type="submit" onClick={() => { setToRejected(warningLetter.id, "Rejected") }}>
                                                            Reject
                                                        </Button></td>
                                                    </>
                                                )

                                            } else if (warningLetter.employeeID == employee.id) {
                                                number++;
                                                return (<>
                                                    <td> {number}</td>
                                                    <td>{employee.Name}</td>
                                                    <td>{warningLetter.date}</td>
                                                    <td>{warningLetter.reason}</td>
                                                    <td className={`${warningLetter.status === "Pending" ? 'pending' : warningLetter.status === "Approved" ? 'activeaaa' : 'inactiveaaa'}`}>{warningLetter.status}</td>
                                                </>);
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

export function AddWarningLetter() {
    const [employeeID, setNewEmployeeID] = useState('');
    const [reason, setNewReason] = useState('');

    return (
        <><ViewEmployeeOnly />

            <div className="content">
                <div className="content-bottom-gapped">
                    <Form className="form-adjust">
                        <Form.Group className="mb-3" controlId="formBasicName">
                            <Form.Label className="white-color">Employee ID</Form.Label>
                            <Form.Control type="text" placeholder="" onChange={(event) => { setNewEmployeeID(event.target.value) }} />
                            <Form.Text className="text-warning" >
                                Please input Employee ID.
                            </Form.Text>
                        </Form.Group>

                        <Button variant="primary" type="submit" onClick={() => addWarningLetter(employeeID, reason)}>
                            Add Warning Letter
                        </Button>
                    </Form >
                </div>

                <div className="content-bottom-gapped">
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label className="white-color">Reason</Form.Label>
                        <Form.Control type="text" placeholder="" onChange={(event) => { setNewReason(event.target.value) }} />
                        <Form.Text className="text-warning">
                            Please input reason.
                        </Form.Text>
                    </Form.Group>
                </div>
            </div >
        </>
    );
}

function refreshViewEmployee() {
    window.location = window.location.pathname;
}

function getFilter(year) {
    console.log(year)
    sessionStorage.setItem("Employee Report Filter", year)
    refreshViewEmployee();
}

export function GetWarningLetterReport() {

    const [yearFilter, setNewYear] = useState('');

    const data = chartWarningLetterPurchase();
    return (
        <>
            < LineChart width={800} height={400} data={data} >
                <Line type="monotone" dataKey="warningLetter" stroke="#00FF00" strokeWidth={4} />
                <Line type="monotone" dataKey="resignationLetter" stroke="#00FFFF" strokeWidth={4} />
                <CartesianGrid stroke="#CCC" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
            </LineChart >
            <Form.Group className="mb-3 text-adjust" controlId="formBasicEmail">
                <Form.Label className="white-color">Year</Form.Label>
                <Form.Control type="text" placeholder="" onChange={(event) => { setNewYear(event.target.value) }} />
                <Form.Text className="text-warning">
                    Please input Year.
                </Form.Text>
            </Form.Group>
            <Button variant="primary" type="submit" onClick={() => getFilter(yearFilter)}>
                Get Filter
            </Button>
        </>

    )

}

export default function ViewWarningLetter() {
    let number = 0;

    const employees = EmployeeController();
    const warningLetters = WarningLetterController();

    return (
        <>
            <Table size variant="dark">
                <thead>
                    <tr>
                        <th>Number</th>
                        <th>Employee Name</th>
                        <th>Date</th>
                        <th>Reason</th>
                        <th>Status</th>
                    </tr>
                </thead>
                {
                    warningLetters.map((warningLetter) => {

                        return (
                            // console.log({ employee.Name });
                            <tbody>
                                <tr>
                                    {
                                        employees.map((employee) => {



                                            if (warningLetter.employeeID === employee.id) {
                                                number++;
                                                return (
                                                    <>
                                                        <td> {number}</td>
                                                        <td>{employee.Name}</td>
                                                        <td>{warningLetter.date}</td>
                                                        <td>{warningLetter.reason}</td>
                                                        <td className={`${warningLetter.status === "Pending" ? 'pending' : warningLetter.status === "Approved" ? 'activeaaa' : 'inactiveaaa'}`}>{warningLetter.status}</td>
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
};