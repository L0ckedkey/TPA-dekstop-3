import { useState, useEffect } from "react";
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import EquipmentController, { addEquipment } from "../controller/equipmentController";
import LabelController from "../controller/labelController";
import FinanceController, { chartData, getRevenue } from "../controller/financeController";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';
import { LineChart, Line } from 'recharts';
import { render } from "@testing-library/react";



function refreshViewEquipment() {
    window.location = window.location.pathname;
}


function setFilter(yearFilter) {
    sessionStorage.setItem("Year Filter", yearFilter)

    refreshViewEquipment();
}


export default function ViewFinance() {
    const [yearFilter, setNewFilter] = useState('');

    const getInfo = event => {
        sessionStorage.setItem("Equipment ID", event.currentTarget.id);
        refreshViewEquipment();
    }

    const equipments = FinanceController();
    const labels = LabelController();
    let number = 0;
    const data = chartData();
    if (sessionStorage.getItem("Equipment ID") == null) {
        return (

            < div >
                <h2 className="white-color">{sessionStorage.getItem("Year Filter")}</h2>
                <LineChart width={800} height={400} data={data}>
                    <Line type="monotone" dataKey="expenses" stroke="#FF0000" strokeWidth={4} />
                    <Line type="monotone" dataKey="revenue" stroke="#00FF00" strokeWidth={4} />
                    <CartesianGrid stroke="#CCC" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                </LineChart>
                <h2 className="white-color">Total Revenue : {getRevenue()}</h2>
                <h2 className="white-color">Tax : {getRevenue() / 10}</h2>
                <div>
                    <Form className="form-adjust width-custom">
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label className="white-color">Year Filter </Form.Label>
                            <Form.Control type="text" placeholder="" onChange={(event) => { setNewFilter(event.target.value) }} />
                            <Form.Text className="text-warning">
                            </Form.Text>
                        </Form.Group>
                    </Form >
                    <Button variant="primary" type="submit" onClick={() => setFilter(yearFilter)}>
                        View Filter
                    </Button>
                </div>



                <h2 className="white-color">Expenses</h2>
                <Table bordered size variant="dark">
                    <thead>
                        <tr>
                            <th>No</th>
                            <th>Month</th>
                            <th>Year</th>
                            <th>Amount</th>
                            <th>Description</th>
                        </tr>
                    </thead>
                    {
                        equipments.map((equipment) => {
                            number++;
                            if (equipment.type === "Expenses") {
                                return (
                                    <tbody>
                                        <tr>
                                            <>
                                                <td>{number}</td>
                                                <td>{equipment.month}</td>
                                                <td>{equipment.year}</td>
                                                <td>{equipment.amount}</td>
                                                <td>{equipment.description}</td>
                                            </>
                                        </tr>
                                    </tbody>
                                )
                            }

                        })}

                </Table>
                <h2 className="white-color">Revenue</h2>
                <Table bordered hover size variant="dark">
                    <thead>
                        <tr>
                            <th>No</th>
                            <th>Month</th>
                            <th>Year</th>
                            <th>Amount</th>
                            <th>Description</th>
                        </tr>
                    </thead>
                    {
                        equipments.map((equipment) => {
                            number++;
                            if (equipment.type === "Revenue") {
                                return (
                                    <tbody>
                                        <tr>
                                            <>
                                                <td>{number}</td>
                                                <td>{equipment.month}</td>
                                                <td>{equipment.year}</td>
                                                <td>{equipment.amount}</td>
                                                <td>{equipment.description}</td>
                                            </>
                                        </tr>
                                    </tbody>
                                )
                            }

                        })}

                </Table>
                <renderBarChart />

            </div >

        )
    } else {
        return (
            <div>
                <h2 className="white-color">Equipment</h2>
                <Table bordered size variant="dark">
                    <thead>
                        <tr>

                            <th>No</th>
                            <th>Equipment Name</th>
                            <th>Quantity</th>
                            <th>Status</th>
                        </tr>
                    </thead>
                    {
                        equipments.map((equipment) => {

                            if (equipment.type === "Equipment") {
                                number++;
                                return (
                                    <tbody>
                                        <tr>
                                            <>
                                                <td>{number}</td>
                                                <td><button id={equipment.id} className="button-test" onClick={getInfo}>{equipment.equipmentName}</button></td>
                                                <td>{equipment.quantity}</td>
                                                <td className={`${equipment.status === "Good" ? 'activeaaa' : 'inactiveaaa'}`}>{equipment.status}</td>
                                            </>
                                        </tr>
                                    </tbody>
                                )
                            }

                        })}

                </Table>
                <h2 className="white-color">Facilty</h2>
                <Table bordered hover size variant="dark">
                    <thead>
                        <tr>

                            <th>No</th>
                            <th>Equipment Name</th>
                            <th>Quantity</th>
                            <th>Status</th>
                        </tr>
                    </thead>
                    {
                        equipments.map((equipment) => {

                            if (equipment.type === "Facilty") {
                                number++;
                                return (
                                    <tbody>
                                        <tr>
                                            <>
                                                <td>{number}</td>
                                                <td><button id={equipment.id} className="button-test" onClick={getInfo}>{equipment.equipmentName}</button></td>
                                                <td>{equipment.quantity}</td>
                                                <td className={`${equipment.status === "Good" ? 'activeaaa' : 'inactiveaaa'}`}>{equipment.status}</td>
                                            </>
                                        </tr>
                                    </tbody>
                                )
                            }

                        })}

                </Table>
                <Table bordered size variant="dark">
                    <thead>
                        <tr>
                            <th>Equipment Name</th>
                            <th>Used Date</th>
                            <th>Return Date</th>
                            <th>Returned Status</th>
                        </tr>
                    </thead>
                    {
                        equipments.map((equipment) => {
                            if (sessionStorage.getItem("Equipment ID") === equipment.id) {
                                return (
                                    <tbody>
                                        <tr>
                                            {
                                                labels.map((label) => {
                                                    if (equipment.labelID === label.id) {
                                                        return (
                                                            <>
                                                                <td>{equipment.equipmentName}</td>
                                                                <td>{label.usedDate}</td>
                                                                <td>{label.returnDate}</td>
                                                                <td className={`${label.status === "Good" ? 'activeaaa' : 'inactiveaaa'}`}>{label.status}</td>
                                                            </>
                                                        )

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

            </div>

        )
    }

}

export function AddFinance() {
    const [equipmentName, setNewEquipmentName] = useState('');
    const [quantity, setNewQuantity] = useState('');
    const [type, setNewType] = useState('');



    return (
        <div className="content">
            <div className="content-bottom-gapped">
                <Form className="form-adjust">
                    <Form.Group className="mb-3" controlId="formBasicName">
                        <Form.Label className="white-color">Equipment Name</Form.Label>
                        <Form.Control type="text" placeholder="" onChange={(event) => { setNewEquipmentName(event.target.value) }} />
                        <Form.Text className="text-warning" >
                            Please input Equipment Name.
                        </Form.Text>
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label className="white-color">Quantity</Form.Label>
                        <Form.Control type="text" placeholder="" onChange={(event) => { setNewQuantity(event.target.value) }} />
                        <Form.Text className="text-warning">
                            Please input Quantity.
                        </Form.Text>
                    </Form.Group>
                </Form >
            </div>

            <div className="content-bottom-gapped">
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label className="white-color">Type</Form.Label>
                    <Form.Control type="text" placeholder="Enter email" onChange={(event) => { setNewType(event.target.value) }} />
                    <Form.Text className="text-warning">
                        Please input type.
                    </Form.Text>
                </Form.Group>

                <Button variant="primary" type="submit" onClick={() => addEquipment(equipmentName, quantity, type)}>
                    Add Equipment
                </Button>

            </div>
        </div >

    );
}