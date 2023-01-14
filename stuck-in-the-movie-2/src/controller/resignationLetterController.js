import { useState, useEffect } from "react";
import { db } from '../firebase-config';
import { addDoc, collection, doc, getDocs, updateDoc } from 'firebase/firestore';



export function ResignationLetterController() {
    const [resignationLetters, setResignationLetter] = useState([]);
    const resignationLetterColectionRef = collection(db, "Resignation Letter");

    useEffect(() => {
        const getResignationLetter = async () => {
            const data = await getDocs(resignationLetterColectionRef);
            setResignationLetter(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
            console.log(data);
        };
        getResignationLetter();


    }, []);
    return resignationLetters;
}


