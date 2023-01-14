import { useRef, useState, useEffect, useContext } from "react";
import { auth, db } from '../firebase-config';
import { addDoc, collection, doc, getDocs, updateDoc } from 'firebase/firestore';
import EmployeeController from "./employeeController";

export default function WorkingTimeController() {
    const [employees, setEmployee] = useState([]);
    const employeeColectionRef = collection(db, "Working Time");

    useEffect(() => {
        const getEmployee = async () => {
            const data = await getDocs(employeeColectionRef);
            setEmployee(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
            console.log(data);
        };
        getEmployee();
    }, []);

    return employees;
}


export function WorkingTimeRequestController() {
    const [employees, setEmployee] = useState([]);
    const employeeColectionRef = collection(db, "Working Time Request");

    useEffect(() => {
        const getEmployee = async () => {
            const data = await getDocs(employeeColectionRef);
            setEmployee(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
            console.log(data);
        };
        getEmployee();
    }, []);

    return employees;
}


const warningLetterColectionRef = collection(db, "Working Time Request");
function refreshViewWarningLetter() {
    window.location = window.location.pathname;
}
export const AddWorkingTimeRequest = async (workingTimeID, reason) => {

    let targetEmployeeID = JSON.parse(sessionStorage.getItem("Login data")).id;

    await addDoc(warningLetterColectionRef, { employeeID: targetEmployeeID, after: workingTimeID, status: "Pending", reason: reason })
    refreshViewWarningLetter();
};

export const setToAcceptedWorkingTimeRequest = async (id, status, employeeID, after) => {

    const workingTimeReqDoc = doc(db, "Working Time Request", id)
    const employeeDoc = doc(db, "Employee", employeeID)

    const newWorkingTimeRequest = { status: status };
    let newEmployeeData = { workingTime: after };

    await updateDoc(employeeDoc, newEmployeeData)
    await updateDoc(workingTimeReqDoc, newWorkingTimeRequest);

    refreshViewWarningLetter();
}

export const setToRejectedWorkingTimeRequest = async (id, status) => {
    console.log(id)
    const resignationLetterDoc = doc(db, "Warning Letter", id)

    const newResignationData = { status: status }
    await updateDoc(resignationLetterDoc, newResignationData);
    refreshViewWarningLetter();
}