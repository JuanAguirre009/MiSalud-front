import styles from "./CardDetails.module.css";
 
export default function CardDetails({ patientInfo, appointmentInfo }) {
  return (
    <div className={styles["card__cita"]}>
      <h2 className={styles["card__appointment--title"]}>Cita de control</h2>
 
      <div className={styles["card__appointment--info"]}>
        <p><span>Nombre:</span> {patientInfo.nombreCompleto}</p>
        <p><span>Cédula:</span> {patientInfo.cedula}</p>
        <p><span>Teléfono:</span> {patientInfo.telefono}</p>
 
        <br />
        <p><strong>Información de la cita:</strong></p>
        <p><span>Descripción:</span> {appointmentInfo.description}</p>
        <p><span>Fecha cita:</span> {appointmentInfo.date || "No seleccionada"}</p>
        <p><span>Hora:</span> {appointmentInfo.time  ||"No seleccionada"}  </p>
        <p><span>Médico:</span> {appointmentInfo.doctor  ||"No seleccionada"}</p>
        <p><span>Ubicación:</span> {appointmentInfo.location ||"No seleccionada"}</p>
      </div>
    </div>
  );
}