import { useState, useEffect } from "react";
import { db } from '../firebase-config';
import { addDoc, collection, getDocs } from 'firebase/firestore';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import FBOrderHeaderController, { addFBDetail, addFBHeader, DoneOrder, FBOrderDetailController, setToProcessed, setToReady } from "../controller/FBOrderController";
import EmployeeController from "../controller/employeeController";
import SalaryChangeController, { AddSalaryChangeDetail, addSalaryChangeDetail, addSalaryChangeHeader, DoneAdd, SalaryChangeDetailController, setToAccepted, setToRejected } from "../controller/salaryChangeController";

function refreshViewEmployee() {
    window.location = window.location.pathname;
}

export function ViewSalaryChange() {
    let number = 0;

    const FBHeaders = SalaryChangeController();
    const employees = EmployeeController();
    const FBDetail = SalaryChangeDetailController();


    const getInfo = event => {
        sessionStorage.setItem("Salary Change ID", event.currentTarget.id)
        refreshViewEmployee();
    }

    let SalaryChangeID = sessionStorage.getItem("Salary Change ID")

    if (SalaryChangeID == null) {
        return (
            <>
                <Table bordered hover size variant="dark">
                    <thead>
                        <tr>
                            <th>Salary Change ID</th>
                            <th>Issued By</th>
                            <th>Issued Date</th>
                            <th>Status</th>
                        </tr>
                    </thead>
                    <thead>

                        {

                            FBHeaders.map((FBHeader) => {

                                number++;
                                return (

                                    <tr>
                                        {
                                            employees.map((employee) => {
                                                if (FBHeader.issuedBy == employee.id) {
                                                    console.log("haha")
                                                    return (
                                                        <>
                                                            <td><button id={FBHeader.id} className="button-test" onClick={getInfo}>{FBHeader.id}</button></td>
                                                            <td>{employee.Name}</td>
                                                            <td>{FBHeader.issuedDate}</td>
                                                            <td className={`${FBHeader.status === "Pending" ? 'pending' : FBHeader.status === "Approved" ? 'activeaaa' : 'inactiveaaa'}`}>{FBHeader.status}</td>
                                                        </>
                                                    )
                                                }
                                            })
                                        }

                                    </tr>

                                )
                            })
                        }
                    </thead>
                </Table>
            </>
        );
    } else {
        return (
            <div className="content-bottom-gapped">
                <>
                    <Table bordered hover size variant="dark">
                        <thead>
                            <tr>
                                <th>Salary Change ID</th>
                                <th>Issued By</th>
                                <th>Issued Date</th>
                                <th>Status</th>
                            </tr>
                        </thead>
                        <thead>
                            <tr>

                                {

                                    FBHeaders.map((FBHeader) => {

                                        number++;
                                        return (
                                            <>
                                                {
                                                    employees.map((employee) => {
                                                        if (FBHeader.issuedBy == employee.id) {
                                                            console.log("haha")
                                                            return (
                                                                <>
                                                                    <td><button id={FBHeader.id} className="button-test" onClick={getInfo}>{FBHeader.id}</button></td>
                                                                    <td>{employee.Name}</td>
                                                                    <td>{FBHeader.issuedDate}</td>
                                                                    <td className={`${FBHeader.status === "Pending" ? 'pending' : FBHeader.status === "Approved" ? 'activeaaa' : 'inactiveaaa'}`}>{FBHeader.status}</td>
                                                                </>
                                                            )
                                                        }
                                                    })
                                                }

                                            </>
                                        )
                                    })
                                }
                            </tr>
                        </thead>
                    </Table>
                </>


                <>
                    <Table bordered hover size variant="dark">
                        <thead>
                            <tr>
                                <th>Employee ID</th>
                                <th>Employee Name</th>
                                <th>Employee Old Salary</th>
                                <th>Employee New Salary</th>
                            </tr>
                        </thead>
                        <thead>
                            <tr>

                                {

                                    FBDetail.map((FBHeader) => {

                                        number++;
                                        if (SalaryChangeID == FBHeader.salaryChangeID) {
                                            return (
                                                <>
                                                    <td>{FBHeader.employeeID}</td>
                                                    <td>{FBHeader.employeeName}</td>
                                                    <td>{FBHeader.employeeOldSalary}</td>
                                                    <td>{FBHeader.employeeNewSalary}</td>
                                                </>
                                            )
                                        }
                                    })
                                }
                            </tr>
                        </thead>
                    </Table>
                </>
            </div>


        );
    }




}


