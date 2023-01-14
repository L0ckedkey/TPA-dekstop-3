import { useRef, useState, useEffect, useContext } from "react";
import { auth, db } from '../firebase-config';
import { addDoc, collection, doc, getDocs, updateDoc } from 'firebase/firestore';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { async } from "@firebase/util";
import { createUserWithEmailAndPassword, onAuthStateChanged, signOut } from "firebase/auth";

export default function LabelController() {
    const [employees, setEmployee] = useState([]);
    const employeeColectionRef = collection(db, "Label");



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


