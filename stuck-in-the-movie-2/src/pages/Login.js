import { useRef, useState, useEffect, useContext } from "react";
import { auth, db } from '../firebase-config';
import { addDoc, collection, doc, getDoc, getDocs, updateDoc } from 'firebase/firestore';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { async } from "@firebase/util";
import { signInWithEmailAndPassword, onAuthStateChanged, signOut } from "firebase/auth";
import WorkingTimeController from "../controller/workingTimeController";

export function refreshLogin() {
    window.location = window.location.pathname;
}


export const setLoginTime = async (id) => {
    const current = new Date();
    const time = current.toLocaleTimeString("en-US", {
        hour: "2-digit",
        minute: "2-digit",
        hour12: false
    });
    const resignationLetterDoc = doc(db, "Employee", id)
    const docSnap = await getDoc(resignationLetterDoc);
    let JsonData = JSON.stringify(docSnap.data())
    const getUserDate = JSON.parse(JsonData).day

    if (JSON.parse(JsonData).clockIn == "-" || Number(getUserDate) != Number(current.getDate())) {
        const newResignationData = { clockIn: time, clockOut: "-", day: Number(current.getDate()) }
        await updateDoc(resignationLetterDoc, newResignationData);
        sessionStorage.setItem("Time Log in", time)
        console.log("if")
    } else {
        console.log("else")
        sessionStorage.setItem("Time Log in", JSON.parse(JsonData).clockIn)
    }

    if (JSON.parse(JsonData).clockOut != "-") {
        sessionStorage.setItem("Time Log out", JSON.parse(JsonData).clockOut)
    }


}

export const setClockOut = async () => {
    const id = JSON.parse(sessionStorage.getItem("Login data")).id
    const current = new Date();
    const time = current.toLocaleTimeString("en-US", {
        hour: "2-digit",
        minute: "2-digit",
        hour12: false
    });
    sessionStorage.setItem("Time Log out", time)

    const resignationLetterDoc = doc(db, "Employee", id)
    const docSnap = await getDoc(resignationLetterDoc);
    const JsonData = JSON.stringify(docSnap.data())
    console.log(JSON.parse(JsonData).clockOut)
    if (JSON.parse(JsonData).clockOut == "-") {
        const newResignationData = { clockOut: time }
        await updateDoc(resignationLetterDoc, newResignationData);
        sessionStorage.setItem("Time Log out", time)
    } else {
        sessionStorage.setItem("Time Log out", JSON.parse(JsonData).clockOut)
    }
    refreshLogin();



}
const delay = ms => new Promise(
    resolve => setTimeout(resolve, ms)
);


export default function Login() {
    // console.log("hoho")
    const [loginEmail, setLoginEmail] = useState("");
    const [loginPassword, setLoginPassword] = useState("");
    const [Newuser, setUser] = useState({});

    const refresh = () => {
        onAuthStateChanged(auth, (currUser) => {
            setUser(currUser);
        })
    }
    const [employees, setEmployee] = useState([]);
    const employeeColectionRef = collection(db, "Employee");

    useEffect(() => {
        const getEmployee = async () => {
            const data = await getDocs(employeeColectionRef);
            setEmployee(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
            // console.log(data);
        };
        getEmployee();
    }, []);

    const workingTimes = WorkingTimeController();

    const LoginUser = async () => {

        try {
            // console.log("hehe")
            const user = await signInWithEmailAndPassword(auth, loginEmail, loginPassword);

            employees.map((employee) => {
                // console.log(employee.Email + loginEmail + employee.Status)
                if (employee.Email !== undefined) {
                    if (employee.Email.toLowerCase() == loginEmail && employee.Status === "Active") {
                        workingTimes.map((workingTime) => {
                            if (workingTime.id = employee.workingTime) {
                                const Credential = {
                                    email: employee.Email,
                                    name: employee.Name,
                                    id: employee.id,
                                    position: employee.position,
                                    shiftStart: workingTime.shiftStart,
                                    shiftEnd: workingTime.shiftEnd
                                }
                                setLoginTime(employee.id)

                                sessionStorage.setItem("Login data", JSON.stringify(Credential))

                            }
                        })


                    }
                }

            })

            refresh();
            await delay(1000)
            refreshLogin();
        } catch (error) {
            console.log(error.message);
        }
    };

    return (
        <div className="login-page">
            <h1 className="white-color">
                Login
            </h1>
            <Form className="form-adjust">
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label className="white-color">Email address</Form.Label>
                    <Form.Control type="email" placeholder="Enter email" onChange={(event) => { setLoginEmail(event.target.value) }} />
                    <Form.Text className="text-warning">
                        We'll never share your email with anyone else.
                    </Form.Text>
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label className="white-color">Password</Form.Label>
                    <Form.Control type="password" placeholder="Enter password" onChange={(event) => { setLoginPassword(event.target.value) }} />
                    <Form.Text className="text-warning">
                        We'll never share your password with anyone else.
                    </Form.Text>
                </Form.Group>
            </Form >
            <Button variant="primary" onClick={LoginUser}>
                Login
            </Button>
        </div>
    );
}