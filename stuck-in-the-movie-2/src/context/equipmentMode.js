import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase-config";



export default async function getAllData() {
        const employeeColectionRef = collection(db, "Equipment");

        const data = await getDocs(employeeColectionRef);
        const result = data.docs.map(
            (doc) => (
                { ...doc.data(), id: doc.id }
            )
        );
        return result;
}