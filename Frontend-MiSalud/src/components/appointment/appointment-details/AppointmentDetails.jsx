
import styles from './AppointmentDetails.module.css';
import getAppointmentDetailsById from '../../../helpers/getAppointmentDetailsById.js';
import { useEffect,useState } from 'react';
import CircularProgress from '@mui/material/CircularProgress';
export default function AppointmentDetails({ idAppointment }) {
    
    const [appointmentDetails, setAppointmentDetails] = useState(undefined);

    useEffect(() => {
        const fetchData = async () => {

            if (idAppointment === undefined) {
                return;
            }

            const data = await getAppointmentDetailsById(idAppointment);

            if (data === null) {
                setAppointmentDetails(null);
                return;
            }
          
            setAppointmentDetails(data);
        };
        fetchData();
    }, [idAppointment]);

    if (idAppointment === undefined) {
        return <div className={styles["appointment__details--empty"]}>Seleccione una cita para ver los detalles</div>;
    }

    if (appointmentDetails === undefined) {
        return <CircularProgress />;
    }

    if (appointmentDetails === null) {
        return <div className={styles["appointment__details--empty"]}>No se encontraron detalles de la cita</div>;
    }
    return (
        <div className={styles["details__appointment--container"]}>
          <div className={styles["appointment__container--title"]}>
            <h2 className={styles["container__title--text"]}>{appointmentDetails.titulo}</h2>
            <p className={styles["container__title--description"]}>{appointmentDetails.descripcion}</p>
          </div>
      
          <div className={styles["appointment__container--description"]}>
            <p className={styles["appointment__content--item"]}>
              <strong className={styles["content__item-strong"]}>Fecha:</strong>{' '}
              {new Date(appointmentDetails.fecha + "T00:00:00").toLocaleDateString('es-ES', {
                day: 'numeric',
                month: 'long',
                year: 'numeric'
              })}
            </p>
            <p className={styles["appointment__content--item"]}>
              <strong className={styles["content__item-strong"]}>Hora:</strong>{' '}
              {new Date(`1970-01-01T${appointmentDetails.horaInicio}`).toLocaleTimeString('es-ES', {
                hour: 'numeric',
                minute: '2-digit',
                hour12: true
              }).replace(/\./g, '')} a{' '}
              {new Date(`1970-01-01T${appointmentDetails.horaFin}`).toLocaleTimeString('es-ES', {
                hour: 'numeric',
                minute: '2-digit',
                hour12: true
              }).replace(/\./g, '')}
            </p>
            <p className={styles["appointment__content--item"]}>
              <strong className={styles["content__item-strong"]}>Lugar:</strong> {appointmentDetails.lugar}
            </p>
          </div>
      
          <div className={styles["appointment__container--patient"]}>
            <h2 className={styles["container__patient--title"]}>Información del Paciente</h2>
            <div className={styles["container__patient--content"]}>
              <p className={styles["appointment__content--item"]}>
                <strong className={styles["content__item-strong"]}>Nombre:</strong> {appointmentDetails.paciente.nombreCompleto}
              </p>
              <p className={styles["appointment__content--item"]}>
                <strong className={styles["content__item-strong"]} >Cédula:</strong> {appointmentDetails.paciente.cedula}
              </p>
              <p className={styles["appointment__content--item"]}>
                <strong className={styles["content__item-strong"]} >Teléfono:</strong> {appointmentDetails.paciente.telefono}
              </p>
              <p className={styles["appointment__content--item"]}>
                <strong className={styles["content__item-strong"]} >Correo:</strong> {appointmentDetails.paciente.correo}
              </p>
            </div>
          </div>
      
          <div className={styles["appointment__container--doctor"]}>
            <h2 className={styles["container__doctor--title"]}>Información del Médico</h2>
            <div className={styles["container__doctor--content"]}>
              <p className={styles["appointment__content--item"]}>
                <strong className={styles["content__item-strong"]}>Nombre:</strong> {appointmentDetails.doctor.nombreCompleto}
              </p>
              <p className={styles["appointment__content--item"]}>
                <strong className={styles["content__item-strong"]}>Correo:</strong> {appointmentDetails.doctor.correo}
              </p>
              <p className={styles["appointment__content--item"]}>
                <strong className={styles["content__item-strong"]} >Teléfono:</strong>{appointmentDetails.doctor.telefono}
              </p>
            </div>
          </div>
        </div>
      );
}