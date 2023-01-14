import { useRef, useState, useEffect, useContext } from "react";
import { db } from '../firebase-config';
import { addDoc, collection, getDocs } from 'firebase/firestore';

export default function MembershipController() {
    const [movies, setMovie] = useState([]);
    const movieColectionRef = collection(db, "Membership");

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


const monthNames = ["January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
];

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

export function getMembership() {
    return totalRevenue / 2
}


export function chartMembership() {

    const memberships = MembershipController();

    memberships.map((membership) => {
        let date = membership.joinedDate.split(" ")



        switch (date[1]) {
            case "January":
                totalRevenue++;
                revJanuary++
                break;
            case "February":
                totalRevenue++;
                revFebruary++
                break;
            case "March":
                totalRevenue++;
                revMarch++
                break;
            case "April":
                totalRevenue++;
                revApril++
                break;
            case "May":
                totalRevenue++;
                revMay++
                break;
            case "June":
                totalRevenue++;
                revJune++
                break;
            case "July":
                totalRevenue++;
                revJuly++
                break;
            case "August":
                totalRevenue++;
                revAugust++
                break;
            case "September":
                totalRevenue++;
                console.log("september")
                revSeptember++
                break;
            case "October":
                totalRevenue++;
                revOctober++
                break;
            case "November":
                totalRevenue++;
                revNovember++
                break;
            case "December":
                totalRevenue++;
                revDecember++
                break;

        }


    })


    let data = [{ name: 'January', Joined: revJanuary / 2 },
    { name: 'February', Joined: revFebruary / 2 },
    { name: 'March', Joined: revMarch / 2 },
    { name: 'April', Joined: revApril / 2 },
    { name: 'May', Joined: revMay / 2 },
    { name: 'June', Joined: revJune / 2 },
    { name: 'July', Joined: revJuly / 2 },
    { name: 'August', Joined: revAugust / 2 },
    { name: 'September', Joined: revSeptember / 2 },
    { name: 'October', Joined: revOctober / 2 },
    { name: 'November', Joined: revNovember / 2 },
    { name: 'December', Joined: revDecember / 2 }];
    return data;
}