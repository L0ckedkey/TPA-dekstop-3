import { useState, useEffect, Component } from "react";
import { db } from '../firebase-config';
import { addDoc, collection, doc, getDocs, updateDoc } from 'firebase/firestore';


export default function TermintationController() {
    const [warningLetters, setResignationLetter] = useState([]);
    const warningLetterColectionRef = collection(db, "Termination Letter");

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

export const setToAcceptedTerminationLetter = async (id, status, employeeID) => {
    console.log(id)
    console.log(employeeID)

    const employeeDoc = doc(db, "Employee", employeeID)
    const terminationLetterDoc = doc(db, "Termination Letter", id);

    const newTerminationData = { status: status };
    const newEmployeeData = { status: "Inactive" }
    await updateDoc(employeeDoc, newEmployeeData)
    await updateDoc(terminationLetterDoc, newTerminationData);

    refreshViewWarningLetter();
}

export const setToRejectedTerminationLetter = async (id, status) => {
    console.log(id)
    const resignationLetterDoc = doc(db, "Termination Letter", id)

    const newResignationData = { status: status }
    await updateDoc(resignationLetterDoc, newResignationData);
    refreshViewWarningLetter();
}



