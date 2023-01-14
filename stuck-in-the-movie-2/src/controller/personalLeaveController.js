import { useState, useEffect, Component } from "react";
import { db } from '../firebase-config';
import { addDoc, collection, doc, getDocs, updateDoc } from 'firebase/firestore';


export default function PersonalLeaveController() {
    const [warningLetters, setResignationLetter] = useState([]);
    const warningLetterColectionRef = collection(db, "Personal Leave");

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

export const setToAccepted = async (id, status) => {


    console.log(id)
    const resignationLetterDoc = doc(db, "Personal Leave", id)

    const newResignationData = { status: status, humanResourceID: JSON.parse(sessionStorage.getItem("Login data")).id }
    await updateDoc(resignationLetterDoc, newResignationData);

    refreshViewWarningLetter();
}

export const setToRejected = async (id, status) => {
    console.log(id)
    const resignationLetterDoc = doc(db, "Personal Leave", id)

    const newResignationData = { status: status, humanResourceID: JSON.parse(sessionStorage.getItem("Login data")).id }
    await updateDoc(resignationLetterDoc, newResignationData);
    refreshViewWarningLetter();
}

const warningLetterColectionRef = collection(db, "Personal Leave");



const personalLeaveColectionRef = collection(db, "Personal Leave");

export const addPersonalLeave = async (startLeave, endLeave, reason) => {
    await addDoc(personalLeaveColectionRef, { employeeID: JSON.parse(sessionStorage.getItem("Login data")).id, humanResourceID: " ", reason: reason, startLeave: startLeave, endLeave: endLeave, status: "Pending" })
    refreshViewWarningLetter();
};


