import { useState, useEffect } from "react";
import { db } from '../firebase-config';
import { addDoc, collection, getDocs } from 'firebase/firestore';


export default function FBSuppliersController() {
    const [movies, setMovie] = useState([]);
    const movieColectionRef = collection(db, "Food Suppliers");

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

function refreshViewMovie() {
    window.location = window.location.pathname;
}

export const addFBSuppliers = async (type, product, name, email, url) => {


    const employeeColectionRef = collection(db, "Movie Producers");

    await addDoc(employeeColectionRef, { email: email, name: name, img: url, product: product, type: type })
    refreshViewMovie();
};

