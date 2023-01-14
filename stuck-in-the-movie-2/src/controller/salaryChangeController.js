import { useState, useEffect, Component } from "react";
import { db } from '../firebase-config';
import { addDoc, collection, doc, getDoc, getDocs, updateDoc } from 'firebase/firestore';
import EmployeeController from "./employeeController";

const monthNames = ["January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
];

export default function SalaryChangeController() {
    const [warningLetters, setResignationLetter] = useState([]);
    const warningLetterColectionRef = collection(db, "Salary Change Header");

    useEffect(() => {
        const getWarningLetter = async () => {
            const data = await getDocs(warningLetterColectionRef);
            setResignationLetter(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
            console.log(data);
        };
        getWarningLetter();
    }, []);

    return warningLetters;
}

export function SalaryChangeDetailController() {
    const [warningLetters, setResignationLetter] = useState([]);
    const warningLetterColectionRef = collection(db, "Salary Change Detail");

    useEffect(() => {
        const getWarningLetter = async () => {
            const data = await getDocs(warningLetterColectionRef);
            setResignationLetter(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
            console.log(data);
        };
        getWarningLetter();
    }, []);

    return warningLetters;
}

function refreshViewWarningLetter() {
    window.location = window.location.pathname;
}


export const setToAccepted = async (id) => {

    const resignationLetterDoc = doc(db, "Salary Change Header", id)

    const newResignationData = { status: "Approved", managerID: JSON.parse(sessionStorage.getItem("Login data")).id };

    await updateDoc(resignationLetterDoc, newResignationData);

    refreshViewWarningLetter();
}

export const setToRejected = async (id) => {
    console.log(id)
    const resignationLetterDoc = doc(db, "Salary Change Header", id)

    const newResignationData = { status: "Rejected", managerID: JSON.parse(sessionStorage.getItem("Login data")).id }
    await updateDoc(resignationLetterDoc, newResignationData);
    refreshViewWarningLetter();
}


export const addSalaryChangeHeader = async () => {
    const warningLetterColectionRef = collection(db, "Salary Change Header");

    const date = new Date();
    let day = date.getDate();;
    let month = monthNames[date.getMonth()]
    let year = date.getFullYear();
    let fullDate = day + " " + month + " " + year

    let employeeID = JSON.parse(sessionStorage.getItem("Login data")).id

    await addDoc(warningLetterColectionRef, { issuedBy: employeeID, issuedDate: fullDate, managerID: "as", status: "Pending" }).then(function (docRef) {
        sessionStorage.setItem("Salary Change Header", docRef.id)
    })
    refreshViewWarningLetter();
};




export const AddSalaryChangeDetail = async (employeeID, newSalary) => {
    const warningLetterColectionRef = collection(db, "Salary Change Detail");


    let employeeName, employeeOldSalary
    const employeeDoc = doc(db, "Employee", employeeID)
    const employeeDocSnap = await getDoc(employeeDoc)
    let json = JSON.stringify(employeeDocSnap.data())

    await addDoc(warningLetterColectionRef, { employeeID: employeeID, employeeName: JSON.parse(json).Name, employeeOldSalary: JSON.parse(json).salary, employeeNewSalary: newSalary, salaryChangeID: sessionStorage.getItem("Salary Change Header") })

    refreshViewWarningLetter();
};

export const DoneAdd = async () => {
    const warningLetterColectionRef = collection(db, "Salary Change Detail");
    sessionStorage.removeItem("Salary Change Header")


    refreshViewWarningLetter();
};



