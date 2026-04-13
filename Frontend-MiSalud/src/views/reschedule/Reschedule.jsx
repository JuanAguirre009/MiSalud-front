import { useEffect, useState } from "react";
import { useMiSaludStore } from "../../zustand/miSaludStore.js";
import scheduleIcon from "../../assets/images/scheduleicon.png";
import CardDetails from "../../components/cards/card-appointment-details/CardDetails.jsx";
import CalendarPicker from "../../components/calendar/CalendarPicker.jsx";
import { handleScheduleFlow } from "../../helpers/scheduleFlow.js";
import styles from "./Reschedule.module.css";
import { useNavigate, useParams } from "react-router-dom";
import CircularProgress from '@mui/material/CircularProgress';
import {modalMessage} from "../../helpers/modal-alert/modalAlert.js";
import getPatientById from '../../helpers/getPatientById.js'
import getAppointmentById from "../../helpers/getAppointmentById.js";
import getDoctorById from "../../helpers/getDoctorById.js";
 
export default function RescheduleAppointment() {
  const navigate = useNavigate();  
  const {idCita} = useParams();
  const [currentPatient, setCurrentPatient] = useState(undefined);
  const setCardTitle = useMiSaludStore((state) => state.setCardTitle);
  const [doctorName , setDoctorName ] = useState(undefined);
  const [appointmentInfo, setAppointmentInfo] = useState(undefined);
  console.log(idCita)
  console.log(currentPatient)
  console.log(appointmentInfo)
  useEffect(() => {
    setCardTitle({
      infoCard: {
        title: "Reprogramar",
        subtitle: "",
        icon: scheduleIcon,
        bgColor: "white",
      },
    });
  }, [setCardTitle]);

  useEffect(() => {
    const fetchAppointment = async () => {
        const data = await getAppointmentById(idCita) ;
        if (data === null) {
            setCurrentPatient(null);
            modalMessage("Ruta no encontrada.");
            navigate("/");
            return;
        };
        data.estado = "Reprogramada";
        setAppointmentInfo(
          data
          );
       
    };
    fetchAppointment();
  },[idCita]);

  useEffect(() => {
    const fetchPatientAndDoctorName = async () => {
      if (appointmentInfo != undefined && appointmentInfo != null){
        const dataPatient = await getPatientById(appointmentInfo.idPaciente);
        const dataDoctor = await getDoctorById(appointmentInfo.idDoctor);
        if (dataPatient === null) {
            setCurrentPatient(null);
            modalMessage("Ruta no encontrada.");
            navigate("/");
            return;
        }
        setDoctorName(dataDoctor.nombreCompleto);
        setCurrentPatient(dataPatient);
      }
    };
    fetchPatientAndDoctorName();
},[appointmentInfo]);

if (currentPatient === undefined || currentPatient === null) {
    return <CircularProgress/>;
}
if (appointmentInfo === undefined || appointmentInfo === null) {
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
            doctor: doctorName ,
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