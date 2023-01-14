import { useState, useEffect } from "react";
import { db } from '../firebase-config';
import { collection, getDocs, addDoc } from 'firebase/firestore';

export default function ScheduleController() {
    const [schedules, setSchedule] = useState([]);
    const scheduleColectionRef = collection(db, "Schedule");


    useEffect(() => {

        const getSchedule = async () => {
            const data = await getDocs(scheduleColectionRef);
            setSchedule(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
            console.log(data);
        };

        getSchedule();
    }, [])

    return schedules;

}

function refreshViewSchedule() {
    window.location = window.location.pathname;
}

const scheduleColectionRef = collection(db, "Schedule");

export const addSchedule = async (date, endTime, movieID, roomNumber, startTime) => {
    await addDoc(scheduleColectionRef, { Date: date, endTime: endTime, movieID: movieID, roomNumber: roomNumber, startTime: startTime })
    refreshViewSchedule();
};