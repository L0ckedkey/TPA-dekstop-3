import { useRef, useState, useEffect, useContext } from "react";
import { auth, db } from '../firebase-config';
import { addDoc, collection, doc, getDocs, updateDoc } from 'firebase/firestore';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { createUserWithEmailAndPassword, onAuthStateChanged, signOut } from "firebase/auth";
import EmployeeController, { updateStatusDB } from "../controller/employeeController";
import WorkingTimeController from "../controller/workingTimeController";
import { GetWarningLetterReport } from "./ViewWarningLetter";

function refreshViewEmployee() {
    window.location = window.location.pathname;
}

export function viewEmployeeWithReport() {
    let number = 0;

    const employees = EmployeeController();
    const workingTimes = WorkingTimeController();

    const getInfo = event => {
        sessionStorage.setItem("ID", event.currentTarget.id)
        refreshViewEmployee();
    }
    let IDEmployee = sessionStorage.getItem("ID");
    // console.log(IDEmployee);
    if (IDEmployee !== null) {
        return (
            <>
                <Table bordered hover size variant="dark">
                    <thead>
                        <tr>
                            <th>Number</th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Status</th>
                        </tr>
                    </thead>

                    {

                        employees.map((employee) => {


                            if (employee.asd != "asd") {
                                number++;
                                return (
                                    // console.log({ employee.Name });
                                    <tbody>
                                        <tr>
                                            <td>{number}</td>
                                            <td><button id={employee.id} className="button-test" onClick={getInfo}>{employee.Name}</button></td>
                                            <td>{employee.Email}</td>
                                            <td className={`${employee.Status === "Active" ? 'activeaaa' : 'inactiveaaa'}`}>{employee.Status}</td>
                                        </tr>
                                    </tbody>

                                )
                            }

                        })
                    }
                </Table>
                <div>
                    <Table bordered hover size variant="dark">
                        <thead>
                            <tr>
                                <th>Image</th>
                                <th>Name</th>
                                <th>Email</th>
                                <th>Address</th>
                                <th>Position</th>
                                <th>Shift</th>
                                <th>Salary</th>
                                <th>Warning Letter</th>
                            </tr>
                        </thead>

                        {
                            employees.map((employee) => {
                                if (employee.id == IDEmployee && employee.asd != "asd") {
                                    return (
                                        <tbody>
                                            <tr>
                                                {
                                                    workingTimes.map((workingTime) => {
                                                        if (employee.workingTime == workingTime.id) {
                                                            return (
                                                                <>
                                                                    <td><img src={employee.img}></img></td>
                                                                    <td>{employee.Name}</td>
                                                                    <td>{employee.Email}</td>
                                                                    <td>{employee.address}</td>
                                                                    <td>{employee.position}</td>
                                                                    <td>{workingTime.shiftName}</td>
                                                                    <td>{employee.salary}</td>
                                                                    <td>{employee.warningLetter}</td>
                                                                </>
                                                            )
                                                        }
                                                    })
                                                }
                                            </tr>
                                        </tbody>
                                    );
                                }

                            })
                        }

                    </Table>
                </div>
                <GetWarningLetterReport />
                <AddEmplooye />
            </>
        );
    } else {
        return (
            <>
                <Table bordered hover size variant="dark">
                    <thead>
                        <tr>
                            <th>Number</th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Status</th>
                        </tr>
                    </thead>
                    {
                        employees.map((employee) => {

                            if (employee.asd != "asd") {
                                number++;
                                return (
                                    // console.log({ employee.Name });
                                    <tbody>
                                        <tr>
                                            <td>{number}</td>
                                            <td><button id={employee.id} className="button-test" onClick={getInfo}>{employee.Name}</button></td>
                                            <td>{employee.Email}</td>
                                            <td className={`${employee.Status === "Active" ? 'activeaaa' : 'inactiveaaa'}`} >{employee.Status}</td>
                                        </tr>
                                    </tbody>

                                )
                            }

                        })
                    }
                </Table>
                <GetWarningLetterReport />


            </>
        );
    }
}

