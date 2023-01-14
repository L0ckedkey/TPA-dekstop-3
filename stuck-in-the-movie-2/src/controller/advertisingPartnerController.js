import { useState, useEffect } from "react";
import { db } from '../firebase-config';
import { addDoc, collection, getDocs } from 'firebase/firestore';

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

let totalRevenue = 0;

export default function AdvertisingPartnerController() {
    const [movies, setMovie] = useState([]);
    const movieColectionRef = collection(db, "Advertising Partner");

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

export function chartDataAdvertisingPartner() {

    const purchases = AdvertisingPartnerController();

    purchases.map((finance) => {
        let date = finance.date.split(" ")

        switch (date[1]) {
            case "January":
                exJanuary++
                totalRevenue++;
                break;
            case "February":
                exFebruary++
                totalRevenue++;
                break;
            case "March":
                exMarch++
                break;
            case "April":
                exApril++
                break;
            case "May":
                exMay++
                break;
            case "June":
                exJune++
                break;
            case "July":
                exJuly++
                break;
            case "August":
                exAugust++
                break;
            case "September":
                console.log("september")
                exSeptember++
                break;
            case "October":
                exOctober++
                break;
            case "November":
                exNovember++
                break;
            case "December":
                exDecember++
                break;

        }
    })


    let data = [{ name: 'January', total: exJanuary / 2 },
    { name: 'February', total: exFebruary / 2 },
    { name: 'March', total: exMarch / 2 },
    { name: 'April', total: exApril / 2 },
    { name: 'May', total: exMay / 2 },
    { name: 'June', total: exJune / 2 },
    { name: 'July', total: exJuly / 2 },
    { name: 'August', total: exAugust / 2 },
    { name: 'September', total: exSeptember / 2 },
    { name: 'October', total: exOctober / 2 },
    { name: 'November', total: exNovember / 2 },
    { name: 'December', total: exDecember / 2 }];
    return data;
}


function refreshViewMovie() {
    window.location = window.location.pathname;
}

export const addAdvertisingPartner = async (type, duration, name, email, url) => {

    let date = new Date();
    let monthName = monthNames[date.getMonth()]
    let fullDate = date.getDate + " " + monthName + " " + date.getFullYear

    const employeeColectionRef = collection(db, "Advertising Partner");

    await addDoc(employeeColectionRef, { email: email, name: name, img: url, type: type, duration: duration, date: fullDate })
    refreshViewMovie();
};