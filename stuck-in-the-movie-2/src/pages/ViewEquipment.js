import { useState, useEffect } from "react";
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import EquipmentController, { addEquipment } from "../controller/equipmentController";
import LabelController from "../controller/labelController";
import QRCode from "react-qr-code";


function refreshViewEquipment() {
    window.location = window.location.pathname;
}

export default function ViewEquipment() {

    const getInfo = event => {
        sessionStorage.setItem("Equipment ID", event.currentTarget.id);
        refreshViewEquipment();
    }

    const equipments = EquipmentController();
    const labels = LabelController();
    let number = 0;

    if (sessionStorage.getItem("Equipment ID") == null) {
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
                            <th>QR</th>
                        </tr>
                    </thead>
                    {
                        equipments.map((equipment) => {
                            number++;
                            if (equipment.type === "Equipment") {
                                return (
                                    <tbody>
                                        <tr>
                                            <>
                                                <td>{number}</td>
                                                <td><button id={equipment.id} className="button-test" onClick={getInfo}>{equipment.equipmentName}</button></td>
                                                <td>{equipment.quantity}</td>
                                                <td className={`${equipment.status === "Good" ? 'activeaaa' : 'inactiveaaa'}`}>{equipment.status}</td>
                                                <td>
                                                    <QRCode
                                                        size={256}
                                                        style={{ height: "auto", maxWidth: "80px", width: "80px" }}
                                                        value={equipment.id}
                                                        viewBox={`0 0 256 256`}
                                                    />
                                                </td>
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
                            <th>QR</th>
                        </tr>
                    </thead>
                    {
                        equipments.map((equipment) => {
                            number++;
                            if (equipment.type === "Facilty") {
                                return (
                                    <tbody>
                                        <tr>
                                            <>
                                                <td>{number}</td>
                                                <td><button id={equipment.id} className="button-test" onClick={getInfo}>{equipment.equipmentName}</button></td>
                                                <td>{equipment.quantity}</td>
                                                <td className={`${equipment.status === "Good" ? 'activeaaa' : 'inactiveaaa'}`}>{equipment.status}</td>
                                                <td>
                                                    <QRCode
                                                        size={256}
                                                        style={{ height: "auto", maxWidth: "80px", width: "80px" }}
                                                        value={equipment.id}
                                                        viewBox={`0 0 256 256`}
                                                    />
                                                </td>
                                            </>
                                        </tr>
                                    </tbody>
                                )
                            }

                        })}

                </Table>
            </div>
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
                            <th>QR</th>
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
                                                <td>
                                                    <QRCode
                                                        size={256}
                                                        style={{ height: "auto", maxWidth: "80px", width: "80px" }}
                                                        value={equipment.id}
                                                        viewBox={`0 0 256 256`}
                                                    />
                                                </td>
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
                            <th>QR</th>
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
                                                <td>
                                                    <QRCode
                                                        size={256}
                                                        style={{ height: "auto", maxWidth: "80px", width: "80px" }}
                                                        value={equipment.id}
                                                        viewBox={`0 0 256 256`}
                                                    />
                                                </td>
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


export function ViewEquipmentOnly() {



    const equipments = EquipmentController();
    let number = 0;

    if (sessionStorage.getItem("Equipment ID") == null) {
        return (
            <div>
                <h2 className="white-color">Equipment</h2>
                <Table bordered size variant="dark">
                    <thead>
                        <tr>

                            <th>ID</th>
                            <th>Equipment Name</th>
                            <th>Quantity</th>
                            <th>Status</th>
                            <th>QR</th>
                        </tr>
                    </thead>
                    {
                        equipments.map((equipment) => {
                            number++;
                            if (equipment.type === "Equipment") {
                                return (
                                    <tbody>
                                        <tr>
                                            <>
                                                <td>{equipment.id}</td>
                                                <td>{equipment.equipmentName}</td>
                                                <td>{equipment.quantity}</td>
                                                <td className={`${equipment.status === "Good" ? 'activeaaa' : 'inactiveaaa'}`}>{equipment.status}</td>
                                                <td>
                                                    <QRCode
                                                        size={256}
                                                        style={{ height: "auto", maxWidth: "80px", width: "80px" }}
                                                        value={equipment.id}
                                                        viewBox={`0 0 256 256`}
                                                    />
                                                </td>
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

                            <th>ID</th>
                            <th>Equipment Name</th>
                            <th>Quantity</th>
                            <th>Status</th>
                        </tr>
                    </thead>
                    {
                        equipments.map((equipment) => {
                            number++;
                            if (equipment.type === "Facilty") {
                                return (
                                    <tbody>
                                        <tr>
                                            <>
                                                <td>{equipment.id}</td>
                                                <td>{equipment.equipmentName}</td>
                                                <td>{equipment.quantity}</td>
                                                <td className={`${equipment.status === "Good" ? 'activeaaa' : 'inactiveaaa'}`}>{equipment.status}</td>
                                                <td>
                                                    <QRCode
                                                        size={256}
                                                        style={{ height: "auto", maxWidth: "80px", width: "80px" }}
                                                        value={equipment.id}
                                                        viewBox={`0 0 256 256`}
                                                    />
                                                </td>
                                            </>
                                        </tr>
                                    </tbody>
                                )
                            }

                        })}

                </Table>
            </div>
        )
    }

}

export function AddEquipment() {
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