export function viewEmployeeAndAddEmployee() {
    return (
        <>
            <ViewEmployeeOnly />
            <AddEmplooye />
        </>
    )
}

export function ViewEmployeeOnly() {
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
                        <th>Status</th>
                    </tr>
                </thead>
                {
                    employees.map((employee) => {

                        if (employee.Status === "Active") {
                            number++;
                            return (
                                // console.log({ employee.Name });
                                <tbody>
                                    <tr>
                                        <td>{number}</td>
                                        <td>{employee.id}</td>
                                        <td>{employee.Name}</td>
                                        <td>{employee.Email}</td>
                                        <td className={`${employee.Status === "Active" ? 'activeaaa' : 'inactiveaaa'}`} >{employee.Status}</td>
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

export function AddEmplooye() {
    const [name, setNewName] = useState('');
    const [email, setNewEmail] = useState('');
    const [phoneNumber, setNewPhoneNumber] = useState('');
    const [address, setNewAddress] = useState('');
    const [img, setNewImg] = useState('');
    const [password, setNewPassword] = useState('');
    const [workingTime, setNewWorkingTime] = useState('');
    const [salary, setNewSalary] = useState(0);
    const [position, setNewPosition] = useState('');
    const employeeColectionRef = collection(db, "Employee");


    const addEmployee = async () => {
        await addDoc(employeeColectionRef, { Name: name, Email: email, Status: "Active", phoneNumber: phoneNumber, address: address, img: img, clockIn: "-", clockOut: "-" });

        try {
            const user = await createUserWithEmailAndPassword(auth, email, password);
            console.log(user);
        } catch (error) {
            console.log(error.message);
        }

        refreshViewEmployee();
    };

    return (
        <div className="content">
            <div className="content-bottom-gapped">
                <Form className="form-adjust">
                    <Form.Group className="mb-3" controlId="formBasicName">
                        <Form.Label className="white-color">Name</Form.Label>
                        <Form.Control type="text" placeholder="Enter name" onChange={(event) => { setNewName(event.target.value) }} />
                        <Form.Text className="text-warning" >
                            Please input your full name.
                        </Form.Text>
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label className="white-color">Email address</Form.Label>
                        <Form.Control type="email" placeholder="Enter email" onChange={(event) => { setNewEmail(event.target.value) }} />
                        <Form.Text className="text-warning">
                            We'll never share your email with anyone else.
                        </Form.Text>
                    </Form.Group>


                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label className="white-color">Image</Form.Label>
                        <Form.Control type="text" placeholder="Enter image url" onChange={(event) => { setNewImg(event.target.value) }} />
                        <Form.Text className="text-warning">
                            We'll never share your image with anyone else.
                        </Form.Text>
                    </Form.Group>
                </Form >
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label className="white-color">Working Time</Form.Label>
                    <Form.Control type="email" placeholder="Enter email" onChange={(event) => { setNewWorkingTime(event.target.value) }} />
                    <Form.Text className="text-warning">
                        We'll never share your email with anyone else.
                    </Form.Text>
                </Form.Group>


                <Button variant="primary" type="submit" onClick={addEmployee}>
                    Add Employee
                </Button>
            </div>
            <div className="content-bottom-gapped">
                <Form className="form-adjust">
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label className="white-color">Phone Number</Form.Label>
                        <Form.Control type="text" placeholder="Enter phone number" onChange={(event) => { setNewPhoneNumber(event.target.value) }} />
                        <Form.Text className="text-warning">
                            We'll never share your phone number with anyone else.
                        </Form.Text>
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label className="white-color">Address</Form.Label>
                        <Form.Control type="text" placeholder="Enter address" onChange={(event) => { setNewAddress(event.target.value) }} />
                        <Form.Text className="text-warning">
                            We'll never share your Address with anyone else.
                        </Form.Text>
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label className="white-color">Password</Form.Label>
                        <Form.Control type="password" placeholder="Enter password" onChange={(event) => { setNewPassword(event.target.value) }} />
                        <Form.Text className="text-warning">
                            We'll never share your password with anyone else.
                        </Form.Text>
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label className="white-color">Salary</Form.Label>
                        <Form.Control type="email" placeholder="Enter email" onChange={(event) => { setNewSalary(event.target.value) }} />
                        <Form.Text className="text-warning">
                            We'll never share your email with anyone else.
                        </Form.Text>
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label className="white-color">Position</Form.Label>
                        <Form.Control type="email" placeholder="Enter email" onChange={(event) => { setNewPosition(event.target.value) }} />
                        <Form.Text className="text-warning">
                            We'll never share your email with anyone else.
                        </Form.Text>
                    </Form.Group>

                </Form >
            </div>
        </div >
    );

}

export default function ViewEmployee() {
    let number = 0;

    const employees = EmployeeController();
    const workingTimes = WorkingTimeController();

    const getInfo = event => {
        sessionStorage.setItem("ID", event.currentTarget.id)
        refreshViewEmployee();
    }
    let IDEmployee = sessionStorage.getItem("ID");
    // console.log(IDEmployee);
    if (IDEmployee !== null) {
        return (
            <>
                <Table bordered hover size variant="dark">
                    <thead>
                        <tr>
                            <th>Number</th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Status</th>
                        </tr>
                    </thead>

                    {

                        employees.map((employee) => {
                            number++;
                            return (
                                // console.log({ employee.Name });
                                <tbody>
                                    <tr>
                                        <td>{number}</td>
                                        <td><button id={employee.id} className="button-test" onClick={getInfo}>{employee.Name}</button></td>
                                        <td>{employee.Email}</td>
                                        <td className={`${employee.Status === "Active" ? 'activeaaa' : 'inactiveaaa'}`}>{employee.Status}</td>
                                    </tr>
                                </tbody>

                            )
                        })
                    }
                </Table>
                <div>
                    <Table bordered hover size variant="dark">
                        <thead>
                            <tr>
                                <th>Image</th>
                                <th>Name</th>
                                <th>Email</th>
                                <th>Address</th>
                                <th>Position</th>
                                <th>Shift</th>
                                <th>Salary</th>
                                <th>Warning Letter</th>
                            </tr>
                        </thead>

                        {
                            employees.map((employee) => {
                                if (employee.id == IDEmployee) {
                                    return (
                                        <tbody>
                                            <tr>
                                                {
                                                    workingTimes.map((workingTime) => {
                                                        if (employee.workingTime == workingTime.id) {
                                                            return (
                                                                <>
                                                                    <td><img src={employee.img}></img></td>
                                                                    <td>{employee.Name}</td>
                                                                    <td>{employee.Email}</td>
                                                                    <td>{employee.address}</td>
                                                                    <td>{employee.position}</td>
                                                                    <td>{workingTime.shiftName}</td>
                                                                    <td>{employee.salary}</td>
                                                                    <td>{employee.warningLetter}</td>
                                                                </>
                                                            )
                                                        }
                                                    })
                                                }
                                            </tr>
                                        </tbody>
                                    );
                                }

                            })
                        }

                    </Table>
                </div>
                <AddEmplooye />
            </>
        );
    } else {
        return (
            <>
                <Table bordered hover size variant="dark">
                    <thead>
                        <tr>
                            <th>Number</th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Status</th>
                        </tr>
                    </thead>
                    {
                        employees.map((employee) => {
                            number++;
                            return (
                                // console.log({ employee.Name });
                                <tbody>
                                    <tr>
                                        <td>{number}</td>
                                        <td><button id={employee.id} className="button-test" onClick={getInfo}>{employee.Name}</button></td>
                                        <td>{employee.Email}</td>
                                        <td className={`${employee.Status === "Active" ? 'activeaaa' : 'inactiveaaa'}`} >{employee.Status}</td>
                                    </tr>
                                </tbody>

                            )
                        })
                    }
                </Table>
                <AddEmplooye />

            </>
        );
    }
}
