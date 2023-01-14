import { useEffect, useRef, useState } from "react";
import { db } from '../firebase-config';
import { collection, getDocs } from 'firebase/firestore';

export default function TheaterRoomController() {
    const [theaterRooms, setTheaterRoom] = useState([]);
    const theaterRoomColectionRef = collection(db, "TheaterRoom");
    useEffect(() => {

        const getTheaterRoom = async () => {
            const data = await getDocs(theaterRoomColectionRef);
            setTheaterRoom(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
            console.log(data);
        };
        getTheaterRoom();
    }, []);

    return theaterRooms;
}