import { useRef, useState, useEffect, useContext } from "react";
import { db } from '../firebase-config';
import { addDoc, collection, getDocs } from 'firebase/firestore';


export default function FoodController() {
    const [foods, setFood] = useState([]);
    const foodColectionRef = collection(db, "Food");

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

export function refreshViewFood() {
    window.location = window.location.pathname;
}

const foodColectionRef = collection(db, "Food");
export const addFood = async (foodName, price, stock) => {
    await addDoc(foodColectionRef, { FoodName: foodName, Price: price, Stock: stock })
    refreshViewFood();
};