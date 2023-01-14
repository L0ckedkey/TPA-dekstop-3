import './App.css';
import Navbar from './navbar';
import GetFood, { GetFoodOnly } from './pages/ViewFood';
import Login from './pages/Login.js'
import GetBeverage, { GetBeverageOnly } from './pages/ViewBeverage';
import ViewEmployee, { viewEmployeeAndAddEmployee, ViewEmployeeOnly, viewEmployeeWithReport } from './pages/viewEmployee';
import ViewMovie, { ViewMovieOnly } from './pages/ViewMovie';
import TheaterRoom from './pages/ViewTheaterRoom';
import { AddFood } from './pages/ViewFood';
import { addDoc } from 'firebase/firestore';
import ViewSchedule, { generateSchedule, viewRunningSchedule, ViewScheduleOnly, viewScheduleReport } from './pages/ViewSchedule';
import ViewResignationLetter, { CreateResignationLetter } from './pages/resignationLetter';
import Home from './pages/Home';
import ViewPromoOnly from './pages/ViewPromo';
import ViewWarningLetter, { AddWarningLetter, GetWarningLetterReport, getWarningLetterReport, UpdateWarningLetter } from './pages/ViewWarningLetter';
import ViewEquipment, { AddEquipment } from './pages/ViewEquipment';
import { AddPersonalLeave, UpdatePersonalLeave } from './pages/ViewPersonalLeave';
import { AddMovieProducers, getMovieProducerReport, viewMovieProducers } from './pages/ViewMovieProducers';
import { viewFBSuppliers } from './pages/F&BSuppliers';
import { getAdvertisingReport, viewAdvertisingPartner } from './pages/ViewAdvertisingPartner';
import { AddFundRequest, UpdateFundRequestAccounting, UpdateFundRequestManager, ViewFundRequest } from './pages/viewFundRequest';
import { UpdateTerminationLetter } from './pages/ViewTerminationLetter';
import ViewWorkingTime, { updateWorkingTimeRequest } from './pages/ViewWorkingTime';
import { AddFBOrder, UpdateOrderStatus, ViewFBOrderReceipt, ViewFBOrderStatus, ViewOrderOnly } from './pages/ViewOrder';
import ViewFinance, { getFinanceReport } from './pages/viewFinance';
import { getPurchaseReport, UpdatePurchase, ViewPurchase } from './pages/ViewPurchase';
import { CreateSalaryChange, ViewSalaryChange, ViewSalaryChangeManager } from './pages/ViewSalaryChange';
import { AddDamagedFacilities, UpdateDamagedEquipment, viewDamagedFacilities } from './pages/ViewDamagedFacilities';
import GetMembership, { getMembershipReport } from './pages/ViewMembership';
import createMovieOrder, { viewOrder } from './pages/ViewMovieOrder';
import { getMembership } from './controller/membershipController';

