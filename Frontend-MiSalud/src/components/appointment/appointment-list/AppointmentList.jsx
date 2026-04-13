import AppointmentItem from '../appointment-item/AppointmentItem';
import styles from './AppointmentList.module.css';
export default function AppointmentList({ appointments, onSelect }) {
    
    return (
        <div className={styles["appointment__list"]} >
            {appointments.map((appointment) => (
                <AppointmentItem key={appointment.idCita} appointment={appointment} onSelect={onSelect} />
            ))}
        </div>
    );
}