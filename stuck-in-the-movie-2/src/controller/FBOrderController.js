import { useRef, useState, useEffect, useContext } from "react";
import { db } from '../firebase-config';
import { addDoc, collection, getDocs, updateDoc, doc, getDoc, where, query } from 'firebase/firestore';
import FoodController from "./foodController";
import BeverageController from "./beverageController";
import { async } from "@firebase/util";
import { addFinance } from "./financeController";
import MembershipController from "./membershipController";

let name;
let pointTemp = 0;


export default function FBOrderHeaderController() {
    const [foods, setFood] = useState([]);
    const foodColectionRef = collection(db, "FB Header");

    useEffect(() => {
        const getFood = async () => {
            const data = await getDocs(foodColectionRef);
            setFood(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
            console.log(data);
        };

        getFood();
    }, [])

    return foods;
}

export function FBOrderDetailController() {
    const [foods, setFood] = useState([]);
    const foodColectionRef = collection(db, "FB Detail");

    useEffect(() => {
        const getFood = async () => {
            const data = await getDocs(foodColectionRef);
            setFood(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
            console.log(data);
        };

        getFood();
    }, [])

    return foods;
}

const warningLetterColectionRef = collection(db, "FB Header");

function refreshViewWarningLetter() {
    window.location = window.location.pathname;
}

function setMembershipInfo(id, name) {
    sessionStorage.setItem("Membership ID", id)
    this.name = name;
}

export const AddFBHeader = async (orderID, customerName, paymentMethod) => {
    const employeeID = JSON.parse(sessionStorage.getItem("Login data")).id;
    const date = new Date();
    let day = date.getDate();;
    let month = monthNames[date.getMonth()]
    let year = date.getFullYear();
    let fullDate = day + " " + month + " " + year

    const citiesRef = collection(db, "Membership");

    // Create a query against the collection.
    const q = query(citiesRef, where("membershipID", "==", customerName));
    let name = "a";
    const data = await getDocs(q)
    const json = JSON.stringify(data)
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



    await addDoc(warningLetterColectionRef, { OrderID: orderID, employeeID: employeeID, customerName: name, orderDate: fullDate, paymentMethod: paymentMethod, total: "0" })
    sessionStorage.setItem("FB Order", orderID);
    sessionStorage.setItem("Order date", date);
    sessionStorage.setItem("Total purchase", 0)
    refreshViewWarningLetter();
};

export const setVoucher = async (id) => {
    sessionStorage.setItem("Voucher Used", id)
    refreshViewWarningLetter();
}

const FBDetailColectionRef = collection(db, "FB Detail");
const MembershipColectionRef = collection(db, "Membership");

export const addFBDetail = async (orderName, quantity, foods, beverages) => {
    const FBHeader = sessionStorage.getItem("FB Order");
    SubtractMenu(orderName, quantity, foods, beverages)
    await addDoc(FBDetailColectionRef, { FBHeader: FBHeader, orderName: orderName, quantity: quantity, status: "Ordered" })
    refreshViewWarningLetter();
};

const FinanceColectionRef = collection(db, "Finance");


function SubtractMenu(orderName, quantity, foods, beverages) {

    foods.map((food) => {
        if (food.FoodName == orderName) {
            console.log("haha")

            let purchase = parseInt(food.Price) * parseInt(quantity)
            purchase += parseInt(sessionStorage.getItem("Total purchase"))
            sessionStorage.setItem("Total purchase", purchase)
            updateFoodQuantity(food.id, food.Stock - quantity);
        }
    })

    beverages.map((food) => {
        if (food.BeverageName == orderName) {
            console.log("hihi")
            updateBeverageQuantity(food.id, food.Stock - quantity)
        }
    })
}


const updateFoodQuantity = async (orderName, quantity) => {
    const foodDoc = doc(db, "Food", orderName)
    const newFoodData = { Stock: quantity }
    await updateDoc(foodDoc, newFoodData)
}
const updateBeverageQuantity = async (orderName, quantity) => {
    const beverageDoc = doc(db, "Beverage", orderName)
    const newFoodData = { Stock: quantity }
    await updateDoc(beverageDoc, newFoodData)
}

export const DoneOrder = async () => {



    const citiesRef = collection(db, "FB Header");

    // Create a query against the collection.
    const q = query(citiesRef, where("OrderID", "==", sessionStorage.getItem("FB Order")));
    const dataOrderID = await getDocs(q)
    console.log(":Hhaha")
    dataOrderID.forEach((doc) => {
        const data = JSON.stringify(doc.data())
        console.log(JSON.parse(data).id)
        sessionStorage.setItem("Order ID", doc.id)
        // sessionStorage.setItem("Membership ID",)
        // name = JSON.parse(data).customerName;
    })
    const header = doc(db, "FB Header", sessionStorage.getItem("Order ID"))

    // Create a query against the collection.
    let totalPurchase = 0
    if (sessionStorage.getItem("Voucher Used") != null) {
        const citiesDoc = doc(db, "Promo", sessionStorage.getItem("Voucher Used"));
        const doc2 = await getDoc(citiesDoc)
        const json = JSON.stringify(doc2.data())

        const discount = JSON.parse(json).discount
        // 
        console.log(discount)
        //  
        totalPurchase = parseInt(sessionStorage.getItem("Total purchase")) - (parseInt(discount) * parseInt(sessionStorage.getItem("Total purchase")) / 100)
    } else {
        totalPurchase = sessionStorage.getItem("Total Purchase")
    }

    const newData = { total: totalPurchase }
    await updateDoc(header, newData)
    console.log(totalPurchase)
    let dateSplit = sessionStorage.getItem("Order date").split(" ")
    const date = new Date()
    await addDoc(FinanceColectionRef, { amount: totalPurchase, description: "Food Order", month: monthNames[date.getMonth()], type: "Revenue", year: date.getFullYear() })

    const foodDoc = doc(db, "Membership", sessionStorage.getItem("Membership ID"))
    let totalPoint = parseInt(pointTemp) + (parseInt(totalPurchase) / 100)
    const newFoodData = { point: totalPoint }
    await updateDoc(foodDoc, newFoodData)

    sessionStorage.removeItem("FB Order")
    sessionStorage.removeItem("Order date")
    sessionStorage.removeItem("Total purchase")
    sessionStorage.removeItem("Mmebership ID")
    sessionStorage.removeItem("Voucher Used")
    refreshViewWarningLetter();
};


export const setToProcessed = async (id, status) => {

    const resignationLetterDoc = doc(db, "FB Detail", id)

    const newResignationData = { status: status }
    await updateDoc(resignationLetterDoc, newResignationData);
    refreshViewWarningLetter();
}

export const setToReady = async (id, status) => {

    const resignationLetterDoc = doc(db, "FB Detail", id)

    const newResignationData = { status: status }
    await updateDoc(resignationLetterDoc, newResignationData);
    refreshViewWarningLetter();
}

const monthNames = ["January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
];

export const createMembership = async (customerName, email, gender, DOB, membershipID) => {
    const date = new Date();
    let day = date.getDate();;
    let month = monthNames[date.getMonth()]
    let year = date.getFullYear();
    let fullDate = day + " " + month + " " + year
    await addDoc(MembershipColectionRef, { customerName: customerName, email: email, gender: gender, DOB: DOB, joinedDate: fullDate, point: "0", membershipID: membershipID })
    sessionStorage.removeItem("membership")
    refreshViewWarningLetter();
}

export const addMembership = async () => {
    sessionStorage.setItem("membership", "yes")
    refreshViewWarningLetter();
};