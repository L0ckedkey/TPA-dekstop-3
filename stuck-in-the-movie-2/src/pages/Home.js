import Button from 'react-bootstrap/Button';
import { setClockOut } from './Login';

export default function Home() {
    const shiftStart = JSON.parse(sessionStorage.getItem("Login data")).shiftStart;
    const shiftEnd = JSON.parse(sessionStorage.getItem("Login data")).shiftEnd;

    const shiftStartSplit = shiftStart.split(".")
    const shiftEndSplit = shiftEnd.split(".")
    const timeLogIn = async () => {
        await sessionStorage.getItem("Time Log in").split(":")
    }

    timeLogIn();

    const time2 = sessionStorage.getItem("Time Log in").split(":")

    const current = new Date();
    const time = current.toLocaleTimeString("en-US", {
        hour: "2-digit",
        minute: "2-digit",
        hour12: false
    });

    const timeNow = time.split(":");


    // console.log(Number(timeNow[0]))
    // console.log(Number(timeNow[1]))
    // console.log(Number(shiftEnd))
    console.log(shiftStartSplit[0])
    console.log(Number(time2[0]))
    if (Number(shiftStartSplit[0]) > Number(time2[0])) {
        if (Number(shiftEndSplit[0]) <= Number(timeNow[0]) && sessionStorage.getItem("Time Log out") == null) {
            return (
                <div>
                    <h1 className="white-color">WELCOME, {JSON.parse(sessionStorage.getItem("Login data")).name}</h1>
                    <h2 className="white-color">Shift : {shiftStart} - {shiftEnd}</h2>
                    <h3 className="white-color activeaaa">Your Clock in time : {sessionStorage.getItem("Time Log in")}</h3>
                    <Button variant="primary" type="submit" onClick={setClockOut}>
                        Clock Out
                    </Button>
                </div>
            )
        } else if (Number(shiftEndSplit[0]) <= Number(timeNow[0]) && sessionStorage.getItem("Time Log out") != null) {
            return (
                <div>
                    <h1 className="white-color">WELCOME, {JSON.parse(sessionStorage.getItem("Login data")).name}</h1>
                    <h2 className="white-color">Shift : {shiftStart} - {shiftEnd}</h2>
                    <h3 className="white-color activeaaa">Your Clock in time : {sessionStorage.getItem("Time Log in")}</h3>
                    <h3 className="white-color activeaaa">Your Clock out time : {sessionStorage.getItem("Time Log out")}</h3>
                </div>
            )
        } else {
            return (
                <div>
                    <h1 className="white-color">WELCOME, {JSON.parse(sessionStorage.getItem("Login data")).name}</h1>
                    <h2 className="white-color">Shift : {shiftStart} - {shiftEnd}</h2>
                    <h3 className="white-color activeaaa">Your Clock in time : {sessionStorage.getItem("Time Log in")}</h3>
                </div>
            )
        }

    } else {
        if (Number(shiftEndSplit[0]) <= Number(timeNow[0]) && sessionStorage.getItem("Time Log out") == null) {
            return (
                <div>
                    <h1 className="white-color">WELCOME, {JSON.parse(sessionStorage.getItem("Login data")).name}</h1>
                    <h2 className="white-color">Shift : {shiftStart} - {shiftEnd}</h2>
                    <h3 className="white-color inactiveaaa">Your Clock in time : {sessionStorage.getItem("Time Log in")}</h3>
                    <Button variant="primary" type="submit" onClick={setClockOut}>
                        Clock Out
                    </Button>
                </div>
            )
        } else if (Number(shiftEndSplit[0]) <= Number(timeNow[0]) && sessionStorage.getItem("Time Log out") != null) {
            return (
                <div>
                    <h1 className="white-color">WELCOME, {JSON.parse(sessionStorage.getItem("Login data")).name}</h1>
                    <h2 className="white-color">Shift : {shiftStart} - {shiftEnd}</h2>
                    <h3 className="white-color inactiveaaa">Your Clock in time : {sessionStorage.getItem("Time Log in")}</h3>
                    <h3 className="white-color activeaaa">Your Clock out time : {sessionStorage.getItem("Time Log out")}</h3>
                </div>
            )
        } else {
            return (
                <div>
                    <h1 className="white-color">WELCOME, {JSON.parse(sessionStorage.getItem("Login data")).name}</h1>
                    <h2 className="white-color">Shift : {shiftStart} - {shiftEnd}</h2>
                    <h3 className="white-color inactiveaaa">Your Clock in time : {sessionStorage.getItem("Time Log in")}</h3>
                </div>
            )
        }
    }



}