function App() {

  console.log("app");
  let Component
  let Navbars = Navbar;

  console.log(window.location.pathname)

  if (JSON.parse(sessionStorage.getItem("Login data")) === null) {
    console.log("hehe")
    Component = Login;
  } else if (JSON.parse(sessionStorage.getItem("Login data")).position === "Manager") {
    switch (window.location.pathname) {
      case "/":
        Component = Home;
        break;
      case "/viewEmployee":
        Component = viewEmployeeWithReport;
        break;
      case "/viewScheduleReport":
        Component = viewScheduleReport;
        break;
      case "/viewMovie":
        Component = ViewMovieOnly;
        break;
      case "/viewSchedule":
        Component = ViewScheduleOnly;
        break;
      case "/viewFood":
        Component = GetFoodOnly;
        break;
      case "/viewBeverage":
        Component = GetBeverageOnly;
        break;
      case "/viewTheaterRoom":
        Component = TheaterRoom;
        break;
      case "/viewMembershipReport":
        Component = getMembershipReport;
        break;
      case "/viewResignationLetter":
        Component = ViewResignationLetter;
        break;
      case "/createResignationLetter":
        Component = CreateResignationLetter;
        break;
      case "/updateWarningLetter":
        Component = UpdateWarningLetter;
        break;
      case "/updateFundRequest":
        Component = UpdateFundRequestManager;
        break;
      case "/updateTerminationLetter":
        Component = UpdateTerminationLetter;
        break;
      case "/viewEquipment":
        Component = ViewEquipment;
        break;
      case "/viewFinance":
        Component = ViewFinance;
        break;
      case "/updateSalaryChange":
        Component = ViewSalaryChangeManager;
        break;
      case "/viewDamagedFacilities":
        Component = viewDamagedFacilities;
        break;
      case "/getWarningLetterReport":
        Component = GetWarningLetterReport;
        break;
      default:
        Component = Home;
        break;
    }
  } else if (JSON.parse(sessionStorage.getItem("Login data")).position === "Human Resource") {
    console.log("")
    switch (window.location.pathname) {
      case "/":
        Component = Home;
        break;
      case "/viewWarningLetter":
        Component = ViewWarningLetter;
        break;
      case "/viewEmployee":
        Component = viewEmployeeAndAddEmployee;
        break;
      case "/createWarningLetter":
        Component = AddWarningLetter;
        break;
      case "/updatePersonalLeave":
        Component = UpdatePersonalLeave;
        break;
      case "/viewWorkingTime":
        Component = ViewWorkingTime;
        break;
      case "/updateWorkingTimeRequest":
        Component = updateWorkingTimeRequest;
        break;
      case "/createResignationLetter":
        Component = CreateResignationLetter;
        break;
      case "/addFundRequest":
        Component = ViewFundRequest;
        break;
      case "/viewSalaryChange":
        Component = ViewSalaryChange;
        break;
      case "/createSalaryChange":
        Component = CreateSalaryChange;
        break;
      case "/viewDamagedFacilities":
        Component = viewDamagedFacilities;
        break;
      default:
        Component = Home;
        break;
    }
  } else if (JSON.parse(sessionStorage.getItem("Login data")).position === "Employee") {
    <h1>Employee</h1>
  } else if (JSON.parse(sessionStorage.getItem("Login data")).position === "Promotion and Event") {
    switch (window.location.pathname) {
      case "/":
        Component = Home;
        break;
      case "/viewPromo":
        Component = ViewPromoOnly;
        break;
      case "/createResignationLetter":
        Component = CreateResignationLetter;
        break;
      case "/viewDamagedFacilities":
        Component = viewDamagedFacilities;
        break;
      case "/viewMembership":
        Component = GetMembership;
        break;

      default:
        Component = Home;
        break;
    }
  } else if (JSON.parse(sessionStorage.getItem("Login data")).position === "Storage Department") {
    switch (window.location.pathname) {
      case "/":
        Component = Home;
        break;
      case "/viewEquipment":
        Component = ViewEquipment;
        break;
      case "/viewFundRequest":
        Component = ViewFundRequest;
        break;
      case "/addEquipment":
        Component = AddEquipment;
        break;
      case "/createResignationLetter":
        Component = CreateResignationLetter;
        break;
      case "/viewDamagedFacilities":
        Component = viewDamagedFacilities;
        break;
      case "/updateDamageFacilities":
        Component = UpdateDamagedEquipment;
        break;
      case "/updatePurchase":
        Component = UpdatePurchase;
        break;
      default:
        Component = Home;
        break;
    }
  } else if (JSON.parse(sessionStorage.getItem("Login data")).position === "Kitchen Department") {
    switch (window.location.pathname) {
      case "/":
        Component = Home;
        break;
      case "/viewBeverage":
        Component = GetBeverage;
        break;
      case "/viewBeverageFiltered":
        Component = GetBeverageOnly;
        break;
      case "/viewFoodFiltered":
        Component = GetBeverageOnly;
        break;
      case "/viewFood":
        Component = GetFood;
        break;
      case "/viewQueue":
        Component = UpdateOrderStatus;
        break;
      case "/createResignationLetter":
        Component = CreateResignationLetter;
        break;
      case "/viewDamagedFacilities":
        Component = viewDamagedFacilities;
        break;
      default:
        Component = Home;
        break;
    }
  } else if (JSON.parse(sessionStorage.getItem("Login data")).position === "External Department") {
    switch (window.location.pathname) {
      case "/":
        Component = Home;
        break;
      case "/viewBeverageFiltered":
        Component = GetBeverageOnly;
        break;
      case "/viewFoodFiltered":
        Component = GetFoodOnly;
        break;
      case "/viewMovieProducers":
        Component = viewMovieProducers;
        break;
      case "/viewFBSuppliers":
        Component = viewFBSuppliers;
        break;
      case "/viewAdvertisingPartner":
        Component = viewAdvertisingPartner;
        break;

      case "/createResignationLetter":
        Component = CreateResignationLetter;
        break;
      case "/viewDamagedFacilities":
        Component = viewDamagedFacilities;
        break;
      case "/getAdvertisingReport":
        Component = getAdvertisingReport;
        break;
      case "/getMovieProducerReport":
        Component = getMovieProducerReport;
        break;
      default:
        Component = Home;
        break;
    }
  } else if (JSON.parse(sessionStorage.getItem("Login data")).position === "Accounting and Finance Department") {
    switch (window.location.pathname) {
      case "/":
        Component = Home;
        break;
      case "/viewFinance":
        Component = ViewFinance;
        break;
      case "/viewFundRequest":
        Component = ViewFundRequest;
        break;

      case "/updateFundRequest":
        Component = UpdateFundRequestAccounting;
        break;
      case "/createResignationLetter":
        Component = CreateResignationLetter;
        break;
      case "/viewPurchase":
        Component = getPurchaseReport;
        break;
      case "/viewDamagedFacilities":
        Component = viewDamagedFacilities;
        break;
      case "/viewSalaryChange":
        Component = ViewSalaryChange;
        break;
      default:
        Component = Home;
        break;
    }
  } else if (JSON.parse(sessionStorage.getItem("Login data")).position === "F&B Front Office") {
    switch (window.location.pathname) {
      case "/":
        Component = Home;
        break;
      case "/addOrder":
        Component = AddFBOrder;
        break;
      case "/viewOrder":
        Component = ViewFBOrderStatus;
        break;
      case "/viewBeverageFiltered":
        Component = GetBeverageOnly;
        break;
      case "/viewFoodFiltered":
        Component = GetFoodOnly;
        break;
      case "/addFundRequest":
        Component = ViewFundRequest;
        break;
      case "/createResignationLetter":
        Component = CreateResignationLetter;
        break;
      case "/addPersonalLeave":
        Component = AddPersonalLeave;
        break;
      case "/viewDamagedFacilities":
        Component = AddDamagedFacilities;
        break;
      case "/viewOrderReceipt":
        Component = ViewFBOrderReceipt;
        break;
      case "/viewMembership":
        Component = getMembershipReport;
        break;
      default:
        Component = Home;
        break;
    }
  } else if (JSON.parse(sessionStorage.getItem("Login data")).position === "Schedule Division") {
    switch (window.location.pathname) {
      case "/":
        Component = Home;
        break;
      case "/addFundRequest":
        Component = ViewFundRequest;
        break;
      case "/createResignationLetter":
        Component = CreateResignationLetter;
        break;
      case "/addPersonalLeave":
        Component = AddPersonalLeave;
        break;
      case "/viewMovie":
        Component = ViewMovieOnly;
        break;
      case "/viewSchedule":
        Component = ViewScheduleOnly;
        break;
      case "/addSchedule":
        Component = ViewSchedule;
        break;
      case "/generateSchedule":
        Component = generateSchedule;
        break;
      default:
        Component = Home;
        break;
    }
  } else if (JSON.parse(sessionStorage.getItem("Login data")).position === "Movie Front Office") {
    switch (window.location.pathname) {
      case "/":
        Component = Home;
        break;
      case "/addFundRequest":
        Component = ViewFundRequest;
        break;
      case "/createResignationLetter":
        Component = CreateResignationLetter;
        break;
      case "/addPersonalLeave":
        Component = AddPersonalLeave;
        break;
      case "/ViewMembership":
        Component = GetMembership;
        break;
      case "/viewTheaterRoom":
        Component = TheaterRoom;
        break;
      case "/viewMovie":
        Component = ViewMovieOnly;
        break;
      case "/viewSchedule":
        Component = ViewScheduleOnly;
        break;
      case "/generateOrder":
        Component = createMovieOrder;
        break;
      case "/viewMovieOrder":
        Component = viewOrder;
        break;

      default:
        Component = Home;
        break;
    }
  } else if (JSON.parse(sessionStorage.getItem("Login data")).position === "Operation Division") {
    switch (window.location.pathname) {
      case "/":
        Component = Home;
        break;
      case "/addFundRequest":
        Component = ViewFundRequest;
        break;
      case "/createResignationLetter":
        Component = CreateResignationLetter;
        break;
      case "/addPersonalLeave":
        Component = AddPersonalLeave;
        break;
      case "/viewTheaterRoom":
        Component = TheaterRoom;
        break;
      case "/viewMovie":
        Component = ViewMovieOnly;
        break;
      case "/viewSchedule":
        Component = ViewScheduleOnly;
        break;
      case "/viewRunningSchedule":
        Component = viewRunningSchedule;
        break;
      default:
        Component = Home;
        break;
    }
  }



  return (
    <div className='content'>
      {sessionStorage.getItem("Login data") === null ?
        "" : < Navbars />
      }

      <div className='main-content'>
        <Component />
      </div>
    </div>
  )
}

export default App;
