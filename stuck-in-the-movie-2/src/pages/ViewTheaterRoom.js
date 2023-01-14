import { useEffect, useRef, useState } from "react";
import { db } from '../firebase-config';
import { collection, getDocs } from 'firebase/firestore';
import Table from 'react-bootstrap/Table';
import ScheduleController from "../controller/scheduleController";
import MovieController from "../controller/movieController";
import theaterRoomController from "../controller/theaterRoomController";


export function ViewTheaterRoomOnly() {
    let number = 0;
    let TheaterRoomID;

    const movies = MovieController();
    const theaterRooms = theaterRoomController();

    return (<div>
        <Table striped bordered hover size variant="dark">
            <thead>
                <tr>
                    <th>Number</th>
                    <th>Room ID</th>
                    <th>Room Number</th>
                    <th>Seat Quantity</th>
                    <th>Movie Name</th>
                </tr>
            </thead>

            {
                theaterRooms.map((theaterRoom) => {
                    number++;
                    return (
                        // console.log({ employee.Name });
                        <tbody>
                            <tr>
                                <td>{number}</td>
                                <td>{theaterRoom.id}</td>
                                <td>{theaterRoom.roomNumber}</td>
                                <td>{theaterRoom.seatQuantity}</td>


                            </tr>
                        </tbody>
                    )
                })
            }
        </Table>
    </div>)
}

export default function TheaterRoom() {
    let number = 0;
    let TheaterRoomID;



    const schedules = ScheduleController();
    const movies = MovieController();
    const theaterRooms = theaterRoomController();


    const getInfo = event => {
        sessionStorage.setItem("ID", event.currentTarget.id)
        window.location = "/viewTheaterRoom";
        // let theaterID = event.currentTarget.id;
    }

    let IDhaha = sessionStorage.getItem("ID");
    console.log(IDhaha)
    if (IDhaha !== null) {
        console.log("yess")
        return (
            <div>
                <Table striped bordered hover size variant="dark">
                    <thead>
                        <tr>
                            <th>Number</th>
                            <th>Room Number</th>
                            <th>Seat Quantity</th>
                            <th>Movie Name</th>
                        </tr>
                    </thead>
                    {
                        theaterRooms.map((theaterRoom) => {
                            number++;
                            return (
                                // console.log({ employee.Name });
                                <tbody>
                                    <tr>
                                        <td>{number}</td>
                                        <td><button className="button-test" id={theaterRoom.id} onClick={getInfo}>{theaterRoom.roomNumber}</button></td>
                                        <td>{theaterRoom.seatQuantity}</td>
                                        {
                                            movies.map((movie) => {
                                                if (theaterRoom.movieID === movie.id) {
                                                    return (
                                                        <td>{movie.movieName}</td>
                                                    )
                                                }

                                            })
                                        }
                                    </tr>
                                </tbody>
                            )
                        })
                    }
                </Table>
                <div>
                    <Table striped bordered hover size variant="dark">
                        <thead>
                            <tr>
                                <th>Date</th>
                                <th>Time</th>
                                <th>Duration</th>
                                <th>Movie Name</th>

                            </tr>
                        </thead>
                        {
                            schedules.map((schedule) => {
                                if (schedule.roomNumber == IDhaha) {
                                    return (
                                        <tbody>
                                            <tr>

                                                {movies.map((movie) => {
                                                    if (schedule.movieID == movie.id) {
                                                        console.log("haha : " + movie.movieName);
                                                        return (
                                                            <>
                                                                <td>{schedule.Date}</td>
                                                                <td>{schedule.startTime}</td>
                                                                <td>{movie.duration} minutes</td>
                                                                <td>{movie.movieName}</td>
                                                            </>
                                                        )
                                                    }

                                                    return null;
                                                })
                                                }
                                            </tr>
                                        </tbody>
                                    )
                                }
                                return null;

                            })}
                    </Table>
                </div>
            </div>)


    } else {
        return (<div>
            <Table striped bordered hover size variant="dark">
                <thead>
                    <tr>
                        <th>Number</th>
                        <th>Room Number</th>
                        <th>Seat Quantity</th>
                        <th>Movie Name</th>
                    </tr>
                </thead>

                {
                    theaterRooms.map((theaterRoom) => {
                        number++;
                        return (
                            // console.log({ employee.Name });
                            <tbody>
                                <tr>
                                    <td>{number}</td>
                                    <td><button className="button-test" id={theaterRoom.id} onClick={getInfo}>{theaterRoom.roomNumber}</button></td>
                                    <td>{theaterRoom.seatQuantity}</td>
                                    {
                                        movies.map((movie) => {
                                            if (theaterRoom.movieID == movie.id) {
                                                return (
                                                    <td>{movie.movieName}</td>
                                                )
                                            }
                                            return null;
                                        })
                                    }
                                </tr>
                            </tbody>
                        )
                    })
                }
            </Table>
        </div>)
    }
};


