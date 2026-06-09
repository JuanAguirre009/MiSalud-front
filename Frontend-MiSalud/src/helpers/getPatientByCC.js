import { API_URL } from "../config";
export default async function getPatientByCC(cc) {
    
    try {
        const response = await fetch(`${API_URL}/api/Patient/GetPatientByCedula/${cc}`);
        const result = await response.json();

        if (!response.ok) {
            return null;
        }

        return result.data;
    }catch (errors) {
        console.error("Error fetching data:", errors.message);
    }
}