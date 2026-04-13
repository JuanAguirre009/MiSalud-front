import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import styles from './AppointmentActions.module.css';
import getAppointmentById from '../../../helpers/getAppointmentById';
import { modalMessage } from '../../../helpers/modal-alert/modalAlert';

export default function AppointmentActions({ idAppointment }) {
    const [appointmentInfo, setAppointmentInfo] = useState(undefined);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchAppointment = async () => {
            const data = await getAppointmentById(idAppointment);
            if (data === null) {
                setAppointmentInfo(null);
                return;
            }
            setAppointmentInfo(data);
        };
        fetchAppointment();
    }, [idAppointment]);

    const handleReschedule = () => {
        if (!appointmentInfo || !appointmentInfo.fechaCita) return;
    
        const [year, month, day] = appointmentInfo.fechaCita.split('-').map(Number);
        const selectedDate = new Date(year, month - 1, day); 
        const today = new Date();
    
        selectedDate.setHours(0, 0, 0, 0);
        today.setHours(0, 0, 0, 0);
    
        if (selectedDate < today) {
          modalMessage("Alerta", "No puedes reprogramar una cita con fecha anterior a hoy.");
          return;
        }
    
        navigate("/Reschedule/" + idAppointment);
      };

    return (
        <div className={styles["appointment__actions"]}>
            <button className={styles["appointment__actions-btndelete"]}>Eliminar</button>
            <button onClick={handleReschedule} className={styles["appointment__actions-btnedit"]}>
                Reprogramar
            </button>
        </div>
    );
}
