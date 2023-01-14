import { useState, useEffect, Component } from "react";
import { db } from '../firebase-config';
import { addDoc, collection, doc, getDocs, updateDoc } from 'firebase/firestore';
import { ResignationLetterController } from "./resignationLetterController";

const monthNames = ["January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
];

let revJanuary = 0;
let revFebruary = 0;
let revMarch = 0;
let revApril = 0;
let revMay = 0;
let revJune = 0;
let revJuly = 0;
let revAugust = 0;
let revSeptember = 0;
let revOctober = 0;
let revNovember = 0;
let revDecember = 0;

let exJanuary = 0;
let exFebruary = 0;
let exMarch = 0;
let exApril = 0;
let exMay = 0;
let exJune = 0;
let exJuly = 0;
let exAugust = 0;
let exSeptember = 0;
let exOctober = 0;
let exNovember = 0;
let exDecember = 0;

export let totalRevenue = 0;
let totalResignationLetter = 0;

export function getTotalWarningLetter() {
    return totalRevenue / 2;
}

export function getTotalResignationLetter() {
    return totalResignationLetter / 2;
}

export function chartWarningLetterPurchase() {

    const purchases = WarningLetterController();

    purchases.map((finance) => {
        let date = finance.date.split(" ")
        if (finance.status == "Approved") {

            if (sessionStorage.getItem("Employee Report Filter") != null) {
                if (date[2] == sessionStorage.getItem("Employee Report Filter")) {
                    switch (date[1]) {
                        case "January":
                            revJanuary++
                            totalRevenue++;
                            break;
                        case "February":
                            revFebruary++
                            totalRevenue++;
                            break;
                        case "March":
                            revMarch++
                            totalRevenue++;
                            break;
                        case "April":
                            revApril++
                            totalRevenue++;
                            break;
                        case "May":
                            revMay++
                            totalRevenue++;
                            break;
                        case "June":
                            revJune++
                            totalRevenue++;
                            break;
                        case "July":
                            revJuly++
                            totalRevenue++;
                            break;
                        case "August":
                            revAugust++
                            totalRevenue++;
                            break;
                        case "September":
                            revSeptember++
                            totalRevenue++;
                            break;
                        case "October":
                            revOctober++
                            totalRevenue++;
                            break;
                        case "November":
                            revNovember++
                            totalRevenue++;
                            break;
                        case "December":
                            revDecember++
                            totalRevenue++;
                            break;
                    }
                }
            } else {
                switch (date[1]) {
                    case "January":
                        revJanuary++
                        totalRevenue++;
                        break;
                    case "February":
                        revFebruary++
                        totalRevenue++;
                        break;
                    case "March":
                        revMarch++
                        totalRevenue++;
                        break;
                    case "April":
                        revApril++
                        totalRevenue++;
                        break;
                    case "May":
                        revMay++
                        totalRevenue++;
                        break;
                    case "June":
                        revJune++
                        totalRevenue++;
                        break;
                    case "July":
                        revJuly++
                        totalRevenue++;
                        break;
                    case "August":
                        revAugust++
                        totalRevenue++;
                        break;
                    case "September":
                        revSeptember++
                        totalRevenue++;
                        break;
                    case "October":
                        revOctober++
                        totalRevenue++;
                        break;
                    case "November":
                        revNovember++
                        totalRevenue++;
                        break;
                    case "December":
                        revDecember++
                        totalRevenue++;
                        break;
                }
            }


        }
    })

    const resignationLetters = ResignationLetterController();
    console.log("Resign")
    console.log(resignationLetters)
    resignationLetters.map((finance) => {
        let date = finance.resignationDate.split(" ")
        console.log(date)
        if (finance.status == "Approved") {

            if (sessionStorage.getItem("Employee Filter Report") != null) {
                if (date[2] == sessionStorage.getItem("Employee Filter Report")) {
                    switch (date[1]) {
                        case "January":
                            exJanuary++
                            totalResignationLetter++;
                            break;
                        case "February":
                            exFebruary++
                            totalResignationLetter++;
                            break;
                        case "March":
                            exMarch++
                            totalResignationLetter++;
                            break;
                        case "April":
                            exApril++
                            totalResignationLetter++;
                            break;
                        case "May":
                            exMay++
                            totalResignationLetter++;
                            break;
                        case "June":
                            exJune++
                            totalResignationLetter++;
                            break;
                        case "July":
                            exJuly++
                            totalResignationLetter++;
                            break;
                        case "August":
                            exAugust++
                            totalResignationLetter++;
                            break;
                        case "September":
                            exSeptember++
                            totalResignationLetter++;
                            break;
                        case "October":
                            exOctober++
                            totalResignationLetter++;
                            break;
                        case "November":
                            exNovember++
                            totalResignationLetter++;
                            break;
                        case "December":
                            exDecember++
                            totalResignationLetter++;
                            break;
                    }
                }
            } else {
                switch (date[1]) {
                    case "January":
                        exJanuary++
                        totalResignationLetter++;
                        break;
                    case "February":
                        exFebruary++
                        totalResignationLetter++;
                        break;
                    case "March":
                        exMarch++
                        totalResignationLetter++;
                        break;
                    case "April":
                        exApril++
                        totalResignationLetter++;
                        break;
                    case "May":
                        exMay++
                        totalResignationLetter++;
                        break;
                    case "June":
                        exJune++
                        totalResignationLetter++;
                        break;
                    case "July":
                        exJuly++
                        totalResignationLetter++;
                        break;
                    case "August":
                        exAugust++
                        totalResignationLetter++;
                        break;
                    case "September":
                        exSeptember++
                        totalResignationLetter++;
                        break;
                    case "October":
                        exOctober++
                        totalResignationLetter++;
                        break;
                    case "November":
                        exNovember++
                        totalResignationLetter++;
                        break;
                    case "December":
                        exDecember++
                        totalResignationLetter++;
                        break;
                }
            }

        }
    })

    let data = [{ name: 'January', warningLetter: revJanuary / 2, resignationLetter: exJanuary / 2 },
    { name: 'February', warningLetter: revFebruary / 2, resignationLetter: exFebruary / 2 },
    { name: 'March', warningLetter: revMarch / 2, resignationLetter: exMarch / 2 },
    { name: 'April', warningLetter: revApril / 2, resignationLetter: exApril / 2 },
    { name: 'May', warningLetter: revMay / 2, resignationLetter: exMay / 2 },
    { name: 'June', warningLetter: revJune / 2, resignationLetter: exJune / 2 },
    { name: 'July', warningLetter: revJuly / 2, resignationLetter: exJuly / 2 },
    { name: 'August', warningLetter: revAugust / 2, resignationLetter: exAugust / 2 },
    { name: 'September', warningLetter: revSeptember / 2, resignationLetter: exSeptember / 2 },
    { name: 'October', warningLetter: revOctober / 2, resignationLetter: exOctober / 2 },
    { name: 'November', warningLetter: revNovember / 2, resignationLetter: exNovember / 2 },
    { name: 'December', warningLetter: revDecember / 2, resignationLetter: exDecember / 2 }];
    return data;
}

