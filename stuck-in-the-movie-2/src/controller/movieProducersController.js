import { useState, useEffect } from "react";
import { db } from '../firebase-config';
import { addDoc, collection, getDocs } from 'firebase/firestore';
import ScheduleController from "./scheduleController";
import MovieController from "./movieController";
import MovieOrderController from "./movieOrderDetailController";

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

export default function MovieProducersController() {
    const [movies, setMovie] = useState([]);
    const movieColectionRef = collection(db, "Movie Producers");

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



export function chartDataMovieProducer() {
    let total = 0;
    const schedules = ScheduleController();
    const movies = MovieController();
    const movieOrderDetails = MovieOrderController();

    movies.map((movie) => {
        if (movie.movieID == sessionStorage.getItem("Movie Producer ID")) {
            return (
                <>
                    {
                        schedules.map((schedule) => {
                            if (schedule.movieID == movie.id) {
                                return (
                                    <>
                                        {
                                            movieOrderDetails.map((movieOrderDetail) => {
                                                total++;
                                            })
                                        }
                                    </>
                                )
                            }
                        })
                    }
                </>
            )
        }
    })

    return total;
}


function refreshViewMovie() {
    window.location = window.location.pathname;
}

export const addMovieProducers = async (movieID, name, email, url) => {


    const employeeColectionRef = collection(db, "Movie Producers");

    await addDoc(employeeColectionRef, { email: email, name: name, img: url, movieID, movieID })
    refreshViewMovie();
};