import { useState, useEffect } from "react";
import { db } from '../firebase-config';
import { addDoc, collection, getDocs } from 'firebase/firestore';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import MovieController, { addMovie } from "../controller/movieController";
import MovieProducersController, { addMovieProducers } from "../controller/movieProducersController";
import EmployeeController from "../controller/employeeController";
import { ViewMovieOnly } from "./ViewMovie";
import AdvertisingPartnerController, { addAdvertisingPartner, chartDataAdvertisingPartner } from "../controller/advertisingPartnerController";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';
import { LineChart, Line } from 'recharts';


export function viewAdvertisingPartner() {
    let number = 0;

    const movieProducers = AdvertisingPartnerController();

    return (
        <>
            <Table striped bordered hover size variant="dark">
                <thead>
                    <tr>
                        <th>Number</th>
                        <th>image</th>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Ad Type</th>
                        <th>Duration</th>
                    </tr>
                </thead>

                {

                    movieProducers.map((movieProducer) => {
                        number++;

                        return (
                            < tbody >
                                <tr>
                                    <>
                                        <td>{number}</td>
                                        <td><img src={movieProducer.img}></img></td>
                                        <td>{movieProducer.name}</td>
                                        <td>{movieProducer.email}</td>
                                        <td>{movieProducer.type}</td>
                                        <td>{movieProducer.duration} minutes</td>
                                    </>
                                </tr>
                            </tbody>
                        )

                    })
                }
            </Table>
            <AddAdvertisingPartner />
        </>
    );
}

export function AddAdvertisingPartner() {
    const [duration, setNewDuration] = useState('');
    const [name, setNewName] = useState('');
    const [email, setNewEmail] = useState('');
    const [url, setNewURL] = useState('');
    const [type, setNewType] = useState('');


    return (
        <>
            <div className="content">

                <div className="content-bottom-gapped">
                    <Form className="form-adjust">
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label className="white-color">Producer Name</Form.Label>
                            <Form.Control type="text" placeholder="Enter duration" onChange={(event) => { setNewName(event.target.value) }} />
                            <Form.Text className="text-warning">
                                Please input duration.
                            </Form.Text>
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formBasicName">
                            <Form.Label className="white-color">Duration</Form.Label>
                            <Form.Control type="text" placeholder="Enter movie name" onChange={(event) => { setNewDuration(event.target.value) }} />
                            <Form.Text className="text-warning" >
                                Please input duration.
                            </Form.Text>
                        </Form.Group>
                    </Form >
                    <Button variant="primary" type="submit" onClick={() => { addAdvertisingPartner(type, duration, name, email, url) }}>
                        Add Movie Producer
                    </Button>
                </div>
                <div className="content-bottom-gapped">
                    <Form>
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label className="white-color">Email</Form.Label>
                            <Form.Control type="text" placeholder="Enter movie genre" onChange={(event) => { setNewEmail(event.target.value) }} />
                            <Form.Text className="text-warning">
                                Please input genre.
                            </Form.Text>
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label className="white-color">Image URL</Form.Label>
                            <Form.Control type="text" placeholder="Enter movie genre" onChange={(event) => { setNewURL(event.target.value) }} />
                            <Form.Text className="text-warning">
                                Please input genre.
                            </Form.Text>
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label className="white-color">Type</Form.Label>
                            <Form.Control type="text" placeholder="Enter movie genre" onChange={(event) => { setNewType(event.target.value) }} />
                            <Form.Text className="text-warning">
                                Please input genre.
                            </Form.Text>
                        </Form.Group>


                    </Form >
                </div>
            </div >
        </>
    );
}

export function getAdvertisingReport() {

    const data = chartDataAdvertisingPartner();
    return (
        <>
            < LineChart width={1200} height={400} data={data} >
                <Line type="monotone" dataKey="total" stroke="#00FF00" strokeWidth={4} />
                <CartesianGrid stroke="#CCC" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
            </LineChart >
        </>

    )


}