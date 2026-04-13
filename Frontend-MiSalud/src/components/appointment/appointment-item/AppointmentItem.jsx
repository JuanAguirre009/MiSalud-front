import  styles from './AppointmentItem.module.css';
export default function AppointmentItem({ appointment, onSelect }) {
    const handleSelect = () => {
      
        onSelect(appointment.idCita);
    }
const fechaCita = new Date(appointment.fechaCita+ "T00:00:00");

const dateformate = fechaCita.toLocaleDateString('es-ES', {
  day: 'numeric',
  month: 'long',
  year: 'numeric'
});

// Formatear la hora: 5 pm (asumiendo horaCita es "17:00")
const time = new Date(`1970-01-01T${appointment.horaCita}`).toLocaleTimeString('es-ES', {
  hour: 'numeric',
  minute: '2-digit',
  hour12: true
}).replace(/\./g, '');

// Unir todo en una sola cadena
const citaFormateada = `${dateformate} a las ${time}, ${appointment.descriptionAppointment}`;

    return (
        <div className={styles["appointment__item"] } onClick={handleSelect} >
            <h1 className={styles["appointment__item--title"]} >{appointment.title}</h1>
            <p className={styles["appointment__item--details"]}>
                {citaFormateada}
            </p>
        </div>
    );
}