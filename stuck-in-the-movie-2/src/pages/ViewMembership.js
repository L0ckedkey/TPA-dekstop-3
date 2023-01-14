import { useRef, useState, useEffect, useContext } from "react";
import { db } from '../firebase-config';
import { addDoc, collection, getDocs } from 'firebase/firestore';
import Table from 'react-bootstrap/Table';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import FoodController, { addFood } from "../controller/foodController";
import MembershipController, { chartMembership, getMembership, totalRevenue } from "../controller/membershipController";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';
import { LineChart, Line } from 'recharts';
import QRCode from "react-qr-code";


export default function GetMembership() {
    let number = 0;

    const membership = MembershipController();


    return (
        <>
            <Table striped bordered hover size variant="dark">
                <thead>
                    <tr>
                        <th>Number</th>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Gender</th>
                        <th>Joined Date</th>
                        <td>Point</td>
                        <th>QR</th>
                    </tr>
                </thead>

                {

                    membership.map((food) => {
                        number++;
                        return (
                            // console.log({ employee.Name });
                            <tbody>
                                <tr>
                                    <td>{number}</td>
                                    <td>{food.customerName}</td>
                                    <td>{food.email}</td>
                                    <td>{food.gender}</td>
                                    <td>{food.joinedDate}</td>
                                    <td>{food.point}</td>
                                    <QRCode
                                        size={256}
                                        style={{ height: "auto", maxWidth: "80px", width: "80px" }}
                                        value={food.id}
                                        viewBox={`0 0 256 256`}
                                    />
                                </tr>
                            </tbody>
                        )
                    })
                }
            </Table>
        </>
    );
}


export function getMembershipReport() {

    const data = chartMembership();
    let totalMembership = getMembership();
    return (
        <>
            <GetMembership />
            <h1 className="white-color">Total joined : {totalMembership}</h1>
            < LineChart width={800} height={400} data={data} >
                <Line type="monotone" dataKey="Joined" stroke="#00FF00" strokeWidth={4} />
                <CartesianGrid stroke="#CCC" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
            </LineChart >
        </>

    )

}