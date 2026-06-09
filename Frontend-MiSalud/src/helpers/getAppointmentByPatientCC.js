import { API_URL } from "../config";
export default async function getAppointmentByPatientCC(cc) {
    try {
        const response = await fetch(`${API_URL}/api/MedicalAppointment/GetMedicalAppointmentsByCedula/${cc}`);
        const result = await response.json();

        if (!response.ok) {
            return null;
        }

        return result.data;
    }catch (errors) {
        console.error("Error fetching data:", errors.message);
    }
}