export function ViewSalaryChangeManager() {
    let number = 0;

    const FBHeaders = SalaryChangeController();
    const employees = EmployeeController();
    const FBDetail = SalaryChangeDetailController();


    const getInfo = event => {
        sessionStorage.setItem("Salary Change ID", event.currentTarget.id)
        refreshViewEmployee();
    }

    let SalaryChangeID = sessionStorage.getItem("Salary Change ID")

    if (SalaryChangeID == null) {
        return (
            <>
                <Table bordered hover size variant="dark">
                    <thead>
                        <tr>
                            <th>Salary Change ID</th>
                            <th>Issued By</th>
                            <th>Issued Date</th>
                            <th>Status</th>
                        </tr>
                    </thead>
                    <thead>
                        <tr>

                            {

                                FBHeaders.map((FBHeader) => {

                                    number++;
                                    return (
                                        <>
                                            {
                                                employees.map((employee) => {
                                                    if (FBHeader.issuedBy == employee.id && FBHeader.status == "Pending") {
                                                        console.log("haha")
                                                        return (
                                                            <>
                                                                <td><button id={FBHeader.id} className="button-test" onClick={getInfo}>{FBHeader.id}</button></td>
                                                                <td>{employee.Name}</td>
                                                                <td>{FBHeader.issuedDate}</td>
                                                                <td className={`${FBHeader.status === "Pending" ? 'pending' : FBHeader.status === "Approved" ? 'activeaaa' : 'inactiveaaa'}`}>{FBHeader.status}</td>

                                                                <td><Button className="" variant="success" type="submit" onClick={() => { setToAccepted(FBHeader.id) }}>
                                                                    Accept
                                                                </Button></td>

                                                                <td><Button variant="danger" type="submit" onClick={() => { setToRejected(FBHeader.id) }}>
                                                                    Reject
                                                                </Button></td>
                                                            </>
                                                        )
                                                    } else if (FBHeader.issuedBy == employee.id) {
                                                        return (
                                                            <>
                                                                <td><button id={FBHeader.id} className="button-test" onClick={getInfo}>{FBHeader.id}</button></td>
                                                                <td>{employee.Name}</td>
                                                                <td>{FBHeader.issuedDate}</td>
                                                                <td className={`${FBHeader.status === "Pending" ? 'pending' : FBHeader.status === "Approved" ? 'activeaaa' : 'inactiveaaa'}`}>{FBHeader.status}</td>

                                                            </>
                                                        )
                                                    }
                                                })
                                            }

                                        </>
                                    )
                                })
                            }
                        </tr>
                    </thead>
                </Table>
            </>
        );
    } else {
        return (
            <>
                <>
                    <Table bordered hover size variant="dark">
                        <thead>
                            <tr>
                                <th>Salary Change ID</th>
                                <th>Issued By</th>
                                <th>Issued Date</th>
                                <th>Status</th>
                            </tr>
                        </thead>
                        <thead>
                            <tr>

                                {

                                    FBHeaders.map((FBHeader) => {

                                        number++;
                                        return (
                                            <>
                                                {
                                                    employees.map((employee) => {
                                                        if (FBHeader.issuedBy == employee.id && FBHeader.status == "Pending") {
                                                            console.log("haha")
                                                            return (
                                                                <>
                                                                    <td><button id={FBHeader.id} className="button-test" onClick={getInfo}>{FBHeader.id}</button></td>
                                                                    <td>{employee.Name}</td>
                                                                    <td>{FBHeader.issuedDate}</td>
                                                                    <td className={`${FBHeader.status === "Pending" ? 'pending' : FBHeader.status === "Approved" ? 'activeaaa' : 'inactiveaaa'}`}>{FBHeader.status}</td>

                                                                    <td><Button className="" variant="success" type="submit" onClick={() => { setToAccepted(FBHeader.id) }}>
                                                                        Accept
                                                                    </Button></td>

                                                                    <td><Button variant="danger" type="submit" onClick={() => { setToRejected(FBHeader.id) }}>
                                                                        Reject
                                                                    </Button></td>
                                                                </>
                                                            )
                                                        } else if (FBHeader.issuedBy == employee.id) {
                                                            return (
                                                                <>
                                                                    <td><button id={FBHeader.id} className="button-test" onClick={getInfo}>{FBHeader.id}</button></td>
                                                                    <td>{employee.Name}</td>
                                                                    <td>{FBHeader.issuedDate}</td>
                                                                    <td className={`${FBHeader.status === "Pending" ? 'pending' : FBHeader.status === "Approved" ? 'activeaaa' : 'inactiveaaa'}`}>{FBHeader.status}</td>

                                                                </>
                                                            )
                                                        }
                                                    })
                                                }

                                            </>
                                        )
                                    })
                                }
                            </tr>
                        </thead>
                    </Table>
                </>


                <>
                    <Table bordered hover size variant="dark">
                        <thead>
                            <tr>
                                <th>Employee ID</th>
                                <th>Employee Name</th>
                                <th>Employee Old Salary</th>
                                <th>Employee New Salary</th>
                            </tr>
                        </thead>
                        <thead>
                            <tr>

                                {

                                    FBDetail.map((FBHeader) => {

                                        number++;
                                        if (SalaryChangeID == FBHeader.salaryChangeID) {
                                            return (
                                                <>
                                                    <td>{FBHeader.employeeID}</td>
                                                    <td>{FBHeader.employeeName}</td>
                                                    <td>{FBHeader.employeeOldSalary}</td>
                                                    <td>{FBHeader.employeeNewSalary}</td>
                                                </>
                                            )
                                        }
                                    })
                                }
                            </tr>
                        </thead>
                    </Table>
                </>
            </>


        );
    }




}

