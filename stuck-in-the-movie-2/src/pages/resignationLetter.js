import { useState, useEffect } from "react";
import { db } from '../firebase-config';
import { addDoc, collection, doc, getDocs, updateDoc } from 'firebase/firestore';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { ViewEmployeeOnly } from "./viewEmployee";




export function CreateResignationLetter() {
    const [employeeID, setNewEmployeeID] = useState('');
    const [managerID, setNewManagerID] = useState('');
    const [reason, setNewReason] = useState('');
    const [resignationDate, setNewResignationDate] = useState('');

    const resignationLetterColectionRef = collection(db, "Resignation Letter");

    const addResignationLetter = async () => {
        await addDoc(resignationLetterColectionRef, { employeeID: JSON.parse(sessionStorage.getItem("Login data")).id, managerID: managerID, reason: reason, resignationDate: resignationDate, status: "Pending" })
        refreshResignationLetter();
    };

    return (
        <>
            <h1 className="white-color">Crate Resignation Letter</h1>
            <div className="content">
                <div className="content-bottom-gapped">
                    <Form className="form-adjust">

                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label className="white-color">Reason</Form.Label>
                            <Form.Control type="text" placeholder="Enter Reason" onChange={(event) => { setNewReason(event.target.value) }} />
                            <Form.Text className="text-warning">
                                Please input reason.
                            </Form.Text>
                        </Form.Group>
                    </Form >
                </div>
                <div className="content-bottom-gapped">
                    <Form className="form-adjust">
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label className="white-color">Resignation Date</Form.Label>
                            <Form.Control type="text" placeholder="Enter phone number" onChange={(event) => { setNewResignationDate(event.target.value) }} />
                            <Form.Text className="text-warning">
                                Please input Resignation Date.
                            </Form.Text>
                        </Form.Group>

                        <Button variant="primary" type="submit" onClick={addResignationLetter}>
                            Add Resignation Letter
                        </Button>
                    </Form >
                </div>
            </div >
        </>
    );

}

function refreshResignationLetter() {
    window.location = window.location.pathname;
}



export default function ViewResignationLetter() {
    let number = 0;

    const resignationLetterColectionRef = collection(db, "Resignation Letter");

    const [employees, setEmployee] = useState([]);
    const employeeColectionRef = collection(db, "Employee");

    const setToAccepted = async (id, status, employeeID) => {
        console.log(id)
        console.log(employeeID)
        const resignationLetterDoc = doc(db, "Resignation Letter", id)
        const employeeDoc = doc(db, "Employee", employeeID)

        const newResignationData = { status: status, managerID: JSON.parse(sessionStorage.getItem("Login data")).id }
        const newEmployeeData = { Status: "Inactive" }
        await updateDoc(resignationLetterDoc, newResignationData);
        await updateDoc(employeeDoc, newEmployeeData);
        refreshResignationLetter();
    }

    const setToRejected = async (id, status) => {
        console.log(id)
        const resignationLetterDoc = doc(db, "Resignation Letter", id)

        const newResignationData = { status: status, managerID: JSON.parse(sessionStorage.getItem("Login data")).id }
        await updateDoc(resignationLetterDoc, newResignationData);
        refreshResignationLetter();
    }
    const [resignationLetters, setResignationLetter] = useState([]);
    useEffect(() => {
        const getResignationLetter = async () => {
            const data = await getDocs(resignationLetterColectionRef);
            setResignationLetter(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
            console.log(data);
        };
        getResignationLetter();

        const getEmployee = async () => {
            const data = await getDocs(employeeColectionRef);
            setEmployee(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
            console.log(data);
        };
        getEmployee();
    }, []);

    return (
        <>
            <Table size variant="dark">
                <thead>
                    <tr>
                        <th>Number</th>
                        <th>Employee Name</th>
                        <th>Resignation Date</th>
                        <th>Reason</th>
                        <th>Status</th>
                        <th>Accepted By</th>
                    </tr>
                </thead>
                {
                    resignationLetters.map((resignationLetter) => {
                        number++;

                        return (
                            // console.log({ employee.Name });
                            <tbody>
                                <tr>

                                    {
                                        employees.map((employee) => {

                                            if (resignationLetter.status === "Pending" && resignationLetter.employeeID == employee.id) {
                                                number++;
                                                return (
                                                    <>
                                                        <td> {number}</td>
                                                        <td>{employee.Name}</td>
                                                        <td>{resignationLetter.resignationDate}</td>
                                                        <td>{resignationLetter.reason}</td>
                                                        <td className={`${resignationLetter.status === "Pending" ? 'pending' : resignationLetter.status === "Approved" ? 'activeaaa' : 'inactiveaaa'}`}>{resignationLetter.status}</td>
                                                        <td><Button className="" variant="success" type="submit" onClick={() => { setToAccepted(resignationLetter.id, "Approved", employee.id) }}>
                                                            Accept
                                                        </Button></td>

                                                        <td><Button variant="danger" type="submit" onClick={() => { setToRejected(resignationLetter.id, "Rejected") }}>
                                                            Reject
                                                        </Button></td>
                                                    </>
                                                )

                                            } else if (resignationLetter.employeeID == employee.id) {
                                                return (<>
                                                    <td> {number}</td>
                                                    <td>{employee.Name}</td>
                                                    <td>{resignationLetter.resignationDate}</td>
                                                    <td>{resignationLetter.reason}</td>
                                                    <td className={`${resignationLetter.status === "Pending" ? 'pending' : resignationLetter.status === "Approved" ? 'activeaaa' : 'inactiveaaa'}`}>{resignationLetter.status}</td>
                                                </>);
                                            }
                                        })
                                    }
                                    {
                                        employees.map((employee) => {
                                            if (employee.id == resignationLetter.managerID) {
                                                return (
                                                    <td>{employee.Name}</td>
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