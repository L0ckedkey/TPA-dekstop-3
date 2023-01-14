import { useRef, useState, useEffect, useContext } from "react";
import { db } from '../firebase-config';
import { addDoc, collection, getDocs } from 'firebase/firestore';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import BeverageController, { AddBeverageDB } from "../controller/beverageController";
import { id } from "common-tags";



export function AddBeverage() {

    const [beverageName, setNewBeverageName] = useState("");
    const [price, setNewPrice] = useState(0);
    const [stock, setNewStock] = useState(0);


    return (
        <div className="content">
            <div className="content-bottom-gapped">
                <Form className="form-adjust">
                    <Form.Group className="mb-3" controlId="formBasicName">
                        <Form.Label className="white-color">Beverage Name</Form.Label>
                        <Form.Control type="text" placeholder="Enter Beverage Name" onChange={(event) => { setNewBeverageName(event.target.value) }} />
                        <Form.Text className="text-warning" >
                            Please input beverage name.
                        </Form.Text>
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label className="white-color">Beverage Price</Form.Label>
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
                <Button variant="primary" type="submit" onClick={() => AddBeverageDB(beverageName, price, stock)}>
                    Add Beverage
                </Button>
            </div>
        </div>
    );


}

export function GetBeverageOnly() {
    let number = 0;

    const beverages = BeverageController();
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

                        beverages.map((beverage) => {
                            number++;
                            if (beverage.Stock > 0) {
                                return (
                                    // console.log({ employee.Name });
                                    <tbody>
                                        <tr>
                                            <td>{number}</td>
                                            <td>{beverage.BeverageName}</td>
                                            <td>{beverage.Price}</td>
                                            <td>{beverage.Stock}</td>
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

                        beverages.map((beverage) => {
                            number++;
                            return (
                                // console.log({ employee.Name });
                                <tbody>
                                    <tr>
                                        <td>{number}</td>
                                        <td>{beverage.BeverageName}</td>
                                        <td>{beverage.Price}</td>
                                        <td>{beverage.Stock}</td>
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

export default function GetBeverage() {
    let number = 0;

    const beverages = BeverageController();

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

                    beverages.map((beverage) => {
                        number++;
                        return (
                            // console.log({ employee.Name });
                            <tbody>
                                <tr>
                                    <td>{number}</td>
                                    <td>{beverage.BeverageName}</td>
                                    <td>{beverage.Price}</td>
                                    <td>{beverage.Stock}</td>
                                </tr>
                            </tbody>
                        )
                    })
                }
            </Table>
            <AddBeverage />
        </>
    );
}
