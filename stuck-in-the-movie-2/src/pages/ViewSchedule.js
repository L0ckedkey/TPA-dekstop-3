import { useState, useEffect } from "react";
import { db } from '../firebase-config';
import { collection, getDocs, addDoc } from 'firebase/firestore';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import TheaterRoom, { ViewTheaterRoomOnly } from "./ViewTheaterRoom";
import { ViewMovieOnly } from "./ViewMovie";
import { ViewEmployeeOnly } from "./viewEmployee";
import MovieController from "../controller/movieController";
import ScheduleController, { addSchedule } from "../controller/scheduleController";
import TheaterRoomController from "../controller/theaterRoomController";
import MovieOrderController from "../controller/movieOrderDetailController";

const monthNames = ["January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
];
export function AddSchedule() {
    const [date, setNewDate] = useState('');
    const [endTime, setNewEndTime] = useState('');
    const [startTime, setNewStartTime] = useState('');
    const [roomNumber, setNewRoomNumber] = useState('');
    const [movieID, setNewMovieID] = useState('');



    return (

        <div className="content">

            <div className="content-bottom-gapped">
                <Form className="form-adjust">
                    <Form.Group className="mb-3" controlId="formBasicName">
                        <Form.Label className="white-color">Date</Form.Label>
                        <Form.Control type="text" placeholder="Enter date" onChange={(event) => { setNewDate(event.target.value) }} />
                        <Form.Text className="text-warning" >
                            Please input date DD Month YYYY.
                        </Form.Text>
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label className="white-color">Start Time</Form.Label>
                        <Form.Control type="text" placeholder="Enter image url" onChange={(event) => { setNewStartTime(event.target.value) }} />
                        <Form.Text className="text-warning">
                            Please input start time.
                        </Form.Text>
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label className="white-color">End Time</Form.Label>
                        <Form.Control type="text" placeholder="Enter email" onChange={(event) => { setNewEndTime(event.target.value) }} />
                        <Form.Text className="text-warning">
                            Please input end time.
                        </Form.Text>
                    </Form.Group>

                </Form >
            </div>
            <div className="content-bottom-gapped">
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label className="white-color">Movie ID</Form.Label>
                    <Form.Control type="text" placeholder="Enter email" onChange={(event) => { setNewMovieID(event.target.value) }} />
                    <Form.Text className="text-warning">
                        Please input end time.
                    </Form.Text>
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label className="white-color">Room ID</Form.Label>
                    <Form.Control type="text" placeholder="Enter Room Number" onChange={(event) => { setNewRoomNumber(event.target.value) }} />
                    <Form.Text className="text-warning">
                        Please input end time.
                    </Form.Text>
                </Form.Group>
                <Button variant="primary" type="submit" onClick={() => addSchedule(date, endTime, movieID, roomNumber, startTime)}>
                    Add Schedule
                </Button>
            </div>
            <div className="content-bottom-gapped">
                <ViewTheaterRoomOnly />
                <ViewMovieOnly />
            </div>
        </div >

    );
}

