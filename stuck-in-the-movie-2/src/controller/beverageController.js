import { useRef, useState, useEffect, useContext } from "react";
import { db } from '../firebase-config';
import { addDoc, collection, getDocs } from 'firebase/firestore';

function refreshViewBeverage() {
    window.location = window.location.pathname;
}
export default function BeverageController() {
    const [beverages, setBeverage] = useState([]);
    const beverageColectionRef = collection(db, "Beverage");

    useEffect(() => {

        const getbeverage = async () => {
            const data = await getDocs(beverageColectionRef);
            setBeverage(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
            console.log(data);
        };

        getbeverage();
    }, [])

    return beverages;
}


const beverageColectionRef = collection(db, "Beverage");
export const AddBeverageDB = async (beverageName, price, stock) => {
    await addDoc(beverageColectionRef, { BeverageName: beverageName, Price: price, Stock: stock })
    refreshViewBeverage();
};