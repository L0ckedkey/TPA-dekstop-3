import FundRequestController from "../controller/fundRequestController";
import { useState, useEffect } from "react";
import { db } from '../firebase-config';
import { addDoc, collection, doc, getDocs, updateDoc } from 'firebase/firestore';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { ViewEmployeeOnly } from "./viewEmployee";
import EmployeeController from "../controller/employeeController";
import PersonalLeaveController, { addPersonalLeave, setToAccepted, setToRejected } from "../controller/personalLeaveController";
import { hasFormSubmit } from "@testing-library/user-event/dist/utils";
import { hydrate } from "react-dom";
import PurchaseController, { chartDataPurchase, updateRealAmount } from "../controller/purchaseController";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';
import { LineChart, Line } from 'recharts';
import { render } from "@testing-library/react";
import DamagedEquipmentController, { addEquipmentDamagedController, setToAcceptedEquipment, setToRejectedEquipment } from "../controller/damagedEquipmentController";
import EquipmentController from "../controller/equipmentController";
import ViewEquipment, { ViewEquipmentOnly } from "./ViewEquipment";

export function viewDamagedFacilities() {
    const damagedEquipments = DamagedEquipmentController();
    const employees = EmployeeController();
    const equipments = EquipmentController();

    let number = 0;
    return (
        <>
            <Table size variant="dark">
                <thead>
                    <tr>
                        <th>Number</th>
                        <th>Equipment Name</th>
                        <th>Issued Date</th>
                        <th>Status</th>
                        <th>Updated By</th>
                    </tr>
                </thead>
                {
                    damagedEquipments.map((damagedEquipment) => {

                        return (
                            // console.log({ employee.Name });
                            <tbody>
                                <tr>
                                    {
                                        equipments.map((equipment) => {
                                            console.log(equipment.id)
                                            if (equipment.id == damagedEquipment.equipmentID) {
                                                number++;
                                                return (
                                                    <>
                                                        <td>{number}</td>
                                                        <td>{equipment.equipmentName}</td>
                                                        <td>{damagedEquipment.issuedDate}</td>
                                                    </>
                                                )
                                            }
                                        })
                                    }
                                    {
                                        employees.map((employee) => {

                                            if (damagedEquipment.storageID == employee.id) {
                                                return (
                                                    <>
                                                        <td className={`${damagedEquipment.status === "Pending" ? 'pending' : damagedEquipment.status === "Fixable" ? 'activeaaa' : 'inactiveaaa'}`}>{damagedEquipment.status}</td>
                                                        <td>{employee.Name}</td>
                                                    </>
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
        </>
    );

}

export function UpdateDamagedEquipment() {
    const damagedEquipments = DamagedEquipmentController();
    const employees = EmployeeController();
    const equipments = EquipmentController();

    let number = 0;
    return (
        <>
            <Table size variant="dark">
                <thead>
                    <tr>
                        <th>Number</th>
                        <th>Equipment Name</th>
                        <th>Issued Date</th>
                        <th>Status</th>
                    </tr>
                </thead>
                {
                    damagedEquipments.map((damagedEquipment) => {

                        if (damagedEquipment.status == "Pending") {
                            return (
                                // console.log({ employee.Name });
                                <tbody>
                                    <tr>
                                        {
                                            equipments.map((equipment) => {
                                                console.log(equipment.id)
                                                if (equipment.id == damagedEquipment.equipmentID) {
                                                    number++;
                                                    return (
                                                        <>
                                                            <td>{number}</td>
                                                            <td>{equipment.equipmentName}</td>
                                                            <td>{damagedEquipment.issuedDate}</td>
                                                            <td className={`${damagedEquipment.status === "Pending" ? 'pending' : damagedEquipment.status === "Fixable" ? 'activeaaa' : 'inactiveaaa'}`}>{damagedEquipment.status}</td>
                                                            <td><Button className="" variant="success" type="submit" onClick={() => { setToAcceptedEquipment(damagedEquipment.id, "Fixable") }}>
                                                                Fixable
                                                            </Button></td>

                                                            <td><Button variant="danger" type="submit" onClick={() => { setToRejectedEquipment(damagedEquipment.id, "Not Fixable") }}>
                                                                Not Fixable
                                                            </Button></td>
                                                        </>
                                                    )
                                                }
                                            })
                                        }
                                    </tr>
                                </tbody>
                            )
                        } else {
                            return (
                                // console.log({ employee.Name });
                                <tbody>
                                    <tr>
                                        {
                                            equipments.map((equipment) => {
                                                console.log(equipment.id)
                                                if (equipment.id == damagedEquipment.equipmentID) {
                                                    number++;
                                                    return (
                                                        <>
                                                            <td>{number}</td>
                                                            <td>{equipment.equipmentName}</td>
                                                            <td>{damagedEquipment.issuedDate}</td>
                                                        </>
                                                    )
                                                }
                                            })
                                        }
                                        {
                                            employees.map((employee) => {

                                                if (damagedEquipment.storageID == employee.id) {
                                                    return (
                                                        <>
                                                            <td className={`${damagedEquipment.status === "Pending" ? 'pending' : damagedEquipment.status === "Fixable" ? 'activeaaa' : 'inactiveaaa'}`}>{damagedEquipment.status}</td>
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
        </>
    );
}

export function AddDamagedFacilities() {
    const [equipmentID, setNewEquipmentID] = useState('');

    return (
        <>
            <ViewEquipmentOnly />

            <div className="content">
                <div className="content-bottom-gapped">
                    <Form className="form-adjust">
                        <Form.Group className="mb-3" controlId="formBasicName">
                            <Form.Label className="white-color">Equipment ID</Form.Label>
                            <Form.Control type="text" placeholder="" onChange={(event) => { setNewEquipmentID(event.target.value) }} />
                            <Form.Text className="text-warning" >
                                Please input Equipment ID.
                            </Form.Text>
                        </Form.Group>

                        <Button variant="primary" onClick={() => addEquipmentDamagedController(equipmentID)}>
                            Add Report
                        </Button>
                    </Form >
                </div>

            </div >
        </>
    );
}

export function getDamagedFacilitiesReport() {

    const data = chartDataPurchase();
    return (
        <>
            < LineChart width={1200} height={400} data={data} >
                <Line type="monotone" dataKey="purchase" stroke="#00FF00" strokeWidth={4} />
                <CartesianGrid stroke="#CCC" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
            </LineChart >
        </>

    )

}
