import { API_URL } from "../config"; // ajusta la ruta según la ubicación del archivo

export default async function getAppointmentById(id) {
    try {
        const response = await fetch(
            `${API_URL}/api/MedicalAppointment/GetMedicalAppointmentById/${id}`
        );

        const result = await response.json();

        if (!response.ok) {
            return null;
        }

        return result.data;
    }catch (errors) {
        console.error("Error fetching data:", errors.message);
    }
}