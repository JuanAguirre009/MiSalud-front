export default async function getAppointmentDetailsById(appointmentId) {
    try {
        const response = await fetch("http://localhost:5256/api/MedicalAppointment/GetMedicalAppointmentsDetails/"  + appointmentId) ;
        const result = await response.json();

        if (!response.ok) {
            return null;
        }

        return result.data;
    }catch (errors) {
        console.error("Error fetching data:", errors.message);
    }
}