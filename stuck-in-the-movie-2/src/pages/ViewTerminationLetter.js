
import { useState, useEffect } from "react";
import { db } from '../firebase-config';
import { addDoc, collection, doc, getDocs, updateDoc } from 'firebase/firestore';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { ViewEmployeeOnly } from "./viewEmployee";
import EmployeeController from "../controller/employeeController";
import WarningLetterController, { addWarningLetter, setToAccepted, setToRejected } from "../controller/warningLetterController";
import TermintationController, { setToAcceptedTerminationLetter, setToRejectedTerminationLetter } from "../controller/terminationLetterController";


export function UpdateTerminationLetter() {
    let number = 0;

    const employees = EmployeeController();
    const terminationLetter = TermintationController();


    return (
        <>
            <Table size variant="dark">
                <thead>
                    <tr>
                        <th>Number</th>
                        <th>Employee Name</th>
                        <th>Reason</th>
                        <th>Status</th>
                    </tr>
                </thead>
                {
                    terminationLetter.map((terminationLetter) => {

                        return (
                            // console.log({ employee.Name });
                            <tbody>
                                <tr>
                                    {
                                        employees.map((employee) => {

                                            if (terminationLetter.status === "Pending" && terminationLetter.employeeID == employee.id) {
                                                number++;
                                                return (
                                                    <>
                                                        <td> {number}</td>
                                                        <td>{employee.Name}</td>
                                                        <td>{terminationLetter.reason}</td>
                                                        <td className={`${terminationLetter.status === "Pending" ? 'pending' : terminationLetter.status === "Approved" ? 'activeaaa' : 'inactiveaaa'}`}>{terminationLetter.status}</td>
                                                        <td><Button className="" variant="success" type="submit" onClick={() => { setToAcceptedTerminationLetter(terminationLetter.id, "Approved", employee.id) }}>
                                                            Accept
                                                        </Button></td>

                                                        <td><Button variant="danger" type="submit" onClick={() => { setToRejectedTerminationLetter(terminationLetter.id, "Rejected") }}>
                                                            Reject
                                                        </Button></td>
                                                    </>
                                                )

                                            } else if (terminationLetter.employeeID == employee.id) {
                                                number++;
                                                return (<>
                                                    <td> {number}</td>
                                                    <td>{employee.Name}</td>
                                                    <td>{terminationLetter.reason}</td>
                                                    <td className={`${terminationLetter.status === "Pending" ? 'pending' : terminationLetter.status === "Approved" ? 'activeaaa' : 'inactiveaaa'}`}>{terminationLetter.status}</td>
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