function ViewEmployeeFiltered() {
    let number = 0;




    const employees = EmployeeController();

    return (
        <>
            <Table bordered hover size variant="dark">
                <thead>
                    <tr>
                        <th>Number</th>
                        <th>Employee ID</th>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Working Performance</th>
                        <th>Old Salary</th>
                        <th>Expected Salary based on calculation</th>
                    </tr>
                </thead>
                {
                    employees.map((employee) => {
                        let salaryCalculation = parseInt(employee.workingPerformance) * 350000
                        if (employee.Status === "Active" && salaryCalculation > employee.salary) {
                            number++;
                            return (
                                // console.log({ employee.Name });
                                <tbody>
                                    <tr>
                                        <td>{number}</td>
                                        <td>{employee.id}</td>
                                        <td>{employee.Name}</td>
                                        <td>{employee.Email}</td>
                                        <th>{employee.workingPerformance}</th>
                                        <th>{employee.salary}</th>
                                        <th>{salaryCalculation}</th>
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

export function CreateSalaryChange() {
    const [salary, setNewSalary] = useState('');
    const [employeeID, setNewEmployeeID] = useState('');

    if (sessionStorage.getItem("Salary Change Header") == null) {
        return (
            <>
                <ViewEmployeeFiltered />
                <Button variant="primary" onClick={() => addSalaryChangeHeader()} type="submit">
                    Add Salary Change
                </Button>
            </>

        )
    } else {
        return (<>
            <ViewEmployeeFiltered />
            <div className="content-bottom-gapped">
                <Form className="form-adjust">
                    <Form.Group className="mb-3" controlId="formBasicName">
                        <Form.Label className="white-color">Employee ID</Form.Label>
                        <Form.Control type="text" placeholder="Enter date" onChange={(event) => { setNewEmployeeID(event.target.value) }} />
                        <Form.Text className="text-warning" >
                            Please input Employee ID.
                        </Form.Text>
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formBasicName">
                        <Form.Label className="white-color">New Salary</Form.Label>
                        <Form.Control type="text" placeholder="Enter date" onChange={(event) => { setNewSalary(event.target.value) }} />
                        <Form.Text className="text-warning" >
                            Please input new salary.
                        </Form.Text>
                    </Form.Group>
                </Form >
            </div>
            <Button variant="primary" onClick={() => AddSalaryChangeDetail(employeeID, salary)} type="submit">
                Add Employee
            </Button>
            <Button variant="primary" onClick={() => DoneAdd()} type="submit">
                Done
            </Button>
        </>)

    }

}