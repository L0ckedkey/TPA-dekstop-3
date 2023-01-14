import { useRef, useState, useEffect, useContext } from "react";
import { db } from '../firebase-config';
import { addDoc, collection, getDocs } from 'firebase/firestore';
import Table from 'react-bootstrap/Table';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import FoodController, { addFood } from "../controller/foodController";

export function AddFood() {

    const [foodName, setNewFoodName] = useState("");
    const [price, setNewPrice] = useState(0);
    const [stock, setNewStock] = useState(0);



    return (
        <div className="content">
            <div className="content-bottom-gapped">
                <Form className="form-adjust">
                    <Form.Group className="mb-3" controlId="formBasicName">
                        <Form.Label className="white-color">Food Name</Form.Label>
                        <Form.Control type="text" placeholder="Enter Food Name" onChange={(event) => { setNewFoodName(event.target.value) }} />
                        <Form.Text className="text-warning" >
                            Please input food name.
                        </Form.Text>
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label className="white-color">Food Price</Form.Label>
                        <Form.Control type="text" placeholder="Enter Price" onChange={(event) => { setNewPrice(event.target.value) }} />
                        <Form.Text className="text-warning">
                            Please input price.
                        </Form.Text>
                    </Form.Group>

                </Form>
            </div>
            <div className="content-bottom-gapped">
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label className="white-color">Stock</Form.Label>
                    <Form.Control type="text" placeholder="Enter Stock" onChange={(event) => { setNewStock(event.target.value) }} />
                    <Form.Text className="text-warning">
                        Please input stock.
                    </Form.Text>
                </Form.Group>
                <Button variant="primary" type="submit" onClick={() => addFood(foodName, price, stock)}>
                    Add Food
                </Button>
            </div>
        </div>
    );
}

export function GetFoodOnly() {
    let number = 0;

    const foods = FoodController();


    const [filter, setNewFilter] = useState(false);

    const filtered = () => {
        if (filter == false) {
            setNewFilter(true);
        } else {
            setNewFilter(false);
        }
    }

    if (filter) {
        return (
            <>
                <Table striped bordered hover size variant="dark">
                    <thead>
                        <tr>
                            <th>Number</th>
                            <th>Name</th>
                            <th>Price</th>
                            <th>Stock</th>
                        </tr>
                    </thead>

                    {

                        foods.map((food) => {

                            if (food.Stock > 0) {
                                number++;
                                return (
                                    // console.log({ employee.Name });
                                    <tbody>
                                        <tr>
                                            <td>{number}</td>
                                            <td>{food.FoodName}</td>
                                            <td>{food.Price}</td>
                                            <td>{food.Stock}</td>
                                        </tr>
                                    </tbody>
                                )
                            }

                        })
                    }
                </Table>
                <Button variant="primary" type="submit" onClick={filtered}>
                    Show All
                </Button>
            </>
        );
    } else {
        return (
            <>
                <Table striped bordered hover size variant="dark">
                    <thead>
                        <tr>
                            <th>Number</th>
                            <th>Name</th>
                            <th>Price</th>
                            <th>Stock</th>
                        </tr>
                    </thead>

                    {

                        foods.map((food) => {
                            number++;
                            return (
                                // console.log({ employee.Name });
                                <tbody>
                                    <tr>
                                        <td>{number}</td>
                                        <td>{food.FoodName}</td>
                                        <td>{food.Price}</td>
                                        <td>{food.Stock}</td>
                                    </tr>
                                </tbody>
                            )
                        })
                    }
                </Table>
                <Button variant="primary" type="submit" onClick={filtered}>
                    Show Ready Only
                </Button>
            </>
        );
    }
}

export default function GetFood() {
    let number = 0;

    const foods = FoodController();


    return (
        <>
            <Table striped bordered hover size variant="dark">
                <thead>
                    <tr>
                        <th>Number</th>
                        <th>Name</th>
                        <th>Price</th>
                        <th>Stock</th>
                    </tr>
                </thead>

                {

                    foods.map((food) => {
                        number++;
                        return (
                            // console.log({ employee.Name });
                            <tbody>
                                <tr>
                                    <td>{number}</td>
                                    <td>{food.FoodName}</td>
                                    <td>{food.Price}</td>
                                    <td>{food.Stock}</td>
                                </tr>
                            </tbody>
                        )
                    })
                }
            </Table>
            <AddFood />
        </>
    );
}


