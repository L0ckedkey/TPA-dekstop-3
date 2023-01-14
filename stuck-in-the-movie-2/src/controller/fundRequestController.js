import { useState, useEffect } from "react";
import { db } from '../firebase-config';
import { addDoc, collection, doc, getDocs, updateDoc } from 'firebase/firestore';
import { type } from "@testing-library/user-event/dist/type";

const FinanceColectionRef = collection(db, "Purchase")

const monthNames = ["January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
];


export default function FundRequestController() {
    const [movies, setMovie] = useState([]);
    const movieColectionRef = collection(db, "Fund Request");

    useEffect(() => {

        const getMovie = async () => {
            const data = await getDocs(movieColectionRef);
            setMovie(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
            console.log(data);
        };

        getMovie();
    }, [])

    return movies;

}

export const setToAcceptedAccounting = async (id, accountStatus, managerStatus, fund) => {
    let date = new Date();

    const resignationLetterDoc = doc(db, "Fund Request", id)
    let newResignationData;

    if (managerStatus == "Pending") {
        newResignationData = { accountingStatus: accountStatus }
    } else if (managerStatus == "Approved") {
        await addDoc(FinanceColectionRef, { FundRequestID: id, status: "Not Purchased", purchasedDate: " ", realAmount: " " })
        newResignationData = { accountingStatus: accountStatus, status: "Approved" }
    }

    await updateDoc(resignationLetterDoc, newResignationData);

    refreshViewWarningLetter();
}

export const setToRejectedAccounting = async (id, accountStatus, managerStatus, status) => {

    const resignationLetterDoc = doc(db, "Fund Request", id)



    const newResignationData = { accountingStatus: accountStatus, status: "Rejected" }
    await updateDoc(resignationLetterDoc, newResignationData);
    refreshViewWarningLetter();
}

export const setToAcceptedManager = async (id, accountStatus, managerStatus, fund, date) => {
    let dateSplit = date.split(" ")
    const resignationLetterDoc = doc(db, "Fund Request", id)
    let newResignationData;

    if (accountStatus == "Pending") {
        newResignationData = { managerStatus: managerStatus }
    } else if (accountStatus == "Approved") {
        await addDoc(FinanceColectionRef, { amount: fund, description: "Fund Request", month: dateSplit[1], type: "Expenses", year: dateSplit[2] })
        newResignationData = { managerStatus: accountStatus, status: "Approved" }
    }

    await updateDoc(resignationLetterDoc, newResignationData);

    refreshViewWarningLetter();
}

export const setToRejectedManager = async (id, managerStatus, accountStatus) => {

    const resignationLetterDoc = doc(db, "Fund Request", id)

    const newResignationData = { managerStatus: "Rejected", status: "Rejected", accountingStatus: "Rejected" }
    await updateDoc(resignationLetterDoc, newResignationData);
    refreshViewWarningLetter();
}

function refreshViewMovie() {
    window.location = window.location.pathname;
}

function refreshViewWarningLetter() {
    window.location = window.location.pathname;
}

export const addFundRequest = async (fullDate, fund, reason, position) => {


    let employeeID = JSON.parse(sessionStorage.getItem("Login data")).id
    const employeeColectionRef = collection(db, "Fund Request");

    await addDoc(employeeColectionRef, { accountingStatus: "Pending", managerStatus: "Pending", status: "Pending", date: fullDate, fund: fund, reason: reason, issuedBy: position, employeeID: employeeID })
    console.log("add funds")
    refreshViewMovie();
};

