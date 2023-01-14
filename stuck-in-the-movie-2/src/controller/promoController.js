import { useState, useEffect } from "react";
import { db } from '../firebase-config';
import { collection, getDocs, addDoc } from 'firebase/firestore';

function refreshViewPromo() {
    window.location = window.location.pathname;
}

export function PromoController() {
    const promoColectionRef = collection(db, "Promo");
    const [promos, setPromo] = useState([]);
    useEffect(() => {

        const getPromo = async () => {
            const data = await getDocs(promoColectionRef);
            setPromo(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
            console.log(data);
        };

        getPromo();
    }, [])

    return promos;
}


const promoColectionRef = collection(db, "Promo");

export const addPromo = async (discount, expiredDate, promoName, startDate) => {
    await addDoc(promoColectionRef, { discount: discount, expiredDate: expiredDate, promoName: promoName, startDate: startDate })
    refreshViewPromo();
};