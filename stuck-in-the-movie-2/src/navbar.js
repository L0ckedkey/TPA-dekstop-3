import { auth, db } from './firebase-config'
import { signOut } from "firebase/auth"
import Button from 'react-bootstrap/Button';
import App from './App';

export default function Navbar() {

    const LogOut = async () => {
        console.log("haha");
        sessionStorage.clear();
        signOut(auth);
        window.location = window.location.pathname
        return (<App />)
    }

    if (JSON.parse(sessionStorage.getItem("Login data")).position === "Manager") {
        console.log("hih")
        return (
            <nav className="nav">
                <a href="/" className="site-title" id="title-navbar">Stuck in the Movie</a>
                <li>
                    <a href="/viewEmployee">View Employee</a>
                </li>
                <li>
                    <a href="/viewFinance">View Finance</a>
                </li>
                <li>
                    <a href="/viewMovie">View Movie</a>
                </li>
                <li>
                    <a href="/viewSchedule">View Schedule</a>
                </li>
                <li>
                    <a href="/viewTheaterRoom">View Theater Room</a>
                </li>
                <li>
                    <a href="/viewFood">View Food</a>
                </li>
                <li>
                    <a href="/viewBeverage">View Beverage</a>
                </li>
                <li>
                    <a href="/viewMembershipReport">View Membership Report</a>
                </li>
                <li>
                    <a href="/viewResignationLetter">View Resignation Letter</a>
                </li>
                <li>
                    <a href="/createResignationLetter">Create Resignation Letter</a>
                </li>
                <li>
                    <a href="/updateWarningLetter">Update Warning Letter</a>
                </li>
                <li>
                    <a href="/updateFundRequest">Update Fund Request</a>
                </li>
                <li>
                    <a href="/updateTerminationLetter">Update Termination Letter</a>
                </li>
                <li>
                    <a href="/updateSalaryChange">Update Salary Change</a>
                </li>
                <li>
                    <a href="/viewEquipment">View Equipment</a>
                </li>
                <li>
                    <a href="/viewDamagedFacilities">View Damaged Facilities</a>
                </li>
                <li>
                    <a href="/getWarningLetterReport">Get Warning Letter Report</a>
                </li>
                <li>
                    <a href="/viewScheduleReport">View Schedule Report</a>
                </li>
                <Button variant="primary" type="submit" onClick={LogOut}>
                    sign out
                </Button>
            </nav>
        )
    } else if (JSON.parse(sessionStorage.getItem("Login data")).position === "Human Resource") {
        console.log("hehe")
        return (
            <nav className="nav">
                <a href="/" className="site-title" id="title-navbar">Stuck in the Movie</a>
                <li>
                    <a href="/viewEmployee">View Employee</a>
                </li>
                <li>
                    <a href="/viewWarningLetter">View Warning Letter</a>
                </li>
                <li>
                    <a href="/createWarningLetter">Create Warning Letter</a>
                </li>
                <li>
                    <a href="/updatePersonalLeave">Update Personal Leave</a>
                </li>
                <li>
                    <a href="/viewWorkingTime">View Working Time</a>
                </li>
                <li>
                    <a href="/updateWorkingTimeRequest">Update Working Time Request</a>
                </li>
                <li>
                    <a href="/addFundRequest">View Fund Request</a>
                </li>
                <li>
                    <a href="/createResignationLetter">Create Resignation Letter</a>
                </li>
                <li>
                    <a href="/createSalaryChange">Create Salary Change</a>
                </li>
                <li>
                    <a href="/viewSalaryChange">View Salary Change</a>
                </li>
                <li>
                    <a href="/viewDamagedFacilities">View Damaged Facilities</a>
                </li>
                <Button variant="primary" type="submit" onClick={LogOut}>
                    sign out
                </Button>
            </nav>
        );

    } else if (JSON.parse(sessionStorage.getItem("Login data")).position === "Promotion and Event") {
        return (
            <nav className="nav">
                <a href="/" className="site-title" id="title-navbar">Stuck in the Movie</a>
                <li>
                    <a href="/viewPromo">View Promo</a>
                </li>
                <li>
                    <a href="/createResignationLetter">Create Resignation Letter</a>
                </li>
                <li>
                    <a href="/viewDamagedFacilities">View Damaged Facilities</a>
                </li>
                <li>
                    <a href="/viewMembership">View Membership</a>
                </li>
                <li>
                    <Button variant="primary" type="submit" onClick={LogOut}>
                        sign out
                    </Button>
                </li>
            </nav>
        );
    } else if (JSON.parse(sessionStorage.getItem("Login data")).position === "Storage Department") {
        return (
            <nav className="nav">
                <a href="/" className="site-title" id="title-navbar">Stuck in the Movie</a>
                <li>
                    <a href="/viewEquipment">View Equipment</a>
                </li>
                <li>
                    <a href="/addEquipment">Add Equipment</a>
                </li>
                <li>
                    <a href="/viewFundRequest">View Fund Request</a>
                </li>
                <li>
                    <a href="/createResignationLetter">Create Resignation Letter</a>
                </li>
                <li>
                    <a href="/viewDamagedFacilities">View Damaged Facilities</a>
                </li>
                <li>
                    <a href="/updateDamageFacilities">Update Damaged Facilities</a>
                </li>
                <li>
                    <a href="/updatePurchase">Update Purchase</a>
                </li>
                <li>
                    <Button variant="primary" type="submit" onClick={LogOut}>
                        sign out
                    </Button>
                </li>
            </nav>
        );
    }
    else if (JSON.parse(sessionStorage.getItem("Login data")).position === "Kitchen Department") {
        return (
            <nav className="nav">
                <a href="/" className="site-title" id="title-navbar">Stuck in the Movie</a>
                <li>
                    <a href="/viewFood">View Food</a>
                </li>
                <li>
                    <a href="/viewFoodFiltered">View Food Only</a>
                </li>
                <li>
                    <a href="/viewBeverage">View Beverage</a>
                </li>
                <li>
                    <a href="/viewBeverageFiltered">View Beverage Only</a>
                </li>
                <li>
                    <a href="/viewQueue">View Order Queue</a>
                </li>
                <li>
                    <a href="/createResignationLetter">Create Resignation Letter</a>
                </li>
                <li>
                    <a href="/viewDamagedFacilities">View Damaged Facilities</a>
                </li>
                <li>
                    <Button variant="primary" type="submit" onClick={LogOut}>
                        sign out
                    </Button>
                </li>
            </nav>
        );
    }
    else if (JSON.parse(sessionStorage.getItem("Login data")).position === "External Department") {
        return (
            <nav className="nav">
                <a href="/" className="site-title" id="title-navbar">Stuck in the Movie</a>
                <li>
                    <a href="/viewMovieProducers">View Movie Producers</a>
                </li>

                <li>
                    <a href="/viewFoodFiltered">View Food Only</a>
                </li>

                <li>
                    <a href="/viewBeverageFiltered">View Beverage Only</a>
                </li>

                <li>
                    <a href="/viewFBSuppliers">View F&B Suppliers</a>
                </li>
                <li>
                    <a href="/viewAdvertisingPartner">View Advertising Partner</a>
                </li>

                <li>
                    <a href="/createResignationLetter">Create Resignation Letter</a>
                </li>
                <li>
                    <a href="/viewDamagedFacilities">View Damaged Facilities</a>
                </li>
                <li>
                    <a href="/getMovieProducerReport">Get Movie Producer Report</a>
                </li>
                <li>
                    <a href="/getAdvertisingReport">Get Advertising Partner Report</a>
                </li>
                <li>
                    <Button variant="primary" type="submit" onClick={LogOut}>
                        sign out
                    </Button>
                </li>
            </nav>
        );
    }
    else if (JSON.parse(sessionStorage.getItem("Login data")).position === "Accounting and Finance Department") {
        return (
            <nav className="nav">
                <a href="/" className="site-title" id="title-navbar">Stuck in the Movie</a>
                <li>
                    <a href="/viewFundRequest">View Fund Request</a>
                </li>
                <li>
                    <a href="/viewFinance">View Finance</a>
                </li>
                <li>
                    <a href="/updateFundRequest">Update Fund Request</a>
                </li>
                <li>
                    <a href="/createResignationLetter">Create Resignation Letter</a>
                </li>
                <li>
                    <a href="/viewPurchase">View Purchase</a>
                </li>
                <li>
                    <a href="/viewDamagedFacilities">View Damaged Facilities</a>
                </li>
                <li>
                    <a href="/viewSalaryChange">View Salary Change</a>
                </li>
                <li>
                    <Button variant="primary" type="submit" onClick={LogOut}>
                        sign out
                    </Button>
                </li>
            </nav>
        );
    }
    else if (JSON.parse(sessionStorage.getItem("Login data")).position === "F&B Front Office") {
        return (
            <nav className="nav">
                <a href="/" className="site-title" id="title-navbar">Stuck in the Movie</a>
                <li>
                    <a href="/viewOrder">View Order</a>
                </li>
                <li>
                    <a href="/viewFoodFiltered">View Food Only</a>
                </li>
                <li>
                    <a href="/viewBeverageFiltered">View Beverage Only</a>
                </li>
                <li>
                    <a href="/addOrder">Add Order</a>
                </li>
                <li>
                    <a href="/viewOrderReceipt">View Order Receipt</a>
                </li>
                <li>
                    <a href="/addFundRequest">Add Fund Request</a>
                </li>
                <li>
                    <a href="/createResignationLetter">Create Resignation Letter</a>
                </li>
                <li>
                    <a href="/addPersonalLeave">Create Personal Leave</a>
                </li>
                <li>
                    <a href="/viewDamagedFacilities">View Damaged Facilities</a>
                </li>

                <li>
                    <a href="/viewMembership">View Membership Report</a>
                </li>
                <li>
                    <Button variant="primary" type="submit" onClick={LogOut}>
                        sign out
                    </Button>
                </li>
            </nav>
        );
    }
    else if (JSON.parse(sessionStorage.getItem("Login data")).position === "Schedule Division") {
        return (
            <nav className="nav">
                <a href="/" className="site-title" id="title-navbar">Stuck in the Movie</a>
                <li>
                    <a href="/addFundRequest">Add Fund Request</a>
                </li>
                <li>
                    <a href="/createResignationLetter">Create Resignation Letter</a>
                </li>
                <li>
                    <a href="/addPersonalLeave">Create Personal Leave</a>
                </li>
                <li>
                    <a href="/viewMovie">View Movie</a>
                </li>
                <li>
                    <a href="/viewSchedule">View Schedule</a>
                </li>
                <li>
                    <a href="/addSchedule">Add Schedule</a>
                </li>
                <li>
                    <a href="/generateSchedule">Generate Schedule</a>
                </li>
                <li>
                    <Button variant="primary" type="submit" onClick={LogOut}>
                        sign out
                    </Button>
                </li>
            </nav>
        );
    } else if (JSON.parse(sessionStorage.getItem("Login data")).position === "Movie Front Office") {
        return (
            <nav className="nav">
                <a href="/" className="site-title" id="title-navbar">Stuck in the Movie</a>
                <li>
                    <a href="/addFundRequest">Add Fund Request</a>
                </li>
                <li>
                    <a href="/createResignationLetter">Create Resignation Letter</a>
                </li>
                <li>
                    <a href="/addPersonalLeave">Create Personal Leave</a>
                </li>
                <li>
                    <a href="/ViewMembership">View Membership</a>
                </li>
                <li>
                    <a href="/viewMovie">View Movie</a>
                </li>
                <li>
                    <a href="/viewTheaterRoom">View Theater Room</a>
                </li>
                <li>
                    <a href="/viewSchedule">View Schedule</a>
                </li>
                <li>
                    <a href="/generateOrder">Generate Order</a>
                </li>

                <li>
                    <a href="/viewMovieOrder">View Movie Order</a>
                </li>
                <li>
                    <Button variant="primary" type="submit" onClick={LogOut}>
                        sign out
                    </Button>
                </li>
            </nav>
        );
    } else if (JSON.parse(sessionStorage.getItem("Login data")).position === "Operation Division") {
        return (
            <nav className="nav">
                <a href="/" className="site-title" id="title-navbar">Stuck in the Movie</a>
                <li>
                    <a href="/createResignationLetter">Create Resignation Letter</a>
                </li>
                <li>
                    <a href="/addPersonalLeave">Create Personal Leave</a>
                </li>
                <li>
                    <a href="/viewMovie">View Movie</a>
                </li>
                <li>
                    <a href="/viewTheaterRoom">View Theater Room</a>
                </li>
                <li>
                    <a href="/viewSchedule">View Schedule</a>
                </li>
                <li>
                    <a href="/viewRunningSchedule">View Running Schedule</a>
                </li>
                <li>
                    <Button variant="primary" type="submit" onClick={LogOut}>
                        sign out
                    </Button>
                </li>
            </nav>
        );
    }


}

