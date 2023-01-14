import { useState, useEffect } from "react";
import { db } from '../firebase-config';
import { addDoc, collection, getDocs } from 'firebase/firestore';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import MovieController, { addMovie } from "../controller/movieController";
import MovieProducersController, { addMovieProducers } from "../controller/movieProducersController";
import EmployeeController from "../controller/employeeController";
import ViewMovie from "./ViewMovie";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';
import { LineChart, Line } from 'recharts';
import { refreshLogin } from "./Login";
import ScheduleController from "../controller/scheduleController";
import MovieOrderController from "../controller/movieOrderDetailController";



export function viewMovieProducers() {
    let number = 0;

    const movieProducers = MovieProducersController();
    const movies = MovieController();

    return (
        <>
            <Table striped bordered hover size variant="dark">
                <thead>
                    <tr>
                        <th>Number</th>
                        <th>image</th>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Movie Name</th>
                    </tr>
                </thead>

                {

                    movieProducers.map((movieProducer) => {
                        number++;

                        return (
                            < tbody >
                                <tr>
                                    {
                                        movies.map((movie) => {
                                            if (movieProducer.movieID == movie.id) {
                                                return (
                                                    <>
                                                        <td>{number}</td>
                                                        <td><img src={movieProducer.img}></img></td>
                                                        <td>{movieProducer.name}</td>
                                                        <td>{movieProducer.email}</td>
                                                        <td>{movie.movieName}</td>
                                                    </>
                                                );
                                            }
                                        })
                                    }
                                </tr>
                            </tbody>
                        )

                    })
                }
            </Table>
            <AddMovieProducers />
        </>
    );
}

export function AddMovieProducers() {
    let Component = ViewMovie;
    const [movieID, setNewMovieID] = useState('');
    const [name, setNewName] = useState('');
    const [email, setNewEmail] = useState('');
    const [url, setNewURL] = useState('');


    return (
        <>
            <Component />
            <div className="content">

                <div className="content-bottom-gapped">
                    <Form className="form-adjust">
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label className="white-color">Producer Name</Form.Label>
                            <Form.Control type="text" placeholder="Enter duration" onChange={(event) => { setNewName(event.target.value) }} />
                            <Form.Text className="text-warning">
                                Please producer name.
                            </Form.Text>
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formBasicName">
                            <Form.Label className="white-color">Movie ID</Form.Label>
                            <Form.Control type="text" placeholder="Enter movie name" onChange={(event) => { setNewMovieID(event.target.value) }} />
                            <Form.Text className="text-warning" >
                                Please input movie id.
                            </Form.Text>
                        </Form.Group>
                    </Form >
                    <Button variant="primary" type="submit" onClick={() => { addMovieProducers(movieID, name, email, url) }}>
                        Add Movie Producer
                    </Button>
                </div>
                <div className="content-bottom-gapped">
                    <Form>
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label className="white-color">Email</Form.Label>
                            <Form.Control type="text" placeholder="Enter movie genre" onChange={(event) => { setNewEmail(event.target.value) }} />
                            <Form.Text className="text-warning">
                                Please input email.
                            </Form.Text>
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label className="white-color">Image URL</Form.Label>
                            <Form.Control type="text" placeholder="Enter movie genre" onChange={(event) => { setNewURL(event.target.value) }} />
                            <Form.Text className="text-warning">
                                Please input url.
                            </Form.Text>
                        </Form.Group>

                    </Form >
                </div>
            </div >

        </>
    );
}

const getInfo = (id) => {
    sessionStorage.setItem("Movie Producer ID", id);
    refreshLogin();
}

export function GenerateChart() {

    const movieProducers = MovieProducersController();
    const schedules = ScheduleController();
    const orderDetails = MovieOrderController();
    let number = 0;
    let totalSeat = 0;
    const movies = MovieController();

    if (sessionStorage.getItem("Movie Producer ID") != null) {
        return (
            <>
                <Table striped bordered hover size variant="dark">
                    <thead>
                        <tr>
                            <th>Movie Name</th>
                            <th>Schedule Date</th>
                            <th>Total Seat</th>
                        </tr>
                    </thead>

                    {

                        movieProducers.map((movieProducer) => {
                            number++;
                            totalSeat = 0;
                            if (movieProducer.id == sessionStorage.getItem("Movie Producer ID")) {
                                return (
                                    < tbody >
                                        <tr>
                                            {
                                                movies.map((movie) => {
                                                    if (movieProducer.movieID == movie.id) {
                                                        return (
                                                            <>
                                                                {
                                                                    schedules.map((schedule) => {
                                                                        if (movie.id == schedule.movieID) {
                                                                            return (
                                                                                <>
                                                                                    {
                                                                                        orderDetails.map((orderDetail) => {
                                                                                            if (orderDetail.scheduleID == schedule.id) {
                                                                                                totalSeat++;
                                                                                            }
                                                                                        })
                                                                                    }
                                                                                    <>
                                                                                        <td>{movie.movieName}</td>
                                                                                        <td>{schedule.Date}</td>
                                                                                        <td>{totalSeat}</td>
                                                                                    </>
                                                                                </>
                                                                            )
                                                                        }
                                                                    })
                                                                }
                                                            </>
                                                        );
                                                    }
                                                })
                                            }
                                        </tr>
                                    </tbody>
                                )
                            }


                        })
                    }
                </Table>
            </>
        );
    }
}

export function getMovieProducerReport() {

    let number = 0;

    const movieProducers = MovieProducersController();
    const movies = MovieController();

    return (
        <>
            <Table striped bordered hover size variant="dark">
                <thead>
                    <tr>
                        <th>Number</th>
                        <th>image</th>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Movie Name</th>
                    </tr>
                </thead>

                {

                    movieProducers.map((movieProducer) => {
                        number++;

                        return (
                            < tbody >
                                <tr>
                                    {
                                        movies.map((movie) => {
                                            if (movieProducer.movieID == movie.id) {
                                                return (
                                                    <>
                                                        <td>{number}</td>
                                                        <td><img src={movieProducer.img}></img></td>
                                                        <td><button className="button-test" onClick={() => getInfo(movieProducer.id)}>{movieProducer.name}</button></td>
                                                        <td>{movieProducer.email}</td>
                                                        <td>{movie.movieName}</td>
                                                    </>
                                                );
                                            }
                                        })
                                    }
                                </tr>
                            </tbody>
                        )

                    })
                }
            </Table>
            <GenerateChart />
        </>
    );

}