import { generateAllTimes, calcularHoraFinal } from "./appointmentUtils";
import { modalMessage, modalSelect, modalConfirm } from "../helpers/modal-alert/modalAlert";

export const handleScheduleFlow = async ({ date, appointmentInfo, setAppointmentInfo }) => {
  const formattedDate = date;
  const [year, month, day] = date.split('-').map(Number);
  const selectedDate = new Date(year, month - 1, day); // Corrige zona horaria
  const isToday = selectedDate.toDateString() === new Date().toDateString();
  const now = new Date();
 
  // Verifica si la fecha es anterior a hoy
  if (selectedDate.setHours(0, 0, 0, 0) < new Date().setHours(0, 0, 0, 0) && !isToday) {
    modalMessage("Fecha inválida", "No puedes seleccionar una fecha anterior a hoy","",);
    return;
  }
  setAppointmentInfo((prev) => ({
    ...prev,
    fechaCita: formattedDate,
  }));

  const appointmentRes = await fetch(`http://localhost:5256/api/MedicalAppointment/GetMedicalAppointmentByDate/${formattedDate}`);
  const appointmentData = await appointmentRes.json();
  const appointments = appointmentData.data || [];

  const doctorRes = await fetch("http://localhost:5256/api/Doctor/GetDoctors");
  const doctorData = await doctorRes.json();
  const allDoctors = doctorData.data || [];

  let allTimes = generateAllTimes();

  // Si la fecha es hoy, filtrar horarios según la hora actual + 30 minutos
  
  if (isToday) {
    const nowPlus30 = new Date(now.getTime() + 30 * 60000);
    const pad = (n) => n.toString().padStart(2, '0');
    const limitTime = `${pad(nowPlus30.getHours())}:${pad(nowPlus30.getMinutes())}`;
    allTimes = allTimes.filter((time) => time > limitTime);
  }
  
  const availableTimesPerDoctor = {};

  allDoctors.forEach((doctor) => {
    const doctorAppointments = appointments.filter((appt) => appt.idDoctor === doctor.idDoctor);
    const busyTimes = doctorAppointments.map((appt) => appt.horaCita);
    const freeTimes = allTimes.filter((time) => !busyTimes.includes(time));
    if (freeTimes.length > 0) {
      availableTimesPerDoctor[doctor.idDoctor] = freeTimes;
    }
  });

  const availableDoctors = allDoctors.filter((doc) => availableTimesPerDoctor[doc.idDoctor]);

  if (availableDoctors.length === 0) {
    modalMessage("Sin disponibilidad", "No hay doctores disponibles para esta fecha u hora", "");
    return;
  }

  const selectedDoctorId = await modalSelect({
    title: "Selecciona un médico",
    options: Object.fromEntries(
      availableDoctors.map((doc) => [doc.idDoctor, doc.nombreCompleto])
    ),
    placeholder: "Selecciona un médico",
  });

  if (!selectedDoctorId) return;

  const selectedDoctor = allDoctors.find((doc) => doc.idDoctor === parseInt(selectedDoctorId));

  setAppointmentInfo((prev) => ({
    ...prev,
    idDoctor: parseInt(selectedDoctorId),
    doctorName: selectedDoctor.nombreCompleto,
  }));

  const selectedTime = await modalSelect({
    title: "Selecciona una hora",
    options: Object.fromEntries(
      availableTimesPerDoctor[selectedDoctorId].map((time) => [time, time])
    ),
    placeholder: "Selecciona una hora",
  });

  if (!selectedTime) return;

  const horaFinalizacion = calcularHoraFinal(selectedTime);

  setAppointmentInfo((prev) => ({
    ...prev,
    horaCita: selectedTime,
    horaFinalizacion,
  }));

  const confirm = await modalConfirm({
    title: "¿Confirmar cita?",
    html: `
      <p><strong>Fecha:</strong> ${formattedDate}</p>
      <p><strong>Médico:</strong> ${selectedDoctor.nombreCompleto}</p>
      <p><strong>Hora:</strong> ${selectedTime}</p>
    `,
  });

  if (!confirm.isConfirmed) return;

  const cita = {
    idCita: appointmentInfo.idCita,
    idPaciente: appointmentInfo.idPaciente,
    idDoctor: parseInt(selectedDoctorId),
    title: appointmentInfo.title,
    descriptionAppointment: appointmentInfo.descriptionAppointment,
    placeAppointment: appointmentInfo.placeAppointment,
    fechaCita: formattedDate,
    horaCita: selectedTime,
    horaFinalizacion,
    estado: appointmentInfo.estado,
  };
  try {
    // Determinar el endpoint y el método según el estado
    const endpoint = cita.estado === "Reprogramada" 
      ? "http://localhost:5256/api/MedicalAppointment/UpdateMedicalAppointment" 
      : "http://localhost:5256/api/MedicalAppointment/AddMedicalAppointment";
  
    const method = cita.estado === "Reprogramada" ? "PUT" : "POST";
  
    const res = await fetch(endpoint, {
      method: method, 
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(cita),
    });
  
    if (res.ok) {
      modalMessage("¡Cita agendada!", "Tu cita fue registrada con éxito", "", "/");
    } else {
      throw new Error("Error al agendar la cita");
    }
  } catch (err) {
    console.error(err);
    modalMessage("Error", "No se pudo registrar la cita", "", "/");
  }
}  
