import { useState, useEffect } from "react";
import { db } from '../firebase-config';
import { addDoc, collection, doc, getDoc, getDocs, query, updateDoc, where } from 'firebase/firestore';

export default function MovieOrderController() {
    const [movies, setMovie] = useState([]);
    const movieColectionRef = collection(db, "Movie Order Detail");

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

export function MovieHeaderController() {
    const [movies, setMovie] = useState([]);
    const movieColectionRef = collection(db, "Movie Order Header");

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

const employeeColectionRef = collection(db, "Movie Order Detail");
const employeeColectionRef2 = collection(db, "Movie Order Header");
export const createOrder = async (orderHeader, customerName, seats, paymentMethod) => {
    let pointTemp = 0;
    const citiesRef = collection(db, "Membership");
    let totalPurchase = 0;
    // Create a query against the collection.
    const q = query(citiesRef, where("membershipID", "==", customerName));
    let name = "a";
    const data = await getDocs(q)
    console.log(":Hhaha")
    data.forEach((doc) => {
        const data = JSON.stringify(doc.data())
        console.log(JSON.parse(data).customerName)
        sessionStorage.setItem("Membership ID", doc.id)
        name = JSON.parse(data).customerName;
        pointTemp = JSON.parse(data).point
        // sessionStorage.setItem("Membership ID",)
        // name = JSON.parse(data).customerName;
    })

    if (name === "a") {
        name = customerName;
    }
    console.log(name)

    seats.map(async (seat) => {
        totalPurchase += 45000
        await addDoc(employeeColectionRef, { scheduleID: sessionStorage.getItem("ScheduleID"), customerName: name, orderHeader: orderHeader, seat: seat })
    })

    const foodDoc = doc(db, "Membership", sessionStorage.getItem("Membership ID"))
    let totalPoint = parseInt(pointTemp) + (parseInt(totalPurchase) / 100)
    const newFoodData = { point: totalPoint }
    await updateDoc(foodDoc, newFoodData)

    if (sessionStorage.getItem("Voucher Used") != null) {
        const citiesDoc = doc(db, "Promo", sessionStorage.getItem("Voucher Used"));
        const doc2 = await getDoc(citiesDoc)
        const json = JSON.stringify(doc2.data())

        const discount = JSON.parse(json).discount
        // 
        console.log(discount)
        //  
        totalPurchase = parseInt(totalPurchase) - (parseInt(discount) * parseInt(totalPurchase) / 100)
    }


    await addDoc(employeeColectionRef2, { scheduleID: sessionStorage.getItem("ScheduleID"), customerName: name, employeeID: JSON.parse(sessionStorage.getItem("Login data")).id, orderHeader: orderHeader, paymentMethod: paymentMethod, totalPurchase: totalPurchase })

    refreshViewEmployee();
}

export function refreshViewEmployee() {
    window.location = window.location.pathname;
}