export default function WarningLetterController() {
    const [warningLetters, setResignationLetter] = useState([]);
    const warningLetterColectionRef = collection(db, "Warning Letter");

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

export const setToAccepted = async (id, status, employeeID, warningLetter) => {
    console.log(id)
    console.log(employeeID)
    const resignationLetterDoc = doc(db, "Warning Letter", id)
    const employeeDoc = doc(db, "Employee", employeeID)

    let warningLetterCount = parseInt(warningLetter) + 1

    const terminationLetterRef = collection(db, "Termination Letter");
    const newResignationData = { status: status };
    let newEmployeeData;
    if (warningLetterCount >= 3) {
        const addWarningLetter = async () => {
            await addDoc(terminationLetterRef, { employeeID: employeeID, status: "Pending", reason: "warning letter >= 3" })
        };
        addWarningLetter();
    }

    newEmployeeData = { warningLetter: warningLetterCount }
    await updateDoc(employeeDoc, newEmployeeData)
    await updateDoc(resignationLetterDoc, newResignationData);

    refreshViewWarningLetter();
}

export const setToRejected = async (id, status) => {
    console.log(id)
    const resignationLetterDoc = doc(db, "Warning Letter", id)

    const newResignationData = { status: status }
    await updateDoc(resignationLetterDoc, newResignationData);
    refreshViewWarningLetter();
}

const warningLetterColectionRef = collection(db, "Warning Letter");

export const addWarningLetter = async (employeeID, reason) => {
    const date = new Date();
    let day = date.getDate();;
    let month = monthNames[date.getMonth()]
    let year = date.getFullYear();
    let fullDate = day + " " + month + " " + year

    const humanResourceID = JSON.parse(sessionStorage.getItem("Login data")).id
    await addDoc(warningLetterColectionRef, { employeeID: employeeID, humanResourceID: humanResourceID, reason: reason, date: fullDate, status: "Pending" })
    refreshViewWarningLetter();
};


