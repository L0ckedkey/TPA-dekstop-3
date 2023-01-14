import { useState, useEffect } from "react";
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { addPromo, PromoController } from "../controller/promoController";
import QRCode from "react-qr-code";



export function AddSchedule() {
    const [discount, setNewDiscount] = useState('');
    const [expiredDate, setNewExpiredDate] = useState('');
    const [startDate, setNewStartDate] = useState('');
    const [promoName, setNewPromoName] = useState('');

    return (
        <div className="content">
            <div className="content-bottom-gapped">
                <Form className="form-adjust">
                    <Form.Group className="mb-3" controlId="formBasicName">
                        <Form.Label className="white-color">Promo Name</Form.Label>
                        <Form.Control type="text" placeholder="" onChange={(event) => { setNewPromoName(event.target.value) }} />
                        <Form.Text className="text-warning" >
                            Please input promo name.
                        </Form.Text>
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label className="white-color">Start Date</Form.Label>
                        <Form.Control type="text" placeholder="" onChange={(event) => { setNewStartDate(event.target.value) }} />
                        <Form.Text className="text-warning">
                            Please input start date.
                        </Form.Text>
                    </Form.Group>



                    <Button variant="primary" type="submit" onClick={() => addPromo(discount, expiredDate, promoName, startDate)}>
                        Add Promo
                    </Button>

                </Form >
            </div>
            <div className="content-bottom-gapped">


                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label className="white-color">Discount</Form.Label>
                    <Form.Control type="text" placeholder="" onChange={(event) => { setNewDiscount(event.target.value) }} />
                    <Form.Text className="text-warning">
                        Please input discount.
                    </Form.Text>
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label className="white-color">End Date</Form.Label>
                    <Form.Control type="text" placeholder="" onChange={(event) => { setNewExpiredDate(event.target.value) }} />
                    <Form.Text className="text-warning">
                        Please input end date.
                    </Form.Text>
                </Form.Group>

            </div>

        </div >

    );
}

export function ViewPromo() {
    const promos = PromoController();
    let number = 0;
    return (
        <div>
            <Table striped bordered hover size variant="dark">
                <thead>
                    <tr>
                        <th>No</th>
                        <th>ID</th>
                        <th>Promo Name</th>
                        <th>Start Date</th>
                        <th>Expired Date</th>
                        <th>Discount</th>
                        <th>QR</th>
                    </tr>
                </thead>
                {
                    promos.map((promo) => {
                        number++;
                        return (
                            <tbody>
                                <tr>
                                    <>
                                        <td>{number}</td>
                                        <td>{promo.id}</td>
                                        <td>{promo.promoName}</td>
                                        <td>{promo.startDate}</td>
                                        <td>{promo.expiredDate}</td>
                                        <td>{promo.discount}</td>
                                        <td>
                                            <QRCode
                                                size={256}
                                                style={{ height: "auto", maxWidth: "80px", width: "80px" }}
                                                value={promo.id}
                                                viewBox={`0 0 256 256`}
                                            />
                                        </td>
                                    </>
                                </tr>
                            </tbody>
                        )
                    })}

            </Table>
        </div>
    )
}

export default function ViewPromoOnly() {
    let number = 0;

    const promos = PromoController();

    return (
        <div>
            <Table striped bordered hover size variant="dark">
                <thead>
                    <tr>
                        <th>No</th>
                        <th>Promo Name</th>
                        <th>Start Date</th>
                        <th>Expired Date</th>
                        <th>Discount</th>
                        <th>QR</th>
                    </tr>
                </thead>
                {
                    promos.map((promo) => {
                        number++;
                        return (
                            <tbody>
                                <tr>
                                    <>
                                        <td>{number}</td>
                                        <td>{promo.promoName}</td>
                                        <td>{promo.startDate}</td>
                                        <td>{promo.expiredDate}</td>
                                        <td>{promo.discount}</td>
                                        <td>
                                            <QRCode
                                                size={256}
                                                style={{ height: "auto", maxWidth: "80px", width: "80px" }}
                                                value={promo.id}
                                                viewBox={`0 0 256 256`}
                                            />
                                        </td>
                                    </>
                                </tr>
                            </tbody>
                        )
                    })}

            </Table>
            <AddSchedule />
        </div>
    )
}

