import { useEffect, useState } from "react";
import { useMiSaludStore } from "../../../zustand/miSaludStore.js";
import scheduleIcon from "../../../assets/images/scheduleicon.png";
import CardDetails from "../../../components/cards/card-appointment-details/CardDetails.jsx";
import CalendarPicker from "../../../components/calendar/CalendarPicket.jsx";
import { handleScheduleFlow } from "../../../helpers/scheduleFlow.js";
import styles from "./CreateAppointment.module.css";
import { useNavigate, useParams } from "react-router-dom";
import CircularProgress from '@mui/material/CircularProgress';
import getPatientByCC from "../../../helpers/getPatientByCC.js";
import {modalMessage} from "../../..//helpers/modal-alert/modalAlert.js";
 
export default function CreateAppointment() {
  const navigate = useNavigate();  
  const {cc} = useParams();
  const [currentPatient, setCurrentPatient] = useState(undefined);
  const setCardTitle = useMiSaludStore((state) => state.setCardTitle);
  const randomConsultorio = Math.floor(Math.random() * (500 - 100 + 1)) + 100;
  const [appointmentInfo, setAppointmentInfo] = useState({
    idCita: 0,
    idPaciente: 0,
    idDoctor: 0,
    title: "Chequeo general",
    descriptionAppointment: "Chequeo general",
    placeAppointment: "Consultorio " + randomConsultorio,
    fechaCita: "",
    horaCita: "",
    horaFinalizacion: "",
    estado: "Programada",
    doctorName: "",
  });
 
  useEffect(() => {
    setCardTitle({
      infoCard: {
        title: "Agendar",
        subtitle: "Crear cita",
        icon: scheduleIcon,
        bgColor: "white",
      },
    });
  }, [setCardTitle]);
  useEffect(() => {
    const fetchPatient = async () => {
        const data = await getPatientByCC(cc);
        if (data === null) {
            setCurrentPatient(null);
            modalMessage("Ruta no encontrada.");
            navigate("/");
            return;
        }
        setCurrentPatient(data);
        setAppointmentInfo((state) => ({
            ...state,
            idPaciente: data.idPaciente,
          }));;
    };
    fetchPatient();
},[cc]);
if (currentPatient === undefined || currentPatient === null) {
    return <CircularProgress/>;
}
  return (
    <div className={styles["createappointment__container"]}>
      <div className={styles["createappointment__card"]}>
        <CardDetails
          patientInfo={currentPatient}
          appointmentInfo={{
            description: appointmentInfo.descriptionAppointment,
            date: appointmentInfo.fechaCita,
            time: appointmentInfo.horaCita,
            doctor: appointmentInfo.doctorName,
            location: appointmentInfo.placeAppointment,
          }}
        />
      </div>
      <div className={styles["createappointment__calendar"]}>
        <CalendarPicker onDateChange={(date) =>
          handleScheduleFlow({ date, appointmentInfo, setAppointmentInfo })
        } />
      </div>
    </div>
  );
}