export function ViewScheduleOnly() {
    let number = 0;

    const movies = MovieController();
    const schedules = ScheduleController();
    const theaterRooms = TheaterRoomController();

    const [playingOnly, setFilter] = useState(false);

    const filter = () => {
        if (playingOnly === false) {
            setFilter(true);
        } else {
            setFilter(false);
        }
    }

    if (playingOnly === false) {
        return (
            <div>
                <Table bordered hover size variant="dark">
                    <thead>
                        <tr>
                            <th>Room Number</th>
                            <th>Status</th>
                            <th>Date</th>
                            <th>Movie Name</th>
                            <th>Start Time</th>
                            <th>Duration</th>

                        </tr>
                    </thead>
                    {
                        schedules.map((schedule) => {
                            return (
                                <tbody>
                                    <tr>

                                        {
                                            theaterRooms.map((theaterRoom) => {
                                                if (schedule.roomNumber == theaterRoom.id) {
                                                    return (
                                                        <>
                                                            <td>{theaterRoom.roomNumber}</td>
                                                            <td className={`${schedule.status === "Playing" ? 'activeaaa' : 'inactiveaaa'}`}>{schedule.status}</td>
                                                        </>
                                                    );
                                                }

                                            })
                                        }
                                        {movies.map((movie) => {
                                            if (schedule.movieID == movie.id) {
                                                number++;
                                                console.log("haha : " + movie.movieName);
                                                return (
                                                    <>
                                                        <td>{schedule.Date}</td>
                                                        <td>{movie.movieName}</td>
                                                        <td>{schedule.startTime}</td>
                                                        <td>{movie.duration} minutes</td>

                                                    </>
                                                )
                                            }

                                            return null;
                                        })
                                        }



                                    </tr>
                                </tbody>
                            )
                        })}

                </Table>
                <Button variant="primary" type="submit" onClick={filter}>
                    Show Playing Only
                </Button>
            </div>
        )
    } else {
        return (
            <div>
                <Table bordered hover size variant="dark">
                    <thead>
                        <tr>
                            <th>Room Number</th>
                            <th>Status</th>
                            <th>Date</th>
                            <th>Movie Name</th>
                            <th>Date</th>
                            <th>Start Time</th>
                            <th>Duration</th>

                        </tr>
                    </thead>
                    {
                        schedules.map((schedule) => {
                            if (schedule.status == "Playing") {
                                return (
                                    <tbody>
                                        <tr>

                                            {
                                                theaterRooms.map((theaterRoom) => {
                                                    if (schedule.roomNumber == theaterRoom.id) {
                                                        return (
                                                            <>
                                                                <td>{theaterRoom.roomNumber}</td>
                                                                <td className={`${schedule.status === "Playing" ? 'activeaaa' : 'inactiveaaa'}`}>{schedule.status}</td>
                                                            </>
                                                        );
                                                    }

                                                })
                                            }
                                            {movies.map((movie) => {
                                                if (schedule.movieID == movie.id) {
                                                    number++;
                                                    console.log("haha : " + movie.movieName);
                                                    return (
                                                        <>
                                                            <td>{schedule.Date}</td>
                                                            <td>{movie.movieName}</td>
                                                            <td>{schedule.Date}</td>
                                                            <td>{schedule.startTime}</td>
                                                            <td>{movie.duration} minutes</td>

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

                        })}

                </Table>
                <Button variant="primary" type="submit" onClick={filter}>
                    Show All
                </Button>
            </div>
        )
    }


}

export function generateSchedule() {
    const movies = MovieController();

    return (
        <>
            <ViewMovieOnly />
        </>
    )

}

export function viewRunningSchedule() {

    const schedules = ScheduleController();
    const movies = MovieController();

    const date = new Date();
    let dayNow = date.getDate();
    let monthNow = monthNames[date.getMonth()]
    let yearNow = date.getFullYear();

    return (
        <div>
            <Table striped bordered hover size variant="dark">
                <thead>
                    <tr>
                        <th>Date</th>
                        <th>Room Number</th>
                        <th>Movie Name</th>
                        <th>Start Time</th>
                        <th>Duration</th>

                    </tr>
                </thead>
                {
                    schedules.map((schedule) => {
                        let dateSchedule = schedule.Date.split(" ");
                        let daySchedule = dateSchedule[0];
                        let monthSchedule = dateSchedule[1];
                        let yearSchedule = dateSchedule[2];
                        console.log(schedule.Date)
                        console.log(dayNow)
                        console.log(monthNow)
                        console.log(yearNow)
                        return (

                            < tbody >
                                <tr>
                                    {movies.map((movie) => {
                                        if (schedule.movieID == movie.id && dayNow == daySchedule && monthNow == monthSchedule && yearNow == yearSchedule) {
                                            return (
                                                <>
                                                    <td>{schedule.Date}</td>
                                                    <td>{schedule.roomNumber}</td>
                                                    <td>{movie.movieName}</td>
                                                    <td>{schedule.startTime}</td>
                                                    <td>{movie.duration} minutes</td>

                                                </>
                                            )
                                        }

                                        return null;
                                    })
                                    }
                                </tr>
                            </tbody>
                        )
                    })}

            </Table>
        </div >
    );
}

export default function ViewSchedule() {
    let number = 0;
    const [schedules, setSchedule] = useState([]);
    const scheduleColectionRef = collection(db, "Schedule");

    const [movies, setMovie] = useState([]);
    const movieColectionRef = collection(db, "Movie");

    useEffect(() => {

        const getSchedule = async () => {
            const data = await getDocs(scheduleColectionRef);
            setSchedule(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
            console.log(data);
        };

        getSchedule();

        const getMovie = async () => {
            const data = await getDocs(movieColectionRef);
            setMovie(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
            console.log(data);
        };
        getMovie();
    }, [])

    return (
        <div>
            <Table striped bordered hover size variant="dark">
                <thead>
                    <tr>
                        <th>Date</th>
                        <th>Room Number</th>
                        <th>Movie Name</th>
                        <th>Date</th>
                        <th>Start Time</th>
                        <th>Duration</th>

                    </tr>
                </thead>
                {
                    schedules.map((schedule) => {
                        return (
                            <tbody>
                                <tr>
                                    {movies.map((movie) => {
                                        if (schedule.movieID == movie.id) {
                                            console.log("haha : " + movie.movieName);
                                            return (
                                                <>
                                                    <td>{schedule.Date}</td>
                                                    <td>{schedule.roomNumber}</td>
                                                    <td>{movie.movieName}</td>
                                                    <td>{schedule.Date}</td>
                                                    <td>{schedule.startTime}</td>
                                                    <td>{movie.duration} minutes</td>

                                                </>
                                            )
                                        }

                                        return null;
                                    })
                                    }
                                </tr>
                            </tbody>
                        )
                    })}

            </Table>

            <AddSchedule />
        </div>
    );
};

export function viewScheduleReport() {

    let seatSold = 0;

    const schedules = ScheduleController();
    const orderDetails = MovieOrderController();
    const movies = MovieController();

    return (
        <div>
            <Table striped bordered hover size variant="dark">
                <thead>
                    <tr>
                        <th>Date</th>
                        <th>Movie Name</th>
                        <th>Start Time</th>
                        <th>End Time</th>
                        <th>Seat Sold</th>
                    </tr>
                </thead>
                {
                    schedules.map((schedule) => {
                        seatSold = 0;
                        return (
                            <tbody>
                                <tr>
                                    {movies.map((movie) => {
                                        if (schedule.movieID == movie.id) {
                                            return (
                                                <>
                                                    {
                                                        orderDetails.map((orderDetail) => {
                                                            if (schedule.id == orderDetail.scheduleID) {
                                                                seatSold++;
                                                            }
                                                        })
                                                    }
                                                    <>
                                                        <td>{schedule.Date}</td>
                                                        <td>{movie.movieName}</td>
                                                        <td>{schedule.startTime}</td>
                                                        <td>{schedule.endTime}</td>
                                                        <td>{seatSold}</td>
                                                    </>
                                                </>
                                            )
                                        }

                                        return null;
                                    })
                                    }
                                </tr>
                            </tbody>
                        )
                    })}

            </Table>

        </div>
    );
}