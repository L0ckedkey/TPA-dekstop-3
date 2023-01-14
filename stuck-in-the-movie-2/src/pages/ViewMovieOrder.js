import { useState, useEffect } from "react";
import { db } from '../firebase-config';
import { collection, getDocs, addDoc } from 'firebase/firestore';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import TheaterRoom, { ViewTheaterRoomOnly } from "./ViewTheaterRoom";
import { ViewMovieOnly } from "./ViewMovie";
import { ViewEmployeeOnly } from "./viewEmployee";
import MovieController from "../controller/movieController";
import ScheduleController, { addSchedule } from "../controller/scheduleController";
import TheaterRoomController from "../controller/theaterRoomController";
import MovieOrderController, { createOrder, MovieHeaderController } from "../controller/movieOrderDetailController";
import EmployeeController from "../controller/employeeController";
import QRCode from "react-qr-code";
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import { setVoucher } from "../controller/FBOrderController";
import { ViewPromo } from "./ViewPromo";

let totalPurchase = 0;

const getInfo = async (id, seat, scheduleID) => {
    sessionStorage.setItem("Room ID", id);
    sessionStorage.setItem("Seat Quantity", seat);
    sessionStorage.setItem("ScheduleID", scheduleID);
    refreshViewEmployee();
}

function refreshViewEmployee() {
    window.location = window.location.pathname;
}



const getDetail = async (id, price) => {
    sessionStorage.setItem("Detail ID", id)
    sessionStorage.setItem("Total Purchase", price)
    refreshViewEmployee();
}

let ViewDetail = () => {
    const orderDetail = MovieOrderController();
    let totalPurchase = 0;
    return (
        <>
            <Table bordered hover size variant="dark">
                <thead>
                    <tr>
                        <th>Movie Order ID</th>
                        <th>Seat</th>
                    </tr>
                </thead>
                {
                    orderDetail.map((orderDetail) => {
                        if (orderDetail.orderHeader == sessionStorage.getItem("Detail ID")) {
                            return (
                                <tbody>
                                    <tr>
                                        <>
                                            <td>{sessionStorage.getItem("Detail ID")}</td>
                                            <td>{orderDetail.seat}</td>
                                        </>
                                    </tr>
                                </tbody>
                            )
                        }

                    })}

            </Table>
            <h2 className="white-color">Total Purchase : {sessionStorage.getItem("Total Purchase")}</h2>
        </>
    )

}

function ScanVoucher() {
    const [voucherID, setNewVoucherID] = useState('');
    if (sessionStorage.getItem("Membership ID") != null && sessionStorage.getItem("Voucher Used") == null) {
        return (
            <>
                <ViewPromo />
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label className="white-color">Voucher ID</Form.Label>
                    <Form.Control type="text" placeholder="Enter image url" onChange={(event) => { setNewVoucherID(event.target.value) }} />
                    <Form.Text className="text-warning">
                        Please input Voucher ID.
                    </Form.Text>
                </Form.Group>

                <Button variant="primary" type="submit" onClick={() => setVoucher(voucherID)}>
                    Add Voucher
                </Button>
            </>
        )
    }
}

