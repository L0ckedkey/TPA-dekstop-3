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


export function UpdatePersonalLeave() {
    let number = 0;

    const employees = EmployeeController();
    const warningLetters = PersonalLeaveController();
    // const personalLeaves = PersonalLeaveController();

    return (
        <>
            <Table size variant="dark">
                <thead>
                    <tr>
                        <th>Number</th>
                        <th>Employee Name</th>
                        <th>Start Leave</th>
                        <th>End Leave</th>
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

                                            if (warningLetter.status === "Pending" && warningLetter.employeeID === employee.id) {
                                                number++;
                                                return (
                                                    <>
                                                        <td> {number}</td>
                                                        <td>{employee.Name}</td>
                                                        <td>{warningLetter.startLeave}</td>
                                                        <td>{warningLetter.endLeave}</td>
                                                        <td>{warningLetter.Reason}</td>
                                                        <td className={`${warningLetter.status === "Pending" ? 'pending' : warningLetter.status === "Approved" ? 'activeaaa' : 'inactiveaaa'}`}>{warningLetter.status}</td>
                                                        <td><Button className="" variant="success" type="submit" onClick={() => { setToAccepted(warningLetter.id, "Approved") }}>
                                                            Accept
                                                        </Button></td>

                                                        <td><Button variant="danger" type="submit" onClick={() => { setToRejected(warningLetter.id, "Approved") }}>
                                                            Reject
                                                        </Button></td>
                                                    </>
                                                )

                                            } else if (warningLetter.employeeID == employee.id) {
                                                number++;

                                                return (<>
                                                    <td> {number}</td>
                                                    <td>{employee.Name}</td>
                                                    <td>{warningLetter.startLeave}</td>
                                                    <td>{warningLetter.endLeave}</td>
                                                    <td>{warningLetter.Reason}</td>
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

export function ViewPersonalLeave() {
    const warningLetters = PersonalLeaveController();
    const employees = EmployeeController();

    let number = 0;
    return (
        <>
            <Table size variant="dark">
                <thead>
                    <tr>
                        <th>Number</th>
                        <th>Employee Name</th>
                        <th>Start Leave</th>
                        <th>End Leave</th>
                        <th>Reason</th>
                        <th>Issued By</th>
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

                                            if (warningLetter.employeeID == JSON.parse(sessionStorage.getItem("Login data")).id && warningLetter.employeeID == employee.id) {
                                                number++;
                                                return (
                                                    employees.map((hrd) => {
                                                        if (warningLetter.status == "Pending" && warningLetter.humanResourceID == hrd.id) {
                                                            return (
                                                                <>
                                                                    <td> {number}</td>
                                                                    <td>{employee.Name}</td>
                                                                    <td>{warningLetter.startLeave}</td>
                                                                    <td>{warningLetter.endLeave}</td>
                                                                    <td>{warningLetter.reason}</td>
                                                                    <td>{hrd.Name}</td>
                                                                    <td className={`${warningLetter.status === "Pending" ? 'pending' : warningLetter.status === "Approved" ? 'activeaaa' : 'inactiveaaa'}`}>{warningLetter.status}</td>
                                                                </>
                                                            )
                                                        } else if (hrd.id == warningLetter.humanResourceID) {
                                                            return (
                                                                <>
                                                                    <td> {number}</td>
                                                                    <td>{employee.Name}</td>
                                                                    <td>{warningLetter.startLeave}</td>
                                                                    <td>{warningLetter.endLeave}</td>
                                                                    <td>{warningLetter.reason}</td>
                                                                    <td>{hrd.Name}</td>
                                                                    <td className={`${warningLetter.status === "Pending" ? 'pending' : warningLetter.status === "Approved" ? 'activeaaa' : 'inactiveaaa'}`}>{warningLetter.status}</td>
                                                                </>
                                                            )
                                                        }

                                                    })
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

export function AddPersonalLeave() {
    const [reason, setNewReason] = useState('');
    const [startLeave, setNewStartLeave] = useState('')
    const [endLeave, setNewEndLeave] = useState('')



    return (
        <><ViewPersonalLeave />

            <div className="content">
                <div className="content-bottom-gapped">
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label className="white-color">Start Leave</Form.Label>
                        <Form.Control type="text" placeholder="" onChange={(event) => { setNewStartLeave(event.target.value) }} />
                        <Form.Text className="text-warning">
                            Please input Start Leave.
                        </Form.Text>
                    </Form.Group>


                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label className="white-color">End Leave</Form.Label>
                        <Form.Control type="text" placeholder="" onChange={(event) => { setNewEndLeave(event.target.value) }} />
                        <Form.Text className="text-warning">
                            Please input End Leave.
                        </Form.Text>
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label className="white-color">Reason</Form.Label>
                        <Form.Control type="text" placeholder="" onChange={(event) => { setNewReason(event.target.value) }} />
                        <Form.Text className="text-warning">
                            Please input Reason.
                        </Form.Text>
                    </Form.Group>
                    <Button variant="primary" type="submit" onClick={() => addPersonalLeave(startLeave, endLeave, reason)}>
                        Add Personal Leave
                    </Button>
                </div>
            </div >
        </>
    );
}