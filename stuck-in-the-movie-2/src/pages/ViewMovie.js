import { useState, useEffect } from "react";
import { db } from '../firebase-config';
import { addDoc, collection, getDocs } from 'firebase/firestore';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import MovieController, { addMovie } from "../controller/movieController";



export function ViewMovieOnly() {
    let number = 0;

    const movies = MovieController();

    return (
        <>
            <Table striped bordered hover size variant="dark">
                <thead>
                    <tr>
                        <th>Number</th>
                        <th>Movie ID</th>
                        <th>Name</th>
                        <th>Duration</th>
                    </tr>
                </thead>

                {

                    movies.map((movie) => {
                        number++;
                        return (
                            // console.log({ employee.Name });
                            <tbody>
                                <tr>
                                    <td>{number}</td>
                                    <td>{movie.id}</td>
                                    <td>{movie.movieName}</td>
                                    <td>{movie.duration} minutes</td>
                                </tr>
                            </tbody>
                        )
                    })
                }
            </Table>
        </>
    );
}

export function AddMovie() {
    const [name, setNewMovieName] = useState('');
    const [duration, setNewDuration] = useState(0);
    const [genre, setNewGenre] = useState('');

    return (
        <div className="content">
            <div className="content-bottom-gapped">
                <Form className="form-adjust">
                    <Form.Group className="mb-3" controlId="formBasicName">
                        <Form.Label className="white-color">Movie Name</Form.Label>
                        <Form.Control type="text" placeholder="Enter movie name" onChange={(event) => { setNewMovieName(event.target.value) }} />
                        <Form.Text className="text-warning" >
                            Please input movie name.
                        </Form.Text>
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label className="white-color">Duration</Form.Label>
                        <Form.Control type="text" placeholder="Enter duration" onChange={(event) => { setNewDuration(event.target.value) }} />
                        <Form.Text className="text-warning">
                            Please input duration.
                        </Form.Text>
                    </Form.Group>


                </Form >
            </div>
            <div className="content-bottom-gapped">
                <Form>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label className="white-color">Genre</Form.Label>
                        <Form.Control type="text" placeholder="Enter movie genre" onChange={(event) => { setNewGenre(event.target.value) }} />
                        <Form.Text className="text-warning">
                            Please input genre.
                        </Form.Text>
                    </Form.Group>
                    <Button variant="primary" type="submit" onClick={() => { addMovie(name, genre, duration) }}>
                        Add Movie
                    </Button>
                </Form >
            </div>
        </div >
    );
}

export default function ViewMovie() {
    let number = 0;

    const movies = MovieController();

    return (
        <>
            <Table striped bordered hover size variant="dark">
                <thead>
                    <tr>
                        <th>Number</th>
                        <th>Name</th>
                        <th>Duration</th>
                    </tr>
                </thead>

                {

                    movies.map((movie) => {
                        number++;
                        return (
                            // console.log({ employee.Name });
                            <tbody>
                                <tr>
                                    <td>{number}</td>
                                    <td>{movie.movieName}</td>
                                    <td>{movie.duration} minutes</td>
                                </tr>
                            </tbody>
                        )
                    })
                }
            </Table>
            <AddMovie />
        </>
    );
};
