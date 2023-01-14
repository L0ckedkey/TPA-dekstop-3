import { useState, useEffect, Component } from "react";
import { db } from '../firebase-config';
import { addDoc, collection, doc, getDocs, updateDoc } from 'firebase/firestore';

const monthNames = ["January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
];

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

export function chartDataPurchase() {

    const purchases = PurchaseController();

    purchases.map((finance) => {
        let date = finance.purchasedDate.split(" ")
        if (finance.status == "Purchased") {
            totalRevenue += parseInt(finance.amount);

            switch (date[1]) {
                case "January":
                    revJanuary += parseInt(finance.realAmount)
                    break;
                case "February":
                    revFebruary += parseInt(finance.realAmount)
                    break;
                case "March":
                    revMarch += parseInt(finance.realAmount)
                    break;
                case "April":
                    revApril += parseInt(finance.realAmount)
                    break;
                case "May":
                    revMay += parseInt(finance.realAmount)
                    break;
                case "June":
                    revJune += parseInt(finance.realAmount)
                    break;
                case "July":
                    revJuly += parseInt(finance.realAmount)
                    break;
                case "August":
                    revAugust += parseInt(finance.realAmount)
                    break;
                case "September":
                    console.log("september")
                    revSeptember += parseInt(finance.realAmount)
                    break;
                case "October":
                    revOctober += parseInt(finance.realAmount)
                    break;
                case "November":
                    revNovember += parseInt(finance.realAmount)
                    break;
                case "December":
                    revDecember += parseInt(finance.realAmount)
                    break;

            }

        }
    })


    let data = [{ name: 'January', revpenses: exJanuary / 2, purchase: revJanuary / 2 },
    { name: 'February', expenses: exFebruary / 2, purchase: revFebruary / 2 },
    { name: 'March', expenses: exMarch / 2, purchase: revMarch / 2 },
    { name: 'April', expenses: exApril / 2, purchase: revApril / 2 },
    { name: 'May', expenses: exMay / 2, purchase: revMay / 2 },
    { name: 'June', expenses: exJune / 2, purchase: revJune / 2 },
    { name: 'July', expenses: exJuly / 2, purchase: revJuly / 2 },
    { name: 'August', expenses: exAugust / 2, purchase: revAugust / 2 },
    { name: 'September', expenses: exSeptember / 2, purchase: revSeptember / 2 },
    { name: 'October', expenses: exOctober / 2, purchase: revOctober / 2 },
    { name: 'November', expenses: exNovember / 2, purchase: revNovember / 2 },
    { name: 'December', expenses: exDecember / 2, purchase: revDecember / 2 }];
    return data;
}

export default function PurchaseController() {
    const [warningLetters, setResignationLetter] = useState([]);
    const warningLetterColectionRef = collection(db, "Purchase");

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
export const updateRealAmount = async (id, amount) => {
    console.log(id)

    const date = new Date();
    let day = date.getDate();
    let month = monthNames[date.getMonth()]
    let year = date.getFullYear();
    let fullDate = day + " " + month + " " + year


    const resignationLetterDoc = doc(db, "Purchase", id)

    const newResignationData = { status: "Purchased", realAmount: amount, purchasedDate: fullDate }
    await updateDoc(resignationLetterDoc, newResignationData);
    refreshViewWarningLetter();
}