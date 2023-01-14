import { useRef, useState, useEffect, useContext } from "react";
import { auth, db } from '../firebase-config';
import { addDoc, collection, doc, getDocs, updateDoc } from 'firebase/firestore';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { async } from "@firebase/util";
import { createUserWithEmailAndPassword, onAuthStateChanged, signOut } from "firebase/auth";
import getAllData from "../context/equipmentMode";

export default function EquipmentController() {
    const [employees, setEmployee] = useState([]);
    const employeeColectionRef = collection(db, "Equipment");

    
    // console.log(res);
    useEffect(() => {
        const getEmployee = async () => {
            const res = await getAllData()
            // const data = await getDocs(employeeColectionRef);
            setEmployee(res)
            console.log(res)
            // setEmployee(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
            // console.log(data);
        };
        getEmployee();
    }, []);

    return employees;
}

function refreshViewEquipment() {
    window.location = window.location.pathname;
}

const warningLetterColectionRef = collection(db, "Equipment");

export const addEquipment = async (equipmentName, quantity, type) => {
    await addDoc(warningLetterColectionRef, { equipmentName: equipmentName, labelID: "", quantity: quantity, status: "Good", type: type })
    refreshViewEquipment();
};