export function viewOrder() {
    const headerOrders = MovieHeaderController();
    const employees = EmployeeController();
    const movies = MovieController();
    const rooms = TheaterRoomController();
    const schedules = ScheduleController();

    return (
        <>
            <Table bordered hover size variant="dark">
                <thead>
                    <tr>
                        <th>Order Header</th>
                        <th>Customer Name</th>
                        <th>EmployeeID</th>
                        <th>Theater Room</th>
                        <th>Movie Name</th>
                        <th>QR</th>
                    </tr>
                </thead>
                {


                    headerOrders.map((headerOrder) => {

                        return (
                            <tbody>
                                <tr>
                                    {
                                        employees.map((employee) => {
                                            if (headerOrder.employeeID == employee.id) {

                                                return (
                                                    <>
                                                        {
                                                            schedules.map((schedule) => {
                                                                if (headerOrder.scheduleID == schedule.id) {
                                                                    return (
                                                                        <>
                                                                            {
                                                                                movies.map((movie) => {
                                                                                    if (schedule.movieID == movie.id) {

                                                                                        return (
                                                                                            <>
                                                                                                {
                                                                                                    rooms.map((room) => {
                                                                                                        if (schedule.roomNumber == room.id) {
                                                                                                            return (
                                                                                                                <>
                                                                                                                    <td><button onClick={() => { getDetail(headerOrder.orderHeader, headerOrder.totalPurchase) }} className="button-test">{headerOrder.orderHeader}</button></td>
                                                                                                                    <td>{headerOrder.customerName}</td>
                                                                                                                    <td>{employee.Name}</td>
                                                                                                                    <td>{room.roomNumber}</td>
                                                                                                                    <td>{movie.movieName}</td>
                                                                                                                    <td>
                                                                                                                        <QRCode
                                                                                                                            size={256}
                                                                                                                            style={{ height: "auto", maxWidth: "80px", width: "80px" }}
                                                                                                                            value={headerOrder.orderHeader}
                                                                                                                            viewBox={`0 0 256 256`}
                                                                                                                        />
                                                                                                                    </td>
                                                                                                                </>
                                                                                                            )
                                                                                                        }
                                                                                                    })
                                                                                                }
                                                                                            </>
                                                                                        )
                                                                                    }
                                                                                })
                                                                            }
                                                                        </>
                                                                    )
                                                                }
                                                            })

                                                        }

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
            <ViewDetail />
        </>
    );
}


let ViewSeat = () => {
    const [paymentMethod, setNewPaymentMethod] = useState('')
    const [selected, setNewSelected] = useState([]);
    const [name, setNewName] = useState('');
    const [ID, setNewID] = useState('');
    const handleClick = (seat) => {
        setNewSelected(current => [...current, seat])
    }

    const removeArray = async (seat) => {
        // console.log(selected.indexOf(seat))
        // selected.splice(selected.indexOf(seat), 1)
        setNewSelected(current => current.filter(seated => { return seated != seat }))
    }

    let seat = sessionStorage.getItem("Seat Quantity")
    const movieOrders = MovieOrderController();
    let exist = 0;
    let isSelected = 0;
    if (sessionStorage.getItem("Seat Quantity") != null) {

        return <>
            <h1 className="white-color set-center">SCREEN</h1>
            {Array.from(Array(parseInt(seat)), (e, i) => {
                movieOrders.map((movieOrder) => {
                    console.log(selected)
                    if (sessionStorage.getItem("ScheduleID") == movieOrder.scheduleID && Number(movieOrder.seat) == i) {
                        exist = 1;
                    }
                })

                if (selected.indexOf(i) != -1) {
                    isSelected = 1;
                }

                if (Number(exist) == 1) {
                    exist = 0;
                    return (
                        <Button className="set-gap" variant="danger" type="submit" onClick={() => { }} disabled>
                            {i}
                        </Button>
                    )
                } else if (isSelected == 1) {
                    isSelected = 0;
                    return (
                        <Button className="set-gap" variant="warning" type="submit" onClick={() => { removeArray(i) }}>
                            {i}
                        </Button>
                    )
                } else {
                    return (
                        <Button className="set-gap" variant="primary" type="submit" onClick={() => { handleClick(i) }}>
                            {i}
                        </Button>
                    )
                }
            })}
            <div className="content-bottom-gapped">
                <Form.Group className="mb-3 text-adjust" controlId="formBasicEmail">
                    <Form.Label className="white-color">Order ID</Form.Label>
                    <Form.Control type="text" placeholder="" onChange={(event) => { setNewID(event.target.value) }} />
                    <Form.Text className="text-warning">
                        Please input Order ID.
                    </Form.Text>
                </Form.Group>
                <Form.Group className="mb-3 text-adjust" controlId="formBasicEmail">
                    <Form.Label className="white-color">Customer Name</Form.Label>
                    <Form.Control type="text" placeholder="" onChange={(event) => { setNewName(event.target.value) }} />
                    <Form.Text className="text-warning">
                        Please input Customer Name.
                    </Form.Text>
                </Form.Group>
                <Form.Group className="mb-3 size">
                    <Form.Label className="white-color">Payment Method</Form.Label>
                    <Form.Control placeholder={paymentMethod} disabled />
                </Form.Group>
                <Dropdown className="bottom-gap" >
                    <DropdownButton id="dropdown-basic-button" title="Payment Method" onSelect={(event) => { setNewPaymentMethod(event) }}>
                        <Dropdown.Item eventKey="Cash">Cash</Dropdown.Item>
                        <Dropdown.Item eventKey="Debit">Debit</Dropdown.Item>
                        <Dropdown.Item eventKey="Credit">Credit</Dropdown.Item>
                        <Dropdown.Item eventKey="QRIS">QRIS</Dropdown.Item>
                    </DropdownButton>
                </Dropdown>
                <Button className="size" type="submit" onClick={() => { createOrder(ID, name, selected, paymentMethod) }}>
                    Confirm Order
                </Button>
            </div>
            <div className="content-bottom-gapped">
                <ScanVoucher />
            </div>

        </>
    }

}

export default function createMovieOrder() {
    const schedules = ScheduleController();
    const movies = MovieController();
    const rooms = TheaterRoomController();

    return (
        <div>
            <Table striped bordered hover size variant="dark">
                <thead>
                    <tr>
                        <th>Date</th>
                        <th>Room Number</th>
                        <th>Movie Name</th>
                        <th>Date</th>
                        <th>Start Time</th>
                        <th>Duration</th>

                    </tr>
                </thead>
                {
                    schedules.map((schedule) => {
                        return (
                            <tbody>
                                <tr>
                                    {movies.map((movie) => {
                                        if (schedule.movieID == movie.id) {

                                            return (
                                                rooms.map((room) => {
                                                    if (schedule.roomNumber == room.id) {
                                                        return (
                                                            <>
                                                                <td>{schedule.Date}</td>
                                                                <td><button className="button-test" onClick={() => getInfo(room.id, room.seatQuantity, schedule.id)}>{room.roomNumber} </button></td>
                                                                <td>{movie.movieName}</td>
                                                                <td>{schedule.Date}</td>
                                                                <td>{schedule.startTime}</td>
                                                                <td>{movie.duration} minutes</td>
                                                            </>
                                                        )
                                                    }
                                                })
                                            )
                                        }
                                        return null;
                                    })
                                    }
                                </tr>
                            </tbody>
                        )
                    })}
            </Table>
            <ViewSeat />
        </div>
    );


}