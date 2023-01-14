import { useState, useEffect } from "react";
import { db } from '../firebase-config';
import { addDoc, collection, getDocs } from 'firebase/firestore';

export default function MovieController() {
    const [movies, setMovie] = useState([]);
    const movieColectionRef = collection(db, "Movie");

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

export const addMovie = async (name, genre, duration) => {


    const employeeColectionRef = collection(db, "Movie");

    await addDoc(employeeColectionRef, { movieName: name, genre: genre, duration: duration })
    refreshViewMovie();
};

