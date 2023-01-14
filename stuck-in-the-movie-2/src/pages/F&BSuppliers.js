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
import FBSuppliersController, { addFBSuppliers } from "../controller/F&BSuppliersController";



export function viewFBSuppliers() {
    let number = 0;

    const movieProducers = FBSuppliersController();

    return (
        <>
            <Table striped bordered hover size variant="dark">
                <thead>
                    <tr>
                        <th>Number</th>
                        <th>image</th>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Type</th>
                        <th>Product</th>
                    </tr>
                </thead>

                {

                    movieProducers.map((movieProducer) => {
                        number++;

                        return (
                            <tbody>
                                <tr>
                                    <>
                                        <td>{number}</td>
                                        <td><img src={movieProducer.img}></img></td>
                                        <td>{movieProducer.name}</td>
                                        <td>{movieProducer.email}</td>
                                        <td>{movieProducer.type}</td>
                                        <td>{movieProducer.product}</td>
                                    </>

                                </tr>
                            </tbody>
                        )

                    })
                }
            </Table>
            <AddFBSuppliers />
        </>
    );
}

export function AddFBSuppliers() {
    const [type, setNewType] = useState('');
    const [name, setNewName] = useState('');
    const [email, setNewEmail] = useState('');
    const [url, setNewURL] = useState('');
    const [product, setNewProduct] = useState('');


    return (
        <>
            <div className="content">

                <div className="content-bottom-gapped">
                    <Form className="form-adjust">
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label className="white-color">Supplier Name</Form.Label>
                            <Form.Control type="text" placeholder="Enter duration" onChange={(event) => { setNewName(event.target.value) }} />
                            <Form.Text className="text-warning">
                                Please input supplier name.
                            </Form.Text>
                        </Form.Group>
                    </Form >
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label className="white-color">Type</Form.Label>
                        <Form.Control type="text" placeholder="Enter movie genre" onChange={(event) => { setNewType(event.target.value) }} />
                        <Form.Text className="text-warning">
                            Please input type (Food/Beverage).
                        </Form.Text>
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label className="white-color">Product</Form.Label>
                        <Form.Control type="text" placeholder="Enter movie genre" onChange={(event) => { setNewProduct(event.target.value) }} />
                        <Form.Text className="text-warning">
                            Please input product.
                        </Form.Text>
                    </Form.Group>

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
                        <Button variant="primary" type="submit" onClick={() => { addFBSuppliers(product, type, name, email, url) }}>
                            Add F&B Supplier
                        </Button>
                    </Form >
                </div>
            </div >

        </>
    );
}

