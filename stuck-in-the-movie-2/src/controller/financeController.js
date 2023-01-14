import { useRef, useState, useEffect, useContext } from "react";
import { auth, db } from '../firebase-config';
import { addDoc, collection, doc, getDocs, updateDoc } from 'firebase/firestore';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { async } from "@firebase/util";
import { createUserWithEmailAndPassword, onAuthStateChanged, signOut } from "firebase/auth";

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

let totalRevenue = 0;
let totalExpenses = 0;

const warningLetterColectionRef = collection(db, "Finance");

export const addFinance = async (amount, description, month, type, year) => {
    console.log("Add finance")
    await addDoc(warningLetterColectionRef, { amount: amount, description: description, month: month, type: type, year: year })
};

export function chartData() {


    let data = [{ name: 'January', expenses: exJanuary / 2, revenue: revJanuary / 2 },
    { name: 'February', expenses: exFebruary / 2, revenue: revFebruary / 2 },
    { name: 'March', expenses: exMarch / 2, revenue: revMarch / 2 },
    { name: 'April', expenses: exApril / 2, revenue: revApril / 2 },
    { name: 'May', expenses: exMay / 2, revenue: revMay / 2 },
    { name: 'June', expenses: exJune / 2, revenue: revJune / 2 },
    { name: 'July', expenses: exJuly / 2, revenue: revJuly / 2 },
    { name: 'August', expenses: exAugust / 2, revenue: revAugust / 2 },
    { name: 'Sepetember', expenses: exSeptember / 2, revenue: revSeptember / 2 },
    { name: 'October', expenses: exOctober / 2, revenue: revOctober / 2 },
    { name: 'November', expenses: exNovember / 2, revenue: revNovember / 2 },
    { name: 'December', expenses: exDecember / 2, revenue: revDecember / 2 }];
    return data;
}
export function getRevenue() {
    return totalRevenue / 2;
}

export function getExpenses() {
    return totalExpenses / 2;
}

export default function FinanceController() {
    const [employees, setEmployee] = useState([]);
    const employeeColectionRef = collection(db, "Finance");



    useEffect(() => {
        const getEmployee = async () => {
            const data = await getDocs(employeeColectionRef);
            setEmployee(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
            console.log(data);
        };
        getEmployee();
    }, []);


    employees.map((finance) => {

        if (finance.type == "Revenue" && sessionStorage.getItem("Year Filter") == finance.year) {
            totalRevenue += parseInt(finance.amount);

            switch (finance.month) {
                case "January":
                    revJanuary += parseInt(finance.amount)
                    break;
                case "February":
                    revFebruary += parseInt(finance.amount)
                    break;
                case "March":
                    revMarch += parseInt(finance.amount)
                    break;
                case "April":
                    revApril += parseInt(finance.amount)
                    break;
                case "May":
                    revMay += parseInt(finance.amount)
                    break;
                case "June":
                    revJune += parseInt(finance.amount)
                    break;
                case "July":
                    revJuly += parseInt(finance.amount)
                    break;
                case "August":
                    revAugust += parseInt(finance.amount)
                    break;
                case "September":
                    console.log("september")
                    revSeptember += parseInt(finance.amount)
                    break;
                case "October":
                    revOctober += parseInt(finance.amount)
                    break;
                case "November":
                    revNovember += parseInt(finance.amount)
                    break;
                case "December":
                    revDecember += parseInt(finance.amount)
                    break;

            }

        } else if (finance.type == "Expenses" && sessionStorage.getItem("Year Filter") == finance.year) {
            totalExpenses += parseInt(finance.amount)

            switch (finance.month) {
                case "January":
                    exJanuary += parseInt(finance.amount)
                    break;
                case "February":
                    exFebruary += parseInt(finance.amount)
                    break;
                case "March":
                    exMarch += parseInt(finance.amount)
                    break;
                case "April":
                    exApril += parseInt(finance.amount)
                    break;
                case "May":
                    exMay += parseInt(finance.amount)
                    break;
                case "June":
                    exJune += parseInt(finance.amount)
                    break;
                case "July":
                    exJuly += parseInt(finance.amount)
                    break;
                case "August":
                    exAugust += parseInt(finance.amount)
                    break;
                case "September":
                    console.log("september")
                    exSeptember += parseInt(finance.amount)
                    break;
                case "October":
                    exOctober += parseInt(finance.amount)
                    break;
                case "November":
                    exNovember += parseInt(finance.amount)
                    break;
                case "December":
                    exDecember += parseInt(finance.amount)
                    break;

            }
        }
    })




    return employees;
}