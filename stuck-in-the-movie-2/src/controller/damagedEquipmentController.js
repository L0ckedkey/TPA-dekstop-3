import { useState, useEffect, Component } from "react";
import { db } from '../firebase-config';
import { addDoc, collection, doc, getDocs, updateDoc } from 'firebase/firestore';

const monthNames = ["January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
];

export default function DamagedEquipmentController() {
    const [warningLetters, setResignationLetter] = useState([]);
    const warningLetterColectionRef = collection(db, "Damaged Facilities");

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
export const setToAcceptedEquipment = async (id, status) => {

    const resignationLetterDoc = doc(db, "Damaged Facilities", id)

    const newResignationData = { status: status, storageID: JSON.parse(sessionStorage.getItem("Login data")).id };

    await updateDoc(resignationLetterDoc, newResignationData);

    refreshViewWarningLetter();
}

export const setToRejectedEquipment = async (id, status) => {
    console.log(id)
    const resignationLetterDoc = doc(db, "Damaged Facilities", id)

    const newResignationData = { status: status, storageID: JSON.parse(sessionStorage.getItem("Login data")).id }
    await updateDoc(resignationLetterDoc, newResignationData);
    refreshViewWarningLetter();
}

const warningLetterColectionRef = collection(db, "Damaged Facilities");

export const addEquipmentDamagedController = async (equipmentID) => {

    const date = new Date();
    let day = date.getDate();;
    let month = monthNames[date.getMonth()]
    let year = date.getFullYear();
    let fullDate = day + " " + month + " " + year

    await addDoc(warningLetterColectionRef, { employeeID: JSON.parse(sessionStorage.getItem("Login data")).id, status: "Pending", equipmentID: equipmentID, issuedDate: fullDate, storageID: null })
    refreshViewWarningLetter();
};