import { useRef, useState, useEffect, useContext } from "react";
import { db } from '../firebase-config';
import { addDoc, collection, getDocs } from 'firebase/firestore';
import Table from 'react-bootstrap/Table';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import FoodController, { addFood } from "../controller/foodController";
import WorkingTimeController, { AddWorkingTimeRequest, setToAcceptedWorkingTime, setToAcceptedWorkingTimeRequest, setToRejectedWorkingTime, setToRejectedWorkingTimeRequest, WorkingTimeRequestController } from "../controller/workingTimeController";
import { ViewEmployeeOnly } from "./viewEmployee";
import EmployeeController from "../controller/employeeController";


function RequestWorkingTime() {
    const [newWorkingTime, setNewWorkingTime] = useState('');
    const [newReason, setNewReason] = useState('');

    return (
        <div className="content">
            <div className="content-bottom-gapped">
                <Form className="form-adjust">
                    <Form.Group className="mb-3" controlId="formBasicName">
                        <Form.Label className="white-color">Working Time ID</Form.Label>
                        <Form.Control type="text" placeholder="" onChange={(event) => { setNewWorkingTime(event.target.value) }} />
                        <Form.Text className="text-warning" >
                            Please input Working Time ID.
                        </Form.Text>
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicName">
                        <Form.Label className="white-color">Reason</Form.Label>
                        <Form.Control type="text" placeholder="" onChange={(event) => { setNewReason(event.target.value) }} />
                        <Form.Text className="text-warning" >
                            Please input Reason.
                        </Form.Text>
                    </Form.Group>

                    <Button variant="primary" onClick={() => AddWorkingTimeRequest(newWorkingTime, newReason)}>
                        Request Working Time
                    </Button>
                </Form >
            </div>
        </div >
    )
}

export function updateWorkingTimeRequest() {
    const workingTimeRequests = WorkingTimeRequestController();
    const employees = EmployeeController();
    const workingTimes = WorkingTimeController();
    let number = 0;
    return (
        <>
            <Table bordered hover size variant="dark">
                <thead>
                    <tr>
                        <th>Number</th>
                        <th>Employee Name</th>
                        <th>Working Time Request</th>
                        <th>Reason</th>
                        <th>Status</th>
                    </tr>
                </thead>

                {

                    workingTimeRequests.map((workingTimeRequest) => {

                        number++;
                        return (
                            <tbody>
                                <tr>
                                    {
                                        workingTimes.map((workingTime) => {
                                            console.log(workingTime.id);
                                            if (workingTimeRequest.after == workingTime.id && workingTimeRequest.status == "Pending") {
                                                console.log("heheheheh")
                                                return (
                                                    <>
                                                        {
                                                            employees.map((employee) => {
                                                                if (workingTimeRequest.employeeID == employee.id) {

                                                                    return (
                                                                        <>
                                                                            <td>{number}</td>
                                                                            <td>{employee.Name}</td>
                                                                            <td>{workingTime.shiftName}</td>
                                                                            <td>{workingTimeRequest.reason}</td>
                                                                            <td className={`${workingTimeRequest.status === "Pending" ? 'pending' : workingTimeRequest.status === "Approved" ? 'activeaaa' : 'inactiveaaa'}`}>{workingTimeRequest.status}</td>
                                                                            <td><Button className="" variant="success" type="submit" onClick={() => { setToAcceptedWorkingTimeRequest(workingTimeRequest.id, "Approved", employee.id, workingTimeRequest.after) }}>
                                                                                Accept
                                                                            </Button></td>

                                                                            <td><Button variant="danger" type="submit" onClick={() => { setToRejectedWorkingTimeRequest(workingTimeRequest.id, "Rejected") }}>
                                                                                Reject
                                                                            </Button></td>
                                                                        </>
                                                                    )
                                                                }
                                                            })
                                                        }
                                                    </>
                                                )

                                            } else if (workingTimeRequest.after == workingTime.id) {
                                                return (
                                                    <>
                                                        {
                                                            employees.map((employee) => {
                                                                if (workingTimeRequest.employeeID == employee.id) {

                                                                    return (
                                                                        <>
                                                                            <td>{number}</td>
                                                                            <td>{employee.Name}</td>
                                                                            <td>{workingTime.shiftName}</td>
                                                                            <td>{workingTimeRequest.reason}</td>
                                                                            <td className={`${workingTimeRequest.status === "Pending" ? 'pending' : workingTimeRequest.status === "Approved" ? 'activeaaa' : 'inactiveaaa'}`}>{workingTimeRequest.status}</td>
                                                                        </>
                                                                    )
                                                                }
                                                            })
                                                        }
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

export default function ViewWorkingTime() {
    let number = 0;

    const workingTimes = WorkingTimeController();


    return (
        <>
            <Table striped bordered hover size variant="dark">
                <thead>
                    <tr>
                        <th>Number</th>
                        <th>Shift ID</th>
                        <th>Shift Name</th>
                        <th>Shift Start</th>
                        <th>Shift End</th>
                    </tr>
                </thead>

                {

                    workingTimes.map((workingTime) => {
                        number++;
                        return (
                            // console.log({ employee.Name });
                            <tbody>
                                <tr>
                                    <td>{number}</td>
                                    <td>{workingTime.id}</td>
                                    <td>{workingTime.shiftName}</td>
                                    <td>{workingTime.shiftStart}</td>
                                    <td>{workingTime.shiftEnd}</td>
                                </tr>
                            </tbody>
                        )
                    })
                }
            </Table>
            <RequestWorkingTime />
        </>
    );
}